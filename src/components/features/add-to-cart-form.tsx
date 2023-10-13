"use client";

import { FC, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateCartItemType,
  updateCartItemSchema,
} from "@/lib/validations/cart-vals";

interface AddToCartFormProps {
  productId: number;
}

const AddToCartForm: FC<AddToCartFormProps> = ({ productId }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateCartItemType>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (formData: UpdateCartItemType) => {
    
  };
  return (
    <Form {...form}>
      <form
        className="flex items-center space-x-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex items-center">
          <Button
            id={`${productId}-decrement`}
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-8 rounded-r-none"
            onClick={() =>
              form.setValue(
                "quantity",
                Math.max(0, form.getValues("quantity") - 1)
              )
            }
            disabled={isPending}
          >
            <MinusIcon className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className="h-10 w-14 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${productId}-increment`}
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-8 rounded-l-none"
            onClick={() =>
              form.setValue("quantity", form.getValues("quantity") + 1)
            }
            disabled={isPending}
          >
            <PlusIcon className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <Button type="submit" className="h-8" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add to cart
          <span className="sr-only">Add to cart</span>
        </Button>
      </form>
    </Form>
  );
};

export default AddToCartForm;
