import { Suspense, lazy, useCallback } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  /**
   * Override the canvas pixel ratio for a sharper render. Defaults to a small
   * bump over the device ratio (capped at 2) so the model looks crisp on
   * standard displays without ballooning the WebGL buffer.
   */
  pixelRatio?: number;
  /**
   * `false` renders every frame instead of only on demand — noticeably smoother
   * cursor/hover interaction at a small GPU cost. Leave default for static scenes.
   */
  renderOnDemand?: boolean;
  onLoad?: (app: Application) => void;
}

export function SplineScene({
  scene,
  className,
  pixelRatio,
  renderOnDemand = true,
  onLoad,
}: SplineSceneProps) {
  const handleLoad = useCallback(
    (app: Application) => {
      const target = pixelRatio ?? Math.min((window.devicePixelRatio || 1) + 0.5, 2);
      // Cap at 2 to keep the buffer (and GPU load) reasonable on retina screens.
      // `setPixelRatio` exists on the runtime Application but isn't in its public types.
      const renderer = app as Application & { setPixelRatio?: (ratio: number) => void };
      renderer.setPixelRatio?.(Math.min(target, 2));
      onLoad?.(app);
    },
    [pixelRatio, onLoad],
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        renderOnDemand={renderOnDemand}
        onLoad={handleLoad}
      />
    </Suspense>
  );
}
