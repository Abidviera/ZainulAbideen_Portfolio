import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const { Engine, Render, Runner, Events, MouseConstraint, Mouse, World, Bodies, Bounds } = Matter;

const MatterPills = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const hasStartedRef = useRef(false);

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

      // create an engine
      const engine = Engine.create();
      engineRef.current = engine;
      const world = engine.world;

      // create a renderer
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

      // create bounds
      const themeBackground = getThemeBackground();
      const ground = Bodies.rectangle(
        containerWidth / 2 + 160,
        containerHeight + 80,
        containerWidth + 320,
        160,
        { render: { fillStyle: 'transparent' }, isStatic: true }
      );
      const wallLeft = Bodies.rectangle(
        -80,
        containerHeight / 2,
        160,
        containerHeight,
        { render: { fillStyle: 'transparent' }, isStatic: true }
      );
      const wallRight = Bodies.rectangle(
        containerWidth + 80,
        containerHeight / 2,
        160,
        1200,
        { render: { fillStyle: 'transparent' }, isStatic: true }
      );
      const roof = Bodies.rectangle(
        containerWidth / 2 + 160,
        -80,
        containerWidth + 320,
        160,
        { render: { fillStyle: 'transparent' }, isStatic: true }
      );

      // object colors & variables
      const border = 2;
      const radius = 20;

      // create objects - art & design
      const illustration = Bodies.rectangle(70, containerHeight * 0.5, 133, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/RADmiFI.png', xScale: 0.5, yScale: 0.5 } },
      });
      const art = Bodies.rectangle(35, containerHeight * 0.46, 56, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/NwQqeng.png', xScale: 0.5, yScale: 0.5 } },
      });
      const threeD = Bodies.rectangle(90, containerHeight * 0.46, 52, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/ptUWXgO.png', xScale: 0.5, yScale: 0.5 } },
      });
      const graphic = Bodies.rectangle(60, containerHeight * 0.42, 105, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/TyOmVtt.png', xScale: 0.5, yScale: 0.5 } },
      });
      const photo = Bodies.rectangle(50, containerHeight * 0.38, 86, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/tc3MsJP.png', xScale: 0.5, yScale: 0.5 } },
      });

      // video
      const documentary = Bodies.rectangle(220, containerHeight * 0.54, 165, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/QYNTBNr.png', xScale: 0.5, yScale: 0.5 } },
      });
      const animation = Bodies.rectangle(200, containerHeight * 0.49, 128, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/rSnEY9Q.png', xScale: 0.5, yScale: 0.5 } },
      });
      const vintage = Bodies.rectangle(190, containerHeight * 0.44, 104, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/5BSBvSm.png', xScale: 0.5, yScale: 0.5 } },
      });
      const short = Bodies.rectangle(170, containerHeight * 0.39, 82, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/VEyrikN.png', xScale: 0.5, yScale: 0.5 } },
      });

      // misc
      const website = Bodies.rectangle(360, containerHeight * 0.42, 108, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/hr9p4uV.png', xScale: 0.5, yScale: 0.5 } },
      });
      const article = Bodies.rectangle(300, containerHeight * 0.38, 92, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/n6TV7XG.png', xScale: 0.5, yScale: 0.5 } },
      });
      const music = Bodies.rectangle(400, containerHeight * 0.36, 86, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/dax8MwT.png', xScale: 0.5, yScale: 0.5 } },
      });
      const star = Bodies.rectangle(80, containerHeight * 0.26, 42, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/C2qPMbB.png', xScale: 0.5, yScale: 0.5 } },
      });

      // about
      const about = Bodies.rectangle(230, containerHeight * 0.14, 87, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/4gPcZVN.png', xScale: 0.5, yScale: 0.5 } },
      });
      const instagram = Bodies.rectangle(320, containerHeight * 0.18, 40, 40, {
        id: 'instagramBody',
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/RStSwfG.png', xScale: 0.5, yScale: 0.5 } },
        url: 'https://www.instagram.com/fuse.blog/',
      });
      const random = Bodies.rectangle(230, containerHeight * 0.18, 112, 40, {
        chamfer: { radius },
        render: { sprite: { texture: 'https://i.imgur.com/YS51eIC.png', xScale: 0.5, yScale: 0.5 } },
      });

      // add all of the bodies to the world
      World.add(world, [
        ground,
        wallLeft,
        wallRight,
        roof,
        illustration,
        art,
        threeD,
        graphic,
        photo,
        documentary,
        animation,
        vintage,
        short,
        website,
        article,
        music,
        star,
        about,
        instagram,
        random,
      ]);

      // add mouse control
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

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // Allow page scrolling in matter.js window
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

      // Detect clicks vs. drags
      let click = false;

      const handleMouseDown = () => (click = true);
      const handleMouseMove = () => (click = false);
      const handleMouseUp = () => console.log(click ? 'click' : 'drag');

      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Create a On-Mouseup Event-Handler
      Events.on(mouseConstraint, 'mouseup', function (event) {
        const mouseConstraintEvent = event.source;
        const bodies = engine.world.bodies;
        if (!mouseConstraintEvent.bodyB) {
          for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            // Check if clicked or dragged
            if (click === true) {
              if (Bounds.contains(body.bounds, mouseConstraintEvent.mouse.position)) {
                const bodyUrl = body.url;
                console.log('Body.Url >> ' + bodyUrl);
                // Hyperlinking feature
                if (bodyUrl != undefined) {
                  // window.location.href = bodyUrl;
                  window.open(bodyUrl, '_blank');
                  console.log('Hyperlink was opened');
                }
                break;
              }
            }
          }
        }
      });

      // create a runner using the modern API
      const runner = Runner.create();
      runnerRef.current = runner;

      // run the engine and renderer
      Runner.run(runner, engine);
      Render.run(render);

      // Handle window resize
      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        render.canvas.width = rect.width;
        render.canvas.height = rect.height;
        render.options.width = rect.width;
        render.options.height = rect.height;
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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
      };

      // Listen for theme changes
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

      return () => themeObserver.disconnect();
    };

    // Set up Intersection Observer to start animation when visible
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
