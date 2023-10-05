import ErrorCard from "@/components/cards/ErrorCard";

const notFound = ({}) => {
  return (
    <div className="mt-16">
      <ErrorCard
        heading="Product Not Found!"
        description="Requested Product doesn't exists."
      ></ErrorCard>
    </div>
  );
};

export default notFound;