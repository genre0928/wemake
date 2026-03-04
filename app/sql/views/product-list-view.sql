CREATE or REPLACE VIEW product_list_view AS
SELECT
    products.product_id,
    products.name,
    products.tags,
    products.url,
    products.description,
    products.stats,
    products.profile_id,
    products.created_at,
    products.updated_at,
    products.upvotes,
    categories.name as category
FROM products
inner join categories using (category_id);