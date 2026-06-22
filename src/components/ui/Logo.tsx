import { cn } from '@/lib/cn';

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center py-1.5', className)}>
      <img
        src="/Eloma Group Trademark Logo-03.png"
        alt="Eloma Group"
        width={1024}
        height={1024}
        decoding="async"
        className="h-9 w-auto object-contain sm:h-10 3xl:h-12 4xl:h-[52px]"
      />
    </span>
  );
}
