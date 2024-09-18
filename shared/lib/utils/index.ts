import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {calcTotalPizzaPrice} from './calc-total-pizza-price';
export {getAvailablePizzaSizes} from './get-available-pizza-sizes';
export {getPizzaDetails} from './get-pizza-details';
export {getCartItemDetails} from './get-cart-item-details';
export { getCartDetails } from "./get-cart-details";
export {calcCartItemTotalPrice} from './calc-cart-item-total-price';