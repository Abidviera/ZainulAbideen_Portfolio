const marqueeItems = [
  'Full Stack Development',
  'ASP.NET Core',
  'Angular & React',
  'Azure Cloud',
  'Team Leadership',
  'Enterprise Solutions',
  'NestJS Microservices',
  'CI/CD & DevOps',
];

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-section" style={{ contain: 'layout paint' }}>
      <div className="marquee-track gpu-accelerated">
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-sep" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
