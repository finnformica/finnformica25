import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const nextSection = document.querySelector(id);
  nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function getRootStyle(cssVar: string, document: Document | null = null) {
  if (!document) {
    return;
  }

  // retrieve the text colour from root styles
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(cssVar);
}
