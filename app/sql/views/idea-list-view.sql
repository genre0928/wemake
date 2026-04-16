create or replace view idea_list_view as
SELECT
    ideas.idea_id,
    ideas.title,
    ideas.description,
    ideas.views,
    ideas.created_at,
    case when ideas.claimed_at is not null then TRUE else FALSE end as is_claimed,
    count(ideas_likes.idea_id) as upvotes
FROM ideas
left join ideas_likes using (idea_id)
group by ideas.idea_id