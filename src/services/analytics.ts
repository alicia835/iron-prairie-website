import { siteConfig } from '../config/siteConfig';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    __ga4Initialized?: boolean;
    __ga4ListenersAttached?: boolean;
    __ga4BootstrapDone?: boolean;
  }
}

/** Forms that should emit GA4 generate_lead (quote / RFQ / contact). */
const LEAD_FORM_SELECTOR = 'form[data-ga-lead-form], form#contact-quote-form, form#bulk-rfq-form';

/**
 * Eagerly stub gtag + dataLayer so events queue before gtag.js loads.
 * Safe to call multiple times; also mirrored by the inline head stub in index.html.
 */
export function ensureGtagStub(): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // Arguments object is required for the official gtag queue protocol
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

ensureGtagStub();

/**
 * Conversion listeners only (no third-party script).
 * Call early from main so tel/mailto/form events are not raced by deferred GA4 load.
 */
export function bootstrapConversionTracking(): void {
  if (typeof window === 'undefined') return;
  ensureGtagStub();
  if (window.__ga4BootstrapDone) return;
  window.__ga4BootstrapDone = true;
  attachAutoTrackingListeners();
}

/**
 * Initializes Google Analytics 4 deferred island strictly when main thread is idle.
 * Zero render-blocking third-party script in <head>; maintains 100/100/100/100 Mobile Lighthouse.
 * dataLayer/gtag stubs live in index.html <head> + ensureGtagStub() for early queueing.
 */
export function initAnalyticsIsland(): void {
  if (typeof window === 'undefined') return;
  if (window.__ga4Initialized) return;

  ensureGtagStub();
  bootstrapConversionTracking();

  const measurementId = siteConfig.ga4MeasurementId;
  if (!measurementId || !measurementId.startsWith('G-')) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] Invalid or missing GA4 Measurement ID:', measurementId);
    }
    return;
  }

  if (document.getElementById('ga4-gtag-script')) {
    window.__ga4Initialized = true;
    return;
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  script.id = 'ga4-gtag-script';
  document.head.appendChild(script);

  window.__ga4Initialized = true;

  if (import.meta.env.DEV) {
    console.log(`[analytics] Zero-Hydration GA4 Island active (${measurementId})`);
  }
}

/**
 * Global delegated listeners for conversions:
 * - Phone (tel:) → contact / phone_call
 * - Email (mailto:) → contact / email_click
 * - Lead forms (quote / RFQ / contact) → generate_lead
 * Does not preventDefault — native navigation / React submit continue unchanged.
 */
function attachAutoTrackingListeners(): void {
  if (typeof window === 'undefined' || window.__ga4ListenersAttached) return;
  window.__ga4ListenersAttached = true;

  document.addEventListener(
    'click',
    (e) => {
      const target = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!target) return;

      const href = target.getAttribute('href') || '';

      if (href.startsWith('tel:')) {
        const phoneNumber = href.replace('tel:', '');
        trackPhoneCall(target.getAttribute('data-ga-location') || 'unknown', phoneNumber);
        return;
      }

      if (href.startsWith('mailto:')) {
        trackEmailClick(
          target.getAttribute('data-ga-location') || 'unknown',
          href.replace(/^mailto:/i, '').split('?')[0]
        );
        return;
      }

      // Soft intent: quote CTAs (not a conversion)
      if (href === '/contact' || /\bquote\b/i.test(target.textContent || '')) {
        trackEvent('click_quote_cta', {
          cta_text: target.textContent?.trim().slice(0, 50),
          cta_location: target.getAttribute('data-ga-location') || window.location.pathname,
          intent: 'custom_fabrication_quote',
        });
      }
    },
    { passive: true }
  );

  // Capture phase: fire before React onSubmit; never cancel the submit
  document.addEventListener(
    'submit',
    (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.matches(LEAD_FORM_SELECTOR)) return;
      // Forms that fire a richer generate_lead in their own submit handler
      if (form.dataset.gaLeadManual === '1') return;
      if (form.dataset.gaLeadSent === '1') return;

      const label =
        form.getAttribute('data-ga-lead-form') ||
        form.id ||
        'quote_request';

      trackLeadFormSubmission(label, form);
    },
    true
  );
}

/**
 * Dispatches SPA pageview events to GA4 on route changes without reload.
 */
export function trackPageView(path?: string, title?: string): void {
  if (typeof window === 'undefined') return;
  const measurementId = siteConfig.ga4MeasurementId;
  if (!measurementId || !measurementId.startsWith('G-')) return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname + window.location.search,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
}

/**
 * Dispatches custom user engagement or conversion events.
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  ensureGtagStub();
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Standard GA4 generate_lead for quote / RFQ / contact forms.
 */
export function trackLeadFormSubmission(
  eventLabel = 'quote_request',
  form?: HTMLFormElement | null
): void {
  if (form) {
    if (form.dataset.gaLeadSent === '1') return;
    form.dataset.gaLeadSent = '1';
  }

  trackEvent('generate_lead', {
    event_category: 'form',
    event_label: eventLabel,
    value: 1,
    currency: 'USD',
    form_id: form?.id || eventLabel,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * Tracks high-priority phone call engagement (tel: links).
 * Does not block the native dialer.
 */
export function trackPhoneCall(location = 'direct', phoneNumber = siteConfig.phoneDisplay): void {
  trackEvent('generate_lead', {
    event_category: 'conversion',
    event_label: 'phone_call',
    lead_type: 'phone_call',
    phone_number: phoneNumber,
    touchpoint_location: location,
    core_interest: 'custom_metal_fabrication',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    value: 10,
    currency: 'USD',
  });

  trackEvent('contact_phone_call', {
    phone_number: phoneNumber,
    location,
  });

  trackEvent('contact', {
    event_category: 'engagement',
    event_label: 'phone_call',
    method: 'phone',
    phone_number: phoneNumber,
    touchpoint_location: location,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
  });
}

/**
 * Tracks email click engagement (mailto: links).
 * Does not block the native mail client.
 */
export function trackEmailClick(location = 'direct', email = siteConfig.email): void {
  trackEvent('contact', {
    event_category: 'engagement',
    event_label: 'email_click',
    method: 'email',
    email_address: email,
    touchpoint_location: location,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
  });
}

/**
 * Tracks Custom Fabrication Quote Form Submissions (programmatic / richer payload).
 * Prefer data-ga-lead-form + delegated submit; use this when submit is fully custom.
 */
export function trackCustomQuoteSubmission(projectType: string, companyName?: string): void {
  trackEvent('generate_lead', {
    event_category: 'form',
    event_label: 'quote_request',
    value: 1,
    currency: 'USD',
    lead_type: 'custom_quote_form',
    project_type: projectType,
    company_name: companyName || 'Private/Individual',
    core_interest: 'custom_metal_fabrication',
  });

  trackEvent('submit_custom_quote', {
    project_type: projectType,
    company: companyName,
    core_interest: 'custom_metal_fabrication',
  });
}

/**
 * Tracks User Interest in specific Custom Fabrication service categories.
 */
export function trackCustomFabInterest(serviceCategory: string, source = 'services_page'): void {
  trackEvent('view_custom_service', {
    service_category: serviceCategory,
    source,
    core_interest: 'custom_metal_fabrication',
  });
}

/**
 * Tracks GA4 Ecommerce Add To Cart event.
 */
export function trackAddToCart(items: any[] | any): void {
  const itemList = Array.isArray(items) ? items : [items];
  const totalValue = itemList.reduce(
    (sum, item) => sum + (Number(item.lineTotal) || (Number(item.unitPrice) * (Number(item.quantity) || 1)) || 0),
    0
  );

  trackEvent('add_to_cart', {
    currency: 'USD',
    value: totalValue,
    items: itemList.map((item) => ({
      item_id: item.partNumber || item.id || 'PADDLE-BLIND',
      item_name: item.name || `${item.npsSize || item.nps || ''}" ${item.pressureClass || ''}# Paddle Blind`,
      item_category: 'Paddle Blinds & Spacers',
      price: Number(item.unitPrice) || (Number(item.lineTotal) / (Number(item.quantity) || 1)) || 0,
      quantity: Number(item.quantity) || 1,
    })),
  });
}

/**
 * Tracks GA4 Ecommerce Begin Checkout event.
 */
export function trackBeginCheckout(cartItems: any[], totalValue: number): void {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items: (cartItems || []).map((item) => ({
      item_id: item.partNumber || item.id || 'PADDLE-BLIND',
      item_name: item.name || `${item.npsSize || item.nps || ''}" ${item.pressureClass || ''}# Paddle Blind`,
      item_category: 'Paddle Blinds & Spacers',
      price: Number(item.unitPrice) || (Number(item.lineTotal) / (Number(item.quantity) || 1)) || 0,
      quantity: Number(item.quantity) || 1,
    })),
  });
}

/**
 * Tracks GA4 Ecommerce Purchase conversion event.
 * Dispatches standard GA4 'purchase' with transaction details, value, and line items.
 */
export function trackPurchase(order: any): void {
  const orderId = order.orderId || order.poNumber || `IPG-${Date.now().toString().slice(-6)}`;
  const total = Number(order.totalAmount || order.grandTotal || order.subtotal) || 0;
  const shipping = Number(order.shippingCost) || 0;
  const items = Array.isArray(order.items) ? order.items : [];

  trackEvent('purchase', {
    transaction_id: orderId,
    value: total,
    currency: 'USD',
    tax: 0,
    shipping,
    items: items.map((item) => ({
      item_id: item.partNumber || item.id || 'PADDLE-BLIND',
      item_name: item.name || `${item.npsSize || item.nps || ''}" ${item.pressureClass || ''}# Paddle Blind`,
      item_category: 'Paddle Blinds & Spacers',
      price: Number(item.unitPrice) || (Number(item.lineTotal) / (Number(item.quantity) || 1)) || 0,
      quantity: Number(item.quantity) || 1,
    })),
  });
}
