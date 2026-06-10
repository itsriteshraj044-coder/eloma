import { cn } from '@/lib/cn';

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-0', className)}>

      {/* SVG filter — makes white pixels in the wordmark transparent */}
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden" aria-hidden="true">
        <defs>
          <filter id="logo-bg-remove" x="0" y="0" width="100%" height="100%"
            colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                     -1 -1 -1 3 0" />
          </filter>
        </defs>
      </svg>

      {/* Icon — bigger */}
      <img
        src="/FinalElomaGroupiconwhite.jpg"
        alt=""
        aria-hidden="true"
        style={{ filter: 'url(#logo-bg-remove)' }}
        className="h-14 w-14 rounded object-contain sm:h-16 sm:w-16 3xl:h-18 3xl:w-18 4xl:h-20 4xl:w-20"
      />

      {/* Wordmark — smaller */}
      <img
        src="/FinalElomaGroupLogowhite.webp"
        alt="Eloma Group"
        style={{ filter: 'url(#logo-bg-remove)' }}
        className="h-7 w-auto object-contain sm:h-8 3xl:h-9 4xl:h-10"
      />
    </span>
  );
}
