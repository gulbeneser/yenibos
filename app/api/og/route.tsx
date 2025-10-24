import { ImageResponse } from 'next/og';
import site from '@/lib/site';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? site.name;
  const subtitle = searchParams.get('subtitle') ?? site.description.tr;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0A0F1C',
          color: '#E6EAF2',
          padding: '80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: '#9AA4B2',
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: '#2563EB',
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 600 }}>{site.name}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
