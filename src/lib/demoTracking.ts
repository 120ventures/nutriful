import { phCapture } from "./posthog";

/** One event for everything visitors try in the demo, so it reads as one funnel step. */
export const track = (element: string, value: string) =>
  phCapture("demo_interaction", { element, value });
