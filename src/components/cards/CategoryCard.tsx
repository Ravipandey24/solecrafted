import Link from "next/link";
import { FC } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { getProductCountByCategory } from "@/lib/api/products/queries";


interface CategoryCardProps {
  category: CategoryTabItem
}

const CategoryCard: FC<CategoryCardProps> = async ({category}) => {
  const { productCount } = await getProductCountByCategory(category.title)
  return (
    <Link
      key={category.title}
      href={category.href}
      className="group relative overflow-hidden rounded-md border"
    >
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 z-10 bg-zinc-950/70 transition-colors group-hover:bg-zinc-950/75" />
        <Image
          src={category.image}
          alt={`${category.title} category`}
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          priority={true}
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col">
        <div className="flex items-start justify-between space-x-4">
          <p className="text-sm text-zinc-200">{productCount} items</p>
        </div>
        <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
          {category.title}
        </h3>
      </div>
      <span className="sr-only">{category.title}</span>
    </Link>
  );
};

export default CategoryCard;
