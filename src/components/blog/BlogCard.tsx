import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fadeUp } from '@/lib/motion';
import type { BlogPost } from '@/types';

/**
 * Standard blog card — cover image with hover zoom, category chip, meta row,
 * title, excerpt and a "Read more" link to the article. Motion only touches
 * transform / opacity so it stays on the GPU compositor.
 */
export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  const to = `/blog/${post.slug}`;

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-glass',
        className,
      )}
    >
      <Link to={to} className="block overflow-hidden" aria-label={post.title}>
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-50">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.06]"
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-700 shadow-sm backdrop-blur">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-center gap-3 text-[12px] font-medium text-navy-400">
          <span>{post.date}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-navy-200" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h3 className="mt-3 text-[clamp(1.1rem,1.5vw,1.35rem)] font-normal leading-snug text-navy-900 text-balance">
          <Link to={to} className="transition-colors duration-300 hover:text-emerald-700">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-[clamp(0.9rem,1vw,1rem)] leading-[1.75] text-navy-500 text-pretty">
          {post.excerpt}
        </p>

        <Link
          to={to}
          className="group/cta mt-5 inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-navy-900 transition-colors duration-300 hover:text-emerald-600"
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
