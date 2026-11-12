import { ImageResponse } from 'next/og';

export const alt = 'FitForTrip — plan outfits for every trip';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '72px 82px',
        background: '#f7edbc',
        color: '#292a22',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -90,
          top: -170,
          width: 600,
          height: 600,
          border: '1px solid #aaa271',
          borderRadius: 999,
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 50,
          bottom: -290,
          width: 570,
          height: 570,
          border: '1px solid #aaa271',
          borderRadius: 999,
          opacity: 0.35,
        }}
      />

      <div style={{ width: 650, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, letterSpacing: 2, fontWeight: 700, marginBottom: 44 }}>
          <span>FitForTrip</span>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: '#77744e' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 70, lineHeight: 1.06, fontWeight: 700, letterSpacing: -2 }}>
          <span>Never pack</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span>a</span>
            <span style={{ color: '#77744e' }}>bad fit</span>
            <span>again.</span>
          </div>
        </div>
        <div style={{ fontSize: 25, lineHeight: 1.4, marginTop: 28, color: '#5a5949', maxWidth: 570 }}>
          Destination moodboards, day-by-day looks, and a suitcase that feels like you.
        </div>
      </div>

      <div
        style={{
          width: 310,
          height: 400,
          boxSizing: 'border-box',
          background: '#fffdf7',
          border: '10px solid #292a22',
          borderRadius: 42,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 24,
          transform: 'rotate(5deg)',
          boxShadow: '18px 24px 0 rgba(73,69,40,.14)',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 14, letterSpacing: 2, color: '#77744e', marginTop: 4 }}>YOUR NEXT ESCAPE</div>
        <div style={{ fontSize: 34, fontWeight: 700, marginTop: 12 }}>Bonjour, Paris.</div>
        <div
          style={{
            width: '100%',
            height: 180,
            marginTop: 16,
            borderRadius: 18,
            background: 'linear-gradient(150deg,#dce5d8,#f3c79c 55%,#ede0b7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 99, background: '#737851' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 14, lineHeight: 1.2, letterSpacing: 1, marginTop: 14, color: '#68635f' }}>
          <span>7 OUTFITS</span>
          <span>ZERO OVERTHINKING</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
