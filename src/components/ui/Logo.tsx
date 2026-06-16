import { cn } from '@/lib/cn';

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src="/Eloma Group Logo-02.png"
        alt="Eloma Group"
        width={1900}
        height={1900}
        decoding="async"
        className="h-12 w-auto object-contain sm:h-14 3xl:h-16 4xl:h-[68px]"
      />
    </span>
  );
}
