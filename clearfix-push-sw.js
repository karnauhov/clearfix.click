'use strict';

self.addEventListener('push', function onPush(event) {
  event.waitUntil(showClearFixNotification(event));
});

self.addEventListener('notificationclick', function onNotificationClick(event) {
  event.notification.close();
  event.waitUntil(openClearFixTarget(event.notification.data || {}));
});

async function showClearFixNotification(event) {
  var payload = parsePushPayload(event);
  var title = payload.title || 'ClearFix';
  var options = {
    body: payload.body || '',
    tag: payload.tag || payload.event_id || 'clearfix-notification',
    icon: payload.icon || '/icons/Icon-192.png',
    badge: payload.badge || '/icons/Icon-192.png',
    data: {
      targetUrl: payload.target_url || '/',
      eventId: payload.event_id || '',
      clickTarget: payload.click_target || '',
    },
  };
  await self.registration.showNotification(title, options);
}

function parsePushPayload(event) {
  if (!event.data) {
    return {};
  }
  try {
    return event.data.json();
  } catch (_) {
    return { body: event.data.text() };
  }
}

async function openClearFixTarget(data) {
  var targetUrl = safeTargetUrl(data.targetUrl || '/');
  var allClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  for (var index = 0; index < allClients.length; index += 1) {
    var client = allClients[index];
    if (!sameOrigin(client.url, targetUrl)) {
      continue;
    }
    if ('navigate' in client) {
      await client.navigate(targetUrl);
    }
    await client.focus();
    client.postMessage({
      type: 'CLEARFIX_NOTIFICATION_CLICK',
      targetUrl: targetUrl,
      eventId: data.eventId || '',
      result: 'focused_existing_tab',
    });
    return;
  }

  if (self.clients.openWindow) {
    var openedClient = await self.clients.openWindow(targetUrl);
    if (openedClient) {
      openedClient.postMessage({
        type: 'CLEARFIX_NOTIFICATION_CLICK',
        targetUrl: targetUrl,
        eventId: data.eventId || '',
        result: 'opened_new_tab',
      });
    }
  }
}

function safeTargetUrl(value) {
  try {
    return new URL(value, self.location.origin).href;
  } catch (_) {
    return self.location.origin + '/orders';
  }
}

function sameOrigin(leftUrl, rightUrl) {
  try {
    return new URL(leftUrl).origin === new URL(rightUrl).origin;
  } catch (_) {
    return false;
  }
}
