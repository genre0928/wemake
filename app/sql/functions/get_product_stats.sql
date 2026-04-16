CREATE OR REPLACE FUNCTION get_product_stats(product_id text)
RETURNS TABLE (
    month text,
    product_views bigint,
    product_reviews bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        to_char(events.created_at, 'YYYY-MM') AS month,
        SUM(CASE WHEN event_type = 'product_view' THEN 1 ELSE 0 END) AS product_view,
        SUM(CASE WHEN event_type = 'product_visit' THEN 1 ELSE 0 END) AS product_visit
    FROM public.events
    WHERE event_data->> 'product_id' = product_id
    GROUP BY month;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_product_stats('5');