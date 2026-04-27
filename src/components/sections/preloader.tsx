import { useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePreloader } from "@/context/preloader-context";

import LoadingGlitch from "../loading-glitch";
import PixelTransition from "../pixel-transition";

// Critical paint assets. Anything else streams in after the preloader exits.
const CRITICAL_IMAGES = [
  "/images/finnformica-logo.png",
  "/images/goggles.png",
  "/images/retro-computer.png",
  "/images/cloud-infra.png",
  "/projects/blockchange-img.png",
  "/projects/financial-dashboard-img.png",
  "/projects/gradguru.png",
  "/projects/lunaocean-img.png",
  "/projects/matrix-effect.png",
];

// Floor on how long the counter is shown — fast machines otherwise snap 0→100
// in a single frame.
const MIN_DURATION_MS = 1200;

// Safety net: never trap the user behind the preloader, even if a critical
// asset hangs (network blip, 404 served as 200 with no body, etc).
const MAX_DURATION_MS = 7000;

// Brief presentation hold after the counter hits 100 before the cover starts.
// Lets the "100" register for the user.
const HOLD_BEFORE_COVER_MS = 250;

// Phase state machine. Each phase transitions on an explicit event (counter
// reaching 100, motion onAnimationComplete, computed cover/reveal completion)
// rather than a fixed setTimeout. Order is therefore a property of the system,
// not of timer constants tuned in lockstep with motion durations.
type Phase =
  | "counting"
  | "covering"
  | "glitch-exit"
  | "revealing"
  | "done";

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // never block the preloader on a 404
    img.src = src;
  });

const Preloader = () => {
  const { setReady } = usePreloader();

  const count = useMotionValue(0);
  const progressRef = useRef(0);

  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>("counting");

  // Body scroll lock as a class. Tied to isLoading deps so the cleanup runs
  // when isLoading flips false — even though the component itself stays mounted
  // (it returns null) and its top-level effects don't unmount.
  useEffect(() => {
    if (!isLoading) return;
    document.body.classList.add("preloader-active");
    return () => {
      document.body.classList.remove("preloader-active");
    };
  }, [isLoading]);

  // Tick progressRef as real readiness signals resolve.
  useEffect(() => {
    let cancelled = false;
    const total = CRITICAL_IMAGES.length + 1; // +1 for fonts.ready
    const step = 100 / total;

    const bump = () => {
      if (cancelled) return;
      progressRef.current = Math.min(100, progressRef.current + step);
    };

    if ("fonts" in document) {
      document.fonts.ready.then(bump);
    } else {
      bump();
    }

    Promise.all(CRITICAL_IMAGES.map((src) => preloadImage(src).then(bump))).then(
      () => {
        const finalize = () => {
          if (!cancelled) progressRef.current = 100;
        };
        if (document.readyState === "complete") finalize();
        else window.addEventListener("load", finalize, { once: true });
      },
    );

    // Hard ceiling — if any of the above never resolves, force completion.
    const safety = setTimeout(() => {
      if (!cancelled) progressRef.current = 100;
    }, MAX_DURATION_MS);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, []);

  // Animate the displayed counter toward min(realProgress, timeFloor).
  // Time-floor enforces MIN_DURATION_MS so the counter never snaps.
  // When it lands at 100, transition the phase to "covering" (after a brief hold).
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      const elapsed = performance.now() - start;
      const timeFloor = Math.min(100, (elapsed / MIN_DURATION_MS) * 100);
      const target = Math.min(progressRef.current, timeFloor);
      const current = count.get();
      const next = current + (target - current) * 0.18;
      count.set(next);

      if (next >= 99.5 && progressRef.current >= 100 && timeFloor >= 100) {
        count.set(100);
        // Brief presentation hold so the user actually sees "100".
        holdTimer = setTimeout(() => setPhase("covering"), HOLD_BEFORE_COVER_MS);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [count]);

  // Phase: covering → glitch-exit when pixels finish covering.
  const handleCoverComplete = useCallback(() => {
    setPhase((p) => (p === "covering" ? "glitch-exit" : p));
  }, []);

  // Phase: glitch-exit → revealing when LoadingGlitch's slide-out finishes.
  const handleGlitchExited = useCallback(() => {
    setPhase((p) => (p === "glitch-exit" ? "revealing" : p));
  }, []);

  // Phase: revealing → done when pixels finish revealing.
  const handleRevealComplete = useCallback(() => {
    setPhase((p) => (p === "revealing" ? "done" : p));
  }, []);

  // Hand-off: when the state machine reaches "done", unmount and signal the
  // page to start its entrance animations. Pixels are fully cleared by now,
  // so the hero animates in against a clean canvas.
  useEffect(() => {
    if (phase !== "done") return;
    setIsLoading(false);
    setReady();
  }, [phase, setReady]);

  if (!isLoading) return null;

  // Glitch is visible until the slide-out exit fires. The exit is triggered
  // by `isActive=false` flipping it out of AnimatePresence; that happens in
  // the "glitch-exit" phase.
  const isGlitchActive = phase === "counting" || phase === "covering";
  // Pixels are active (covering) from when the cover begins through the
  // glitch-exit phase, then flip to false (reveal) once the glitch is gone.
  const isPixelActive = phase === "covering" || phase === "glitch-exit";

  return (
    <>
      <LoadingGlitch
        isActive={isGlitchActive}
        count={count}
        onExited={handleGlitchExited}
      />
      <PixelTransition
        isLoading={isLoading}
        isActive={isPixelActive}
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />
    </>
  );
};

export default Preloader;
