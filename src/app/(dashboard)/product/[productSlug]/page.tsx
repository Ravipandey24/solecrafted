import ProductCard from "@/components/cards/ProductCard";
import AddToCartButton from "@/components/features/add-to-cart-button";
import ShoeSizeTabs from "@/components/features/shoe-size-tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getSimilarProducts } from "@/lib/api/products/queries";
import { ShoeSizeType } from "@/types/db";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { productSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: ProductPageProps) => {
  const { product } = await getProductBySlug(params.productSlug);
  if (!product) notFound();
  const { products: similarProducts } = await getSimilarProducts(product.id)
  const selectedSize = {
    metric: searchParams.metric,
    size: Number(searchParams.size)
  } as ShoeSizeType;


  return (
    <div className="py-6 mx-auto space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AspectRatio ratio={4 / 4}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            loading="lazy"
          ></Image>
        </AspectRatio>
        <div>
          <Card className="w-fit border-none shadow-none space-y-3">
            <CardHeader className="pt-1">
              <h3 className="text-lg uppercase">{product.name}</h3>
              <span className="text-muted-foreground">$ {product.price}</span>
            </CardHeader>
            <CardContent className="w-fit">
              <ShoeSizeTabs productId={product.id} selectedSize={selectedSize}></ShoeSizeTabs>
            </CardContent>
            <CardFooter>
                <AddToCartButton selectedSize={selectedSize} productId={product.id}></AddToCartButton>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg uppercase">More like this</h3>
        <Separator className="my-2"></Separator>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
          {similarProducts.map(product => <ProductCard key={product.id} product={product}></ProductCard>)}
        </div>
      </div>
    </div>
  );
};

export default page;
