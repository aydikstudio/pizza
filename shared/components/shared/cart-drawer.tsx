'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/ui/sheet"
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/utils";
import { useCartStore } from "@/shared/store";
import React from "react";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    const [totalAmount, fetchCartItems, items] = useCartStore(state => [state.totalAmount, state.fetchCartItems, state.items]);

    React.useEffect(() => {
        fetchCartItems();
    }, [])


    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span>{items.length}</span>
                    </SheetTitle>
                </SheetHeader>


            <div className="-mx-6 mt-5 overflow-auto flex-1">
                <div className="mb-2">
                    {
                        items.map((item) => (
                            <CartDrawerItem
                            key={item.id} 
                            id={item.id} 
                            imageUrl={item.imageUrl} 
                            details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, 
                                item.pizzaSize as PizzaSize) : ''} 
                            name={item.name}
                            price={item.price} 
                            quantity={item.quentity} />
                        ))
                    }
           
                </div>
            </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Itogo
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>
                            <span className="font-bold text-lg">{totalAmount} rub</span>
                        </div>

                        <Link href="/cart">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base"
                            >
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>

                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}