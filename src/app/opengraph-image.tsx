import { ImageResponse } from 'next/og';
import { seoConfig } from '@/lib/seo';

export const runtime = 'nodejs';
export const alt = `${seoConfig.name} — ${seoConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const topSkills = [
    'React 19',
    'Next.js 16',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Tailwind CSS',
    'Three.js',
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#07070a',
          padding: '60px 70px',
          position: 'relative',
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '8px 18px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '9999px',
                backgroundColor: '#9bf35a',
                marginRight: '10px',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#e4e4e7',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Available Worldwide // Full-Stack & UI
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '16px',
              color: '#71717a',
              fontWeight: 500,
            }}
          >
            {seoConfig.location.city}, {seoConfig.location.country}
          </div>
        </div>

        {/* Central Identity Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '64px',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '-0.04em',
              marginBottom: '12px',
              lineHeight: 1.05,
            }}
          >
            {seoConfig.name}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 500,
              color: '#9bf35a',
              letterSpacing: '-0.02em',
              marginBottom: '18px',
            }}
          >
            {seoConfig.role}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '18px',
              color: '#a1a1aa',
              lineHeight: 1.5,
              maxWidth: '850px',
            }}
          >
            {seoConfig.description}
          </div>
        </div>

        {/* Skills & Footer Ribbon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Tech Stack Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            {topSkills.map((skill) => (
              <div
                key={skill}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#d4d4d8',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  marginRight: '10px',
                  marginBottom: '10px',
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          {/* Bottom Metas */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '14px',
              color: '#71717a',
            }}
          >
            <span style={{ display: 'flex' }}>
              {seoConfig.siteUrl.replace(/^https?:\/\//, '')}
            </span>
            <span style={{ display: 'flex' }}>
              github.com/Deadshot-45
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
