import { ProductCard } from "~/features/products/components/product-card";

export default function ProfileProductsPage() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard
          key={index}
          productId={`productId-${index}`}
          name="name"
          description="description"
          commentCount={10}
          viewCount={10}
          likeCount={10}
          isLiked={false}
        />
      ))}
    </div>
  );
}
