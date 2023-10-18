import CategoryCard from "@/components/cards/CategoryCard";
import ProductCard from "@/components/cards/ProductCard";
import { Separator } from "@/components/ui/separator";
import { categoryTab } from "@/config/site";
import { getProducts } from "@/lib/api/products/queries";

const page = async ({}) => {
  const { products } = await getProducts(8);
  return (
    <div className="py-4 space-y-8">
      <section>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-2">
          {categoryTab.map((category) => (
            <CategoryCard key={category.title} category={category}></CategoryCard>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg">Featured Products</h2>
        <Separator></Separator>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
