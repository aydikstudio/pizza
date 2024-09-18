import { Variant } from "@/shared/components/shared/group-variant";
import { pizzaSizes, PizzaType } from "@/shared/constants/pizza";
import { ProductItem } from "@prisma/client";

export const getAvailablePizzaSizes = (type: PizzaType, items?: any[]):Variant[] => {
    const filteredPizzasByType = items?.filter((item) => item.pizzaType == type);
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType?.some((pizza) => Number(pizza.size) === Number(item.value))
    }));

}