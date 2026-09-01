(() => {
  'use strict';

  function setupHomeNewsBoard() {
    const homeNewsBoard = document.querySelector('[data-home-news-board]');
    if (!homeNewsBoard) return;

    const newsEntries = Array.from(homeNewsBoard.querySelectorAll('[data-home-news-entry]'));
    const newsCovers = Array.from(homeNewsBoard.querySelectorAll('[data-home-news-cover]'));
    const showHomeNewsCover = (index) => {
      newsEntries.forEach((entry, entryIndex) => {
        entry.classList.toggle('is-active', entryIndex === index);
      });
      newsCovers.forEach((cover, coverIndex) => {
        cover.classList.toggle('is-active', coverIndex === index);
      });
    };

    newsEntries.forEach((entry, index) => {
      entry.addEventListener('mouseenter', () => showHomeNewsCover(index));
      entry.addEventListener('focus', () => showHomeNewsCover(index));
    });
    showHomeNewsCover(0);
  }

  function setupLabCarousel({ prefersReducedMotion }) {
    const labCarousel = document.querySelector('[data-lab-carousel]');
    if (!labCarousel) return;

    const slides = Array.from(labCarousel.querySelectorAll('.lab-slide'));
    const dots = Array.from(labCarousel.querySelectorAll('.lab-carousel-dot'));
    const dotsNav = labCarousel.querySelector('.lab-carousel-dots');
    const previousButton = labCarousel.querySelector('[data-carousel-prev]');
    const nextButton = labCarousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;
    let autoplayTimer = 0;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        slide.setAttribute('aria-hidden', String(slideIndex !== activeIndex));
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      const planePosition = slides.length > 1
        ? 10 + (activeIndex / (slides.length - 1)) * 80
        : 50;
      dotsNav?.style.setProperty('--plane-position', `${planePosition}%`);
    };

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (prefersReducedMotion || slides.length < 2) return;
      autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 5200);
    };

    dots.forEach((dot, index) => {
      const previewSlide = () => {
        stopAutoplay();
        showSlide(index);
      };
      dot.addEventListener('mouseenter', previewSlide);
      dot.addEventListener('focus', previewSlide);
      dot.addEventListener('mouseleave', startAutoplay);
      dot.addEventListener('blur', startAutoplay);
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });
    previousButton?.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });
    nextButton?.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });

    showSlide(0);
    startAutoplay();
  }

  function setupResearchSequence({ prefersReducedMotion }) {
    const sequence = document.querySelector('[data-home-research-sequence]');
    if (!sequence) return;

    const items = Array.from(sequence.querySelectorAll('[data-research-sequence-item]'));
    const displayDuration = 4200;
    const collapseDuration = 650;
    let activeIndex = 0;
    let timer = 0;

    const clearTimer = () => {
      window.clearTimeout(timer);
      timer = 0;
    };

    const showItem = (index) => {
      activeIndex = index;
      items.forEach((item, itemIndex) => {
        const isActive = itemIndex === index;
        item.classList.toggle('is-active', isActive);
        item.querySelector('.home-research-sequence-trigger')?.setAttribute('aria-expanded', String(isActive));
        item.querySelector('.home-research-sequence-card')?.setAttribute('aria-hidden', String(!isActive));
      });
    };

    const collapseItems = () => showItem(-1);

    const playItem = (index) => {
      clearTimer();
      showItem(index);
      timer = window.setTimeout(() => {
        collapseItems();
        timer = window.setTimeout(() => playItem((index + 1) % items.length), collapseDuration);
      }, displayDuration);
    };

    const pauseAt = (index) => {
      clearTimer();
      showItem(index);
    };

    const resumeAfter = (index) => {
      clearTimer();
      collapseItems();
      if (!prefersReducedMotion) {
        timer = window.setTimeout(() => playItem((index + 1) % items.length), collapseDuration);
      }
    };

    items.forEach((item, index) => {
      item.addEventListener('pointerenter', () => pauseAt(index));
      item.addEventListener('pointerleave', () => {
        if (!item.contains(document.activeElement)) resumeAfter(index);
      });
      item.addEventListener('focusin', () => pauseAt(index));
      item.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!item.contains(document.activeElement)) resumeAfter(index);
        }, 0);
      });
    });

    if (prefersReducedMotion) showItem(0);
    else playItem(0);
  }

  function setupResearchSequenceMotion({ prefersReducedMotion }) {
    const sequence = document.querySelector('[data-home-research-sequence]');
    const line = sequence?.querySelector('.home-research-sequence-line polyline');
    const nodes = sequence
      ? Array.from(sequence.querySelectorAll('.home-research-sequence-item'))
      : [];
    if (!sequence || !line || nodes.length === 0 || prefersReducedMotion) return;

    const motion = nodes.map((node, index) => ({
      node,
      baseX: Number.parseFloat(getComputedStyle(node).getPropertyValue('--node-x')),
      baseY: Number.parseFloat(getComputedStyle(node).getPropertyValue('--node-y')),
      amplitudeX: .58 + (index % 3) * .16,
      amplitudeY: .72 + ((index + 1) % 3) * .18,
      phase: index * 1.17 + .45,
      speed: .00042 + (index % 4) * .000035,
      x: 0,
      y: 0
    }));
    let animationFrame = 0;
    let isVisible = true;

    const draw = (time) => {
      motion.forEach((point) => {
        const isHeld = point.node.matches(':hover') || point.node.contains(document.activeElement);
        if (!isHeld) {
          point.x = point.baseX
            + Math.sin(time * point.speed + point.phase) * point.amplitudeX
            + Math.sin(time * point.speed * .41 + point.phase * 1.8) * point.amplitudeX * .24;
          point.y = point.baseY
            + Math.cos(time * point.speed * .73 + point.phase) * point.amplitudeY
            + Math.sin(time * point.speed * .31 + point.phase * 1.35) * point.amplitudeY * .22;
        }
        point.node.style.setProperty('--node-x', `${point.x || point.baseX}%`);
        point.node.style.setProperty('--node-y', `${point.y || point.baseY}%`);
      });
      line.setAttribute('points', motion.map((point) => `${point.x || point.baseX},${point.y || point.baseY}`).join(' '));
      if (isVisible) animationFrame = window.requestAnimationFrame(draw);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      window.cancelAnimationFrame(animationFrame);
      if (isVisible) animationFrame = window.requestAnimationFrame(draw);
    }, { rootMargin: '100px' });
    visibilityObserver.observe(sequence);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function setupResearchStarfield({ prefersReducedMotion }) {
    const canvas = document.querySelector('[data-home-research-starfield]');
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const palette = ['248, 253, 255', '230, 243, 251', '210, 233, 246', '188, 221, 240'];
    const particles = Array.from({ length: 950 }, () => ({}));
    let animationFrame = 0;
    let lastTime = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const resetParticle = (particle, scatter = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.4 + Math.pow(Math.random(), 1.7) * 13.5;
      particle.life = 18 + Math.random() * 18;
      particle.age = scatter ? Math.random() * particle.life : 0;
      particle.velocityX = Math.cos(angle) * speed;
      particle.velocityY = Math.sin(angle) * speed * (.72 + Math.random() * .32);
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.turnRate = (Math.random() - .5) * .1;
      particle.wobble = .00035 + Math.random() * .0009;
      particle.wobbleStrength = .25 + Math.random() * 1.1;
      particle.energetic = Math.random() < .14;
      particle.size = particle.energetic ? 1.75 + Math.random() * .9 : .55 + Math.random() * .78;
      particle.phase = Math.random() * Math.PI * 2;
      particle.twinkle = .001 + Math.random() * .0032;
      particle.alpha = .86 + Math.random() * .14;
      particle.color = palette[Math.floor(Math.random() * palette.length)];
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.forEach((particle) => resetParticle(particle, true));
    };

    const drawField = (time = 0, delta = 0) => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = 'source-over';

      particles.forEach((particle) => {
        particle.age += delta;
        const turn = particle.turnRate * delta;
        const cosine = Math.cos(turn);
        const sine = Math.sin(turn);
        const velocityX = particle.velocityX * cosine - particle.velocityY * sine;
        particle.velocityY = particle.velocityX * sine + particle.velocityY * cosine;
        particle.velocityX = velocityX;
        const wobble = Math.sin(time * particle.wobble + particle.phase) * particle.wobbleStrength;
        particle.x += (particle.velocityX + wobble) * delta;
        particle.y += (particle.velocityY - wobble * .55) * delta;
        if (
          particle.age >= particle.life ||
          particle.x < -12 || particle.x > width + 12 ||
          particle.y < -12 || particle.y > height + 12
        ) {
          resetParticle(particle);
        }

        const fadeIn = Math.min(1, particle.age * 1.8);
        const fadeOut = Math.min(1, (particle.life - particle.age) * .72);
        const shimmer = Math.sin(time * particle.twinkle + particle.phase);
        const twinkle = particle.energetic ? .72 + (shimmer + 1) * .14 : .76 + (shimmer + 1) * .12;
        const alpha = particle.alpha * fadeIn * fadeOut * twinkle;
        const color = particle.energetic ? '151, 207, 235' : particle.color;
        const brightness = particle.energetic ? alpha * 1.28 : alpha * 1.16;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, ${Math.min(1, brightness)})`;
        context.fill();
      });
      context.restore();
    };

    const animate = (time) => {
      const delta = Math.min((time - lastTime) / 1000 || 0, .034);
      lastTime = time;
      drawField(time, delta);
      if (isVisible) animationFrame = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();
    if (prefersReducedMotion) {
      drawField(900, 0);
      return;
    }
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      window.cancelAnimationFrame(animationFrame);
      if (isVisible) {
        lastTime = 0;
        animationFrame = window.requestAnimationFrame(animate);
      }
    }, { rootMargin: '100px' });
    visibilityObserver.observe(canvas);
    animationFrame = window.requestAnimationFrame(animate);
  }

  function init(options = {}) {
    setupHomeNewsBoard();
    setupLabCarousel(options);
    setupResearchSequence(options);
    setupResearchSequenceMotion(options);
    setupResearchStarfield(options);
  }

  window.TeamHomepageHomeInteractions = {
    init
  };
})();
