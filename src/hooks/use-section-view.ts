import { useEffect, useRef } from "react";
import { phCapture } from "@/lib/posthog";

/**
 * Fires a one-off "section_view" event the first time a section scrolls into
 * view. Attach the returned ref to the section you want to measure - together
 * these show where visitors stop reading on the way to the pilot form.
 */
export function useSectionView<T extends HTMLElement>(section: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        phCapture("section_view", { section });
        observer.disconnect();
      },
      // A third of the section visible counts as "seen".
      { threshold: 0.33 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [section]);

  return ref;
}
