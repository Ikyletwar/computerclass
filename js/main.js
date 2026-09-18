/* ============================================================
   XI TJKT 1 — Interaksi
   Preloader · Kursor · Navbar · Reveal · Magnetic · Counter
   Marquee (CSS) · Lightbox · Teks scramble
   ============================================================ */

(() => {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* —————————————————————————————
     PRELOADER
  ————————————————————————————— */
  function preloader() {
    const el = $(".preloader");
    if (!el || prefersReduced) {
      document.body.classList.add("loaded");
      return;
    }
    const counter = $(".preloader__counter");
    const fill = $(".preloader__fill");
    let pct = 0;

    const tick = () => {
      pct += Math.random() * 14 + 6;
      if (pct >= 100) pct = 100;
      if (counter) counter.textContent = String(Math.round(pct)).padStart(3, "0");
      if (fill) fill.style.width = pct + "%";
      if (pct < 100) setTimeout(tick, 60 + Math.random() * 90);
      else {
        setTimeout(() => {
          el.classList.add("is-done");
          setTimeout(() => {
            el.remove();
            document.body.classList.add("loaded");
          }, 700);
        }, 250);
      }
    };
    setTimeout(tick, 120);
  }

  /* —————————————————————————————
     KURSOR KUSTOM
  ————————————————————————————— */
  function cursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    if (!dot || !ring) return;

    document.body.classList.add("has-cursor");
    $("html")?.classList.add("has-cursor");

    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;

    addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    });

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    $$("a, button, .tile, .chip, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* —————————————————————————————
     NAVBAR
  ————————————————————————————— */
  function navbar() {
    const nav = $(".nav");
    if (!nav) return;
    let lastY = scrollY;

    addEventListener("scroll", () => {
      nav.classList.toggle("is-scrolled", scrollY > 40);
      const dir = scrollY > lastY && scrollY > 300;
      nav.classList.toggle("is-hidden", dir);
      lastY = scrollY;

      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const bar = $(".progress");
      if (bar) bar.style.width = pct + "%";
    }, { passive: true });
  }

  /* ——— Mobile menu ——— */
  function mobileMenu() {
    const toggle = $(".nav__toggle");
    const menu = $(".menu");
    if (!toggle || !menu) return;

    const open = (state) => {
      toggle.classList.toggle("is-open", state);
      menu.classList.toggle("is-open", state);
      document.body.classList.toggle("menu-open", state);
      document.body.style.overflow = state ? "hidden" : "";
      toggle.setAttribute("aria-expanded", String(state));
    };

    toggle.addEventListener("click", () =>
      open(!toggle.classList.contains("is-open"))
    );

    $$(".menu__link, .nav__brand").forEach((link) =>
      link.addEventListener("click", () => open(false))
    );
  }

  /* —————————————————————————————
     ANCHOR SCROLL (dengan offset navbar)
  ————————————————————————————— */
  function anchors() {
    const navH = $(".nav")?.offsetHeight || 0;
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + scrollY - navH - 10;
        scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
      });
    });
  }

  /* ————————————————
     REVEAL ON SCROLL
  ———————————————— */
  function reveal() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    $$("[data-reveal], .stagger").forEach((el) => {
      if (el.classList.contains("stagger")) {
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 90}ms`;
          io.observe(child);
        });
      } else {
        const d = el.dataset.delay;
        if (d) el.style.setProperty("--delay", `${d}ms`);
        io.observe(el);
      }
    });

    /* counter stat */
    $$(".stat__num[data-count]").forEach((num) => {
      const target = +num.dataset.count;
      const suffix = num.dataset.suffix || "";
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io2.disconnect();
          if (prefersReduced) {
            num.textContent = target + suffix;
            return;
          }
          const dur = 1400;
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            num.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      io2.observe(num);
    });
  }

  /* ————————————————
     NAV ACTIVE STATE
  ———————————————— */
  function activeNav() {
    const links = $$(".nav__link[href^='#']");
    if (!links.length) return;
    const sections = links
      .map((l) => $(l.getAttribute("href")))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = "#" + en.target.id;
            links.forEach((l) =>
              l.classList.toggle("is-active", l.getAttribute("href") === id)
            );
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ————————————————
     MAGNETIC BUTTON
  ———————————————— */
  function magnetic() {
    if (prefersReduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    $$(".magnetic").forEach((el) => {
      addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.28}px, ${dy * 0.34}px)`;
      });
      addEventListener("mouseout", () => {
        el.style.transform = "";
      });
    });
  }

  /* ————————————————
     TEXT SCRAMBLE
  ———————————————— */
  function scramble() {
    const chars = "01<>/{}#$@";
    function run(el) {
      const original = el.dataset.scramble;
      let frame = 0;
      const l = original.length;
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          const iv = setInterval(() => {
            frame++;
            const done = Math.floor((frame / 18) * l);
            let out = "";
            for (let i = 0; i < l; i++) {
              if (i < done) out += original[i];
              else if (original[i] === " ") out += " ";
              else out += chars[Math.floor(Math.random() * chars.length)];
            }
            el.textContent = out;
            if (frame >= 18) {
              clearInterval(iv);
              el.textContent = original;
            }
          }, 28);
        },
        { threshold: 0.3 }
      );
      io.observe(el);
    }
    $$("[data-scramble]").forEach(run);
  }

  /* ————————————————
     LIGHTBOX GALERI
  ———————————————— */
  function lightbox() {
    const tiles = $$(".tile");
    const lb = $(".lightbox");
    if (!tiles.length || !lb) return;

    const frame = $(".lightbox__frame", lb);
    const caption = $(".lightbox__caption", lb);
    const sample = tiles[0].querySelector(".tile__art svg");
    let idx = 0;

    const show = (i) => {
      idx = (i + tiles.length) % tiles.length;
      const t = tiles[idx];
      frame.innerHTML = "";
      const img = t.querySelector("img");
      if (img) {
        const im = document.createElement("img");
        im.src = img.getAttribute("src");
        im.alt = img.getAttribute("alt") || "";
        frame.appendChild(im);
      } else {
        const svg = t.querySelector(".tile__art svg");
        if (svg) frame.appendChild(svg.cloneNode(true));
      }
      caption.textContent = t.dataset.caption || "";
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    tiles.forEach((t, i) =>
      t.addEventListener("click", () => show(i))
    );
    $(".lightbox__close", lb)?.addEventListener("click", close);
    $(".lightbox__prev", lb)?.addEventListener("click", () => show(idx - 1));
    $(".lightbox__next", lb)?.addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ————————————————
     MUSIK LAtar (autoplay + loop + toast)
  ———————————————— */
  function musicPlayer() {
    const audio = $("#music");
    const dock = $("#music-toggle");
    const toast = $("#music-toast");
    const msg = $(".music-toast__msg", toast);
    if (!audio || !dock) return;

    const TITLE = "Coracao Maluqueiro";
    let hideTimer;

    const setUI = (playing) => {
      dock.classList.toggle("is-playing", playing);
      dock.setAttribute("aria-pressed", String(playing));
      toast.classList.toggle("is-paused", !playing);
    };

    const notify = (text, persist) => {
      if (msg) msg.textContent = text;
      if (!toast) return;
      toast.classList.remove("is-waiting");
      toast.classList.add("is-visible");
      clearTimeout(hideTimer);
      if (persist) return;
      hideTimer = setTimeout(() => toast.classList.remove("is-visible"), 4000);
    };

    /* toast mencolok yang tetap tampil selama musik masih senyap */
    const waitForUnmute = () => {
      if (!toast) return;
      toast.classList.add("is-waiting", "is-visible");
      clearTimeout(hideTimer);
      if (msg) msg.textContent = "Ketuk layar untuk membunyikan musik — " + TITLE;
    };

    const startPlay = async (silent) => {
      try {
        audio.muted = false;
        await audio.play();
        setUI(true);
        if (!silent) notify("Musik aktif — " + TITLE);
      } catch (e) {
        /* audible autoplay diblokir → mulai muted, nanti dibunyikan via gestur */
        audio.muted = true;
        try {
          await audio.play(); /* muted autoplay diizinkan browser */
          setUI(true);
          if (!silent) waitForUnmute();
        } catch (e2) {
          setUI(false);
        }
        unlock();
      }
    };

    const unlock = () => {
      document.addEventListener("pointerdown", unmute, { once: true });
      document.addEventListener("keydown", unmute, { once: true });
    };

    const unmute = () => {
      if (!audio.muted) return;
      audio.muted = false;
      setUI(true);
      notify("Musik aktif — " + TITLE);
    };

    dock.addEventListener("click", () => {
      if (audio.muted) { unmute(); return; }
      if (audio.paused) startPlay(false);
      else { audio.pause(); setUI(false); notify("Musik dijeda — " + TITLE); }
    });

    audio.addEventListener("play", () => setUI(true));
    audio.addEventListener("pause", () => setUI(false));
    audio.addEventListener("ended", () => notify("Mengulang — " + TITLE));

    /* autoplay: dicoba segera + setelah preloader selesai */
    const tryStart = () => { if (audio.paused) startPlay(false); };
    addEventListener("load", tryStart);
    setTimeout(tryStart, 2500);
  }

  /* ————————————————
     INIT
  ———————————————— */
  document.addEventListener("DOMContentLoaded", () => {
    preloader();
    cursor();
    navbar();
    mobileMenu();
    anchors();
    reveal();
    activeNav();
    magnetic();
    scramble();
    lightbox();
    musicPlayer();
  });
})();