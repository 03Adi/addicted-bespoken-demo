(() => {
  const storageKey = 'ab_first_touch_attribution_v1';
  const lifetimeMs = 30 * 24 * 60 * 60 * 1000;
  const parameterNames = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  const now = Date.now();

  const readIncoming = () => {
    const query = new URLSearchParams(window.location.search);
    const values = {};

    parameterNames.forEach((name) => {
      const value = query.get(name);
      if (!value) return;
      values[name] = value.trim().slice(0, name === 'fbclid' ? 2048 : 255);
    });

    return values;
  };

  const incoming = readIncoming();
  let attribution = null;

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
    if (saved && saved.expiresAt > now && saved.values && typeof saved.values === 'object') {
      attribution = saved;
    } else if (saved) {
      window.localStorage.removeItem(storageKey);
    }

    if (!attribution && Object.keys(incoming).length > 0) {
      attribution = {
        capturedAt: now,
        expiresAt: now + lifetimeMs,
        values: incoming,
      };
      window.localStorage.setItem(storageKey, JSON.stringify(attribution));
    }
  } catch (error) {
    // Keep current-page attribution usable when browser storage is unavailable.
    if (Object.keys(incoming).length > 0) {
      attribution = { capturedAt: now, expiresAt: now + lifetimeMs, values: incoming };
    }
  }

  const values = attribution?.values || {};
  window.AddictedBespokenAttribution = {
    get: () => ({ ...values }),
    expiresAt: attribution?.expiresAt || null,
  };

  document.querySelectorAll('[data-attribution-calendly]').forEach((frame) => {
    const baseUrl = frame.dataset.calendlyUrl;
    if (!baseUrl) return;

    try {
      const calendlyUrl = new URL(baseUrl, window.location.origin);
      parameterNames.forEach((name) => {
        if (values[name]) calendlyUrl.searchParams.set(name, values[name]);
      });
      frame.src = calendlyUrl.toString();
    } catch (error) {
      // Invalid editor URLs remain unset instead of creating a broken iframe.
    }
  });

  document.querySelectorAll('[data-attribution-whatsapp]').forEach((button) => {
    const phone = button.dataset.phone;
    const message = button.dataset.message || '';
    if (!phone) return;

    const campaign = values.utm_campaign;
    const prefilledMessage = campaign ? `${message} (ref: ${campaign})` : message;
    button.href = `https://wa.me/${phone}?text=${encodeURIComponent(prefilledMessage)}`;
  });
})();
