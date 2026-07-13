import { useReducedMotion } from 'framer-motion'

/* Full-bleed banner section: a second corporate-hierarchy clip covers the
   entire section edge-to-edge (watermark-removed, white background). */
export function EgHierarchyBanner2() {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="eg-hbanner2" aria-label="Eloma Group structure">
      <style>{`
        .eg-hbanner2 {
          position: relative; width: 100%; overflow: hidden;
          line-height: 0; background: #ffffff;
        }
        .eg-hbanner2 video, .eg-hbanner2 img {
          display: block; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }
        .eg-hbanner2 .eg-hbanner2-media { display: block; width: 100%; aspect-ratio: 16 / 9; }
      `}</style>

      <div className="eg-hbanner2-media">
        {reduce ? (
          <img src="/corporate-hierarchy-2-poster.jpg" alt="Eloma Group corporate structure" decoding="async" />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/corporate-hierarchy-2-poster.jpg"
            disablePictureInPicture
            aria-label="Eloma Group corporate structure"
          >
            <source src="/corporate-hierarchy-2.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  )
}
