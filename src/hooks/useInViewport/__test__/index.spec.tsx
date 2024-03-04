import type { NeverAny } from '@/types';
import { act, renderHook } from '@testing-library/react';
import useInViewport from '..';

describe('useInViewport test', () => {
  it('should be defined', () => {
    expect(useInViewport).toBeDefined();
  });

  let container: HTMLDivElement;
  let mockIntersectionObserver: jest.Mock<NeverAny, NeverAny>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect: () => null
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => document.body.removeChild(container));

  it('基础功能', () => {
    const { result } = renderHook(() => useInViewport(container));
    const calls = mockIntersectionObserver.mock.calls;

    const [onChange] = calls[calls.length - 1];

    act(() => {
      onChange([
        {
          container,
          isIntersecting: true,
          intersectionRatio: 0.5
        }
      ]);
    });

    const [inViewport, ratio] = result.current;
    expect(inViewport).toBeTruthy();
    expect(ratio).toBe(0.5);
  });

  it('第二个参数', () => {
    const { result } = renderHook(() =>
      useInViewport(container, { root: container })
    );
    const calls = mockIntersectionObserver.mock.calls;

    const [onChange] = calls[calls.length - 1];
    act(() => {
      onChange([
        {
          container,
          isIntersecting: true
        }
      ]);
    });

    const [inViewport] = result.current;
    expect(inViewport).toBeTruthy();
  });
});
