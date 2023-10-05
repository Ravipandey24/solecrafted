import ErrorCard from "@/components/cards/ErrorCard";

const notFound = ({}) => {
  return (
    <div className="mt-16">
      <ErrorCard
        heading="No Products Found!"
        description="There are not products for such category."
      ></ErrorCard>
    </div>
  );
};

export default notFound;
