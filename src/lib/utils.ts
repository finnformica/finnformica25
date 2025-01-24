import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const nextSection = document.querySelector(id);
  nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}
