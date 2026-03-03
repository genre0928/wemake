-- Seed categories
INSERT INTO categories (name, description, created_at, updated_at)
VALUES 
  ('SaaS', 'Software as a Service products', NOW(), NOW()),
  ('AI/ML', 'Artificial Intelligence and Machine Learning', NOW(), NOW()),
  ('Developer Tools', 'Tools for developers', NOW(), NOW()),
  ('Design Tools', 'Tools for designers', NOW(), NOW()),
  ('Marketing Tools', 'Tools for marketers', NOW(), NOW());

-- Seed products
INSERT INTO products (name, tags, icon, url, description, profile_id, category_id, created_at, updated_at)
VALUES
  ('DevTool Pro', array['developer', 'tool'], 'https://devtool.pro/icon.png', 'https://devtool.pro', 'The ultimate developer toolkit', '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 3, NOW(), NOW()),
  ('DesignMaster', array['designer', 'tool'], 'https://designmaster.app/icon.png', 'https://designmaster.app', 'Design like a pro', '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 4, NOW(), NOW()),
  ('MarketGenius', array['marketing', 'tool'], 'https://marketgenius.io/icon.png', 'https://marketgenius.io', 'Smart marketing automation', '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 5, NOW(), NOW()),
  ('CodeBuddy', array['developer', 'tool'], 'https://codebuddy.dev/icon.png', 'https://codebuddy.dev', 'Your coding companion', '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 3, NOW(), NOW()),
  ('DataViz', array['data', 'tool'], 'https://dataviz.app/icon.png', 'https://dataviz.app', 'Beautiful data visualization', '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 2, NOW(), NOW());

-- Seed product upvotes (bridge table)
INSERT INTO product_likes (product_id, profile_id)
VALUES (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7');

-- Seed reviews
INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at)
VALUES
  (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 5, 'Excellent developer tool!', NOW(), NOW()),
  (2, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 4, 'Great design features', NOW(), NOW()),
  (3, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 5, 'Amazing marketing automation', NOW(), NOW()),
  (4, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 4, 'Very helpful coding assistant', NOW(), NOW()),
  (5, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 5, 'Powerful visualization tool', NOW(), NOW());

-- Seed topics
INSERT INTO topics (name, slug, created_at)
VALUES
  ('Development', 'development', NOW()),
  ('Design', 'design', NOW()),
  ('Marketing', 'marketing', NOW()),
  ('Startups', 'startups', NOW()),
  ('AI', 'ai', NOW());

-- Seed posts
INSERT INTO posts (title, content, created_at, updated_at, topic_id, profile_id, )
VALUES
  ('Getting Started with DevTool Pro', 'A comprehensive guide to DevTool Pro...', NOW(), NOW(), 1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7'),
  ('Design Tips and Tricks', 'Essential design principles...', NOW(), NOW(), 2, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7'),
  ('Marketing Automation Best Practices', 'How to automate your marketing...', NOW(), NOW(), 3, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7'),
  ('Launching Your First Product', 'Steps to a successful product launch...', NOW(), NOW(), 4, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7'),
  ('AI in Modern Development', 'How AI is changing development...', NOW(), NOW(), 5, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7');

-- Seed post upvotes (bridge table)
INSERT INTO post_likes (post_id, profile_id)
VALUES (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7');

-- Seed post replies
INSERT INTO post_replies (post_id, profile_id, content, created_at, updated_at)
VALUES
  (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'Great post about DevTool Pro!', NOW(), NOW()),
  (2, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'These design tips are very helpful', NOW(), NOW()),
  (3, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'Marketing automation is crucial', NOW(), NOW()),
  (4, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'Launch strategy is on point', NOW(), NOW()),
  (5, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'AI is indeed transforming development', NOW(), NOW());

-- Seed gpt ideas
INSERT INTO gpt_ideas (title, description,views, created_at)
VALUES
  ('AI-powered code review assistant', 'AI-powered code review assistant', 0, NOW()),
  ('Design system generator', 'Design system generator', 0, NOW()),
  ('Marketing campaign optimizer', 'Marketing campaign optimizer', 0, NOW()),
  ('Developer productivity tracker', 'Developer productivity tracker', 0, NOW()),
  ('Automated documentation tool', 'Automated documentation tool', 0, NOW());

-- Seed gpt ideas likes (bridge table)
INSERT INTO ideas_likes (idea_id, profile_id)
VALUES (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7');

-- Seed team
INSERT INTO teams (name, team_stage, size, position, description, created_at, updated_at)
VALUES
  ('DevTool Pro', 'mvp', 30, 'Developer, Designer, Marketing', 'Developer productivity suite', NOW(), NOW()),
  ('DesignMaster', 'prototype', 50, 'Designer, Developer', 'Design automation platform', NOW(), NOW()),
  ('MarketGenius', 'product', 25, 'Marketing, Sales, Developer, Designer', 'Marketing analytics platform', NOW(), NOW()),
  ('CodeBuddy', 'idea', 50, 'Developer, Product Manager', 'AI coding assistant', NOW(), NOW()),
  ('DataViz', 'mvp', 33, 'Data Scientist, Developer, Designer', 'Data visualization tool', NOW(), NOW());

-- Seed message rooms
INSERT INTO message_rooms (created_at)
VALUES (NOW());

-- Seed message room members (bridge table)
INSERT INTO message_room_members (message_room_id, profile_id, created_at)
VALUES (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', NOW());

-- -- Seed messages
-- INSERT INTO messages (message_room_id, sender_id, content, created_at)
-- VALUES
--   (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'Hello! Interested in collaboration', NOW()),
--   (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'Let''s discuss the project details', NOW()),
--   (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'What''s your availability?', NOW()),
--   (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'I can start next week', NOW()),
--   (1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'Great, looking forward to working together', NOW());

-- Seed notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type, created_at)
VALUES
  ('28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 1, NULL, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'review', NOW()),
  ('28eee8db-116d-4cd5-bbfd-a8ceb92091a7', NULL, 1, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'reply', NOW()),
  ('28eee8db-116d-4cd5-bbfd-a8ceb92091a7', NULL, NULL, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'follow', NOW()),
  ('28eee8db-116d-4cd5-bbfd-a8ceb92091a7', NULL, 2, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'mention', NOW()),
  ('28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 2, NULL, '28eee8db-116d-4cd5-bbfd-a8ceb92091a7', 'review', NOW());





  -- Seed jobs
INSERT INTO jobs (
    position,
    overview,
    responsibilities,
    qualifications,
    preferred_qualifications,
    skills,
    company_name,
    company_logo,
    company_location,
    company_website,
    job_type,
    work_type,
    salary,
    created_at,
    updated_at
)
VALUES
    (
        'Senior Frontend Developer',
        'Join our team to build modern web applications using React and TypeScript',
        'Lead frontend development, mentor junior developers, architect solutions',
        'Min 5 years experience with React, Strong TypeScript skills',
        'Experience with Next.js, GraphQL',
        'React, TypeScript, Next.js, TailwindCSS',
        'TechCorp Inc',
        'https://techcorp.com/logo.png',
        'Seoul, South Korea',
        'https://techcorp.com',
        'full-time',
        'remote',
        '2000-3000',
        NOW(),
        NOW()
    ),
    (
        'UI/UX Designer',
        'Create beautiful and intuitive user interfaces for our products',
        'Design user flows, create wireframes, conduct user research',
        '3+ years of product design experience, Figma expertise',
        'Experience with design systems',
        'Figma, User Research, Prototyping, Design Systems',
        'DesignLabs',
        'https://designlabs.com/logo.png',
        'Busan, South Korea',
        'https://designlabs.com',
        'full-time',
        'offline',
        '2000-3000',
        NOW(),
        NOW()
    ),
    (
        'DevOps Engineer',
        'Help us scale our cloud infrastructure and improve deployment processes',
        'Manage AWS infrastructure, implement CI/CD pipelines, monitor systems',
        'Strong AWS experience, Kubernetes expertise, Infrastructure as Code',
        'Terraform, Docker experience',
        'AWS, Kubernetes, Terraform, CI/CD',
        'CloudScale',
        'https://cloudscale.io/logo.png',
        'Remote',
        'https://cloudscale.io',
        'contract',
        'remote',
        '3000-4000',
        NOW(),
        NOW()
    ),
    (
        'Marketing Intern',
        'Learn and contribute to our digital marketing initiatives',
        'Assist with social media, content creation, and campaign analysis',
        'Marketing student or recent graduate, Social media savvy',
        'Basic analytics knowledge',
        'Social Media, Content Creation, Analytics',
        'GrowthHub',
        'https://growthhub.com/logo.png',
        'Seoul, South Korea',
        'https://growthhub.com',
        'internship',
        'offline',
        '1000',
        NOW(),
        NOW()
    ),
    (
        'Freelance Content Writer',
        'Create engaging technical content for our developer blog',
        'Write technical tutorials, documentation, and blog posts',
        'Strong writing skills, Technical background, SEO knowledge',
        'Developer experience or technical degree',
        'Technical Writing, SEO, Developer Documentation',
        'DevMedia',
        'https://devmedia.com/logo.png',
        'Remote',
        'https://devmedia.com',
        'freelance',
        'remote',
        '1000-2000',
        NOW(),
        NOW()
    );
