import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";


const loading = () => {
  return (
    <>
      <div className="flex justify-between py-6">
        <Skeleton className="h-8">
        </Skeleton>
        <Skeleton className="w-56 h-10 rounded-sm"></Skeleton>
      </div>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 pb-6">
        {Array(8)
          .fill(0)
          .map((_, id) => (
            <ProductCardSkeleton key={id}></ProductCardSkeleton>
          ))}
      </div>
    </>
  );
};

export default loading;
