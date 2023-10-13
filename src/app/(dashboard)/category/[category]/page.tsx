import ProductCard from "@/components/cards/ProductCard";
import FilterDropdown from "@/components/features/filter-dropdown";
import { getProductByCategory } from "@/lib/api/products/queries";
import { capitalize } from "@/lib/utils";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { category: string };
}

const page = async ({ params }: CategoryPageProps) => {
  const { products } = await getProductByCategory(params.category);
  if (products.length === 0) notFound();

  return (
    <>
      <div className="flex justify-between py-6">
        <h3 className="text-xl font-semibold">{capitalize(params.category)} Shoes</h3>
        <FilterDropdown></FilterDropdown>
      </div>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 pb-6">
        {products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)}
      </div>
    </>
  );
};

export default page;
