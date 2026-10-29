const STORAGE_KEY = 'fitfortrip:first-touch-attribution:v1';

const UTM_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

export type SignupAttribution = Partial<Record<(typeof UTM_FIELDS)[number], string>> & {
  first_landing_path?: string;
  first_touch_at?: string;
};

function clean(value: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, 200) : undefined;
}

function readStoredAttribution(): SignupAttribution | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const value: unknown = JSON.parse(raw);
    return value && typeof value === 'object' ? value as SignupAttribution : undefined;
  } catch {
    return undefined;
  }
}

/** Keep the first campaign touch across the homepage → app → account creation journey. */
export function captureFirstTouchAttribution(): SignupAttribution | undefined {
  if (typeof window === 'undefined') return undefined;

  const existing = readStoredAttribution();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const attribution: SignupAttribution = {};
  for (const field of UTM_FIELDS) {
    const value = clean(params.get(field));
    if (value) attribution[field] = value;
  }

  if (!UTM_FIELDS.some(field => attribution[field])) return undefined;

  attribution.first_landing_path = window.location.pathname.slice(0, 500);
  attribution.first_touch_at = new Date().toISOString();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Signup can still proceed if browser storage is unavailable.
  }
  return attribution;
}

export function clearFirstTouchAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Attribution storage is optional and must not block signup.
  }
}
