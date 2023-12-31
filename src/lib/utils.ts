import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function linkify(text: string) {
  return text.split(' ').filter(word => !['and', '&'].includes(word)).join('-').toLowerCase()
}

export function capitalize(text: string){
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}