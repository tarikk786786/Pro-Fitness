import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Number((weight / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "#00D4FF" };
  if (bmi < 25) return { label: "Normal", color: "#00FF88" };
  if (bmi < 30) return { label: "Overweight", color: "#FFB800" };
  return { label: "Obese", color: "#FF0033" };
}

export function calculateBMR(
  weight: number,
  heightCm: number,
  age: number,
  gender: "male" | "female"
): number {
  // Mifflin-St Jeor Equation
  if (gender === "male") {
    return Math.round(10 * weight + 6.25 * heightCm - 5 * age + 5);
  }
  return Math.round(10 * weight + 6.25 * heightCm - 5 * age - 161);
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

export function calculateWaterIntake(weight: number, activityLevel: string): number {
  const base = weight * 0.033;
  const multipliers: Record<string, number> = {
    sedentary: 1.0,
    light: 1.1,
    moderate: 1.2,
    active: 1.3,
    very_active: 1.4,
  };
  return Number((base * (multipliers[activityLevel] || 1.2)).toFixed(1));
}

export function calculateProteinIntake(
  weight: number,
  goal: string,
  activityLevel: string
): number {
  const multipliers: Record<string, number> = {
    weight_loss: 1.6,
    muscle_gain: 2.2,
    maintenance: 1.2,
    endurance: 1.4,
    general_fitness: 1.4,
  };
  return Math.round(weight * (multipliers[goal] || 1.4));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
