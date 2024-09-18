import React from "react";
import { Variant } from "../components/shared/group-variant";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib/utils";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: Variant[] ): ReturnProps => {

    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes(type, items)

    React.useEffect(() => {
        const isAvailableSize = items?.find((item) => Number(item.value) === size && !item.disabled);
        const availableSize = items?.find((item) => !item.disabled);

        if(!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]) 

    return {
        size,
        type,
        setSize,
        setType,
        availableSizes,
        selectedIngredients,
        addIngredient
    }
}