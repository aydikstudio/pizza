'use client';

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";

import React from "react";
import { Title } from "../title";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";



interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    return(
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden", className)}>
               {isPizzaForm ? (<ChoosePizzaForm items={product.items} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} />) : (
                 <ChooseProductForm  imageUrl={product.imageUrl} name={product.name} />
               )}
            </DialogContent>
        </Dialog>
    )
}