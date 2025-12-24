(function() {
  function getSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  function trackEvent(eventType, data) {
    const event = {
      session_id: getSessionId(),
      event_type: eventType,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      ...data
    };

    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    }).catch(err => console.error('Tracking error:', err));
  }

  function trackPageView() {
    trackEvent('page_view', {});
  }

  function trackClick(e) {
    trackEvent('click', {
      click_x: e.clientX,
      click_y: e.clientY
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
  } else {
    trackPageView();
  }

  document.addEventListener('click', trackClick);
})();

