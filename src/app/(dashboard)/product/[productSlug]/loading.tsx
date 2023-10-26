import { Icons } from "@/components/icons";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";


const loading = ({}) => {
  return (
    <div className="py-6 mx-auto space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AspectRatio ratio={4 / 4}>
          <div
            aria-label="Placeholder"
            role="img"
            aria-roledescription="placeholder"
            className="flex rounded-md h-full w-full items-center justify-center bg-secondary"
          >
            <Icons.placeholder
              className="h-9 w-9 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </AspectRatio>
        <div>
          <Card className="w-fit border-none shadow-none space-y-3">
            <CardHeader className="pt-1">
              <Skeleton className="h-8"></Skeleton>
              <Skeleton className="h-8"></Skeleton>
            </CardHeader>
            <CardContent className="w-fit">
              <div className="grid gap-1 grid-cols-3">
                {Array(9)
                  .fill(0)
                  .map((_, id) => (
                    <Skeleton key={id} className="w-24"></Skeleton>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="w-[19rem]"></Skeleton>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg uppercase">More like this</h3>
        <Separator className="my-2"></Separator>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
          {Array(4)
            .fill(0)
            .map((_, id) => (
              <ProductCardSkeleton key={id}></ProductCardSkeleton>
            ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
