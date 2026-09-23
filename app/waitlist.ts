export type WaitlistResult = { demo: boolean };

export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const result: { demo?: boolean; error?: string } = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'Something went wrong. Please try again.');
  }
  return { demo: result.demo === true };
}
