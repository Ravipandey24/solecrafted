import { NewProduct } from "@/lib/db/schema/schema";
import { FC } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";


interface ProductCardProps {
  product: Pick<
    NewProduct,
    "id" | "name" | "price" | "imageUrl" | "category" | "inventory" | "slug"
  >;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <Link href={"/product/" + product.slug}>
          <AspectRatio ratio={4 / 3}>
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
              ></Image>
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </Link>
      </CardHeader>
      <span className="sr-only">{product.name}</span>
      <CardContent className="grid gap-2.5 p-4">
        <Link href={"/product/" + product.slug}>
          <CardTitle className="line-clamp-1 hover:underline">{product.name}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">
          {product.price}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
