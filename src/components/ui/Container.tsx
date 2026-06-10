import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Centered, max-width content wrapper with responsive gutters. */
export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('container-px', className)}>{children}</Tag>;
}
