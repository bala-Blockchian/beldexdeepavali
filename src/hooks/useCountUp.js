import { useEffect, useState } from "react";

export default function useCountUp(target, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(target) || target <= 0) {
      setValue(0);
      return undefined;
    }

    let raf = 0;
    let start = null;

    const step = (now) => {
      if (start === null) start = now;
      
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
