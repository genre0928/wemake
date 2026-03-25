CREATE OR REPLACE VIEW product_overview_view AS
SELECT
    product_id,
    name,
    tags,
    description,
    icon,
    url,
    stats->>'upvotes' as upvotes,
    stats->>'reviews' as reviews,
    stats->>'views' as views,
    products.created_at,
    AVG(rating) as average_rating
FROM public.products
LEFT JOIN public.reviews AS product_reviews USING (product_id)
GROUP BY product_id;