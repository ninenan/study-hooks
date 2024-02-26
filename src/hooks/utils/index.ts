import type { TargetType, BasicTarget, neverAny } from '@/types';

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const getTarget = <T extends TargetType>(target: BasicTarget<T>) => {
  let targetElement: neverAny;

  if (!target) {
    targetElement = window;
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
};