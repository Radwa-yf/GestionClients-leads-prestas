import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatFrenchPrice(price) {
    let options = {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    };

    let format = new Intl.NumberFormat('fr-FR', options);
    return format.format(price).replace(/\s+€/g, '€');
}
export function truncateString(str = "", maxLength = 100) {
    if (!str) return null;

    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}


