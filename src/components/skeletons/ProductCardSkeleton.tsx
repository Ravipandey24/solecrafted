import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Icons } from "../icons";
import { Skeleton } from "../ui/skeleton";


const ProductCardSkeleton = ({}) => {
  return (
    <Card>
      <CardHeader>
        <AspectRatio ratio={4 / 3}>
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
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <Skeleton className="h-4"></Skeleton>
        <Skeleton className="h-4"></Skeleton>
      </CardContent>
      <CardFooter className="p-4">
        <Skeleton className="w-full h-10"></Skeleton>
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
