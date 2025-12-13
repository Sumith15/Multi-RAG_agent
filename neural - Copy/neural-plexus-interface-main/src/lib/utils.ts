export const ADMIN_API_URL = "http://127.0.0.2:8002";
export const USER_API_URL = "http://127.0.0.1:8000";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
