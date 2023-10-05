import { getProductBySlug } from "@/lib/api/products/queries";
import { notFound } from "next/navigation";


interface ProductPageProps {
    params: { productSlug: string };
}

const page = async ({params}: ProductPageProps) => {
    const { product } = await getProductBySlug(params.productSlug)
    if(!product) notFound()
    
    return <div>{params.productSlug}</div>
}

export default page