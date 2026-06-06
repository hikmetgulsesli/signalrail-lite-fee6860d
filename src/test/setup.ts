import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

const rafHandles = new Set<number>();
const realRequestAnimationFrame = globalThis.requestAnimationFrame;
const realCancelAnimationFrame = globalThis.cancelAnimationFrame;

globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
  const handle = (realRequestAnimationFrame
    ? realRequestAnimationFrame(callback)
    : globalThis.setTimeout(() => callback(Date.now()), 16)) as number;
  rafHandles.add(handle);
  return handle;
}) as typeof requestAnimationFrame;

globalThis.cancelAnimationFrame = ((handle: number) => {
  rafHandles.delete(handle);
  if (realCancelAnimationFrame) realCancelAnimationFrame(handle);
  else globalThis.clearTimeout(handle);
}) as typeof cancelAnimationFrame;

afterEach(() => {
  cleanup();
  for (const handle of Array.from(rafHandles)) {
    globalThis.cancelAnimationFrame(handle);
  }
  rafHandles.clear();
});
