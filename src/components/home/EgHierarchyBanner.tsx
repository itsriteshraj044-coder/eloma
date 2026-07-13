import { useReducedMotion } from 'framer-motion'

/* Full-bleed banner section: the corporate-hierarchy clip covers the entire
   section edge-to-edge (watermark-removed, white background). */
export function EgHierarchyBanner() {
  const reduce = useReducedMotion() ?? false

  return (
    <section className="eg-hbanner" aria-label="Eloma Group structure">
      <style>{`
        .eg-hbanner {
          position: relative; width: 100%; overflow: hidden;
          line-height: 0; background: #ffffff;
        }
        .eg-hbanner video, .eg-hbanner img {
          display: block; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }
        /* keep the whole clip visible at full width (no crop) */
        .eg-hbanner .eg-hbanner-media { display: block; width: 100%; aspect-ratio: 16 / 9; }
      `}</style>

      <div className="eg-hbanner-media">
        {reduce ? (
          <img src="/corporate-hierarchy-poster.jpg" alt="Eloma Group corporate structure" decoding="async" />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/corporate-hierarchy-poster.jpg"
            disablePictureInPicture
            aria-label="Eloma Group corporate structure"
          >
            <source src="/corporate-hierarchy.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  )
}
