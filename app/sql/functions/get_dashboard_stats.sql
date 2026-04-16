CREATE OR REPLACE FUNCTION get_dashboard_stats(user_id uuid)
RETURNS TABLE (
    month text,
    views bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        to_char(events.created_at, 'YYYY-MM') as month,
        COUNT(*) as views
    FROM public.events
    JOIN public.profiles ON profiles.profile_id = user_id
    WHERE event_data->> 'nickname' = profiles.nickname
    GROUP BY month
    ORDER BY month;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_dashboard_stats('1a3257d4-b4ef-4375-af25-f2dde2c10730')