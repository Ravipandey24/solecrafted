import { Icons } from "@/components/icons"
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"


const loading = ({}) => {
  return <div className="py-4 space-y-8">
  <section>
    <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-2">
      {Array(4).fill(0).map((_, id) => (
        <AspectRatio ratio={16 / 9} key={id}>
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
      ))}
    </div>
  </section>
  <section>
    <h2 className="text-lg">Featured Products</h2>
    <Separator></Separator>
    <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-2">
      {Array(8).fill(0).map((_, id) => (
        <ProductCardSkeleton key={id}></ProductCardSkeleton>
      ))}
    </div>
  </section>
</div>
}

export default loading