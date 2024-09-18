"use client"

import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants, Variant } from "./group-variant";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import React, { useEffect } from "react";
import { IngredientItem } from "./ingredient-item";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "@/shared/lib/utils/calc-total-pizza-price";
import { getAvailablePizzaSizes } from "@/shared/lib/utils";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib/utils/get-pizza-details";

export type IProduct = Product & { items: ProductItem[]; ingredients: Ingredient[] };
interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm:React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAddCart,
    className
}) => {

   
 
    const {size, type, selectedIngredients, availableSizes, setSize, setType, addIngredient} = usePizzaOptions(items as any);

  
    const {totalPrice, textDetails} = getPizzaDetails(type, size, items as ProductItem[], ingredients, selectedIngredients);

    

   const availablePizzaSizes = getAvailablePizzaSizes(type, items as ProductItem[]);

  
   

    const handleClickAdd = () => {
        onClickAddCart?.();

    }

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name}  size="md" className="font-extrabold mb-1"/>

                <p className="text-gray-400">{textDetails}</p>
                <div className="flex flex-col gap-4 mt-5">
                <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
                <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
                </div>

                
                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">

                <div className="grid grid-cols-3 gap-3">
                    {
                        ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))
                    }
                </div>
                </div>
                
                <Button 
                onClick={handleClickAdd}
                className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзинц за {totalPrice} р
                </Button>
            </div>
        </div>
    )
}