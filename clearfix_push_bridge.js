(function attachClearFixPushBridge(globalObject) {
  'use strict';

  var INSTALLATION_KEY = 'clearfix.webPush.installationId';
  var CLICK_TARGET_KEY = 'clearfix.webPush.lastClickTarget';
  var CLICK_RESULT_KEY = 'clearfix.webPush.lastClickResult';
  var WORKER_URL = '/clearfix-push-sw.js';
  var WORKER_SCOPE = '/push/';

  function createClearFixPushBridge(globalRef) {
    var storage = safeStorage(globalRef);

    function supported() {
      return Boolean(
        globalRef &&
          globalRef.isSecureContext &&
          globalRef.navigator &&
          globalRef.navigator.serviceWorker &&
          globalRef.PushManager &&
          globalRef.Notification
      );
    }

    function permission() {
      if (!globalRef.Notification) {
        return 'not_applicable';
      }
      return globalRef.Notification.permission || 'default';
    }

    function installationId() {
      var existing = storage.getItem(INSTALLATION_KEY);
      if (existing) {
        return existing;
      }
      var generated = 'web_' + randomPart(globalRef) + '_' + Date.now().toString(36);
      storage.setItem(INSTALLATION_KEY, generated);
      return generated;
    }

    async function serviceWorkerRegistration() {
      if (!supported()) {
        return null;
      }
      var existing = await globalRef.navigator.serviceWorker.getRegistration(
        WORKER_SCOPE
      );
      if (existing) {
        return existing;
      }
      return globalRef.navigator.serviceWorker.register(WORKER_URL, {
        scope: WORKER_SCOPE,
      });
    }

    async function inspect() {
      if (!supported()) {
        return snapshot(null);
      }
      var registration = await globalRef.navigator.serviceWorker.getRegistration(
        WORKER_SCOPE
      );
      var subscription = registration
        ? await registration.pushManager.getSubscription()
        : null;
      return snapshot(subscription);
    }

    async function register(vapidPublicKey) {
      if (!supported()) {
        return snapshot(null);
      }
      var currentPermission = permission();
      if (currentPermission !== 'granted') {
        currentPermission = await globalRef.Notification.requestPermission();
      }
      if (currentPermission !== 'granted') {
        return snapshot(null);
      }
      var registration = await serviceWorkerRegistration();
      var subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }
      return snapshot(subscription);
    }

    async function unregister() {
      if (!supported()) {
        return snapshot(null);
      }
      var registration = await globalRef.navigator.serviceWorker.getRegistration(
        WORKER_SCOPE
      );
      var subscription = registration
        ? await registration.pushManager.getSubscription()
        : null;
      if (subscription) {
        await subscription.unsubscribe();
      }
      return snapshot(null);
    }

    function snapshot(subscription) {
      var result = {
        supported: supported(),
        permission: permission(),
        installationId: supported() ? installationId() : '',
        timezone: timezone(globalRef),
        userAgent: globalRef.navigator ? globalRef.navigator.userAgent || '' : '',
        subscription: subscription ? subscriptionToJson(subscription) : null,
        lastClickTarget: storage.getItem(CLICK_TARGET_KEY) || '',
        lastClickResult: storage.getItem(CLICK_RESULT_KEY) || '',
      };
      return result;
    }

    function handleServiceWorkerMessage(event) {
      var data = event && event.data ? event.data : {};
      if (data.type !== 'CLEARFIX_NOTIFICATION_CLICK') {
        return;
      }
      var targetUrl = typeof data.targetUrl === 'string' ? data.targetUrl : '';
      storage.setItem(CLICK_TARGET_KEY, targetUrl);
      storage.setItem(CLICK_RESULT_KEY, data.result || 'message_received');
      if (targetUrl && sameOrigin(globalRef, targetUrl)) {
        globalRef.location.assign(targetUrl);
      }
    }

    if (globalRef.navigator && globalRef.navigator.serviceWorker) {
      globalRef.navigator.serviceWorker.addEventListener(
        'message',
        handleServiceWorkerMessage
      );
    }

    return {
      inspect: inspect,
      register: register,
      unregister: unregister,
      _createSnapshotForTest: snapshot,
    };
  }

  function subscriptionToJson(subscription) {
    return {
      endpoint: subscription.endpoint || '',
      expirationTime: subscription.expirationTime || null,
      keys: {
        p256dh: keyToBase64(subscription, 'p256dh'),
        auth: keyToBase64(subscription, 'auth'),
      },
    };
  }

  function keyToBase64(subscription, keyName) {
    var key = subscription.getKey ? subscription.getKey(keyName) : null;
    if (!key) {
      return '';
    }
    var bytes = new Uint8Array(key);
    var binary = '';
    for (var index = 0; index < bytes.byteLength; index += 1) {
      binary += String.fromCharCode(bytes[index]);
    }
    return globalObject.btoa(binary);
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    var rawData = globalObject.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var index = 0; index < rawData.length; index += 1) {
      outputArray[index] = rawData.charCodeAt(index);
    }
    return outputArray;
  }

  function randomPart(globalRef) {
    var crypto = globalRef.crypto;
    if (crypto && crypto.getRandomValues) {
      var values = new Uint32Array(2);
      crypto.getRandomValues(values);
      return values[0].toString(36) + values[1].toString(36);
    }
    return Math.random().toString(36).slice(2);
  }

  function timezone(globalRef) {
    try {
      return globalRef.Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch (_) {
      return 'UTC';
    }
  }

  function sameOrigin(globalRef, targetUrl) {
    try {
      return new URL(targetUrl, globalRef.location.href).origin ===
        globalRef.location.origin;
    } catch (_) {
      return false;
    }
  }

  function safeStorage(globalRef) {
    var fallback = {};
    try {
      var localStorage = globalRef.localStorage;
      var testKey = '__clearfix_push_storage_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return localStorage;
    } catch (_) {
      return {
        getItem: function getItem(key) {
          return fallback[key] || null;
        },
        setItem: function setItem(key, value) {
          fallback[key] = String(value);
        },
        removeItem: function removeItem(key) {
          delete fallback[key];
        },
      };
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createClearFixPushBridge: createClearFixPushBridge };
  }

  if (globalObject && !globalObject.clearfixPush) {
    globalObject.clearfixPush = createClearFixPushBridge(globalObject);
  }
})(typeof self !== 'undefined' ? self : globalThis);
