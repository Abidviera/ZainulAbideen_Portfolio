import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const { Engine, Render, Runner, Events, MouseConstraint, Mouse, World, Bodies, Bounds, Body, Composite } = Matter;

const skillLogos = [
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "Angular", src: "https://cdn.simpleicons.org/angular" },
  { name: "Ionic", src: "https://cdn.simpleicons.org/ionic" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
  { name: "NestJS", src: "https://cdn.simpleicons.org/nestjs" },
  { name: "Node.js", src: "/skillLogos/Nodejs.png" },
  { name: "C#", src: "/skillLogos/Csharp.webp" },
  { name: "Azure", src: "/skillLogos/azure.webp" },
  { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github" },
  { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript" },
  { name: "HTML5", src: "https://cdn.simpleicons.org/html5" },
  { name: "CSS3", src: "/skillLogos/css3.webp" },
  { name: "Figma", src: "/skillLogos/figma.webp" },
  { name: "Bootstrap", src: "https://cdn.simpleicons.org/bootstrap" },
  { name: "ASP.NET", src: "/skillLogos/asp.net.webp" },
  { name: ".NET MAUI", src: "/skillLogos/maui.webp" },
  { name: "SQL Server", src: "/skillLogos/SQL SERVER.webp" },
];

const MatterPills = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const hasStartedRef = useRef(false);
  const imageCacheRef = useRef({});

  const getThemeBackground = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark ? '#080808' : '#ffffff';
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const initEngine = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      // Create engine with better physics
      const engine = Engine.create({
        enableSleeping: false,
      });
      engineRef.current = engine;
      const world = engine.world;

      // Renderer
      const containerWidth = container.offsetWidth || 800;
      const containerHeight = container.offsetHeight || 600;

      const render = Render.create({
        element: container,
        engine: engine,
        options: {
          width: containerWidth,
          height: containerHeight,
          pixelRatio: 2,
          background: getThemeBackground(),
          wireframes: false,
        },
      });
      renderRef.current = render;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#ffffff' : '#000000';

      // Physics options
      const pillOptions = {
        friction: 0.3,
        frictionAir: 0.02,
        restitution: 0.4,
        frictionStatic: 0.5,
      };

      const circleOptions = {
        friction: 0.3,
        frictionAir: 0.02,
        restitution: 0.5,
        frictionStatic: 0.5,
      };

      // Walls
      const ground = Bodies.rectangle(
        containerWidth / 2 + 160,
        containerHeight + 80,
        containerWidth + 320,
        160,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      );
      const wallLeft = Bodies.rectangle(
        -80,
        containerHeight / 2,
        160,
        containerHeight,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      );
      const wallRight = Bodies.rectangle(
        containerWidth + 80,
        containerHeight / 2,
        160,
        1200,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      );
      const roof = Bodies.rectangle(
        containerWidth / 2 + 160,
        -80,
        containerWidth + 320,
        160,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      );

      // Radius for pill chamfer
      const radius = 20;

      // All pills - mixed positions
      const react = Bodies.rectangle(80, containerHeight * 0.5, 90, 40, {
        chamfer: { radius },
        label: 'React',
        render: { fillStyle: '#61dafb' },
        ...pillOptions,
      });
      const angular = Bodies.rectangle(200, containerHeight * 0.45, 105, 40, {
        chamfer: { radius },
        label: 'Angular',
        render: { fillStyle: '#dd0031' },
        ...pillOptions,
      });
      const typescript = Bodies.rectangle(350, containerHeight * 0.55, 130, 40, {
        chamfer: { radius },
        label: 'TypeScript',
        render: { fillStyle: '#3178c6' },
        ...pillOptions,
      });
      const javascript = Bodies.rectangle(150, containerHeight * 0.35, 140, 40, {
        chamfer: { radius },
        label: 'JavaScript',
        render: { fillStyle: '#f7df1e' },
        ...pillOptions,
      });

      const nestjs = Bodies.rectangle(420, containerHeight * 0.4, 95, 40, {
        chamfer: { radius },
        label: 'NestJS',
        render: { fillStyle: '#e0234e' },
        ...pillOptions,
      });
      const dotnet = Bodies.rectangle(280, containerHeight * 0.6, 95, 40, {
        chamfer: { radius },
        label: '.NET',
        render: { fillStyle: '#512bd4' },
        ...pillOptions,
      });
      const nodejs = Bodies.rectangle(100, containerHeight * 0.65, 95, 40, {
        chamfer: { radius },
        label: 'Node.js',
        render: { fillStyle: '#68a063' },
        ...pillOptions,
      });
      const csharp = Bodies.rectangle(500, containerHeight * 0.5, 90, 40, {
        chamfer: { radius },
        label: 'C#',
        render: { fillStyle: '#68217a' },
        ...pillOptions,
      });

      const postgresql = Bodies.rectangle(180, containerHeight * 0.75, 130, 40, {
        chamfer: { radius },
        label: 'PostgreSQL',
        render: { fillStyle: '#336791' },
        ...pillOptions,
      });
      const mongodb = Bodies.rectangle(380, containerHeight * 0.3, 110, 40, {
        chamfer: { radius },
        label: 'MongoDB',
        render: { fillStyle: '#47a248' },
        ...pillOptions,
      });
      const graphql = Bodies.rectangle(550, containerHeight * 0.65, 100, 40, {
        chamfer: { radius },
        label: 'GraphQL',
        render: { fillStyle: '#e10098' },
        ...pillOptions,
      });
      const restapi = Bodies.rectangle(320, containerHeight * 0.75, 95, 40, {
        chamfer: { radius },
        label: 'REST API',
        render: { fillStyle: '#ff6c40' },
        ...pillOptions,
      });

      const docker = Bodies.rectangle(450, containerHeight * 0.7, 95, 40, {
        chamfer: { radius },
        label: 'Docker',
        render: { fillStyle: '#2496ed' },
        ...pillOptions,
      });
      const aws = Bodies.rectangle(130, containerHeight * 0.2, 60, 40, {
        chamfer: { radius },
        label: 'AWS',
        render: { fillStyle: '#ff9900' },
        ...pillOptions,
      });
      const git = Bodies.rectangle(250, containerHeight * 0.25, 55, 40, {
        chamfer: { radius },
        label: 'Git',
        render: { fillStyle: '#f05032' },
        ...pillOptions,
      });
      const instagram = Bodies.rectangle(480, containerHeight * 0.2, 110, 40, {
        chamfer: { radius },
        label: 'Instagram',
        render: { fillStyle: '#e4405f' },
        url: 'https://www.instagram.com/fuse.blog/',
        ...pillOptions,
      });
      const star = Bodies.rectangle(580, containerHeight * 0.35, 60, 40, {
        chamfer: { radius },
        label: '⭐ Like',
        render: { fillStyle: '#fbbf24' },
        ...pillOptions,
      });

      // Skill logo circles - completely mixed with pills
      const skillLogoBodies = skillLogos.map((skill, index) => {
        const xPos = 100 + (index % 8) * 60;
        const yPos = containerHeight * 0.15 + Math.floor(index / 8) * 80;
        const circleRadius = 26;
        return Bodies.circle(xPos, yPos, circleRadius, {
          label: skill.name,
          skillLogoSrc: skill.src,
          render: { fillStyle: 'transparent' },
          ...circleOptions,
        });
      });

      // Preload images
      skillLogos.forEach((skill) => {
        const img = new Image();
        img.src = skill.src;
        imageCacheRef.current[skill.src] = img;
      });

      // Add all bodies to world
      World.add(world, [
        ground,
        wallLeft,
        wallRight,
        roof,
        react,
        angular,
        typescript,
        javascript,
        nestjs,
        dotnet,
        nodejs,
        csharp,
        postgresql,
        mongodb,
        graphql,
        restapi,
        docker,
        aws,
        git,
        instagram,
        star,
        ...skillLogoBodies,
      ]);

      // Mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      World.add(world, mouseConstraint);
      render.mouse = mouse;

      // Allow page scrolling
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

      // Click detection
      let click = false;
      const handleMouseDown = () => (click = true);
      const handleMouseMove = () => (click = false);

      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);

      Events.on(mouseConstraint, 'mouseup', function (event) {
        const mouseConstraintEvent = event.source;
        const bodies = engine.world.bodies;
        if (!mouseConstraintEvent.bodyB) {
          for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            if (click === true) {
              if (Bounds.contains(body.bounds, mouseConstraintEvent.mouse.position)) {
                const bodyUrl = body.url;
                if (bodyUrl != undefined) {
                  window.open(bodyUrl, '_blank');
                }
                break;
              }
            }
          }
        }
      });

      // Runner
      const runner = Runner.create();
      runnerRef.current = runner;

      // Custom rendering for skill logo images
      Events.on(render, 'afterRender', function () {
        const context = render.context;
        const bodies = Composite.allBodies(world);
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        const themeTextColor = isDarkTheme ? '#ffffff' : '#000000';

        context.font = 'bold 13px Inter, -apple-system, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        bodies.forEach((body) => {
          // Skip walls
          if (body.isStatic) return;

          // Skill logos - draw images
          if (body.skillLogoSrc) {
            const img = imageCacheRef.current[body.skillLogoSrc];
            if (img && img.complete) {
              const size = 44;
              context.save();
              context.translate(body.position.x, body.position.y);
              context.rotate(body.angle);
              context.drawImage(img, -size / 2, -size / 2, size, size);
              context.restore();
            }
            return;
          }

          // Pills - draw text labels
          if (body.label && body.label !== 'Ground') {
            context.save();
            context.translate(body.position.x, body.position.y);
            context.rotate(body.angle);
            context.fillStyle = themeTextColor;
            context.fillText(body.label, 0, 0);
            context.restore();
          }
        });
      });

      // Run engine
      Runner.run(runner, engine);
      Render.run(render);

      // Resize handler
      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        render.canvas.width = rect.width;
        render.canvas.height = rect.height;
        render.options.width = rect.width;
        render.options.height = rect.height;
      };

      window.addEventListener('resize', handleResize);

      // Theme observer
      const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-theme') {
            const newBackground = getThemeBackground();
            render.options.background = newBackground;
            if (render.canvas) {
              render.canvas.style.background = newBackground;
            }
          }
        });
      });

      themeObserver.observe(document.documentElement, { attributes: true });

      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        Runner.stop(runner);
        Render.stop(render);
        Engine.clear(engine);
        if (render.canvas) {
          render.canvas.remove();
        }
        if (render.textures) {
          Object.values(render.textures).forEach((texture) => texture.destroy());
        }

        themeObserver.disconnect();
        hasStartedRef.current = false;
      };
    };

    // Start when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initEngine();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="matter-pills-container"
    />
  );
};

export default MatterPills;
