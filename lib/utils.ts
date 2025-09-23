import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge CSS classes using clsx
 * This is commonly used in shadcn/ui components for conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
