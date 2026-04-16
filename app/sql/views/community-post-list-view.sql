CREATE or REPLACE VIEW community_post_list_view AS
SELECT
    posts.post_id,
    posts.title,
    posts.created_at,
    topics.name as topic,
    profiles.name as author,
    profiles.nickname as nickname,
    profiles.avatar as avatar,
    posts.upvotes
FROM posts
INNER JOIN topics USING (topic_id)
INNER JOIN profiles USING (profile_id)
LEFT JOIN post_likes USING (post_id)
GROUP BY posts.post_id, topics.name, profiles.name, profiles.nickname, profiles.avatar;