/**
 * Tiny classname combiner — joins truthy class fragments with a space.
 * Keeps component markup readable without pulling in a dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
