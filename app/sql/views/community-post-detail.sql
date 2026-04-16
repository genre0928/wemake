CREATE OR REPLACE VIEW community_post_detail_view AS
SELECT
    posts.post_id,
    posts.title,
    posts.content,
    posts.upvotes,
    posts.created_at,
    topics.topic_id,
    topics.name as topic_name,
    topics.slug as topic_slug,
    COUNT(post_replies.reply_id) as replies,
    profiles.name as author_name,
    profiles.nickname as author_nickname,
    profiles.avatar as author_avatar,
    profiles.position as author_position,
    profiles.created_at as author_created_at,
    (SELECT COUNT(*) FROM products where products.profile_id = profiles.profile_id) as products
FROM posts
INNER JOIN topics USING (topic_id)
LEFT JOIN post_replies USING (post_id)
INNER JOIN profiles ON (posts.profile_id=profiles.profile_id)
GROUP BY posts.post_id, topics.topic_id, topics.name, topics.slug, profiles.name, profiles.nickname, profiles.avatar, profiles.position, profiles.created_at, products.profile_id;