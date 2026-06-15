import { cn } from '@/lib/cn';

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src="/Eloma Group Logo-01.png"
        alt="Eloma Group"
        width={2000}
        height={780}
        decoding="async"
        className="h-9 w-auto object-contain sm:h-10 3xl:h-11 4xl:h-12"
      />
    </span>
  );
}
