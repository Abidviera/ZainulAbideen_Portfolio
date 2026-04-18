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
    <div className="marquee-section">
      <div className="marquee-track">
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
