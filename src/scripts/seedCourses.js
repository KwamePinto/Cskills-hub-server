import 'dotenv/config';
import mongoose from 'mongoose';
import dns from 'dns';
import Course from '../models/Course.js';
import Chapter from '../models/Chapter.js';
import Lesson from '../models/Lesson.js';
import Quiz from '../models/Quiz.js';
import Admin from '../models/Admin.js';

const YT  = id => `https://www.youtube.com/embed/${id}`;
const THB = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const PIC = s  => `https://picsum.photos/seed/${s}/800/450`;

const COURSES = [
  // ─── 1 ───────────────────────────────────────────────────────────────────
  {
    title: 'Digital Marketing Fundamentals',
    description: 'Master the core pillars of digital marketing — SEO, social media, email, and paid ads — and build a complete online marketing strategy from scratch.',
    thumbnail: '/seed-images/digital-marketing.jpg',
    category: 'Digital Marketing',
    difficulty: 'beginner',
    tags: ['digital marketing', 'online marketing', 'strategy', 'beginners'],
    overview: 'This course covers every major channel of digital marketing. You will understand how search engines, social platforms, email campaigns, and paid advertising work together to drive business growth.',
    estimatedDuration: 300,
    chapters: [
      {
        title: 'Introduction to Digital Marketing',
        description: 'Understand what digital marketing is and why it matters.',
        items: [
          {
            type: 'lesson',
            title: 'What is Digital Marketing?',
            content: 'Digital marketing uses online channels to connect with customers. Unlike traditional marketing, it is measurable, targeted, and cost-effective. This lesson covers the digital marketing ecosystem and how each channel fits together.',
            estimatedDuration: 15,
            media: [{ type: 'video-embed', url: YT('XDpwDwcXGoU'), caption: 'Digital Marketing Tutorial for Beginners' }],
          },
          {
            type: 'lesson',
            title: 'The Digital Marketing Funnel',
            content: 'Learn how prospects move from awareness to purchase. The AIDA funnel (Awareness, Interest, Desire, Action) is the backbone of every campaign you will ever run.',
            estimatedDuration: 12,
            media: [{ type: 'image', url: THB('XDpwDwcXGoU'), caption: 'The marketing funnel visualised' }, { type: 'image', url: PIC('marketingfunnel'), caption: 'AIDA framework diagram' }],
          },
          {
            type: 'quiz',
            title: 'Introduction Quiz',
            description: 'Test your understanding of digital marketing basics.',
            questions: [
              { questionText: 'Which of the following best describes digital marketing?', questionType: 'multiple-choice', options: [{ text: 'Marketing done through TV and radio', isCorrect: false }, { text: 'Using online channels to promote products and services', isCorrect: true }, { text: 'Printing flyers and distributing them', isCorrect: false }, { text: 'Cold calling potential customers', isCorrect: false }], points: 1, explanation: 'Digital marketing uses internet-based channels.' },
              { questionText: 'What does AIDA stand for?', questionType: 'multiple-choice', options: [{ text: 'Attract, Inform, Direct, Acquire', isCorrect: false }, { text: 'Awareness, Interest, Desire, Action', isCorrect: true }, { text: 'Advertise, Influence, Drive, Analyse', isCorrect: false }, { text: 'Activate, Integrate, Deploy, Achieve', isCorrect: false }], points: 1, explanation: 'AIDA is the classic marketing funnel model.' },
              { questionText: 'Which metric measures the percentage of visitors who complete a desired action?', questionType: 'multiple-choice', options: [{ text: 'Bounce rate', isCorrect: false }, { text: 'Click-through rate', isCorrect: false }, { text: 'Conversion rate', isCorrect: true }, { text: 'Impressions', isCorrect: false }], points: 1, explanation: 'Conversion rate = conversions / total visitors × 100.' },
            ],
          },
        ],
      },
      {
        title: 'Core Digital Marketing Channels',
        description: 'Explore SEO, social media, email, and paid advertising.',
        items: [
          {
            type: 'lesson',
            title: 'SEO, Social & Email Overview',
            content: 'Each channel has a distinct role. SEO attracts organic search traffic, social media builds community and awareness, and email nurtures leads toward purchase. Learn when and how to use each one.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('DVGTCATj7F8'), caption: '7 Free Digital Marketing Courses Overview' }, { type: 'image', url: PIC('channelsmix'), caption: 'Digital channel mix comparison' }],
          },
          {
            type: 'lesson',
            title: 'Paid Advertising Basics',
            content: 'Pay-per-click (PPC) ads let you place your message directly in front of people searching for what you offer. We cover Google Ads, Meta Ads, and how to set a budget that works.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('paidads'), caption: 'PPC advertising ecosystem' }],
          },
          {
            type: 'quiz',
            title: 'Channels Knowledge Check',
            description: 'Check your channel knowledge.',
            questions: [
              { questionText: 'Which channel drives organic (unpaid) traffic from search engines?', questionType: 'multiple-choice', options: [{ text: 'Email marketing', isCorrect: false }, { text: 'SEO', isCorrect: true }, { text: 'Display advertising', isCorrect: false }, { text: 'Influencer marketing', isCorrect: false }], points: 1, explanation: 'SEO optimises pages to rank in search results without paying per click.' },
              { questionText: 'What does PPC stand for?', questionType: 'multiple-choice', options: [{ text: 'Page Per Click', isCorrect: false }, { text: 'Pay Per Conversion', isCorrect: false }, { text: 'Pay Per Click', isCorrect: true }, { text: 'Promoted Page Content', isCorrect: false }], points: 1, explanation: 'PPC advertisers pay a fee each time their ad is clicked.' },
              { questionText: 'Which channel typically has the highest ROI for direct sales?', questionType: 'multiple-choice', options: [{ text: 'Billboard advertising', isCorrect: false }, { text: 'Email marketing', isCorrect: true }, { text: 'Podcast sponsorships', isCorrect: false }, { text: 'Print media', isCorrect: false }], points: 1, explanation: 'Email marketing consistently delivers the highest ROI, averaging $42 for every $1 spent.' },
            ],
          },
        ],
      },
      {
        title: 'Building Your Digital Marketing Strategy',
        description: 'Create a cohesive strategy and measure what matters.',
        items: [
          {
            type: 'lesson',
            title: 'Setting Goals & KPIs',
            content: 'A strategy without measurable goals is just a wish list. Learn how to set SMART goals, choose the right KPIs for each channel, and build a simple marketing dashboard.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('fVp-27hg9mQ'), caption: 'Digital Marketing for Beginners — Getting Started Free' }, { type: 'image', url: PIC('smartgoals'), caption: 'SMART goals framework' }],
          },
          {
            type: 'lesson',
            title: 'Your First 90-Day Marketing Plan',
            content: 'Put everything together into a practical 90-day plan. We cover content calendars, budget allocation across channels, and how to iterate based on data.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('marketingplan90'), caption: '90-day digital marketing roadmap' }],
          },
          {
            type: 'quiz',
            title: 'Strategy Final Quiz',
            description: 'Validate your strategy-building skills.',
            questions: [
              { questionText: 'What does SMART stand for in goal setting?', questionType: 'multiple-choice', options: [{ text: 'Simple, Measurable, Achievable, Realistic, Timely', isCorrect: false }, { text: 'Specific, Measurable, Achievable, Relevant, Time-bound', isCorrect: true }, { text: 'Strategic, Meaningful, Actionable, Results-oriented, Trackable', isCorrect: false }, { text: 'Scalable, Manageable, Automated, Realistic, Tested', isCorrect: false }], points: 1, explanation: 'SMART = Specific, Measurable, Achievable, Relevant, Time-bound.' },
              { questionText: 'What is a KPI?', questionType: 'multiple-choice', options: [{ text: 'Key Pricing Indicator', isCorrect: false }, { text: 'Known Performance Index', isCorrect: false }, { text: 'Key Performance Indicator', isCorrect: true }, { text: 'Keyword Performance Integration', isCorrect: false }], points: 1, explanation: 'KPIs are quantifiable measures used to evaluate marketing success.' },
              { questionText: 'How often should you review and adjust a new digital marketing campaign?', questionType: 'multiple-choice', options: [{ text: 'Once a year', isCorrect: false }, { text: 'Never — set it and forget it', isCorrect: false }, { text: 'Weekly or bi-weekly initially', isCorrect: true }, { text: 'Only when results are bad', isCorrect: false }], points: 1, explanation: 'New campaigns need frequent review to catch budget waste early.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 2 ───────────────────────────────────────────────────────────────────
  {
    title: 'Advanced SEO Strategies',
    description: 'Go beyond the basics. Master technical SEO, content optimisation, link building, and Core Web Vitals to dominate search rankings.',
    thumbnail: '/seed-images/seo.jpg',
    category: 'SEO',
    difficulty: 'intermediate',
    tags: ['seo', 'search engine optimisation', 'google', 'backlinks', 'technical seo'],
    overview: 'This course takes you from SEO beginner to confident practitioner. You will audit real sites, build high-quality backlinks, and implement technical fixes that move the needle.',
    estimatedDuration: 360,
    chapters: [
      {
        title: 'SEO Fundamentals',
        description: 'How search engines work and what they reward.',
        items: [
          {
            type: 'lesson',
            title: 'How Google Ranks Pages',
            content: 'Google uses over 200 ranking signals including relevance, authority, and page experience. This lesson breaks down how crawling, indexing, and ranking work together — and what you can control.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('xsVTqzratPs'), caption: 'Complete SEO Course — Learn to Rank #1 in Google' }],
          },
          {
            type: 'lesson',
            title: 'Keyword Research Mastery',
            content: 'The right keywords are the foundation of SEO success. We cover search intent, long-tail vs short-tail keywords, keyword difficulty, and how to use Ahrefs, SEMrush, and free tools.',
            estimatedDuration: 22,
            media: [{ type: 'image', url: THB('xsVTqzratPs'), caption: 'Keyword research workflow' }, { type: 'image', url: PIC('keywordresearch'), caption: 'Search intent classification matrix' }],
          },
          {
            type: 'quiz',
            title: 'SEO Fundamentals Quiz',
            description: 'Test your foundational SEO knowledge.',
            questions: [
              { questionText: 'What is "search intent"?', questionType: 'multiple-choice', options: [{ text: 'The number of times a keyword is searched per month', isCorrect: false }, { text: 'The reason behind a user\'s search query', isCorrect: true }, { text: 'The difficulty of ranking for a keyword', isCorrect: false }, { text: 'The average CPC for a keyword', isCorrect: false }], points: 1, explanation: 'Search intent is the underlying goal a user has when typing a query.' },
              { questionText: 'Which type of keyword typically has lower competition and higher conversion rates?', questionType: 'multiple-choice', options: [{ text: 'Head keywords (1–2 words)', isCorrect: false }, { text: 'Brand keywords', isCorrect: false }, { text: 'Long-tail keywords (3+ words)', isCorrect: true }, { text: 'Negative keywords', isCorrect: false }], points: 1, explanation: 'Long-tail keywords are more specific, meaning searchers are further along the buying journey.' },
              { questionText: 'What does Google\'s Googlebot do?', questionType: 'multiple-choice', options: [{ text: 'Runs ads on your behalf', isCorrect: false }, { text: 'Crawls and indexes web pages', isCorrect: true }, { text: 'Monitors competitor sites', isCorrect: false }, { text: 'Blocks spam traffic', isCorrect: false }], points: 1, explanation: 'Googlebot crawls the web to discover and index pages for Google\'s search results.' },
            ],
          },
        ],
      },
      {
        title: 'On-Page & Technical SEO',
        description: 'Optimise every element Google reads on your pages.',
        items: [
          {
            type: 'lesson',
            title: 'On-Page Optimisation',
            content: 'Title tags, meta descriptions, H1–H6 headings, internal linking, image alt text, and schema markup all influence rankings. Learn the exact optimisation checklist professionals use.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('JJfjQh1gIn0'), caption: 'SEO Full Course 2024 — On-Page Deep Dive' }, { type: 'image', url: PIC('onpageseo'), caption: 'On-page SEO element map' }],
          },
          {
            type: 'lesson',
            title: 'Technical SEO & Core Web Vitals',
            content: 'Site speed, mobile-friendliness, HTTPS, crawl budget, XML sitemaps, and Core Web Vitals (LCP, FID, CLS) directly affect rankings. This lesson walks through a full technical audit.',
            estimatedDuration: 25,
            media: [{ type: 'image', url: PIC('technicalSEO'), caption: 'Core Web Vitals scorecard' }],
          },
          {
            type: 'quiz',
            title: 'On-Page & Technical Quiz',
            description: 'Check your on-page and technical SEO understanding.',
            questions: [
              { questionText: 'What is the recommended length for a meta title tag?', questionType: 'multiple-choice', options: [{ text: 'Under 30 characters', isCorrect: false }, { text: '50–60 characters', isCorrect: true }, { text: '100–120 characters', isCorrect: false }, { text: 'There is no recommended length', isCorrect: false }], points: 1, explanation: 'Google typically displays the first 50–60 characters of a title tag.' },
              { questionText: 'Which Core Web Vital measures visual stability?', questionType: 'multiple-choice', options: [{ text: 'LCP (Largest Contentful Paint)', isCorrect: false }, { text: 'FID (First Input Delay)', isCorrect: false }, { text: 'CLS (Cumulative Layout Shift)', isCorrect: true }, { text: 'TTFB (Time to First Byte)', isCorrect: false }], points: 1, explanation: 'CLS measures unexpected layout shifts — a page element moving after load.' },
              { questionText: 'What does an XML sitemap do?', questionType: 'multiple-choice', options: [{ text: 'Shows visitors a map of the website', isCorrect: false }, { text: 'Helps search engines discover and index your pages', isCorrect: true }, { text: 'Blocks certain pages from being crawled', isCorrect: false }, { text: 'Speeds up page loading time', isCorrect: false }], points: 1, explanation: 'An XML sitemap lists your pages so search engines can crawl them efficiently.' },
            ],
          },
        ],
      },
      {
        title: 'Link Building & Authority',
        description: 'Build the backlink profile that pushes you to page one.',
        items: [
          {
            type: 'lesson',
            title: 'Why Backlinks Still Matter',
            content: 'Links from authoritative domains are still one of the strongest ranking signals Google has. This lesson explains Domain Authority, PageRank, and which links are worth pursuing.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('RFlpwKQ0bEs'), caption: 'Technical SEO Best Practices — Ahrefs' }],
          },
          {
            type: 'lesson',
            title: 'White-Hat Link Building Techniques',
            content: 'Guest posting, broken link building, digital PR, HARO, and skyscraper technique are the gold-standard methods. Learn how to execute each without risking a Google penalty.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('linkbuilding'), caption: 'Link building outreach process' }],
          },
          {
            type: 'quiz',
            title: 'Link Building Quiz',
            description: 'Demonstrate your link-building knowledge.',
            questions: [
              { questionText: 'What is a "backlink"?', questionType: 'multiple-choice', options: [{ text: 'An internal link from one page to another on the same site', isCorrect: false }, { text: 'A link from another website pointing to your website', isCorrect: true }, { text: 'A broken link that returns a 404 error', isCorrect: false }, { text: 'A paid advertisement link', isCorrect: false }], points: 1, explanation: 'Backlinks are inbound links from external domains — a core Google ranking signal.' },
              { questionText: 'Which of the following is a white-hat link-building strategy?', questionType: 'multiple-choice', options: [{ text: 'Buying links in bulk from link farms', isCorrect: false }, { text: 'Cloaking pages to show different content to Google', isCorrect: false }, { text: 'Guest posting on relevant, authoritative sites', isCorrect: true }, { text: 'Using automated tools to create thousands of directory links', isCorrect: false }], points: 1, explanation: 'Guest posting earns links naturally through valuable contributed content.' },
              { questionText: 'What is the Skyscraper Technique?', questionType: 'multiple-choice', options: [{ text: 'Building links by targeting the tallest-authority domains only', isCorrect: false }, { text: 'Creating better content than existing top-ranking articles and promoting it to earn links', isCorrect: true }, { text: 'Stacking multiple redirects to boost page authority', isCorrect: false }, { text: 'Purchasing expired domains for their link equity', isCorrect: false }], points: 1, explanation: 'Brian Dean popularised the Skyscraper Technique: find top content, make it better, then outreach.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 3 ───────────────────────────────────────────────────────────────────
  {
    title: 'Social Media Marketing Mastery',
    description: 'Build a powerful brand presence on Instagram, TikTok, LinkedIn, and Facebook with proven content and growth strategies.',
    thumbnail: '/seed-images/social-media.jpg',
    category: 'Social Media Marketing',
    difficulty: 'beginner',
    tags: ['social media', 'instagram', 'tiktok', 'linkedin', 'facebook', 'content creation'],
    overview: 'From choosing the right platforms to building an engaged audience, this course gives you a complete social media marketing system used by top brands and creators.',
    estimatedDuration: 280,
    chapters: [
      {
        title: 'The Social Media Landscape',
        description: 'Understand each platform and where your audience lives.',
        items: [
          {
            type: 'lesson',
            title: 'Choosing the Right Platforms',
            content: 'Not every business needs to be on every platform. This lesson compares Instagram, TikTok, LinkedIn, Facebook, X (Twitter), and Pinterest — and helps you pick based on your audience, content style, and goals.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('oG6HXDpsu9o'), caption: 'Social Media Marketing Full Course — Simplilearn' }],
          },
          {
            type: 'lesson',
            title: 'Setting Up Optimised Profiles',
            content: 'Your profile is your brand\'s first impression. Learn how to write a compelling bio, choose the right profile image, add strategic links, and set up a business account to unlock analytics.',
            estimatedDuration: 12,
            media: [{ type: 'image', url: THB('oG6HXDpsu9o'), caption: 'Platform comparison overview' }, { type: 'image', url: PIC('socialprofile'), caption: 'Optimised social media profile anatomy' }],
          },
          {
            type: 'quiz',
            title: 'Platform Selection Quiz',
            description: 'Test your platform knowledge.',
            questions: [
              { questionText: 'Which platform is best suited for B2B (business-to-business) marketing?', questionType: 'multiple-choice', options: [{ text: 'TikTok', isCorrect: false }, { text: 'Pinterest', isCorrect: false }, { text: 'LinkedIn', isCorrect: true }, { text: 'Snapchat', isCorrect: false }], points: 1, explanation: 'LinkedIn has the largest concentration of business professionals and decision-makers.' },
              { questionText: 'What content format dominates TikTok?', questionType: 'multiple-choice', options: [{ text: 'Long-form blog posts', isCorrect: false }, { text: 'Short vertical videos', isCorrect: true }, { text: 'Professional white papers', isCorrect: false }, { text: 'Static infographics', isCorrect: false }], points: 1, explanation: 'TikTok is built around short-form vertical video, usually 15–60 seconds.' },
              { questionText: 'What is a social media algorithm?', questionType: 'multiple-choice', options: [{ text: 'A tool that automatically posts content', isCorrect: false }, { text: 'A formula platforms use to decide which content to show users', isCorrect: true }, { text: 'A method for buying followers', isCorrect: false }, { text: 'A type of paid advertisement', isCorrect: false }], points: 1, explanation: 'Algorithms rank content based on engagement signals, relevance, and user behaviour.' },
            ],
          },
        ],
      },
      {
        title: 'Creating Engaging Content',
        description: 'Produce scroll-stopping content that builds your brand.',
        items: [
          {
            type: 'lesson',
            title: 'Content Pillars & the Content Calendar',
            content: 'Content pillars define the core themes your brand talks about. Combining 3–5 pillars with a weekly content calendar creates consistency — the single biggest driver of organic growth.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('KEirK5QWgrA'), caption: 'How to Start Social Media Marketing' }, { type: 'image', url: PIC('contentcalendar'), caption: 'Sample 30-day content calendar' }],
          },
          {
            type: 'lesson',
            title: 'Writing Captions & Using Hashtags',
            content: 'A great caption increases engagement and reach. Learn the hook-body-CTA caption formula, how to write for each platform\'s tone, and a proven hashtag strategy.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('captionwriting'), caption: 'Caption formula breakdown' }],
          },
          {
            type: 'quiz',
            title: 'Content Creation Quiz',
            description: 'Check your content creation knowledge.',
            questions: [
              { questionText: 'What is a content pillar?', questionType: 'multiple-choice', options: [{ text: 'A viral post that reaches millions', isCorrect: false }, { text: 'A core theme or topic your brand consistently creates content about', isCorrect: true }, { text: 'A paid promotion campaign', isCorrect: false }, { text: 'A type of Instagram story format', isCorrect: false }], points: 1, explanation: 'Content pillars keep your brand focused and recognisable across all posts.' },
              { questionText: 'What is the ideal purpose of a CTA in a social media caption?', questionType: 'multiple-choice', options: [{ text: 'To fill space at the end of the post', isCorrect: false }, { text: 'To prompt the audience to take a specific action', isCorrect: true }, { text: 'To list hashtags', isCorrect: false }, { text: 'To tag other accounts', isCorrect: false }], points: 1, explanation: 'CTA (Call to Action) guides the reader\'s next step — like, comment, click, share.' },
              { questionText: 'How many hashtags are generally recommended per Instagram post?', questionType: 'multiple-choice', options: [{ text: '0 — hashtags are dead', isCorrect: false }, { text: '3–5 highly relevant hashtags', isCorrect: true }, { text: '30 — the maximum allowed', isCorrect: false }, { text: '50+', isCorrect: false }], points: 1, explanation: 'Recent Instagram guidance recommends 3–5 targeted hashtags over stuffing 30.' },
            ],
          },
        ],
      },
      {
        title: 'Growing & Monetising Your Audience',
        description: 'Turn followers into customers with proven growth tactics.',
        items: [
          {
            type: 'lesson',
            title: 'Organic Growth Strategies',
            content: 'Collaborations, Reels, Stories, and consistent engagement are the organic levers. Learn the engagement loop, how to get on the Explore page, and the posting frequency sweet spot.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('dqaIqlgNyKw'), caption: 'Social Media Marketing Tutorial — Edureka' }],
          },
          {
            type: 'lesson',
            title: 'Social Media Ads & Monetisation',
            content: 'Boost posts and run targeted ad campaigns to accelerate growth. We also cover affiliate links, brand deals, digital products, and direct sales through social commerce.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('socialads'), caption: 'Facebook Ads Manager walkthrough' }],
          },
          {
            type: 'quiz',
            title: 'Growth & Monetisation Quiz',
            description: 'Test your growth strategy knowledge.',
            questions: [
              { questionText: 'What is social proof in social media marketing?', questionType: 'multiple-choice', options: [{ text: 'Evidence of paid advertisements', isCorrect: false }, { text: 'Reviews, testimonials, and follower counts that build trust', isCorrect: true }, { text: 'A verified badge on your profile', isCorrect: false }, { text: 'A sponsored partnership disclosure', isCorrect: false }], points: 1, explanation: 'Social proof signals credibility — others have trusted you, so new visitors should too.' },
              { questionText: 'What is a "reach" metric on social media?', questionType: 'multiple-choice', options: [{ text: 'The number of clicks on a link', isCorrect: false }, { text: 'The number of unique accounts that saw your post', isCorrect: true }, { text: 'The number of comments received', isCorrect: false }, { text: 'The percentage of followers who saw your post', isCorrect: false }], points: 1, explanation: 'Reach counts unique viewers, while impressions count total views (including repeat).' },
              { questionText: 'Which metric best indicates content quality on social media?', questionType: 'multiple-choice', options: [{ text: 'Follower count', isCorrect: false }, { text: 'Engagement rate (likes + comments + shares / reach)', isCorrect: true }, { text: 'Number of posts published', isCorrect: false }, { text: 'Profile views', isCorrect: false }], points: 1, explanation: 'Engagement rate measures how many people actually interact, not just see your content.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 4 ───────────────────────────────────────────────────────────────────
  {
    title: 'Bitcoin & Cryptocurrency Basics',
    description: 'Understand how Bitcoin and major cryptocurrencies work, how to invest safely, and how to use wallets and exchanges.',
    thumbnail: '/seed-images/cryptocurrency.jpg',
    category: 'Cryptocurrency',
    difficulty: 'beginner',
    tags: ['bitcoin', 'cryptocurrency', 'crypto', 'investing', 'blockchain', 'ethereum'],
    overview: 'Cryptocurrencies have transformed finance. This course explains the technology behind them, how to invest responsibly, and the key concepts every crypto participant must know.',
    estimatedDuration: 240,
    chapters: [
      {
        title: 'What is Cryptocurrency?',
        description: 'Foundational concepts behind digital currencies.',
        items: [
          {
            type: 'lesson',
            title: 'Cryptocurrency Explained Simply',
            content: 'A cryptocurrency is a digital currency secured by cryptography and running on a decentralised network. Unlike traditional money, no single bank or government controls it. This lesson explains how it all works.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('kfaOVhiYBsQ'), caption: 'How to Invest in Crypto for Beginners — Whiteboard Animated' }],
          },
          {
            type: 'lesson',
            title: 'Public & Private Keys — How Wallets Work',
            content: 'Your crypto wallet doesn\'t actually store coins — it stores private keys. This lesson demystifies public/private key cryptography, wallet types (hot vs cold), and how transactions are signed.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: THB('kfaOVhiYBsQ'), caption: 'Crypto wallet types overview' }, { type: 'image', url: PIC('cryptowallet'), caption: 'Hot vs cold wallet comparison' }],
          },
          {
            type: 'quiz',
            title: 'Crypto Basics Quiz',
            description: 'Check your cryptocurrency fundamentals.',
            questions: [
              { questionText: 'Who controls a decentralised cryptocurrency like Bitcoin?', questionType: 'multiple-choice', options: [{ text: 'A central bank', isCorrect: false }, { text: 'The original creator only', isCorrect: false }, { text: 'No single entity — it is managed by a distributed network', isCorrect: true }, { text: 'A government regulator', isCorrect: false }], points: 1, explanation: 'Decentralisation means no single party controls the network.' },
              { questionText: 'What is a private key in cryptocurrency?', questionType: 'multiple-choice', options: [{ text: 'Your exchange account password', isCorrect: false }, { text: 'A secret code that proves ownership and authorises transactions', isCorrect: true }, { text: 'The blockchain address you share with others', isCorrect: false }, { text: 'A backup phrase for your exchange', isCorrect: false }], points: 1, explanation: 'Your private key is the only proof of ownership. Lose it and you lose access to your funds.' },
              { questionText: 'What is a "cold wallet"?', questionType: 'multiple-choice', options: [{ text: 'A wallet that holds less than $1,000 in crypto', isCorrect: false }, { text: 'An offline hardware device that stores private keys away from the internet', isCorrect: true }, { text: 'A wallet that has been inactive for over 6 months', isCorrect: false }, { text: 'A mobile wallet app with 2FA enabled', isCorrect: false }], points: 1, explanation: 'Cold wallets (hardware wallets) store keys offline, making them far harder to hack.' },
            ],
          },
        ],
      },
      {
        title: 'Bitcoin & Major Cryptocurrencies',
        description: 'Learn the most important coins and their use cases.',
        items: [
          {
            type: 'lesson',
            title: 'Bitcoin — Digital Gold',
            content: 'Bitcoin was the first cryptocurrency. Created in 2009 by the pseudonymous Satoshi Nakamoto, it introduced the blockchain concept. Learn about Bitcoin\'s fixed supply of 21 million coins, halving events, and why it is called digital gold.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('FQ505oO6fC0'), caption: 'How Bitcoin Works — Beginner\'s Guide' }],
          },
          {
            type: 'lesson',
            title: 'Ethereum, Altcoins & Tokens',
            content: 'Ethereum introduced smart contracts and is the foundation for most DeFi and NFT applications. We cover ETH, BNB, SOL, ADA, and how to evaluate altcoins without getting burned.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('altcoins'), caption: 'Top cryptocurrencies by market cap' }],
          },
          {
            type: 'quiz',
            title: 'Major Coins Quiz',
            description: 'Test your knowledge of Bitcoin and altcoins.',
            questions: [
              { questionText: 'What is Bitcoin\'s maximum supply?', questionType: 'multiple-choice', options: [{ text: '100 million BTC', isCorrect: false }, { text: 'Unlimited', isCorrect: false }, { text: '21 million BTC', isCorrect: true }, { text: '1 billion BTC', isCorrect: false }], points: 1, explanation: 'Bitcoin has a hard cap of 21 million coins, making it deflationary by design.' },
              { questionText: 'What feature did Ethereum introduce that Bitcoin lacks natively?', questionType: 'multiple-choice', options: [{ text: 'Proof-of-Work mining', isCorrect: false }, { text: 'Smart contracts', isCorrect: true }, { text: 'A fixed supply cap', isCorrect: false }, { text: 'Peer-to-peer transactions', isCorrect: false }], points: 1, explanation: 'Ethereum\'s programmable smart contracts enabled DeFi, NFTs, and DAOs.' },
              { questionText: 'What is a "halving" event in Bitcoin?', questionType: 'multiple-choice', options: [{ text: 'When Bitcoin\'s price drops by 50%', isCorrect: false }, { text: 'When the block reward for miners is cut in half approximately every 4 years', isCorrect: true }, { text: 'When two blockchain networks merge', isCorrect: false }, { text: 'When a wallet is split between two owners', isCorrect: false }], points: 1, explanation: 'Bitcoin halving reduces the rate of new BTC entering circulation, historically preceding price increases.' },
            ],
          },
        ],
      },
      {
        title: 'Investing & Exchanges',
        description: 'Buy, store, and track crypto the right way.',
        items: [
          {
            type: 'lesson',
            title: 'Choosing & Using a Crypto Exchange',
            content: 'Centralised exchanges (Binance, Coinbase, Kraken) are the easiest entry point. Learn how to compare fees, security records, and supported coins — and how to complete KYC verification.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('Lx9zgZCMqXE'), caption: 'How Bitcoin Works Under the Hood' }, { type: 'image', url: PIC('cryptoexchange'), caption: 'CEX vs DEX comparison' }],
          },
          {
            type: 'lesson',
            title: 'Investment Strategies & Risk Management',
            content: 'Dollar-cost averaging (DCA), portfolio diversification, position sizing, and stop-losses are your core risk tools. This lesson also covers avoiding scams, rug-pulls, and FOMO-driven decisions.',
            estimatedDuration: 18,
            media: [{ type: 'image', url: PIC('cryptoinvesting'), caption: 'DCA strategy visualised over time' }],
          },
          {
            type: 'quiz',
            title: 'Investment & Safety Quiz',
            description: 'Validate your crypto investing knowledge.',
            questions: [
              { questionText: 'What is Dollar-Cost Averaging (DCA)?', questionType: 'multiple-choice', options: [{ text: 'Buying all your crypto at once at the lowest price', isCorrect: false }, { text: 'Investing a fixed amount at regular intervals regardless of price', isCorrect: true }, { text: 'Tracking the average cost of all your trades', isCorrect: false }, { text: 'Converting dollars to crypto at a fixed exchange rate', isCorrect: false }], points: 1, explanation: 'DCA reduces timing risk by spreading purchases over time.' },
              { questionText: 'What is a "rug pull" in crypto?', questionType: 'multiple-choice', options: [{ text: 'A sudden market crash caused by regulation', isCorrect: false }, { text: 'When developers abandon a project and take investor funds', isCorrect: true }, { text: 'A hardware wallet malfunction', isCorrect: false }, { text: 'When an exchange suspends withdrawals', isCorrect: false }], points: 1, explanation: 'Rug pulls are a common crypto scam where founders exit with all liquidity.' },
              { questionText: 'What does "DYOR" mean in crypto communities?', questionType: 'multiple-choice', options: [{ text: 'Double Your Own Returns', isCorrect: false }, { text: 'Do Your Own Research', isCorrect: true }, { text: 'Diversify Your Own Risk', isCorrect: false }, { text: 'Deploy Your Optimised Returns', isCorrect: false }], points: 1, explanation: 'DYOR means never invest based solely on social media tips — always research independently.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 5 ───────────────────────────────────────────────────────────────────
  {
    title: 'Content Marketing Blueprint',
    description: 'Build a content engine that attracts, engages, and converts your target audience through blogs, video, podcasts, and more.',
    thumbnail: '/seed-images/content-marketing.jpg',
    category: 'Content Marketing',
    difficulty: 'beginner',
    tags: ['content marketing', 'blogging', 'content strategy', 'seo content', 'storytelling'],
    overview: 'Great content is the foundation of every digital marketing strategy. This course teaches you how to create, distribute, and repurpose content that generates traffic, leads, and sales.',
    estimatedDuration: 260,
    chapters: [
      {
        title: 'Content Strategy Foundations',
        description: 'Plan content that serves both audience and business.',
        items: [
          {
            type: 'lesson',
            title: 'Why Content Marketing Works',
            content: 'Content marketing generates 3× more leads than outbound at 62% less cost. This lesson explains the inbound methodology, content marketing ROI, and why long-form content outperforms thin content.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('hEboJtSVIZk'), caption: 'HubSpot\'s Content Marketing Strategy — Inside Story' }],
          },
          {
            type: 'lesson',
            title: 'Audience Research & Buyer Personas',
            content: 'You can\'t write content people love without knowing who they are. Learn how to build buyer personas using surveys, interviews, Google Analytics, and social media insights.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: THB('hEboJtSVIZk'), caption: 'Content marketing ROI overview' }, { type: 'image', url: PIC('buyerpersona'), caption: 'Buyer persona template' }],
          },
          {
            type: 'quiz',
            title: 'Strategy Foundations Quiz',
            description: 'Test your content strategy knowledge.',
            questions: [
              { questionText: 'What is a buyer persona?', questionType: 'multiple-choice', options: [{ text: 'A fictional social media account used for testing', isCorrect: false }, { text: 'A semi-fictional representation of your ideal customer based on research', isCorrect: true }, { text: 'A customer who has made more than one purchase', isCorrect: false }, { text: 'A type of targeting in Facebook Ads', isCorrect: false }], points: 1, explanation: 'Buyer personas help you create content that speaks directly to your ideal audience.' },
              { questionText: 'Compared to outbound marketing, content marketing generates how many times more leads?', questionType: 'multiple-choice', options: [{ text: 'The same amount', isCorrect: false }, { text: '2× more', isCorrect: false }, { text: '3× more', isCorrect: true }, { text: '10× more', isCorrect: false }], points: 1, explanation: 'Content marketing produces 3× more leads at 62% less cost than outbound marketing (DemandMetric).' },
              { questionText: 'What is "evergreen content"?', questionType: 'multiple-choice', options: [{ text: 'Content published on environmental topics', isCorrect: false }, { text: 'Content that remains relevant and valuable over a long period of time', isCorrect: true }, { text: 'Content published every week on a regular schedule', isCorrect: false }, { text: 'A type of seasonal promotional campaign', isCorrect: false }], points: 1, explanation: 'Evergreen content continues to drive traffic long after publication, unlike trending/timely content.' },
            ],
          },
        ],
      },
      {
        title: 'Creating High-Value Content',
        description: 'Write blogs, scripts, and assets your audience shares.',
        items: [
          {
            type: 'lesson',
            title: 'Writing SEO Blog Posts That Rank',
            content: 'A well-structured blog post targets one primary keyword, satisfies search intent, uses strategic headers, includes internal and external links, and earns backlinks. Walk through writing a complete post from outline to publish.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('68mC70jSbek'), caption: 'HubSpot Marketing Hub Tutorial for Beginners (2024)' }, { type: 'image', url: PIC('blogpost'), caption: 'SEO blog post anatomy' }],
          },
          {
            type: 'lesson',
            title: 'Content Formats — Beyond Blogging',
            content: 'Infographics, podcasts, video scripts, case studies, whitepapers, and social micro-content all have a role. Learn which format suits each stage of the buyer journey.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('contentformats'), caption: 'Content format vs funnel stage' }],
          },
          {
            type: 'quiz',
            title: 'Content Creation Quiz',
            description: 'Test your content creation skills.',
            questions: [
              { questionText: 'What is the primary purpose of an H1 tag in a blog post?', questionType: 'multiple-choice', options: [{ text: 'To make text look larger on the page', isCorrect: false }, { text: 'To signal the main topic of the page to search engines', isCorrect: true }, { text: 'To add a clickable headline', isCorrect: false }, { text: 'To separate sections in the article', isCorrect: false }], points: 1, explanation: 'The H1 tag tells search engines the primary subject of the page — there should be only one per page.' },
              { questionText: 'What type of content works best for the awareness stage of the buyer journey?', questionType: 'multiple-choice', options: [{ text: 'Pricing pages and demo requests', isCorrect: false }, { text: 'Educational blog posts, videos, and social content', isCorrect: true }, { text: 'Customer testimonials and case studies', isCorrect: false }, { text: 'Product comparison tables', isCorrect: false }], points: 1, explanation: 'Top-of-funnel awareness content should educate and attract, not sell.' },
              { questionText: 'What is content repurposing?', questionType: 'multiple-choice', options: [{ text: 'Deleting old content and replacing it with new content', isCorrect: false }, { text: 'Transforming existing content into different formats for different channels', isCorrect: true }, { text: 'Rewriting another website\'s content in your own words', isCorrect: false }, { text: 'Using AI to generate variations of a single article', isCorrect: false }], points: 1, explanation: 'Repurposing extends the life of your content — e.g., turning a blog post into a podcast, video, and infographic.' },
            ],
          },
        ],
      },
      {
        title: 'Distribution & Measurement',
        description: 'Get your content seen and prove it drives results.',
        items: [
          {
            type: 'lesson',
            title: 'Content Distribution Channels',
            content: 'Creating content is only half the work — distributing it is the other. Learn how to use email newsletters, social scheduling tools, syndication networks, and paid promotion to maximise content reach.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('_kComzDl4Tw'), caption: 'HubSpot Inbound & Content Marketing Strategy' }],
          },
          {
            type: 'lesson',
            title: 'Measuring Content ROI',
            content: 'Traffic, leads, and revenue are the ultimate content metrics. Learn how to set up Google Analytics goals, track content attribution, and calculate cost-per-lead from your content programme.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('contentROI'), caption: 'Content marketing measurement framework' }],
          },
          {
            type: 'quiz',
            title: 'Distribution & ROI Quiz',
            description: 'Check your distribution and measurement knowledge.',
            questions: [
              { questionText: 'What is content syndication?', questionType: 'multiple-choice', options: [{ text: 'Sharing your social media posts to multiple accounts', isCorrect: false }, { text: 'Publishing your content on third-party platforms to reach new audiences', isCorrect: true }, { text: 'Creating content specifically for search engine bots', isCorrect: false }, { text: 'Scheduling the same content post multiple times', isCorrect: false }], points: 1, explanation: 'Syndication republishes content on sites like Medium, LinkedIn Articles, or industry publications.' },
              { questionText: 'Which Google Analytics metric tells you how many new users found your blog for the first time?', questionType: 'multiple-choice', options: [{ text: 'Sessions', isCorrect: false }, { text: 'Pageviews', isCorrect: false }, { text: 'New Users', isCorrect: true }, { text: 'Bounce Rate', isCorrect: false }], points: 1, explanation: 'New Users counts first-time visitors, helping you track content discovery performance.' },
              { questionText: 'What is a "lead magnet" in content marketing?', questionType: 'multiple-choice', options: [{ text: 'A pop-up advertisement', isCorrect: false }, { text: 'A free, valuable resource offered in exchange for contact information', isCorrect: true }, { text: 'A viral social media post', isCorrect: false }, { text: 'A paid content upgrade', isCorrect: false }], points: 1, explanation: 'Lead magnets (eBooks, checklists, templates) convert anonymous readers into known contacts.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 6 ───────────────────────────────────────────────────────────────────
  {
    title: 'Email Marketing That Converts',
    description: 'Build an email list, write campaigns that get opened and clicked, and automate your nurture sequences to drive sales on autopilot.',
    thumbnail: '/seed-images/email-marketing.jpg',
    category: 'Email Marketing',
    difficulty: 'beginner',
    tags: ['email marketing', 'mailchimp', 'newsletter', 'automation', 'list building'],
    overview: 'Email delivers the highest ROI of any digital channel. This course teaches you to build your list, write compelling emails, and set up automations that sell while you sleep.',
    estimatedDuration: 240,
    chapters: [
      {
        title: 'Email Marketing Basics',
        description: 'Understand the fundamentals and set up your platform.',
        items: [
          {
            type: 'lesson',
            title: 'Why Email Marketing Still Dominates',
            content: 'With 4+ billion email users worldwide and an average ROI of $42 per $1 spent, email remains the highest-performing channel. This lesson covers the fundamentals: lists, subscribers, broadcasts, and automations.',
            estimatedDuration: 12,
            media: [{ type: 'video-embed', url: YT('IWeCs6oNeks'), caption: 'Mailchimp Tutorial for Beginners — Step by Step' }],
          },
          {
            type: 'lesson',
            title: 'Choosing an Email Service Provider',
            content: 'Mailchimp, ConvertKit, Klaviyo, and HubSpot all serve different needs. Compare deliverability, pricing, automation features, and integrations. Then set up your first account, list, and opt-in form.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: THB('IWeCs6oNeks'), caption: 'Email service provider comparison' }, { type: 'image', url: PIC('emailplatform'), caption: 'ESP feature comparison matrix' }],
          },
          {
            type: 'quiz',
            title: 'Email Basics Quiz',
            description: 'Test your email marketing fundamentals.',
            questions: [
              { questionText: 'What is the average ROI of email marketing?', questionType: 'multiple-choice', options: [{ text: '$5 for every $1 spent', isCorrect: false }, { text: '$42 for every $1 spent', isCorrect: true }, { text: '$10 for every $1 spent', isCorrect: false }, { text: '$100 for every $1 spent', isCorrect: false }], points: 1, explanation: 'Email marketing consistently delivers ~$42 ROI per dollar — the highest of any digital channel.' },
              { questionText: 'What is email deliverability?', questionType: 'multiple-choice', options: [{ text: 'The speed at which an email is sent', isCorrect: false }, { text: 'The percentage of emails that successfully reach the recipient\'s inbox', isCorrect: true }, { text: 'How quickly a subscriber opens your email', isCorrect: false }, { text: 'The maximum number of emails you can send per day', isCorrect: false }], points: 1, explanation: 'Deliverability measures whether your email reaches the inbox vs spam folder.' },
              { questionText: 'What is a double opt-in?', questionType: 'multiple-choice', options: [{ text: 'Sending the same email twice to ensure delivery', isCorrect: false }, { text: 'Requiring new subscribers to confirm their email address via a follow-up email', isCorrect: true }, { text: 'Having two separate opt-in forms on the same page', isCorrect: false }, { text: 'An opt-in that requires both name and email', isCorrect: false }], points: 1, explanation: 'Double opt-in confirms subscriber intent, improving list quality and deliverability.' },
            ],
          },
        ],
      },
      {
        title: 'Writing Emails That Get Opened',
        description: 'Master subject lines, copy, and design for maximum clicks.',
        items: [
          {
            type: 'lesson',
            title: 'Subject Lines That Drive Opens',
            content: 'Your subject line determines whether your email is opened or deleted. Learn the psychology of curiosity, urgency, and personalisation. Includes 50 proven subject line formulas you can swipe.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('tOK0rDt_H4M'), caption: 'Mailchimp Email Marketing Campaigns 2024' }, { type: 'image', url: PIC('subjectlines'), caption: 'Subject line formula examples' }],
          },
          {
            type: 'lesson',
            title: 'Email Copywriting & Design',
            content: 'Great email copy is short, personal, and focused on one clear action. Learn the plain-text vs HTML debate, how to write for mobile, and the single-CTA principle that boosts click rates.',
            estimatedDuration: 18,
            media: [{ type: 'image', url: PIC('emaildesign'), caption: 'Mobile-optimised email layout' }],
          },
          {
            type: 'quiz',
            title: 'Email Writing Quiz',
            description: 'Check your email writing knowledge.',
            questions: [
              { questionText: 'What is the recommended length for an email subject line?', questionType: 'multiple-choice', options: [{ text: 'Under 10 characters', isCorrect: false }, { text: '40–60 characters', isCorrect: true }, { text: '100–150 characters', isCorrect: false }, { text: 'There is no recommended length', isCorrect: false }], points: 1, explanation: 'Subject lines of 40–60 characters display well on mobile and have higher open rates.' },
              { questionText: 'What is a preheader in email marketing?', questionType: 'multiple-choice', options: [{ text: 'The sender\'s name that appears before the subject line', isCorrect: false }, { text: 'The preview text that appears next to the subject line in the inbox', isCorrect: true }, { text: 'A header image at the top of the email', isCorrect: false }, { text: 'The unsubscribe link footer', isCorrect: false }], points: 1, explanation: 'Preheader text is a second opportunity to entice opens — use it wisely.' },
              { questionText: 'Why is a single CTA better than multiple CTAs in an email?', questionType: 'multiple-choice', options: [{ text: 'It reduces the email\'s file size', isCorrect: false }, { text: 'Multiple CTAs confuse readers and reduce overall click rates', isCorrect: true }, { text: 'Email platforms only allow one CTA link', isCorrect: false }, { text: 'It avoids spam filters', isCorrect: false }], points: 1, explanation: 'Giving readers one clear action increases clicks by eliminating decision paralysis.' },
            ],
          },
        ],
      },
      {
        title: 'Email Automation & Sequences',
        description: 'Set up automations that nurture leads and drive sales 24/7.',
        items: [
          {
            type: 'lesson',
            title: 'Building Your Welcome Sequence',
            content: 'The welcome sequence is the most important automation you will ever build. New subscribers are at peak engagement — deliver your best value, set expectations, and move them toward a first purchase. Learn a proven 5-email welcome sequence structure.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('1puVrT7jqwQ'), caption: 'HubSpot Email Marketing Tutorial 2026' }],
          },
          {
            type: 'lesson',
            title: 'Segmentation & Advanced Automations',
            content: 'Segment your list by behaviour, interests, and purchase history to send hyper-relevant content. Learn abandoned cart sequences, re-engagement campaigns, and post-purchase follow-ups.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('emailautomation'), caption: 'Email automation workflow diagram' }],
          },
          {
            type: 'quiz',
            title: 'Automation Quiz',
            description: 'Validate your email automation knowledge.',
            questions: [
              { questionText: 'What triggers an abandoned cart email sequence?', questionType: 'multiple-choice', options: [{ text: 'A subscriber not opening emails for 30 days', isCorrect: false }, { text: 'A user adding items to a cart but not completing checkout', isCorrect: true }, { text: 'A customer requesting a refund', isCorrect: false }, { text: 'A new product being added to the store', isCorrect: false }], points: 1, explanation: 'Abandoned cart emails recover sales from shoppers who leave before purchasing — typically 15–20% conversion rate.' },
              { questionText: 'What is list segmentation?', questionType: 'multiple-choice', options: [{ text: 'Deleting inactive subscribers from your list', isCorrect: false }, { text: 'Dividing your email list into groups based on shared characteristics or behaviours', isCorrect: true }, { text: 'Splitting your list between two email service providers', isCorrect: false }, { text: 'Creating separate lists for A/B testing', isCorrect: false }], points: 1, explanation: 'Segmentation ensures subscribers receive relevant content, improving open rates and reducing unsubscribes.' },
              { questionText: 'What is a re-engagement campaign?', questionType: 'multiple-choice', options: [{ text: 'A campaign welcoming new subscribers', isCorrect: false }, { text: 'A series of emails targeting subscribers who have stopped engaging', isCorrect: true }, { text: 'A campaign re-announcing a product launch', isCorrect: false }, { text: 'Sending the same email twice to increase open rates', isCorrect: false }], points: 1, explanation: 'Re-engagement campaigns win back inactive subscribers or clean them from your list to protect deliverability.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 7 ───────────────────────────────────────────────────────────────────
  {
    title: 'YouTube & Video Marketing',
    description: 'Create, optimise, and grow a YouTube channel that drives traffic, builds authority, and generates revenue.',
    thumbnail: '/seed-images/video-marketing.jpg',
    category: 'Video Marketing',
    difficulty: 'beginner',
    tags: ['youtube', 'video marketing', 'video production', 'youtube seo', 'vlogging'],
    overview: 'Video is the fastest-growing content format on the internet. This course covers everything from scripting and filming to YouTube SEO and monetisation strategies.',
    estimatedDuration: 260,
    chapters: [
      {
        title: 'Video Marketing Fundamentals',
        description: 'Understand video\'s role in the marketing mix.',
        items: [
          {
            type: 'lesson',
            title: 'Why Video Dominates Digital Marketing',
            content: 'Video drives 1,200% more shares than text and images combined. YouTube is the world\'s second largest search engine. This lesson covers the video marketing landscape, format options, and where video fits in your strategy.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('nkNHn0VqVBA'), caption: 'Digital Marketing Full Course — Edureka' }],
          },
          {
            type: 'lesson',
            title: 'Setting Up Your YouTube Channel',
            content: 'Channel art, about sections, channel keywords, playlists, and featured sections all impact discoverability. Walk through the complete YouTube Studio setup checklist for new and existing channels.',
            estimatedDuration: 12,
            media: [{ type: 'image', url: THB('nkNHn0VqVBA'), caption: 'YouTube channel setup overview' }, { type: 'image', url: PIC('youtubechannel'), caption: 'YouTube Studio interface guide' }],
          },
          {
            type: 'quiz',
            title: 'Video Fundamentals Quiz',
            description: 'Test your video marketing basics.',
            questions: [
              { questionText: 'Which search engine is second only to Google in monthly searches?', questionType: 'multiple-choice', options: [{ text: 'Bing', isCorrect: false }, { text: 'Yahoo', isCorrect: false }, { text: 'YouTube', isCorrect: true }, { text: 'DuckDuckGo', isCorrect: false }], points: 1, explanation: 'YouTube processes over 3 billion searches per month, making it the second largest search engine.' },
              { questionText: 'What is a YouTube end screen?', questionType: 'multiple-choice', options: [{ text: 'The final frame of the video before the black screen', isCorrect: false }, { text: 'An interactive overlay in the last 5–20 seconds of a video that promotes other videos or a subscribe button', isCorrect: true }, { text: 'The thumbnail displayed in search results', isCorrect: false }, { text: 'A subscription confirmation email sent to viewers', isCorrect: false }], points: 1, explanation: 'End screens drive additional watch time and subscriber growth at the point of highest engagement.' },
              { questionText: 'What is click-through rate (CTR) on YouTube?', questionType: 'multiple-choice', options: [{ text: 'The percentage of people who watched more than 50% of your video', isCorrect: false }, { text: 'The percentage of impressions that resulted in someone clicking to watch your video', isCorrect: true }, { text: 'The number of clicks on links in the video description', isCorrect: false }, { text: 'The ratio of likes to dislikes on a video', isCorrect: false }], points: 1, explanation: 'YouTube CTR measures how compelling your title and thumbnail are — average is 2–10%.' },
            ],
          },
        ],
      },
      {
        title: 'Scripting & Producing Videos',
        description: 'Create professional videos on any budget.',
        items: [
          {
            type: 'lesson',
            title: 'Scripting Videos That Retain Viewers',
            content: 'Audience retention is YouTube\'s most important ranking signal. Learn the hook-bridge-body-CTA script structure, how to write a 30-second hook that keeps people watching, and how to structure chapters for maximum retention.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('a2MVudfirGo'), caption: 'FREE YouTube SEO Course 2024' }, { type: 'image', url: PIC('videoscript'), caption: 'Video script structure template' }],
          },
          {
            type: 'lesson',
            title: 'Budget Video Production',
            content: 'A smartphone, a $30 ring light, and free editing software are enough to start. Learn lighting basics, audio tips (bad audio kills great content), and how to edit with DaVinci Resolve for free.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('videoproduction'), caption: 'Budget home studio setup' }],
          },
          {
            type: 'quiz',
            title: 'Production Quiz',
            description: 'Check your video production knowledge.',
            questions: [
              { questionText: 'What is the most critical technical quality factor for viewer retention?', questionType: 'multiple-choice', options: [{ text: 'Video resolution (4K vs 1080p)', isCorrect: false }, { text: 'Audio quality', isCorrect: true }, { text: 'Colour grading', isCorrect: false }, { text: 'Thumbnail design', isCorrect: false }], points: 1, explanation: 'Viewers will tolerate average video quality but abandon videos with poor audio immediately.' },
              { questionText: 'What is a "pattern interrupt" in video content?', questionType: 'multiple-choice', options: [{ text: 'When a video ad interrupts organic content', isCorrect: false }, { text: 'A sudden change (cut, graphic, sound) used to re-engage viewers\' attention', isCorrect: true }, { text: 'A copyright claim that pauses video monetisation', isCorrect: false }, { text: 'When a subscription reminder appears during a video', isCorrect: false }], points: 1, explanation: 'Pattern interrupts every 30–60 seconds prevent viewers from zoning out and improve retention.' },
              { questionText: 'Where should your primary keyword appear in a YouTube video?', questionType: 'multiple-choice', options: [{ text: 'Only in the video tags', isCorrect: false }, { text: 'In the title, description, and spoken aloud in the first 30 seconds', isCorrect: true }, { text: 'Only in the thumbnail text', isCorrect: false }, { text: 'In the end screen overlay', isCorrect: false }], points: 1, explanation: 'YouTube\'s algorithm reads titles, descriptions, and auto-generated captions — your keyword should appear in all three.' },
            ],
          },
        ],
      },
      {
        title: 'YouTube SEO & Monetisation',
        description: 'Rank in YouTube search and turn views into revenue.',
        items: [
          {
            type: 'lesson',
            title: 'YouTube SEO — Ranking Your Videos',
            content: 'YouTube SEO is distinct from Google SEO. Optimise for watch time, engagement, and relevance. Learn how to research video keywords with TubeBuddy, write optimised descriptions, and use chapters to boost discovery.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('oPq7o62Ph_Q'), caption: 'WordPress & YouTube SEO Beginner Guide 2024' }],
          },
          {
            type: 'lesson',
            title: 'YouTube Monetisation Strategies',
            content: 'Ad revenue is just one of five monetisation methods. Explore channel memberships, Super Chats, affiliate links, merchandise, and selling your own courses through a YouTube-to-landing-page funnel.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('ytmonetisation'), caption: 'YouTube monetisation streams overview' }],
          },
          {
            type: 'quiz',
            title: 'YouTube Growth Quiz',
            description: 'Validate your YouTube SEO knowledge.',
            questions: [
              { questionText: 'What does YouTube use to determine a video\'s relevance for a search query?', questionType: 'multiple-choice', options: [{ text: 'The number of subscribers the channel has', isCorrect: false }, { text: 'Title, description, tags, and auto-generated captions', isCorrect: true }, { text: 'The thumbnail image', isCorrect: false }, { text: 'How recently the video was uploaded', isCorrect: false }], points: 1, explanation: 'YouTube\'s algorithm analyses text signals to understand what a video is about.' },
              { questionText: 'To be eligible for the YouTube Partner Program (YPP), how many watch hours are required in the past 12 months?', questionType: 'multiple-choice', options: [{ text: '100 watch hours', isCorrect: false }, { text: '500 watch hours', isCorrect: false }, { text: '4,000 watch hours', isCorrect: true }, { text: '10,000 watch hours', isCorrect: false }], points: 1, explanation: 'YPP requires 1,000 subscribers and 4,000 watch hours in the past 12 months to enable ad monetisation.' },
              { questionText: 'What is a YouTube "chapter"?', questionType: 'multiple-choice', options: [{ text: 'A multi-episode YouTube series', isCorrect: false }, { text: 'Timestamps in the description that let viewers jump to sections of a video', isCorrect: true }, { text: 'A community post for channel members', isCorrect: false }, { text: 'A type of YouTube Short', isCorrect: false }], points: 1, explanation: 'Chapters improve user experience and appear in Google search results, boosting discovery.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 8 ───────────────────────────────────────────────────────────────────
  {
    title: 'Affiliate Marketing for Beginners',
    description: 'Learn how to earn commissions promoting other people\'s products — with no inventory, customer service, or upfront investment.',
    thumbnail: '/seed-images/affiliate-marketing.jpg',
    category: 'Affiliate Marketing',
    difficulty: 'beginner',
    tags: ['affiliate marketing', 'passive income', 'commission', 'blogging', 'clickbank', 'amazon'],
    overview: 'Affiliate marketing is one of the most accessible online business models. This course walks you from picking a niche to driving traffic and collecting commissions.',
    estimatedDuration: 220,
    chapters: [
      {
        title: 'Understanding Affiliate Marketing',
        description: 'How the model works and how affiliates earn.',
        items: [
          {
            type: 'lesson',
            title: 'The Affiliate Marketing Model',
            content: 'Affiliate marketing is performance-based: you earn a commission every time someone purchases through your unique tracking link. Learn how merchants, affiliates, networks, and consumers interact in this four-party ecosystem.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('W-nbsnXtSZI'), caption: 'Affiliate Marketing for Beginners — Complete A-Z Tutorial' }],
          },
          {
            type: 'lesson',
            title: 'Top Affiliate Networks & Programs',
            content: 'Amazon Associates, ShareASale, CJ Affiliate, ClickBank, and Impact are the biggest networks. Learn how commission structures work (CPA, CPL, revenue share), cookie windows, and how to get approved.',
            estimatedDuration: 12,
            media: [{ type: 'image', url: THB('W-nbsnXtSZI'), caption: 'Affiliate marketing ecosystem' }, { type: 'image', url: PIC('affiliatenetworks'), caption: 'Top affiliate networks comparison' }],
          },
          {
            type: 'quiz',
            title: 'Affiliate Basics Quiz',
            description: 'Test your affiliate marketing fundamentals.',
            questions: [
              { questionText: 'How does an affiliate marketer earn a commission?', questionType: 'multiple-choice', options: [{ text: 'By charging a monthly membership fee', isCorrect: false }, { text: 'When a referred user completes a desired action (purchase, signup) via a unique tracking link', isCorrect: true }, { text: 'By selling advertising space on their website', isCorrect: false }, { text: 'By negotiating fixed monthly fees with brands', isCorrect: false }], points: 1, explanation: 'Affiliates are paid on performance — only when a conversion happens through their link.' },
              { questionText: 'What is a "cookie window" in affiliate marketing?', questionType: 'multiple-choice', options: [{ text: 'The pop-up used to collect email addresses', isCorrect: false }, { text: 'The timeframe after a user clicks your affiliate link during which you earn credit for a sale', isCorrect: true }, { text: 'A browser extension that tracks competitor affiliates', isCorrect: false }, { text: 'The period before your affiliate application is approved', isCorrect: false }], points: 1, explanation: 'If a merchant has a 30-day cookie and the user buys within 30 days of clicking your link, you earn the commission.' },
              { questionText: 'What is CPA in affiliate marketing?', questionType: 'multiple-choice', options: [{ text: 'Content Per Article', isCorrect: false }, { text: 'Cost Per Action — a commission paid when a specific action is completed', isCorrect: true }, { text: 'Clicks Per Advertisement', isCorrect: false }, { text: 'Campaign Performance Analysis', isCorrect: false }], points: 1, explanation: 'CPA pays affiliates for specific actions like purchases, sign-ups, or form submissions.' },
            ],
          },
        ],
      },
      {
        title: 'Choosing Your Niche & Products',
        description: 'Pick profitable niches and products worth promoting.',
        items: [
          {
            type: 'lesson',
            title: 'Niche Selection — Profit vs Passion',
            content: 'The best affiliate niches sit at the intersection of audience demand, monetisation potential, and your credibility. Learn the niche evaluation framework: competition analysis, average commission value, and content feasibility.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('HLMwinDXrFY'), caption: 'Affiliate Marketing for Beginners in 2026 — Full Course' }, { type: 'image', url: PIC('nicheselection'), caption: 'Niche evaluation matrix' }],
          },
          {
            type: 'lesson',
            title: 'Product Research & Vetting',
            content: 'Not all affiliate products are worth promoting. Learn how to evaluate conversion rates, refund rates, commission percentages, vendor support, and product quality before recommending anything to your audience.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('productresearch'), caption: 'Affiliate product vetting checklist' }],
          },
          {
            type: 'quiz',
            title: 'Niche & Product Quiz',
            description: 'Check your niche selection skills.',
            questions: [
              { questionText: 'Which of the following is generally the most profitable type of affiliate product?', questionType: 'multiple-choice', options: [{ text: 'Free tools with no paid tier', isCorrect: false }, { text: 'High-ticket products or recurring subscription services', isCorrect: true }, { text: 'Low-cost physical products under $10', isCorrect: false }, { text: 'Products with a 30-day cookie only', isCorrect: false }], points: 1, explanation: 'High-ticket items and SaaS subscriptions pay larger commissions per conversion.' },
              { questionText: 'What is an "evergreen" niche in affiliate marketing?', questionType: 'multiple-choice', options: [{ text: 'A niche related to environmentalism', isCorrect: false }, { text: 'A niche with consistent demand year-round, not dependent on trends', isCorrect: true }, { text: 'A niche that only performs well in specific seasons', isCorrect: false }, { text: 'A new niche with no competitors', isCorrect: false }], points: 1, explanation: 'Evergreen niches like health, personal finance, and relationships maintain steady traffic all year.' },
              { questionText: 'Why should you test a product before promoting it as an affiliate?', questionType: 'multiple-choice', options: [{ text: 'Affiliate networks require product testing', isCorrect: false }, { text: 'To build genuine trust with your audience and avoid promoting poor-quality products', isCorrect: true }, { text: 'To get a discounted affiliate rate', isCorrect: false }, { text: 'Testing increases your cookie window', isCorrect: false }], points: 1, explanation: 'Recommending products you\'ve used builds credibility and protects your audience relationship.' },
            ],
          },
        ],
      },
      {
        title: 'Driving Traffic & Converting',
        description: 'Send targeted visitors to your affiliate offers.',
        items: [
          {
            type: 'lesson',
            title: 'SEO & Blogging for Affiliate Sales',
            content: 'A review blog targeting buying-intent keywords is the highest-ROI affiliate traffic source. Learn how to write comparison posts, "best X" articles, and product reviews that rank and convert.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('vCKMB8OCmDU'), caption: 'Affiliate Marketing for Beginners — Start Earning 6 Figures' }],
          },
          {
            type: 'lesson',
            title: 'Social Media & Email for Affiliate Marketing',
            content: 'Pinterest, YouTube, TikTok, and email newsletters all drive affiliate traffic. Learn disclosure rules, FTC compliance, and how to embed affiliate links naturally without damaging trust.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('affiliatetraffic'), caption: 'Affiliate traffic source comparison' }],
          },
          {
            type: 'quiz',
            title: 'Traffic & Conversion Quiz',
            description: 'Test your affiliate traffic knowledge.',
            questions: [
              { questionText: 'Which keyword intent is most likely to convert for affiliate marketing?', questionType: 'multiple-choice', options: [{ text: 'Informational ("what is X")', isCorrect: false }, { text: 'Navigational ("X login")', isCorrect: false }, { text: 'Commercial investigation ("best X for Y")', isCorrect: true }, { text: 'Brand keywords ("X brand name")', isCorrect: false }], points: 1, explanation: 'Commercial investigation keywords show the searcher is comparing options before buying — perfect for affiliate reviews.' },
              { questionText: 'What does FTC disclosure require of affiliate marketers?', questionType: 'multiple-choice', options: [{ text: 'Registering your affiliate links with the FTC', isCorrect: false }, { text: 'Clearly disclosing that you earn a commission when someone clicks your affiliate link', isCorrect: true }, { text: 'Paying a tax on affiliate commissions directly to the FTC', isCorrect: false }, { text: 'Using only government-approved affiliate networks', isCorrect: false }], points: 1, explanation: 'FTC guidelines require clear and conspicuous disclosure of any financial relationship with promoted brands.' },
              { questionText: 'What is a "money page" in affiliate marketing?', questionType: 'multiple-choice', options: [{ text: 'Your affiliate payout dashboard', isCorrect: false }, { text: 'A high-converting page focused on review or comparison content with affiliate links', isCorrect: true }, { text: 'A dedicated page for collecting donations', isCorrect: false }, { text: 'A page about how you make money online', isCorrect: false }], points: 1, explanation: 'Money pages are your primary conversion assets — they rank for buyer-intent keywords and drive affiliate clicks.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 9 ───────────────────────────────────────────────────────────────────
  {
    title: 'E-Commerce with Shopify',
    description: 'Build, launch, and scale a profitable Shopify store from zero to your first 100 sales.',
    thumbnail: '/seed-images/ecommerce.jpg',
    category: 'E-Commerce',
    difficulty: 'beginner',
    tags: ['shopify', 'ecommerce', 'dropshipping', 'online store', 'product sourcing'],
    overview: 'Shopify powers over 4 million stores worldwide. This course takes you from store setup to your first sale using proven product selection, store design, and marketing tactics.',
    estimatedDuration: 300,
    chapters: [
      {
        title: 'Setting Up Your Shopify Store',
        description: 'Build a professional store in a weekend.',
        items: [
          {
            type: 'lesson',
            title: 'Shopify Fundamentals & Store Setup',
            content: 'Shopify is the world\'s leading e-commerce platform. This lesson walks through account creation, choosing a theme, configuring payments (Shopify Payments, PayPal, Stripe), shipping zones, and tax settings.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('VYInLCUvtew'), caption: 'Complete Shopify Tutorial for Beginners 2024' }],
          },
          {
            type: 'lesson',
            title: 'Domain, Branding & Store Design',
            content: 'Your store\'s design is your brand\'s first impression. Learn how to connect a custom domain, customise a free theme using the visual editor, create a compelling homepage, and write a converting product page.',
            estimatedDuration: 18,
            media: [{ type: 'image', url: THB('VYInLCUvtew'), caption: 'Shopify store setup checklist' }, { type: 'image', url: PIC('shopifydesign'), caption: 'Converting product page anatomy' }],
          },
          {
            type: 'quiz',
            title: 'Shopify Setup Quiz',
            description: 'Test your Shopify setup knowledge.',
            questions: [
              { questionText: 'What is Shopify Payments?', questionType: 'multiple-choice', options: [{ text: 'A separate app that charges a monthly fee', isCorrect: false }, { text: 'Shopify\'s built-in payment processor that eliminates third-party transaction fees', isCorrect: true }, { text: 'A manual payment option for bank transfers only', isCorrect: false }, { text: 'An invoicing tool for B2B customers', isCorrect: false }], points: 1, explanation: 'Shopify Payments is powered by Stripe and removes additional transaction fees when used.' },
              { questionText: 'What is a Shopify theme?', questionType: 'multiple-choice', options: [{ text: 'A product category in the Shopify store', isCorrect: false }, { text: 'A pre-built design template that controls the look and feel of your store', isCorrect: true }, { text: 'A type of Shopify marketing campaign', isCorrect: false }, { text: 'A colour scheme applied to your brand', isCorrect: false }], points: 1, explanation: 'Shopify themes are customisable templates — Shopify offers both free and paid options.' },
              { questionText: 'Which page is most critical for conversions in a Shopify store?', questionType: 'multiple-choice', options: [{ text: 'The About page', isCorrect: false }, { text: 'The Contact page', isCorrect: false }, { text: 'The Product page', isCorrect: true }, { text: 'The Blog page', isCorrect: false }], points: 1, explanation: 'The product page is where buying decisions are made — optimising images, copy, and social proof here drives sales.' },
            ],
          },
        ],
      },
      {
        title: 'Product Sourcing & Management',
        description: 'Find, list, and price products that sell.',
        items: [
          {
            type: 'lesson',
            title: 'Product Research & Validation',
            content: 'The fastest path to failure is choosing the wrong products. Learn how to use Google Trends, Amazon BSR, TikTok Shop trends, and competitor research to find winning products before investing.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('D-p4cyZMBME'), caption: 'Shopify Dropshipping Full Course 2024' }, { type: 'image', url: PIC('productresearchecom'), caption: 'Product research framework' }],
          },
          {
            type: 'lesson',
            title: 'Dropshipping vs Private Label',
            content: 'Dropshipping lets you sell without inventory; private label builds a real brand. Compare margins, fulfilment complexity, and branding control. Learn to source from AliExpress, Spocket, and domestic suppliers.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('dropshipping'), caption: 'Dropshipping vs private label comparison' }],
          },
          {
            type: 'quiz',
            title: 'Product Strategy Quiz',
            description: 'Check your product sourcing knowledge.',
            questions: [
              { questionText: 'What is dropshipping?', questionType: 'multiple-choice', options: [{ text: 'Selling products at a steep discount', isCorrect: false }, { text: 'A fulfilment model where the supplier ships directly to your customer — you never hold inventory', isCorrect: true }, { text: 'Dropping off products at a warehouse for third-party storage', isCorrect: false }, { text: 'A method of bulk purchasing products at wholesale prices', isCorrect: false }], points: 1, explanation: 'In dropshipping, you list products, take orders, and the supplier handles fulfilment.' },
              { questionText: 'What metric best indicates a product\'s demand on Amazon?', questionType: 'multiple-choice', options: [{ text: 'Number of product images', isCorrect: false }, { text: 'Best Seller Rank (BSR)', isCorrect: true }, { text: 'Product title length', isCorrect: false }, { text: 'Number of seller questions', isCorrect: false }], points: 1, explanation: 'A lower BSR means a product sells more frequently — a key indicator of market demand.' },
              { questionText: 'What is a private label product?', questionType: 'multiple-choice', options: [{ text: 'A product sold only to members of a loyalty programme', isCorrect: false }, { text: 'A product manufactured to your specifications under your own brand name', isCorrect: true }, { text: 'A limited edition product sold privately', isCorrect: false }, { text: 'A product with no visible brand labelling', isCorrect: false }], points: 1, explanation: 'Private label allows you to build a brand around products manufactured by a third party.' },
            ],
          },
        ],
      },
      {
        title: 'Marketing Your Shopify Store',
        description: 'Drive traffic and turn visitors into paying customers.',
        items: [
          {
            type: 'lesson',
            title: 'Facebook & Instagram Ads for E-Commerce',
            content: 'Meta ads are the fastest way to get your store in front of buyers. Learn campaign structures, audience targeting (interest, lookalike, retargeting), creative best practices, and how to read your ROAS.',
            estimatedDuration: 22,
            media: [{ type: 'video-embed', url: YT('YtbaxJFb9zE'), caption: 'Shopify Tutorial for Beginners 2024 — Professional eCommerce' }],
          },
          {
            type: 'lesson',
            title: 'Email & SMS Marketing for Shopify',
            content: 'Klaviyo and Shopify Email integrate directly with your store to automate welcome flows, abandoned carts, post-purchase, and win-back sequences. Learn the five essential Shopify automations every store must have.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('shopifyemail'), caption: 'Shopify email automation flows' }],
          },
          {
            type: 'quiz',
            title: 'E-Commerce Marketing Quiz',
            description: 'Validate your e-commerce marketing knowledge.',
            questions: [
              { questionText: 'What does ROAS stand for in e-commerce advertising?', questionType: 'multiple-choice', options: [{ text: 'Return on Ad Spend', isCorrect: true }, { text: 'Rate of Ad Success', isCorrect: false }, { text: 'Revenue Over Advertising Subscription', isCorrect: false }, { text: 'Return on Average Sales', isCorrect: false }], points: 1, explanation: 'ROAS = Revenue from ads ÷ Ad spend. A ROAS of 3× means every $1 spent returns $3 in revenue.' },
              { questionText: 'What is a "lookalike audience" in Facebook Ads?', questionType: 'multiple-choice', options: [{ text: 'People who look similar to a product\'s model', isCorrect: false }, { text: 'A new audience that shares characteristics with your best existing customers', isCorrect: true }, { text: 'People who have visited competitor websites', isCorrect: false }, { text: 'An audience created from demographic data only', isCorrect: false }], points: 1, explanation: 'Facebook uses its AI to find new users who behave like your existing customers, improving ad performance.' },
              { questionText: 'What is cart abandonment rate?', questionType: 'multiple-choice', options: [{ text: 'The percentage of customers who return a product', isCorrect: false }, { text: 'The percentage of shoppers who add items to the cart but do not complete checkout', isCorrect: true }, { text: 'The rate at which shipping carts are lost in transit', isCorrect: false }, { text: 'The percentage of orders cancelled after purchase', isCorrect: false }], points: 1, explanation: 'Average e-commerce cart abandonment is ~70% — abandoned cart emails recover 10–15% of these sales.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 10 ──────────────────────────────────────────────────────────────────
  {
    title: 'Google Analytics 4 Mastery',
    description: 'Set up GA4 correctly, understand your reports, and use data to make smarter marketing decisions.',
    thumbnail: '/seed-images/data-analytics.jpg',
    category: 'Data Analytics',
    difficulty: 'intermediate',
    tags: ['google analytics', 'ga4', 'data analytics', 'web analytics', 'conversions', 'reporting'],
    overview: 'GA4 replaced Universal Analytics in 2023. This course covers setup, the new event-based model, custom reports, and how to connect analytics data to real business decisions.',
    estimatedDuration: 280,
    chapters: [
      {
        title: 'GA4 Introduction & Setup',
        description: 'Install GA4 and configure it correctly from day one.',
        items: [
          {
            type: 'lesson',
            title: 'GA4 vs Universal Analytics — What Changed',
            content: 'GA4 is event-based rather than session-based. This fundamental change affects how you track users, measure engagement, and set up conversions. This lesson explains the key differences and the new data model.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('u_ECkoHVlZ8'), caption: 'Google Analytics 4 Tutorial for Beginners — 1-Hour GA4 Course' }],
          },
          {
            type: 'lesson',
            title: 'Installing GA4 via Google Tag Manager',
            content: 'Google Tag Manager is the recommended way to deploy GA4. This lesson walks through: creating a GTM container, installing GTM on your site, creating a GA4 configuration tag, and verifying data collection in DebugView.',
            estimatedDuration: 18,
            media: [{ type: 'image', url: THB('u_ECkoHVlZ8'), caption: 'GA4 setup walkthrough' }, { type: 'image', url: PIC('ga4setup'), caption: 'GTM tag configuration for GA4' }],
          },
          {
            type: 'quiz',
            title: 'GA4 Setup Quiz',
            description: 'Test your GA4 setup knowledge.',
            questions: [
              { questionText: 'What is the fundamental difference between GA4 and Universal Analytics?', questionType: 'multiple-choice', options: [{ text: 'GA4 is paid; UA was free', isCorrect: false }, { text: 'GA4 uses an event-based data model instead of session-based', isCorrect: true }, { text: 'GA4 only works with Google Ads', isCorrect: false }, { text: 'GA4 does not track mobile users', isCorrect: false }], points: 1, explanation: 'GA4\'s event-based model measures every user interaction as an event, providing more granular data.' },
              { questionText: 'What tool is recommended for deploying GA4 without editing website code?', questionType: 'multiple-choice', options: [{ text: 'Google Search Console', isCorrect: false }, { text: 'Google Tag Manager', isCorrect: true }, { text: 'Google Data Studio', isCorrect: false }, { text: 'Google Optimize', isCorrect: false }], points: 1, explanation: 'Google Tag Manager lets you manage all tracking tags (GA4, ads pixels, etc.) from one dashboard without touching code.' },
              { questionText: 'What is GA4 DebugView?', questionType: 'multiple-choice', options: [{ text: 'A tool for fixing broken website links', isCorrect: false }, { text: 'A real-time view to verify that GA4 events are firing correctly during testing', isCorrect: true }, { text: 'A report showing debug errors in your GA4 setup', isCorrect: false }, { text: 'A feature that identifies bot traffic', isCorrect: false }], points: 1, explanation: 'DebugView lets you see events in real-time while testing before pushing to production.' },
            ],
          },
        ],
      },
      {
        title: 'Understanding GA4 Reports',
        description: 'Read and interpret the data that matters.',
        items: [
          {
            type: 'lesson',
            title: 'Navigation & Core Reports',
            content: 'GA4\'s report structure is completely different from UA. Learn the Realtime, Life Cycle (Acquisition, Engagement, Monetisation, Retention), and User reports. Understand sessions, engaged sessions, engagement rate, and average engagement time.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('pRKpaZJJRxk'), caption: 'Google Analytics 4 Tutorial for Beginners 2024' }, { type: 'image', url: PIC('ga4reports'), caption: 'GA4 report navigation overview' }],
          },
          {
            type: 'lesson',
            title: 'Acquisition Reports — Where Your Traffic Comes From',
            content: 'Traffic Acquisition and User Acquisition reports show which channels, campaigns, and sources are driving your best users. Learn to compare channels, spot underperforming sources, and use UTM parameters for campaign tracking.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('ga4acquisition'), caption: 'Traffic acquisition channel comparison' }],
          },
          {
            type: 'quiz',
            title: 'GA4 Reports Quiz',
            description: 'Check your GA4 reporting knowledge.',
            questions: [
              { questionText: 'In GA4, what does "engaged session" mean?', questionType: 'multiple-choice', options: [{ text: 'Any session lasting more than 1 second', isCorrect: false }, { text: 'A session that lasted over 10 seconds, had a conversion, or had 2+ pageviews', isCorrect: true }, { text: 'A session where the user clicked a link', isCorrect: false }, { text: 'A session from a returning visitor', isCorrect: false }], points: 1, explanation: 'GA4 replaced bounce rate with engagement rate — an engaged session shows meaningful interaction.' },
              { questionText: 'What is a UTM parameter?', questionType: 'multiple-choice', options: [{ text: 'A type of Google Ads bidding strategy', isCorrect: false }, { text: 'A tag added to a URL to track the source, medium, and campaign of traffic in Analytics', isCorrect: true }, { text: 'A GA4 user property', isCorrect: false }, { text: 'A setting for filtering internal traffic', isCorrect: false }], points: 1, explanation: 'UTM tags (utm_source, utm_medium, utm_campaign) tell GA4 exactly where traffic originated from.' },
              { questionText: 'Which GA4 report shows how many users return after their first visit?', questionType: 'multiple-choice', options: [{ text: 'Acquisition overview', isCorrect: false }, { text: 'Engagement events', isCorrect: false }, { text: 'Retention report', isCorrect: true }, { text: 'Realtime report', isCorrect: false }], points: 1, explanation: 'The Retention report in GA4\'s Life Cycle section tracks returning user behaviour over time.' },
            ],
          },
        ],
      },
      {
        title: 'Conversions & Advanced Tracking',
        description: 'Measure what drives revenue, not just traffic.',
        items: [
          {
            type: 'lesson',
            title: 'Setting Up Conversion Tracking',
            content: 'In GA4, any event can be marked as a conversion. Learn how to create custom events (form submissions, button clicks, scroll depth), mark them as conversions, and link GA4 to Google Ads for conversion import.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('-klGwlBC2p8'), caption: 'Google Analytics 4 Tutorial for Beginners (2024)' }],
          },
          {
            type: 'lesson',
            title: 'Custom Reports & Exploration',
            content: 'GA4\'s Explore section is a powerful ad-hoc analysis tool. Learn to build Free Form reports, Funnel explorations, Path explorations, and Segment overlaps to answer your specific business questions.',
            estimatedDuration: 18,
            media: [{ type: 'image', url: PIC('ga4explore'), caption: 'GA4 Exploration report builder' }],
          },
          {
            type: 'quiz',
            title: 'Conversions Quiz',
            description: 'Validate your conversion tracking knowledge.',
            questions: [
              { questionText: 'In GA4, how do you designate an event as a conversion?', questionType: 'multiple-choice', options: [{ text: 'Only through linking to Google Ads', isCorrect: false }, { text: 'Toggle the "Mark as conversion" switch in the Events report', isCorrect: true }, { text: 'Submit a request to Google Support', isCorrect: false }, { text: 'Add a special conversion_event parameter to the tag', isCorrect: false }], points: 1, explanation: 'Any GA4 event can become a conversion with a single toggle in the Events admin section.' },
              { questionText: 'What is a Funnel Exploration in GA4?', questionType: 'multiple-choice', options: [{ text: 'A report showing how money flows through your business', isCorrect: false }, { text: 'A visual report showing how users progress through a sequence of steps toward a conversion', isCorrect: true }, { text: 'A feature that filters out bot traffic', isCorrect: false }, { text: 'A comparison of two different date ranges', isCorrect: false }], points: 1, explanation: 'Funnel Explorations identify drop-off points in your user journey, guiding optimisation priorities.' },
              { questionText: 'What is the purpose of linking GA4 to Google Search Console?', questionType: 'multiple-choice', options: [{ text: 'To enable GA4 to run Google Ads campaigns', isCorrect: false }, { text: 'To see organic search queries that bring users to your site inside GA4 reports', isCorrect: true }, { text: 'To import paid keyword data into GA4', isCorrect: false }, { text: 'To sync GA4 conversion data with Google My Business', isCorrect: false }], points: 1, explanation: 'Linking Search Console brings organic query, impression, and CTR data into your GA4 reports.' },
            ],
          },
        ],
      },
    ],
  },
  // ─── 11 ──────────────────────────────────────────────────────────────────
  {
    title: 'Brand Identity Design',
    description: 'Build a cohesive visual brand from logo and colour palette to typography and brand guidelines that sets your business apart.',
    thumbnail: '/seed-images/branding.jpg',
    category: 'Branding',
    difficulty: 'beginner',
    tags: ['branding', 'logo design', 'brand identity', 'visual design', 'typography'],
    overview: 'A strong brand identity builds trust and recognition. This course walks through every visual element of branding and shows you how to build a professional brand system.',
    estimatedDuration: 260,
    chapters: [
      {
        title: 'Brand Identity Fundamentals',
        description: 'What makes a brand and why visual identity matters.',
        items: [
          {
            type: 'lesson',
            title: 'Brand vs Logo — Understanding the Difference',
            content: 'A logo is just one part of your brand. Your brand is the total perception customers have of your business. This lesson covers brand positioning, personality, voice, and why consistency across touchpoints is non-negotiable.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('l-S2Y3SF3mM'), caption: 'Beginning Graphic Design — Branding & Identity' }],
          },
          {
            type: 'lesson',
            title: 'Colour Psychology & Brand Palettes',
            content: 'Colours trigger emotions and associations. Blue signals trust, red signals urgency, green signals growth. Learn colour theory, how to build a primary + secondary palette, and tools like Coolors and Adobe Color.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: THB('l-S2Y3SF3mM'), caption: 'Brand & identity fundamentals overview' }, { type: 'image', url: PIC('colourpsychology'), caption: 'Colour psychology in brand identity' }],
          },
          {
            type: 'quiz',
            title: 'Brand Fundamentals Quiz',
            description: 'Test your understanding of brand identity basics.',
            questions: [
              { questionText: 'What is brand positioning?', questionType: 'multiple-choice', options: [{ text: 'The physical location where your brand is marketed', isCorrect: false }, { text: 'How your brand is perceived in the minds of customers relative to competitors', isCorrect: true }, { text: 'The price point at which your product sits in the market', isCorrect: false }, { text: 'The social media platforms where your brand is active', isCorrect: false }], points: 1, explanation: 'Brand positioning defines the unique space your brand occupies in the customer\'s mind.' },
              { questionText: 'Which colour is commonly associated with trust and professionalism?', questionType: 'multiple-choice', options: [{ text: 'Red', isCorrect: false }, { text: 'Yellow', isCorrect: false }, { text: 'Blue', isCorrect: true }, { text: 'Orange', isCorrect: false }], points: 1, explanation: 'Blue is used by banks, tech companies (Facebook, LinkedIn, PayPal) to signal trust and reliability.' },
              { questionText: 'What is a brand style guide?', questionType: 'multiple-choice', options: [{ text: 'A social media content calendar', isCorrect: false }, { text: 'A document defining how brand elements (logo, colours, fonts, tone) must be used', isCorrect: true }, { text: 'A checklist for hiring brand designers', isCorrect: false }, { text: 'A business plan template for startups', isCorrect: false }], points: 1, explanation: 'Brand style guides ensure visual consistency across every touchpoint and every team member.' },
            ],
          },
        ],
      },
      {
        title: 'Visual Identity Design',
        description: 'Design the core elements of your brand\'s visual system.',
        items: [
          {
            type: 'lesson',
            title: 'Logo Design Principles',
            content: 'A great logo is simple, memorable, versatile, and timeless. Study the anatomy of successful logos, learn the five logo types (wordmark, lettermark, icon, combination, emblem), and understand when to use each.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('Qe_eeRy9E4M'), caption: 'Brand Identity Design for Beginners' }, { type: 'image', url: PIC('logodesign'), caption: 'Five types of logo design' }],
          },
          {
            type: 'lesson',
            title: 'Typography & Font Pairing',
            content: 'Typography is 95% of brand design. Serif, sans-serif, script, and display fonts each carry different personalities. Learn how to pair fonts for hierarchy and readability using Google Fonts and Adobe Fonts.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('typography'), caption: 'Font pairing guide for brands' }],
          },
          {
            type: 'quiz',
            title: 'Visual Identity Quiz',
            description: 'Check your visual design knowledge.',
            questions: [
              { questionText: 'What type of logo uses the brand\'s full name in a distinctive typographic treatment?', questionType: 'multiple-choice', options: [{ text: 'Icon (symbol) mark', isCorrect: false }, { text: 'Lettermark', isCorrect: false }, { text: 'Wordmark', isCorrect: true }, { text: 'Emblem', isCorrect: false }], points: 1, explanation: 'Wordmarks like Google and Coca-Cola use customised text as the complete logo.' },
              { questionText: 'What is the primary purpose of visual hierarchy in design?', questionType: 'multiple-choice', options: [{ text: 'To use as many colours as possible', isCorrect: false }, { text: 'To guide the viewer\'s eye to the most important information first', isCorrect: true }, { text: 'To make designs look more complex', isCorrect: false }, { text: 'To ensure all elements are the same size', isCorrect: false }], points: 1, explanation: 'Visual hierarchy directs attention using size, weight, colour, and positioning.' },
              { questionText: 'Which font type is generally considered more traditional and formal?', questionType: 'multiple-choice', options: [{ text: 'Sans-serif', isCorrect: false }, { text: 'Display', isCorrect: false }, { text: 'Serif', isCorrect: true }, { text: 'Monospace', isCorrect: false }], points: 1, explanation: 'Serif fonts (Times New Roman, Georgia) have decorative strokes and are seen as traditional and authoritative.' },
            ],
          },
        ],
      },
      {
        title: 'Brand Guidelines & Application',
        description: 'Document and apply your brand consistently everywhere.',
        items: [
          {
            type: 'lesson',
            title: 'Creating a Brand Style Guide',
            content: 'Your style guide is the rulebook every designer, marketer, and employee follows. Learn what to include: logo usage rules, colour codes (HEX/RGB/CMYK/Pantone), typography specimens, imagery style, and tone of voice guidelines.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('zuGCOEz-inA'), caption: 'Learn Brand Identity Design with 6 Full Projects' }],
          },
          {
            type: 'lesson',
            title: 'Applying Your Brand Across Channels',
            content: 'Your brand must look cohesive on business cards, website, social media, email, and packaging. Walk through how to adapt your brand identity for each medium while maintaining visual consistency.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('brandapplication'), caption: 'Brand identity applied across touchpoints' }],
          },
          {
            type: 'quiz',
            title: 'Brand Guidelines Quiz',
            description: 'Validate your brand guidelines knowledge.',
            questions: [
              { questionText: 'What colour format is used for digital screens?', questionType: 'multiple-choice', options: [{ text: 'CMYK', isCorrect: false }, { text: 'Pantone', isCorrect: false }, { text: 'HEX / RGB', isCorrect: true }, { text: 'Spot colour', isCorrect: false }], points: 1, explanation: 'HEX (web) and RGB (screen) are digital colour systems; CMYK and Pantone are for print.' },
              { questionText: 'What is the purpose of clear space rules in logo usage?', questionType: 'multiple-choice', options: [{ text: 'To ensure the logo is always transparent', isCorrect: false }, { text: 'To define the minimum space that must surround the logo to keep it from being cluttered', isCorrect: true }, { text: 'To specify how large the logo must be on a webpage', isCorrect: false }, { text: 'To set the padding inside the logo icon', isCorrect: false }], points: 1, explanation: 'Clear space rules protect the logo\'s integrity by preventing other elements from crowding it.' },
              { questionText: 'What is brand consistency?', questionType: 'multiple-choice', options: [{ text: 'Using the same design tool across all projects', isCorrect: false }, { text: 'Presenting the same visual identity, tone, and messaging across every platform and touchpoint', isCorrect: true }, { text: 'Posting on social media every day at the same time', isCorrect: false }, { text: 'Keeping product prices the same across all channels', isCorrect: false }], points: 1, explanation: 'Consistency builds recognition — customers need to see a brand 5–7 times before remembering it.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 12 ──────────────────────────────────────────────────────────────────
  {
    title: 'Copywriting Masterclass',
    description: 'Write words that sell. Master persuasive copywriting for ads, websites, emails, and social media.',
    thumbnail: '/seed-images/copywriting.jpg',
    category: 'Copywriting',
    difficulty: 'beginner',
    tags: ['copywriting', 'persuasion', 'sales copy', 'direct response', 'headlines', 'conversion'],
    overview: 'Copywriting is the art of writing to persuade. This course teaches the frameworks, formulas, and psychological triggers that make copy convert — across every channel.',
    estimatedDuration: 240,
    chapters: [
      {
        title: 'Copywriting Foundations',
        description: 'The principles behind all persuasive writing.',
        items: [
          {
            type: 'lesson',
            title: 'What is Copywriting & Why It Matters',
            content: 'Copywriting is salesmanship in print. Every word on your website, ad, or email is either helping or hurting conversions. This lesson covers the difference between copywriting and content writing, and the psychological principles behind persuasion.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('Pum2gV7N_9A'), caption: 'Practical Copywriting Course for Beginners — Free Course' }],
          },
          {
            type: 'lesson',
            title: 'Know Your Customer — The Foundation of Great Copy',
            content: 'Great copy starts with deep customer understanding. Learn voice-of-customer research: mining reviews, running surveys, and creating a swipe file of your customers\' actual language to use in your copy.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: THB('Pum2gV7N_9A'), caption: 'Customer research for copywriters' }, { type: 'image', url: PIC('customerresearch'), caption: 'Voice-of-customer research process' }],
          },
          {
            type: 'quiz',
            title: 'Copy Foundations Quiz',
            description: 'Test your copywriting fundamentals.',
            questions: [
              { questionText: 'What is the primary goal of direct response copywriting?', questionType: 'multiple-choice', options: [{ text: 'To win design awards', isCorrect: false }, { text: 'To inform the reader about a topic', isCorrect: false }, { text: 'To elicit an immediate, measurable response from the reader', isCorrect: true }, { text: 'To build long-term brand awareness', isCorrect: false }], points: 1, explanation: 'Direct response copy has one job: get the reader to act right now (buy, sign up, click).' },
              { questionText: 'What is a "swipe file" used for by copywriters?', questionType: 'multiple-choice', options: [{ text: 'A file for stolen website content', isCorrect: false }, { text: 'A collection of effective ads, emails, and copy for inspiration and reference', isCorrect: true }, { text: 'A file of rejected copy drafts', isCorrect: false }, { text: 'A tool for checking plagiarism', isCorrect: false }], points: 1, explanation: 'A swipe file is every copywriter\'s collection of great copy examples they can reference for structure and ideas.' },
              { questionText: 'What does "features vs benefits" mean in copywriting?', questionType: 'multiple-choice', options: [{ text: 'Features are what you say; benefits are how you say it', isCorrect: false }, { text: 'Features describe what a product does; benefits describe what the customer gains', isCorrect: true }, { text: 'Features are for B2B; benefits are for B2C', isCorrect: false }, { text: 'Features go in headlines; benefits go in body copy', isCorrect: false }], points: 1, explanation: 'People buy benefits (outcomes), not features (specs). "Saves 3 hours a day" beats "12 automations."' },
            ],
          },
        ],
      },
      {
        title: 'Copy Formulas That Convert',
        description: 'Proven frameworks you can apply immediately.',
        items: [
          {
            type: 'lesson',
            title: 'AIDA, PAS & Other Copy Frameworks',
            content: 'AIDA (Attention, Interest, Desire, Action) and PAS (Problem, Agitate, Solution) are the two most widely used copy frameworks. This lesson shows you how to apply both, plus the Before-After-Bridge and 4Ps formula with real examples.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('9EHsT2xtVOY'), caption: 'Full Free Copywriting Course for Beginners 2024' }, { type: 'image', url: PIC('copyformulas'), caption: 'AIDA and PAS frameworks applied' }],
          },
          {
            type: 'lesson',
            title: 'Writing Headlines That Stop the Scroll',
            content: 'David Ogilvy said 80 cents of your dollar is spent on the headline. Learn the four U\'s (Urgent, Unique, Ultra-specific, Useful), how to write 10 headline variations and pick the strongest, and split-testing methodology.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('headlines'), caption: '10-headline formula examples' }],
          },
          {
            type: 'quiz',
            title: 'Copy Frameworks Quiz',
            description: 'Check your knowledge of copy formulas.',
            questions: [
              { questionText: 'In the PAS framework, what does each letter stand for?', questionType: 'multiple-choice', options: [{ text: 'Promote, Advertise, Sell', isCorrect: false }, { text: 'Problem, Agitate, Solution', isCorrect: true }, { text: 'Persuade, Attract, Satisfy', isCorrect: false }, { text: 'Position, Appeal, Sequence', isCorrect: false }], points: 1, explanation: 'PAS: Name the problem, agitate the pain, then present your product as the solution.' },
              { questionText: 'What are the "Four U\'s" used for in headline writing?', questionType: 'multiple-choice', options: [{ text: 'Understanding, Usage, Utility, Uniqueness', isCorrect: false }, { text: 'Urgent, Unique, Ultra-specific, Useful', isCorrect: true }, { text: 'User, Upsell, Upgrade, Update', isCorrect: false }, { text: 'Universal, Unified, Updated, Understandable', isCorrect: false }], points: 1, explanation: 'The Four U\'s ensure your headline is compelling from every psychological angle.' },
              { questionText: 'According to copywriting legend David Ogilvy, what percentage of your advertising dollar is spent on the headline?', questionType: 'multiple-choice', options: [{ text: '20 cents', isCorrect: false }, { text: '50 cents', isCorrect: false }, { text: '80 cents', isCorrect: true }, { text: '99 cents', isCorrect: false }], points: 1, explanation: 'Ogilvy\'s famous observation: "On average, five times as many people read the headline as the body copy."' },
            ],
          },
        ],
      },
      {
        title: 'Writing for Specific Channels',
        description: 'Apply copywriting to ads, email, landing pages, and social.',
        items: [
          {
            type: 'lesson',
            title: 'Landing Page & Sales Page Copy',
            content: 'A landing page has one job: convert. Walk through the anatomy of a high-converting landing page — hero section, social proof, benefits list, objection handling, and multiple strategic CTAs. Includes a full page audit walkthrough.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('hTvoQqvdhrc'), caption: 'How to Learn Copywriting in 7 Days — Complete Tutorial' }],
          },
          {
            type: 'lesson',
            title: 'Ad Copy & Social Media Copy',
            content: 'Facebook ads, Google ads, and Instagram captions each have unique constraints and conventions. Learn character limits, ad copy formulas, how to write CTAs that match ad intent, and A/B testing copy variations.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('adcopy'), caption: 'Ad copy frameworks by platform' }],
          },
          {
            type: 'quiz',
            title: 'Channel Copy Quiz',
            description: 'Validate your multi-channel copy skills.',
            questions: [
              { questionText: 'What is the most important element on a landing page?', questionType: 'multiple-choice', options: [{ text: 'The footer', isCorrect: false }, { text: 'The above-the-fold headline and subheadline', isCorrect: true }, { text: 'The background colour', isCorrect: false }, { text: 'The number of social media icons', isCorrect: false }], points: 1, explanation: 'Above-the-fold content (visible without scrolling) determines whether visitors stay or leave.' },
              { questionText: 'What is social proof in copywriting?', questionType: 'multiple-choice', options: [{ text: 'Sharing content on social media', isCorrect: false }, { text: 'Testimonials, reviews, case studies, and endorsements that validate your claims', isCorrect: true }, { text: 'Proof that your ad was published on a social platform', isCorrect: false }, { text: 'A social media follower count displayed on a landing page', isCorrect: false }], points: 1, explanation: 'Social proof removes buyer doubt by showing others have successfully used your product.' },
              { questionText: 'What is A/B testing in copywriting?', questionType: 'multiple-choice', options: [{ text: 'Writing two drafts and choosing the best one yourself', isCorrect: false }, { text: 'Testing two variations of copy with real audiences to see which converts better', isCorrect: true }, { text: 'Having two different copywriters write the same brief', isCorrect: false }, { text: 'Alternating between two different copy styles each month', isCorrect: false }], points: 1, explanation: 'A/B testing removes guesswork — data tells you what actually resonates with your audience.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 13 ──────────────────────────────────────────────────────────────────
  {
    title: 'Influencer Marketing Strategy',
    description: 'Build and execute influencer campaigns that drive real brand awareness and measurable sales.',
    thumbnail: '/seed-images/influencer-marketing.jpg',
    category: 'Influencer Marketing',
    difficulty: 'intermediate',
    tags: ['influencer marketing', 'influencers', 'ugc', 'brand deals', 'creator economy', 'instagram'],
    overview: 'The influencer marketing industry is worth over $21 billion. This course teaches you how to find the right creators, negotiate deals, run campaigns, and measure ROI.',
    estimatedDuration: 240,
    chapters: [
      {
        title: 'The Influencer Marketing Landscape',
        description: 'Understand the ecosystem before you spend a dollar.',
        items: [
          {
            type: 'lesson',
            title: 'Why Influencer Marketing Works',
            content: 'Consumers trust people over brands. Influencer marketing leverages authentic voices to reach new audiences. This lesson covers the influencer tiers (nano, micro, macro, mega), platform breakdown, and how the creator economy is evolving.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('qLsiF8qep9s'), caption: 'Influencer Marketing Tutorial — Beginner to Pro in 20 Minutes' }],
          },
          {
            type: 'lesson',
            title: 'Setting Campaign Objectives & KPIs',
            content: 'Awareness, engagement, traffic, and sales each require different influencer strategies. Learn how to match campaign objectives to influencer tier, platform, and content format — and which metrics prove ROI.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: THB('qLsiF8qep9s'), caption: 'Influencer tier comparison' }, { type: 'image', url: PIC('influencerkpi'), caption: 'Influencer campaign KPI framework' }],
          },
          {
            type: 'quiz',
            title: 'Influencer Landscape Quiz',
            description: 'Test your understanding of the influencer ecosystem.',
            questions: [
              { questionText: 'What is a "micro-influencer"?', questionType: 'multiple-choice', options: [{ text: 'An influencer with fewer than 100 followers', isCorrect: false }, { text: 'An influencer with 10,000–100,000 followers and high niche engagement', isCorrect: true }, { text: 'An influencer who charges very low fees', isCorrect: false }, { text: 'An influencer under 18 years old', isCorrect: false }], points: 1, explanation: 'Micro-influencers have smaller but highly engaged audiences — often outperforming mega-influencers in ROI.' },
              { questionText: 'What is UGC in influencer marketing?', questionType: 'multiple-choice', options: [{ text: 'Unique Generated Content from AI tools', isCorrect: false }, { text: 'User-Generated Content created by real customers and fans', isCorrect: true }, { text: 'Uniform Global Campaign content', isCorrect: false }, { text: 'Unified Growth Channel strategy', isCorrect: false }], points: 1, explanation: 'UGC is content organically created by users — highly authentic and trusted by other consumers.' },
              { questionText: 'Which metric best measures influencer campaign ROI?', questionType: 'multiple-choice', options: [{ text: 'The influencer\'s follower count', isCorrect: false }, { text: 'Earned Media Value (EMV) and tracked conversions', isCorrect: true }, { text: 'Number of posts published', isCorrect: false }, { text: 'The influencer\'s profile aesthetic', isCorrect: false }], points: 1, explanation: 'EMV estimates the equivalent paid media cost of earned influencer content, while tracked links/codes measure direct conversions.' },
            ],
          },
        ],
      },
      {
        title: 'Finding & Vetting Influencers',
        description: 'Identify authentic creators who match your brand.',
        items: [
          {
            type: 'lesson',
            title: 'Finding the Right Influencers',
            content: 'Platforms like Modash, AspireIQ, and Creator.co help you filter by niche, engagement rate, audience demographics, and fake follower percentage. Learn how to use free methods too: hashtag research, competitor tagging, and creator marketplaces.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('grz5CtY8u1c'), caption: 'Ultimate Influencer Marketing Tutorial — Shopify & Modash' }, { type: 'image', url: PIC('influencerfinding'), caption: 'Influencer discovery framework' }],
          },
          {
            type: 'lesson',
            title: 'Vetting Influencers — Red Flags & Green Flags',
            content: 'Fake followers, engagement pods, and audience mismatches can waste your budget. Learn how to analyse engagement rate (below 1% on large accounts is a red flag), audience authenticity, past brand partnerships, and content quality.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('influencervetting'), caption: 'Influencer vetting checklist' }],
          },
          {
            type: 'quiz',
            title: 'Influencer Vetting Quiz',
            description: 'Check your influencer selection knowledge.',
            questions: [
              { questionText: 'What is a good engagement rate benchmark for an Instagram influencer with 100K followers?', questionType: 'multiple-choice', options: [{ text: '0.1%', isCorrect: false }, { text: '1–3%', isCorrect: true }, { text: '20%', isCorrect: false }, { text: 'Engagement rate doesn\'t matter', isCorrect: false }], points: 1, explanation: 'For accounts with 100K followers, 1–3% engagement rate is healthy; below 0.5% suggests a disengaged audience.' },
              { questionText: 'What is an "engagement pod"?', questionType: 'multiple-choice', options: [{ text: 'A group of brand ambassadors on retainer', isCorrect: false }, { text: 'A group of influencers who artificially inflate each other\'s engagement by liking and commenting on each other\'s posts', isCorrect: true }, { text: 'A paid platform for managing influencer campaigns', isCorrect: false }, { text: 'A content format where multiple influencers collaborate', isCorrect: false }], points: 1, explanation: 'Engagement pods create fake engagement signals, making influencers appear more popular than they are.' },
              { questionText: 'Why is audience demographic alignment important in influencer selection?', questionType: 'multiple-choice', options: [{ text: 'It affects how much the influencer charges', isCorrect: false }, { text: 'An influencer\'s followers must match your target customer profile for the campaign to drive relevant results', isCorrect: true }, { text: 'Platforms rank demographically aligned content higher', isCorrect: false }, { text: 'It is required for FTC compliance', isCorrect: false }], points: 1, explanation: 'Even a huge influencer with the wrong audience demographics will produce poor campaign results.' },
            ],
          },
        ],
      },
      {
        title: 'Campaigns, Contracts & ROI',
        description: 'Run professional campaigns from briefing to results.',
        items: [
          {
            type: 'lesson',
            title: 'Writing a Creative Brief & Negotiating Contracts',
            content: 'A clear creative brief sets the influencer up for success. Cover: campaign objectives, key messages, mandatory disclosures, dos and don\'ts, deliverables, deadlines, and usage rights. Learn how to negotiate rates, exclusivity, and content licensing.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('IahLmZ7KoqQ'), caption: 'Dropshipping Influencer Marketing Tutorial (2024)' }],
          },
          {
            type: 'lesson',
            title: 'Tracking ROI & Measuring Campaign Success',
            content: 'Unique discount codes, UTM-tagged links, and affiliate tracking are the primary conversion measurement methods. Learn how to build a campaign reporting dashboard, calculate cost-per-acquisition, and decide whether to renew influencer partnerships.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('influencerROI'), caption: 'Influencer campaign reporting template' }],
          },
          {
            type: 'quiz',
            title: 'Campaign & ROI Quiz',
            description: 'Validate your campaign management knowledge.',
            questions: [
              { questionText: 'What FTC regulation must influencers follow when posting sponsored content?', questionType: 'multiple-choice', options: [{ text: 'They must get written permission from followers before each post', isCorrect: false }, { text: 'They must clearly disclose their partnership (e.g., #ad, #sponsored, "Paid partnership with")', isCorrect: true }, { text: 'They must only post product reviews, not opinions', isCorrect: false }, { text: 'They must register with the FTC as an advertising agency', isCorrect: false }], points: 1, explanation: 'FTC guidelines require clear, conspicuous disclosure of any material connection between a brand and creator.' },
              { questionText: 'What is content usage rights in an influencer contract?', questionType: 'multiple-choice', options: [{ text: 'The influencer\'s right to delete the content', isCorrect: false }, { text: 'The permission the brand has to re-use the influencer\'s content in its own ads and channels', isCorrect: true }, { text: 'Copyright ownership over the brand\'s brief', isCorrect: false }, { text: 'The number of posts the influencer can make about the brand', isCorrect: false }], points: 1, explanation: 'Usage rights let brands repurpose UGC content — this is often worth more than the campaign impression itself.' },
              { questionText: 'What is the easiest way to track direct sales from an influencer partnership?', questionType: 'multiple-choice', options: [{ text: 'Ask customers how they heard about you', isCorrect: false }, { text: 'Provide the influencer with a unique discount code or affiliate tracking link', isCorrect: true }, { text: 'Monitor website traffic on the day of the post', isCorrect: false }, { text: 'Count the number of new followers gained after the campaign', isCorrect: false }], points: 1, explanation: 'Unique codes and UTM links attribute conversions directly to the influencer\'s content.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 14 ──────────────────────────────────────────────────────────────────
  {
    title: 'NFTs: Create, Sell & Invest',
    description: 'Understand what NFTs are, how to create and mint them, and how to navigate the NFT marketplace as a creator or collector.',
    thumbnail: '/seed-images/nft.jpg',
    category: 'NFTs',
    difficulty: 'intermediate',
    tags: ['nft', 'non-fungible token', 'opensea', 'digital art', 'web3', 'metaverse'],
    overview: 'NFTs have transformed digital ownership. This course covers the technology behind them, how to mint your own, and the strategies creators and investors use to profit in this space.',
    estimatedDuration: 240,
    chapters: [
      {
        title: 'Understanding NFTs',
        description: 'What NFTs are, how they work, and why they matter.',
        items: [
          {
            type: 'lesson',
            title: 'What is an NFT?',
            content: 'NFT stands for Non-Fungible Token. Unlike Bitcoin, which is fungible (each coin is identical), each NFT is unique and irreplaceable. NFTs use blockchain technology to prove digital ownership of art, music, collectibles, and more.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('B7-aTdybQDY'), caption: 'What is NFT and How it Works? — Explained for Beginners' }],
          },
          {
            type: 'lesson',
            title: 'NFT Standards & Blockchain Networks',
            content: 'Most NFTs live on Ethereum using the ERC-721 or ERC-1155 standard. Alternatives like Solana, Polygon, and Flow offer lower fees. This lesson explains gas fees, layer-2 solutions, and which network to choose for your NFT project.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: THB('B7-aTdybQDY'), caption: 'NFT types and use cases' }, { type: 'image', url: PIC('nftblockchain'), caption: 'NFT blockchain network comparison' }],
          },
          {
            type: 'quiz',
            title: 'NFT Basics Quiz',
            description: 'Test your NFT fundamentals.',
            questions: [
              { questionText: 'What makes an NFT "non-fungible"?', questionType: 'multiple-choice', options: [{ text: 'It cannot be bought or sold', isCorrect: false }, { text: 'Each token is unique and cannot be exchanged 1-for-1 with another identical token', isCorrect: true }, { text: 'It is stored on a physical server', isCorrect: false }, { text: 'It has no monetary value', isCorrect: false }], points: 1, explanation: 'Non-fungible means irreplaceable — each NFT has unique metadata distinguishing it from all others.' },
              { questionText: 'What is a "gas fee" in NFT transactions?', questionType: 'multiple-choice', options: [{ text: 'A platform subscription fee charged by NFT marketplaces', isCorrect: false }, { text: 'The transaction fee paid to the blockchain network to process an NFT minting or sale', isCorrect: true }, { text: 'A tax charged on NFT profits', isCorrect: false }, { text: 'A fee for converting crypto to fiat currency', isCorrect: false }], points: 1, explanation: 'Gas fees compensate miners/validators for the computing power used to process blockchain transactions.' },
              { questionText: 'Which token standard is most commonly used for unique, one-of-a-kind NFTs on Ethereum?', questionType: 'multiple-choice', options: [{ text: 'ERC-20', isCorrect: false }, { text: 'ERC-721', isCorrect: true }, { text: 'ERC-1155', isCorrect: false }, { text: 'BEP-20', isCorrect: false }], points: 1, explanation: 'ERC-721 is the original NFT standard for unique tokens. ERC-1155 allows both fungible and non-fungible tokens in one contract.' },
            ],
          },
        ],
      },
      {
        title: 'Creating & Minting NFTs',
        description: 'Turn your digital work into tradeable blockchain assets.',
        items: [
          {
            type: 'lesson',
            title: 'Setting Up Your Wallet & Creating NFTs',
            content: 'MetaMask is the most popular Web3 wallet for NFT creators. This lesson covers: installing MetaMask, funding it with ETH, creating your first NFT artwork, and understanding metadata (name, description, attributes, royalties).',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('T2DWY-iLLys'), caption: 'NFT vs Crypto — NFT Explained — Simplilearn' }, { type: 'image', url: PIC('metamask'), caption: 'MetaMask wallet setup guide' }],
          },
          {
            type: 'lesson',
            title: 'Minting on OpenSea & Other Marketplaces',
            content: 'OpenSea, Rarible, Foundation, and Blur are the leading NFT marketplaces. Walk through minting on OpenSea\'s free "lazy minting" system, setting royalties (5–10% is standard), and listing for sale.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('opensea'), caption: 'OpenSea minting walkthrough' }],
          },
          {
            type: 'quiz',
            title: 'Minting Quiz',
            description: 'Check your NFT creation knowledge.',
            questions: [
              { questionText: 'What is "lazy minting" on NFT platforms?', questionType: 'multiple-choice', options: [{ text: 'Minting low-quality NFTs quickly', isCorrect: false }, { text: 'Deferring the blockchain minting until an NFT is actually purchased, avoiding upfront gas fees', isCorrect: true }, { text: 'Minting NFTs during off-peak hours to save gas', isCorrect: false }, { text: 'A type of batch minting for large collections', isCorrect: false }], points: 1, explanation: 'Lazy minting lets creators list NFTs for free — the gas fee is paid by the buyer at time of purchase.' },
              { questionText: 'What are NFT royalties?', questionType: 'multiple-choice', options: [{ text: 'The tax paid to the government on NFT sales', isCorrect: false }, { text: 'A percentage of secondary sales that automatically goes to the original creator', isCorrect: true }, { text: 'A fee paid to the marketplace for each listing', isCorrect: false }, { text: 'The profit earned from the first sale of an NFT', isCorrect: false }], points: 1, explanation: 'Smart contract royalties ensure creators earn 5–10% every time their NFT resells on the secondary market.' },
              { questionText: 'What information is stored in NFT metadata?', questionType: 'multiple-choice', options: [{ text: 'The owner\'s personal identity', isCorrect: false }, { text: 'The NFT\'s name, description, image URL, and attributes/traits', isCorrect: true }, { text: 'The buyer\'s wallet balance', isCorrect: false }, { text: 'The gas fee history of the token', isCorrect: false }], points: 1, explanation: 'NFT metadata defines the token\'s properties — typically stored on IPFS for decentralised permanence.' },
            ],
          },
        ],
      },
      {
        title: 'Buying, Selling & Investing in NFTs',
        description: 'Navigate the market safely as a collector and investor.',
        items: [
          {
            type: 'lesson',
            title: 'Research & Due Diligence for NFT Buyers',
            content: 'Most NFT projects fail. Learn how to evaluate a project: team doxxing, roadmap credibility, community size and quality, on-chain analytics (floor price, volume, holder distribution), and contract audits.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('GHNyGIxF7yY'), caption: 'What is NFT and Why People Need It — Gary Vee' }],
          },
          {
            type: 'lesson',
            title: 'NFT Marketing — Building a Successful Collection',
            content: 'Successful NFT launches rely on community-first marketing. Learn how to build a Discord community, run a Twitter/X campaign, create a whitelist strategy, and generate pre-launch hype that drives a sell-out mint.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('nftmarketing'), caption: 'NFT launch marketing timeline' }],
          },
          {
            type: 'quiz',
            title: 'NFT Market Quiz',
            description: 'Validate your NFT investment knowledge.',
            questions: [
              { questionText: 'What is "floor price" in NFT collections?', questionType: 'multiple-choice', options: [{ text: 'The price the creator set at the original mint', isCorrect: false }, { text: 'The lowest listed price for any NFT in a collection on the secondary market', isCorrect: true }, { text: 'The average sale price across all NFTs in a collection', isCorrect: false }, { text: 'The minimum bid accepted in an NFT auction', isCorrect: false }], points: 1, explanation: 'Floor price is the entry-level cost to own any NFT from a collection — a key market health indicator.' },
              { questionText: 'What is a "whitelist" in NFT launches?', questionType: 'multiple-choice', options: [{ text: 'A list of approved NFT marketplaces', isCorrect: false }, { text: 'A pre-approved list of wallets that can mint an NFT before the public sale', isCorrect: true }, { text: 'A list of NFTs verified as authentic by OpenSea', isCorrect: false }, { text: 'A list of gas-efficient times to mint', isCorrect: false }], points: 1, explanation: 'Whitelists reward early community members with priority access — reducing gas wars on launch day.' },
              { questionText: 'What does "DYOR" specifically mean when evaluating an NFT project?', questionType: 'multiple-choice', options: [{ text: 'Design Your Own Royalties', isCorrect: false }, { text: 'Do Your Own Research — independently verify all claims before investing', isCorrect: true }, { text: 'Diversify Your Own Returns', isCorrect: false }, { text: 'Deploy Your Optimised Resources', isCorrect: false }], points: 1, explanation: 'DYOR is critical in NFTs — many projects are scams or fail to deliver on their roadmap.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 15 ──────────────────────────────────────────────────────────────────
  {
    title: 'DeFi & Decentralised Finance',
    description: 'Master decentralised finance — from lending and borrowing to yield farming and liquidity provision.',
    thumbnail: '/seed-images/defi.jpg',
    category: 'DeFi',
    difficulty: 'intermediate',
    tags: ['defi', 'decentralised finance', 'yield farming', 'liquidity', 'uniswap', 'aave', 'compound'],
    overview: 'DeFi has created a parallel financial system with over $40 billion in TVL. This course teaches how it works, which protocols to use, and how to manage the risks.',
    estimatedDuration: 280,
    chapters: [
      {
        title: 'DeFi Fundamentals',
        description: 'What DeFi is and how it differs from traditional finance.',
        items: [
          {
            type: 'lesson',
            title: 'Introduction to Decentralised Finance',
            content: 'DeFi recreates traditional financial services (lending, borrowing, trading, earning interest) using smart contracts on blockchains — without banks or intermediaries. This lesson covers the DeFi ecosystem, TVL, and the key protocols.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('btB__oHQ0sU'), caption: 'What is DeFi? A Beginner\'s Guide to Decentralized Finance' }],
          },
          {
            type: 'lesson',
            title: 'Smart Contracts & DeFi Protocols',
            content: 'Smart contracts are self-executing code that powers every DeFi protocol. Learn how smart contracts enforce rules without intermediaries, and get introduced to the major protocols: Uniswap, Aave, Compound, MakerDAO, and Curve.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: THB('btB__oHQ0sU'), caption: 'DeFi ecosystem overview' }, { type: 'image', url: PIC('defiprotocols'), caption: 'Major DeFi protocols comparison' }],
          },
          {
            type: 'quiz',
            title: 'DeFi Fundamentals Quiz',
            description: 'Test your DeFi foundational knowledge.',
            questions: [
              { questionText: 'What does TVL stand for in DeFi?', questionType: 'multiple-choice', options: [{ text: 'Total Verified Liquidity', isCorrect: false }, { text: 'Total Value Locked — the total assets deposited in DeFi protocols', isCorrect: true }, { text: 'Transaction Validation Layer', isCorrect: false }, { text: 'Tokenised Vault Ledger', isCorrect: false }], points: 1, explanation: 'TVL measures the total value of crypto assets deposited across DeFi protocols — a key health indicator.' },
              { questionText: 'What is a smart contract?', questionType: 'multiple-choice', options: [{ text: 'A legal agreement signed with blockchain verification', isCorrect: false }, { text: 'Self-executing code on a blockchain that enforces agreement terms automatically', isCorrect: true }, { text: 'A smart way to write a traditional financial contract', isCorrect: false }, { text: 'An AI system that reviews financial contracts', isCorrect: false }], points: 1, explanation: 'Smart contracts remove the need for intermediaries — code enforces every rule automatically.' },
              { questionText: 'What distinguishes DeFi from traditional finance (TradFi)?', questionType: 'multiple-choice', options: [{ text: 'DeFi uses physical bank branches', isCorrect: false }, { text: 'DeFi is permissionless — anyone with a wallet can participate without a bank or identity check', isCorrect: true }, { text: 'DeFi requires a credit score to borrow', isCorrect: false }, { text: 'DeFi is regulated by central banks', isCorrect: false }], points: 1, explanation: 'Permissionless access is DeFi\'s core value — open 24/7 to anyone worldwide.' },
            ],
          },
        ],
      },
      {
        title: 'Lending, Borrowing & Yield Farming',
        description: 'Put your crypto to work generating yield.',
        items: [
          {
            type: 'lesson',
            title: 'Lending & Borrowing on Aave & Compound',
            content: 'Aave and Compound are the leading DeFi lending protocols. Supply assets to earn interest, or use your crypto as collateral to borrow other assets. Learn liquidation risk, health factors, and over-collateralisation.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('FO1NxxkFZZk'), caption: 'DeFi Explained — Decentralized Finance Guide for Beginners' }, { type: 'image', url: PIC('aave'), caption: 'Aave lending protocol walkthrough' }],
          },
          {
            type: 'lesson',
            title: 'Yield Farming & Liquidity Mining',
            content: 'Yield farming earns additional token rewards by providing liquidity to DeFi protocols. Learn about liquidity pools (e.g., Uniswap), APY vs APR, impermanent loss, and how to evaluate farming opportunities vs risks.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('yieldfarm'), caption: 'Yield farming strategy comparison' }],
          },
          {
            type: 'quiz',
            title: 'Yield & Lending Quiz',
            description: 'Check your DeFi lending knowledge.',
            questions: [
              { questionText: 'What is over-collateralisation in DeFi lending?', questionType: 'multiple-choice', options: [{ text: 'When you deposit more collateral than required to borrow a smaller amount', isCorrect: true }, { text: 'When a protocol is over-subscribed with lenders', isCorrect: false }, { text: 'When you borrow more than the protocol allows', isCorrect: false }, { text: 'When collateral value drops below 100% of the loan', isCorrect: false }], points: 1, explanation: 'DeFi loans are over-collateralised (e.g., deposit $150 ETH to borrow $100 USDC) because there is no credit system.' },
              { questionText: 'What is impermanent loss in a liquidity pool?', questionType: 'multiple-choice', options: [{ text: 'The permanent loss of funds due to a smart contract hack', isCorrect: false }, { text: 'A temporary loss relative to simply holding tokens, caused by price divergence between paired assets', isCorrect: true }, { text: 'Transaction fees lost when providing liquidity', isCorrect: false }, { text: 'Interest lost when withdrawing too early', isCorrect: false }], points: 1, explanation: 'Impermanent loss occurs when one asset in a pool changes price relative to the other — it becomes permanent if you withdraw.' },
              { questionText: 'What does APY stand for in DeFi?', questionType: 'multiple-choice', options: [{ text: 'Annual Percentage Yield — including compounding effects', isCorrect: true }, { text: 'Asset Productivity Yield', isCorrect: false }, { text: 'Annual Protocol Yield', isCorrect: false }, { text: 'Annualised Pool Yield', isCorrect: false }], points: 1, explanation: 'APY accounts for compound interest; APR does not — always compare the same metric across protocols.' },
            ],
          },
        ],
      },
      {
        title: 'DeFi Risks & Risk Management',
        description: 'Navigate DeFi safely with professional risk practices.',
        items: [
          {
            type: 'lesson',
            title: 'DeFi Risks — Smart Contract, Liquidity & Regulatory',
            content: 'DeFi is not risk-free. Smart contract bugs (e.g., the $600M Poly Network hack), oracle manipulation, liquidity risks, and increasing regulatory pressure are all real threats. Learn how to assess protocol safety using audit reports and on-chain data.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('WlrT5I-XunU'), caption: 'Beginners Guide to Decentralized Finance (DeFi)' }],
          },
          {
            type: 'lesson',
            title: 'DeFi Portfolio & Risk Management',
            content: 'Position sizing, diversification across protocols, keeping an emergency exit plan, using hardware wallets, and monitoring positions with DeFiLlama and Zapper are the risk management fundamentals every DeFi user must apply.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('defirisks'), caption: 'DeFi risk management framework' }],
          },
          {
            type: 'quiz',
            title: 'DeFi Risk Quiz',
            description: 'Validate your DeFi risk awareness.',
            questions: [
              { questionText: 'What is a smart contract audit?', questionType: 'multiple-choice', options: [{ text: 'A government compliance review of a DeFi protocol', isCorrect: false }, { text: 'A professional security review of a protocol\'s code to identify vulnerabilities', isCorrect: true }, { text: 'An automated system that monitors contract performance', isCorrect: false }, { text: 'A tax audit of crypto transactions', isCorrect: false }], points: 1, explanation: 'Audits by firms like Certik, OpenZeppelin, and Trail of Bits reduce (but don\'t eliminate) smart contract risk.' },
              { questionText: 'What is an "oracle" in DeFi?', questionType: 'multiple-choice', options: [{ text: 'A type of blockchain wallet', isCorrect: false }, { text: 'A service that feeds real-world data (like prices) into smart contracts', isCorrect: true }, { text: 'A DeFi lending protocol', isCorrect: false }, { text: 'A blockchain explorer tool', isCorrect: false }], points: 1, explanation: 'Oracles like Chainlink bridge blockchain smart contracts with real-world data — oracle manipulation is a major attack vector.' },
              { questionText: 'What is a "rug pull" in DeFi?', questionType: 'multiple-choice', options: [{ text: 'When a protocol\'s TVL drops rapidly due to market conditions', isCorrect: false }, { text: 'When developers drain a protocol\'s liquidity pool and disappear with funds', isCorrect: true }, { text: 'When a smart contract is upgraded without community approval', isCorrect: false }, { text: 'When gas fees make withdrawing liquidity uneconomical', isCorrect: false }], points: 1, explanation: 'Rug pulls are exit scams — developers remove liquidity, crashing the token price to zero.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 16 ──────────────────────────────────────────────────────────────────
  {
    title: 'Blockchain Technology Fundamentals',
    description: 'Understand how blockchain works from cryptographic hashing to consensus mechanisms and real-world applications.',
    thumbnail: '/seed-images/blockchain.jpg',
    category: 'Blockchain',
    difficulty: 'beginner',
    tags: ['blockchain', 'distributed ledger', 'consensus', 'cryptography', 'smart contracts', 'web3'],
    overview: 'Blockchain is the infrastructure powering crypto, DeFi, NFTs, and Web3. This course gives you a solid technical and conceptual foundation in blockchain technology.',
    estimatedDuration: 260,
    chapters: [
      {
        title: 'Blockchain Basics',
        description: 'What blockchain is and how it stores data.',
        items: [
          {
            type: 'lesson',
            title: 'How Blockchain Works',
            content: 'A blockchain is a chain of blocks, each containing a batch of transactions secured by cryptographic hashes. Changing any block changes its hash — and breaks every block after it. This immutability is what makes blockchain trustworthy.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('gyMwXuJrbJQ'), caption: 'Learn Blockchain, Solidity & Full Stack Web3 — freeCodeCamp' }],
          },
          {
            type: 'lesson',
            title: 'Cryptographic Hashing & Digital Signatures',
            content: 'SHA-256 hashing converts any data into a fixed-length fingerprint. Digital signatures use public-key cryptography to prove transaction authorisation. These two primitives underpin all blockchain security.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: THB('gyMwXuJrbJQ'), caption: 'Blockchain & Web3 course overview' }, { type: 'image', url: PIC('hashing'), caption: 'SHA-256 hashing visualised' }],
          },
          {
            type: 'quiz',
            title: 'Blockchain Basics Quiz',
            description: 'Test your blockchain fundamentals.',
            questions: [
              { questionText: 'What makes it practically impossible to alter a past block in a blockchain?', questionType: 'multiple-choice', options: [{ text: 'Blockchain is stored on government servers', isCorrect: false }, { text: 'Each block contains the hash of the previous block — changing one block invalidates all subsequent blocks', isCorrect: true }, { text: 'Blocks are encrypted with a password only the creator knows', isCorrect: false }, { text: 'Blockchain is stored on a single secure server', isCorrect: false }], points: 1, explanation: 'The chain structure makes tampering computationally prohibitive — you\'d need to recalculate every subsequent block.' },
              { questionText: 'What is a hash function?', questionType: 'multiple-choice', options: [{ text: 'A function that encrypts and decrypts data', isCorrect: false }, { text: 'A one-way function that converts any input into a fixed-size output (fingerprint)', isCorrect: true }, { text: 'A function that compresses large files', isCorrect: false }, { text: 'A function that generates private keys', isCorrect: false }], points: 1, explanation: 'Hash functions are deterministic and one-way — the same input always produces the same hash, but you cannot reverse it.' },
              { questionText: 'What is a "node" in a blockchain network?', questionType: 'multiple-choice', options: [{ text: 'A type of transaction fee', isCorrect: false }, { text: 'A computer that participates in the network by storing and validating the blockchain', isCorrect: true }, { text: 'The central server that controls the blockchain', isCorrect: false }, { text: 'A smart contract deployed on the network', isCorrect: false }], points: 1, explanation: 'Nodes store copies of the full blockchain and validate new transactions — decentralisation requires thousands of them.' },
            ],
          },
        ],
      },
      {
        title: 'Consensus Mechanisms',
        description: 'How blockchains agree on the truth without a central authority.',
        items: [
          {
            type: 'lesson',
            title: 'Proof of Work vs Proof of Stake',
            content: 'Proof of Work (Bitcoin) requires miners to solve computationally expensive puzzles to add blocks. Proof of Stake (Ethereum) selects validators based on staked collateral. Learn the tradeoffs between security, energy use, and decentralisation.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('tq-ooflj7R4'), caption: 'Blockchain Full Course 2026 — Blockchain Tutorial for Beginners' }, { type: 'image', url: PIC('consensus'), caption: 'PoW vs PoS comparison diagram' }],
          },
          {
            type: 'lesson',
            title: 'Other Consensus Mechanisms',
            content: 'Delegated Proof of Stake (DPoS), Proof of History (Solana), and Proof of Authority are alternatives optimising for speed and scalability. This lesson compares all major consensus models and explains where each excels.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('consensusmodels'), caption: 'All major consensus mechanisms compared' }],
          },
          {
            type: 'quiz',
            title: 'Consensus Quiz',
            description: 'Check your consensus mechanism knowledge.',
            questions: [
              { questionText: 'Which consensus mechanism does Bitcoin use?', questionType: 'multiple-choice', options: [{ text: 'Proof of Stake', isCorrect: false }, { text: 'Proof of Work', isCorrect: true }, { text: 'Delegated Proof of Stake', isCorrect: false }, { text: 'Proof of Authority', isCorrect: false }], points: 1, explanation: 'Bitcoin uses Proof of Work — miners compete to solve SHA-256 puzzles to earn the right to add the next block.' },
              { questionText: 'What did Ethereum\'s "Merge" in September 2022 change?', questionType: 'multiple-choice', options: [{ text: 'It increased Ethereum\'s token supply', isCorrect: false }, { text: 'It transitioned Ethereum from Proof of Work to Proof of Stake', isCorrect: true }, { text: 'It merged Ethereum with the Bitcoin network', isCorrect: false }, { text: 'It lowered Ethereum\'s gas fees by 99%', isCorrect: false }], points: 1, explanation: 'The Merge reduced Ethereum\'s energy consumption by ~99.95% by switching from PoW to PoS.' },
              { questionText: 'What is a "51% attack"?', questionType: 'multiple-choice', options: [{ text: 'A phishing attack targeting 51% of a network\'s users', isCorrect: false }, { text: 'When one entity gains over 51% of a network\'s mining or staking power, enabling them to manipulate the blockchain', isCorrect: true }, { text: 'A vulnerability that allows 51 transactions to be processed simultaneously', isCorrect: false }, { text: 'A governance vote that passes with 51% majority', isCorrect: false }], points: 1, explanation: 'Controlling 51% of hash power (PoW) or stake (PoS) theoretically allows double-spending and block reorganisation.' },
            ],
          },
        ],
      },
      {
        title: 'Real-World Blockchain Applications',
        description: 'Blockchain beyond cryptocurrency.',
        items: [
          {
            type: 'lesson',
            title: 'Blockchain in Supply Chain, Healthcare & Finance',
            content: 'Blockchain is being used to track pharmaceuticals from manufacturer to patient, verify supply chain provenance, streamline cross-border payments, and tokenise real-world assets. Explore live deployments by IBM, Maersk, and JPMorgan.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('IPbmapxHKjw'), caption: 'BlockChain Developer Full Course — Edureka' }],
          },
          {
            type: 'lesson',
            title: 'Web3 & the Decentralised Internet',
            content: 'Web3 is the vision of an internet owned by users, not corporations. Explore decentralised storage (IPFS, Filecoin), decentralised identity (DIDs), DAOs, and how Web3 changes the creator economy.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('web3'), caption: 'Web1 vs Web2 vs Web3 comparison' }],
          },
          {
            type: 'quiz',
            title: 'Blockchain Applications Quiz',
            description: 'Validate your real-world blockchain knowledge.',
            questions: [
              { questionText: 'What is a DAO?', questionType: 'multiple-choice', options: [{ text: 'A Data Access Object in programming', isCorrect: false }, { text: 'A Decentralised Autonomous Organisation — an entity governed by smart contracts and token holder votes', isCorrect: true }, { text: 'A type of DeFi lending protocol', isCorrect: false }, { text: 'A digital asset offering', isCorrect: false }], points: 1, explanation: 'DAOs replace traditional management with transparent, code-enforced governance — MakerDAO and Uniswap are examples.' },
              { questionText: 'What does IPFS stand for?', questionType: 'multiple-choice', options: [{ text: 'Internet Protocol File System', isCorrect: false }, { text: 'InterPlanetary File System — a decentralised storage network', isCorrect: true }, { text: 'Integrated Protocol for Secure Files', isCorrect: false }, { text: 'Immutable Proof of File Submission', isCorrect: false }], points: 1, explanation: 'IPFS distributes file storage across nodes — NFT metadata is commonly stored on IPFS for permanence.' },
              { questionText: 'What is tokenisation of real-world assets?', questionType: 'multiple-choice', options: [{ text: 'Converting crypto into fiat currency tokens', isCorrect: false }, { text: 'Representing ownership of physical assets (property, art, commodities) as blockchain tokens', isCorrect: true }, { text: 'Creating new cryptocurrency tokens on Ethereum', isCorrect: false }, { text: 'A method for securing transactions with tokens', isCorrect: false }], points: 1, explanation: 'Tokenisation enables fractional ownership and 24/7 trading of assets that were previously illiquid.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 17 ──────────────────────────────────────────────────────────────────
  {
    title: 'Google Ads & PPC Advertising',
    description: 'Set up, manage, and optimise Google Ads campaigns that drive profitable traffic to your business.',
    thumbnail: '/seed-images/google-ads.jpg',
    category: 'PPC Advertising',
    difficulty: 'beginner',
    tags: ['google ads', 'ppc', 'paid advertising', 'search ads', 'display ads', 'keywords', 'bidding'],
    overview: 'Google processes 8.5 billion searches daily. This course teaches you to capture intent-driven traffic at every stage with Search, Display, Shopping, and Performance Max campaigns.',
    estimatedDuration: 300,
    chapters: [
      {
        title: 'Introduction to Google Ads',
        description: 'Understand the platform and its campaign types.',
        items: [
          {
            type: 'lesson',
            title: 'How Google Ads Works',
            content: 'Google Ads runs on a real-time auction system. When someone searches, Google evaluates bids AND Quality Score to decide which ads appear and in what order. Understanding Quality Score (CTR, ad relevance, landing page experience) is key to lowering your CPC.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('_Rr0sHHkluU'), caption: 'Google Ads Tutorial 2024 — Free Course for Beginners' }],
          },
          {
            type: 'lesson',
            title: 'Campaign Types — Search, Display, Shopping & More',
            content: 'Google Ads has six campaign types: Search, Display, Shopping, Video (YouTube), App, and Performance Max. Each serves a different goal. This lesson explains when to use each type and how the bidding mechanics differ.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: THB('_Rr0sHHkluU'), caption: 'Google Ads campaign types overview' }, { type: 'image', url: PIC('googleadstypes'), caption: 'Ad campaign type selection guide' }],
          },
          {
            type: 'quiz',
            title: 'Google Ads Basics Quiz',
            description: 'Test your Google Ads fundamentals.',
            questions: [
              { questionText: 'What is Quality Score in Google Ads?', questionType: 'multiple-choice', options: [{ text: 'Google\'s rating of your account spending level', isCorrect: false }, { text: 'A score (1–10) based on expected CTR, ad relevance, and landing page experience', isCorrect: true }, { text: 'A measure of how many conversions your ads generate', isCorrect: false }, { text: 'The number of keywords in your ad group', isCorrect: false }], points: 1, explanation: 'A high Quality Score lowers your CPC and improves ad position — optimising for it is essential.' },
              { questionText: 'What does CPC stand for?', questionType: 'multiple-choice', options: [{ text: 'Cost Per Campaign', isCorrect: false }, { text: 'Cost Per Click', isCorrect: true }, { text: 'Cost Per Conversion', isCorrect: false }, { text: 'Click Per Customer', isCorrect: false }], points: 1, explanation: 'CPC is what you pay each time someone clicks your ad — the primary pricing model for Search campaigns.' },
              { questionText: 'Which campaign type is best for reaching users actively searching for your product or service?', questionType: 'multiple-choice', options: [{ text: 'Display campaigns', isCorrect: false }, { text: 'Video campaigns', isCorrect: false }, { text: 'Search campaigns', isCorrect: true }, { text: 'App campaigns', isCorrect: false }], points: 1, explanation: 'Search campaigns capture high-intent users at the exact moment they are searching for what you offer.' },
            ],
          },
        ],
      },
      {
        title: 'Campaign Structure & Keywords',
        description: 'Build campaigns that perform from day one.',
        items: [
          {
            type: 'lesson',
            title: 'Keyword Research & Match Types',
            content: 'Google Ads keywords have three match types: Broad, Phrase, and Exact. Each controls how closely a user\'s search must match your keyword. Learn keyword research with Google Keyword Planner, how to build tightly themed ad groups, and negative keyword strategy.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('fOZ_UjjufmA'), caption: 'Google Ads Tutorial for Beginners 2024 — Step-by-Step' }, { type: 'image', url: PIC('keywordmatchtypes'), caption: 'Keyword match type comparison' }],
          },
          {
            type: 'lesson',
            title: 'Writing Responsive Search Ads',
            content: 'Responsive Search Ads (RSAs) allow up to 15 headlines and 4 descriptions that Google automatically tests. Learn how to write ad copy that boosts CTR, how to pin headlines that must always appear, and how to read your "Ad Strength" rating.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('rsaads'), caption: 'Responsive Search Ad copywriting guide' }],
          },
          {
            type: 'quiz',
            title: 'Keywords & Structure Quiz',
            description: 'Check your keyword and campaign structure knowledge.',
            questions: [
              { questionText: 'Which keyword match type only triggers your ad when the search is an exact or very close variant of your keyword?', questionType: 'multiple-choice', options: [{ text: 'Broad match', isCorrect: false }, { text: 'Phrase match', isCorrect: false }, { text: 'Exact match', isCorrect: true }, { text: 'Negative match', isCorrect: false }], points: 1, explanation: 'Exact match [keyword] gives maximum control, minimising irrelevant traffic.' },
              { questionText: 'What are negative keywords?', questionType: 'multiple-choice', options: [{ text: 'Keywords with a negative Quality Score', isCorrect: false }, { text: 'Words that prevent your ads from showing for irrelevant searches', isCorrect: true }, { text: 'Keywords you are forbidden from bidding on', isCorrect: false }, { text: 'Keywords with a CPC below $0.10', isCorrect: false }], points: 1, explanation: 'Negative keywords save budget by stopping your ads from showing for searches that won\'t convert.' },
              { questionText: 'What is an ad group in Google Ads?', questionType: 'multiple-choice', options: [{ text: 'A collection of campaigns', isCorrect: false }, { text: 'A container of related keywords, ads, and landing pages within a campaign', isCorrect: true }, { text: 'A group of Google Ads accounts managed together', isCorrect: false }, { text: 'A team of people managing the same ad account', isCorrect: false }], points: 1, explanation: 'Ad groups organise campaigns — each should contain tightly themed keywords pointing to a relevant landing page.' },
            ],
          },
        ],
      },
      {
        title: 'Bidding, Optimisation & Scaling',
        description: 'Lower costs and scale campaigns that are working.',
        items: [
          {
            type: 'lesson',
            title: 'Bidding Strategies Explained',
            content: 'Google offers manual and Smart Bidding strategies. Manual CPC gives full control; Target CPA lets Google bid to achieve a specific cost per acquisition; Target ROAS optimises for return on ad spend. Learn when each strategy is appropriate.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('q6mJ_Dw4S9k'), caption: 'Google Ads Tutorial 2024 | Step by Step' }],
          },
          {
            type: 'lesson',
            title: 'Optimisation: Reducing Waste & Scaling Winners',
            content: 'Weekly and monthly optimisation is what separates profitable accounts from wasted budgets. Learn the audit checklist: Search Term Reports, Quality Score review, bid adjustments, A/B testing ad copy, and pausing underperformers.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('googleadsoptimisation'), caption: 'Google Ads weekly optimisation checklist' }],
          },
          {
            type: 'quiz',
            title: 'Bidding & Optimisation Quiz',
            description: 'Validate your Google Ads optimisation knowledge.',
            questions: [
              { questionText: 'What does Target CPA bidding optimise for?', questionType: 'multiple-choice', options: [{ text: 'Maximum clicks within budget', isCorrect: false }, { text: 'Achieving a specific cost per conversion (acquisition)', isCorrect: true }, { text: 'Maximising impression share', isCorrect: false }, { text: 'A specific return on ad spend percentage', isCorrect: false }], points: 1, explanation: 'Target CPA tells Google\'s Smart Bidding to automatically bid to hit your desired cost-per-conversion.' },
              { questionText: 'What is a Search Term Report?', questionType: 'multiple-choice', options: [{ text: 'A list of keywords you have added to your campaign', isCorrect: false }, { text: 'A report showing the actual search queries that triggered your ads', isCorrect: true }, { text: 'Google\'s recommendations for new keywords to add', isCorrect: false }, { text: 'A report on competitor keyword rankings', isCorrect: false }], points: 1, explanation: 'The Search Term Report reveals exactly what users typed — essential for finding negative keywords and new opportunities.' },
              { questionText: 'What is impression share in Google Ads?', questionType: 'multiple-choice', options: [{ text: 'The percentage of impressions that led to a click', isCorrect: false }, { text: 'The percentage of eligible impressions your ads actually received', isCorrect: true }, { text: 'How many people saw your ad at least twice', isCorrect: false }, { text: 'The share of your budget spent on impressions vs clicks', isCorrect: false }], points: 1, explanation: 'Low impression share due to budget means you\'re missing eligible auctions — a signal to increase budget.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 18 ──────────────────────────────────────────────────────────────────
  {
    title: 'Mobile Marketing Strategies',
    description: 'Reach your audience on their most personal device — the smartphone — with SMS, push notifications, in-app ads, and mobile-first content.',
    thumbnail: '/seed-images/mobile-marketing.jpg',
    category: 'Mobile Marketing',
    difficulty: 'intermediate',
    tags: ['mobile marketing', 'sms marketing', 'push notifications', 'app marketing', 'aso', 'mobile ads'],
    overview: 'Over 60% of internet traffic comes from mobile devices. This course teaches you how to design and execute marketing campaigns built for the mobile-first world.',
    estimatedDuration: 240,
    chapters: [
      {
        title: 'Mobile Marketing Overview',
        description: 'The mobile landscape and why mobile-first matters.',
        items: [
          {
            type: 'lesson',
            title: 'The Mobile-First World',
            content: 'More Google searches happen on mobile than desktop. Mobile users have different intent, attention spans, and behaviour patterns. This lesson covers mobile marketing channels, mobile UX principles, and why responsive design is non-negotiable.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('dqaIqlgNyKw'), caption: 'Social Media Marketing Tutorial — Edureka' }],
          },
          {
            type: 'lesson',
            title: 'Mobile Consumer Behaviour',
            content: 'Mobile users are action-oriented — they search, browse, and buy in micro-moments. Learn the four mobile micro-moments (I-want-to-know, I-want-to-go, I-want-to-do, I-want-to-buy) and how to capture each one.',
            estimatedDuration: 12,
            media: [{ type: 'image', url: THB('dqaIqlgNyKw'), caption: 'Mobile marketing landscape overview' }, { type: 'image', url: PIC('mobileconsumer'), caption: 'Mobile micro-moments framework' }],
          },
          {
            type: 'quiz',
            title: 'Mobile Overview Quiz',
            description: 'Test your mobile marketing basics.',
            questions: [
              { questionText: 'What are Google\'s "micro-moments" in mobile marketing?', questionType: 'multiple-choice', options: [{ text: 'Short video ads displayed on mobile', isCorrect: false }, { text: 'Intent-driven moments when users turn to their phones to act on a need', isCorrect: true }, { text: 'The fraction of a second ads appear before being skipped', isCorrect: false }, { text: 'Mobile push notification timing windows', isCorrect: false }], points: 1, explanation: 'Micro-moments are the split-second decisions mobile users make — capturing them requires mobile-optimised presence.' },
              { questionText: 'What percentage of global internet traffic comes from mobile devices?', questionType: 'multiple-choice', options: [{ text: 'Around 20%', isCorrect: false }, { text: 'Around 40%', isCorrect: false }, { text: 'Over 60%', isCorrect: true }, { text: 'Over 90%', isCorrect: false }], points: 1, explanation: 'As of recent data, mobile generates over 60% of global web traffic — mobile-first is not optional.' },
              { questionText: 'What is a "mobile-first" design approach?', questionType: 'multiple-choice', options: [{ text: 'Designing exclusively for mobile and ignoring desktop', isCorrect: false }, { text: 'Starting design for the smallest screen and progressively enhancing for larger screens', isCorrect: true }, { text: 'Using mobile devices to design websites', isCorrect: false }, { text: 'Prioritising mobile advertising budgets over desktop', isCorrect: false }], points: 1, explanation: 'Mobile-first design ensures the core experience works perfectly on mobile before scaling up to desktop.' },
            ],
          },
        ],
      },
      {
        title: 'App Marketing & ASO',
        description: 'Get your app discovered and downloaded.',
        items: [
          {
            type: 'lesson',
            title: 'App Store Optimisation (ASO)',
            content: 'ASO is the SEO of app stores. Optimising your app\'s title, keywords, description, screenshots, and ratings on Google Play and the Apple App Store directly impacts discoverability and conversion rate. Learn the ASO ranking factors.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('KEirK5QWgrA'), caption: 'How to Start Social Media Marketing — Simplilearn' }, { type: 'image', url: PIC('aso'), caption: 'App Store Optimisation checklist' }],
          },
          {
            type: 'lesson',
            title: 'Mobile User Acquisition & Retargeting',
            content: 'UAC (Universal App Campaigns), Apple Search Ads, and Meta mobile campaigns are the primary paid user acquisition channels. Learn Cost Per Install (CPI) benchmarks, retargeting lapsed users, and deep linking to specific in-app screens.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('appacquisition'), caption: 'Mobile user acquisition funnel' }],
          },
          {
            type: 'quiz',
            title: 'App Marketing Quiz',
            description: 'Check your ASO and app marketing knowledge.',
            questions: [
              { questionText: 'What is App Store Optimisation (ASO)?', questionType: 'multiple-choice', options: [{ text: 'A process for reducing app file size', isCorrect: false }, { text: 'The process of optimising app listings to rank higher in app store search results', isCorrect: true }, { text: 'A method for automating app updates', isCorrect: false }, { text: 'A tool for tracking app crashes', isCorrect: false }], points: 1, explanation: 'ASO is to app stores what SEO is to Google — optimising for discoverability and conversion.' },
              { questionText: 'What is CPI in mobile advertising?', questionType: 'multiple-choice', options: [{ text: 'Cost Per Impression', isCorrect: false }, { text: 'Cost Per Install — the amount paid each time a user installs your app', isCorrect: true }, { text: 'Cost Per Interaction', isCorrect: false }, { text: 'Clicks Per Impression', isCorrect: false }], points: 1, explanation: 'CPI measures paid user acquisition efficiency — lower CPI means cheaper installs.' },
              { questionText: 'What is a "deep link" in mobile marketing?', questionType: 'multiple-choice', options: [{ text: 'A link to a deeply embedded page on a website', isCorrect: false }, { text: 'A URL that opens a specific screen or content inside a mobile app', isCorrect: true }, { text: 'A link that only works on mobile browsers', isCorrect: false }, { text: 'An internal link within an app\'s navigation', isCorrect: false }], points: 1, explanation: 'Deep links take users directly to relevant app content, bypassing the home screen for better UX and conversion.' },
            ],
          },
        ],
      },
      {
        title: 'SMS & Push Notification Campaigns',
        description: 'Drive engagement with direct, permission-based messaging.',
        items: [
          {
            type: 'lesson',
            title: 'SMS Marketing — Strategy & Best Practices',
            content: 'SMS has a 98% open rate and is read within 3 minutes of delivery on average. Learn SMS opt-in compliance (TCPA, GDPR), platform selection (Klaviyo, Attentive, Postscript), message types (promotional vs transactional), and timing strategy.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('oG6HXDpsu9o'), caption: 'Social Media Marketing Full Course — Simplilearn' }],
          },
          {
            type: 'lesson',
            title: 'Push Notifications — Increasing App Retention',
            content: 'Push notifications average a 7.8% click rate — higher than email. Learn notification types (transactional, behavioural, geo-triggered), personalisation strategies, optimal send times, and how to A/B test notifications.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('pushnotifications'), caption: 'Push notification strategy framework' }],
          },
          {
            type: 'quiz',
            title: 'SMS & Push Quiz',
            description: 'Validate your SMS and push notification knowledge.',
            questions: [
              { questionText: 'What is the average open rate for SMS marketing messages?', questionType: 'multiple-choice', options: [{ text: '20–25%', isCorrect: false }, { text: '45–50%', isCorrect: false }, { text: '98%', isCorrect: true }, { text: '65%', isCorrect: false }], points: 1, explanation: 'SMS messages have a ~98% open rate — by far the highest of any marketing channel.' },
              { questionText: 'What does TCPA compliance require for SMS marketing in the US?', questionType: 'multiple-choice', options: [{ text: 'Sending a maximum of 3 SMS per month', isCorrect: false }, { text: 'Obtaining prior express written consent before sending marketing SMS messages', isCorrect: true }, { text: 'Including your company\'s legal address in every message', isCorrect: false }, { text: 'Limiting messages to 100 characters', isCorrect: false }], points: 1, explanation: 'The Telephone Consumer Protection Act (TCPA) requires explicit opt-in consent before sending commercial SMS.' },
              { questionText: 'What is a "geo-triggered" push notification?', questionType: 'multiple-choice', options: [{ text: 'A notification sent to users in a specific country', isCorrect: false }, { text: 'A notification triggered when a user enters or exits a defined geographic area', isCorrect: true }, { text: 'A notification about location-based services', isCorrect: false }, { text: 'A notification sent based on the user\'s time zone', isCorrect: false }], points: 1, explanation: 'Geo-triggers fire when users enter geofences — ideal for retail store proximity marketing.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 19 ──────────────────────────────────────────────────────────────────
  {
    title: 'Marketing Automation with HubSpot',
    description: 'Set up powerful automation workflows in HubSpot to nurture leads, close deals, and delight customers — without manual effort.',
    thumbnail: '/seed-images/marketing-automation.jpg',
    category: 'Marketing Automation',
    difficulty: 'intermediate',
    tags: ['hubspot', 'marketing automation', 'crm', 'workflows', 'lead nurturing', 'sales automation'],
    overview: 'Marketing automation frees your team from repetitive tasks. This course covers HubSpot CRM setup, contact management, workflow automations, lead scoring, and reporting.',
    estimatedDuration: 280,
    chapters: [
      {
        title: 'Introduction to Marketing Automation',
        description: 'What automation is and how HubSpot fits in.',
        items: [
          {
            type: 'lesson',
            title: 'Why Marketing Automation Matters',
            content: 'Marketing automation nurtures leads through the funnel automatically, based on their behaviour and characteristics. Companies using automation generate 451% more qualified leads. This lesson covers the automation landscape, tools, and use cases.',
            estimatedDuration: 14,
            media: [{ type: 'video-embed', url: YT('_Nd2oklo-w8'), caption: 'HubSpot CRM & Email Marketing Tutorial 2025' }],
          },
          {
            type: 'lesson',
            title: 'HubSpot CRM Setup',
            content: 'HubSpot\'s free CRM is the foundation of your automation. Set up your pipeline stages, contact properties, deal stages, and connect your email and calendar. Learn how contacts, companies, deals, and tickets relate in HubSpot\'s data model.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: THB('_Nd2oklo-w8'), caption: 'HubSpot CRM overview' }, { type: 'image', url: PIC('hubspotcrm'), caption: 'HubSpot CRM data model' }],
          },
          {
            type: 'quiz',
            title: 'Automation Basics Quiz',
            description: 'Test your marketing automation fundamentals.',
            questions: [
              { questionText: 'What is a marketing automation workflow?', questionType: 'multiple-choice', options: [{ text: 'A team meeting to plan marketing campaigns', isCorrect: false }, { text: 'A series of automated actions triggered by a contact\'s behaviour or data properties', isCorrect: true }, { text: 'A tool for scheduling social media posts', isCorrect: false }, { text: 'An approval process for marketing content', isCorrect: false }], points: 1, explanation: 'Workflows automate sequences like: contact signs up → send welcome email → if opens, send follow-up.' },
              { questionText: 'What is the HubSpot CRM free to use for?', questionType: 'multiple-choice', options: [{ text: 'Only for companies with fewer than 10 employees', isCorrect: false }, { text: 'Contact management, deal pipelines, and basic email — permanently free', isCorrect: true }, { text: 'A 14-day trial period only', isCorrect: false }, { text: 'Viewing data but not editing contacts', isCorrect: false }], points: 1, explanation: 'HubSpot CRM core is free forever — paid tiers unlock advanced automation, sequences, and reporting.' },
              { questionText: 'What is "lead scoring" in marketing automation?', questionType: 'multiple-choice', options: [{ text: 'Rating the quality of your marketing campaigns', isCorrect: false }, { text: 'Assigning numerical values to leads based on their behaviour and properties to prioritise sales outreach', isCorrect: true }, { text: 'Scoring how many leads your campaigns generate', isCorrect: false }, { text: 'A system for ranking marketing channels by lead volume', isCorrect: false }], points: 1, explanation: 'Lead scoring helps sales focus on the most sales-ready contacts — high scorers get faster outreach.' },
            ],
          },
        ],
      },
      {
        title: 'HubSpot Workflows & Sequences',
        description: 'Build automations that nurture, convert, and retain.',
        items: [
          {
            type: 'lesson',
            title: 'Building Your First HubSpot Workflow',
            content: 'HubSpot workflows trigger on contact events (form submission, page view, email click). Learn how to build: a lead nurture workflow, an internal notification workflow, and a lead rotation workflow that assigns contacts to sales reps.',
            estimatedDuration: 20,
            media: [{ type: 'video-embed', url: YT('sxOibuTUGjQ'), caption: 'HubSpot Marketing Hub — Tutorial for Beginners' }, { type: 'image', url: PIC('hubspotworkflow'), caption: 'HubSpot workflow builder walkthrough' }],
          },
          {
            type: 'lesson',
            title: 'HubSpot Sequences for Sales',
            content: 'Sequences are personalised, one-to-one automated email/task chains for sales reps. Unlike workflows (marketing), sequences stop when a contact replies. Learn when to use sequences vs workflows and how to write a 5-touch sales sequence.',
            estimatedDuration: 18,
            media: [{ type: 'image', url: PIC('sequences'), caption: 'Sales sequence structure' }],
          },
          {
            type: 'quiz',
            title: 'Workflows & Sequences Quiz',
            description: 'Check your HubSpot automation knowledge.',
            questions: [
              { questionText: 'What is the key difference between a HubSpot Workflow and a Sequence?', questionType: 'multiple-choice', options: [{ text: 'Workflows are free; Sequences require a paid plan', isCorrect: false }, { text: 'Workflows are for marketing automation at scale; Sequences are for personalised one-to-one sales outreach', isCorrect: true }, { text: 'Workflows send emails; Sequences make phone calls', isCorrect: false }, { text: 'There is no difference', isCorrect: false }], points: 1, explanation: 'Sequences are owned by sales reps and stop when a contact replies; Workflows run on autopilot for all matching contacts.' },
              { questionText: 'What is an enrollment trigger in a HubSpot Workflow?', questionType: 'multiple-choice', options: [{ text: 'A payment that activates premium automation features', isCorrect: false }, { text: 'The condition that causes a contact to enter the workflow', isCorrect: true }, { text: 'The final step in a workflow that sends a notification', isCorrect: false }, { text: 'A trigger that deactivates a workflow', isCorrect: false }], points: 1, explanation: 'Enrollment triggers can be form submissions, property changes, list membership, or deal stage moves.' },
              { questionText: 'What happens to a contact in a HubSpot Sequence when they reply to an email?', questionType: 'multiple-choice', options: [{ text: 'The contact is moved to a new sequence automatically', isCorrect: false }, { text: 'The sequence pauses and the sales rep is notified', isCorrect: false }, { text: 'The contact is automatically unenrolled from the sequence', isCorrect: true }, { text: 'HubSpot sends a follow-up email asking if they need help', isCorrect: false }], points: 1, explanation: 'Sequences are designed for prospects who haven\'t replied — once they do, they exit the sequence automatically.' },
            ],
          },
        ],
      },
      {
        title: 'Lead Scoring & Reporting',
        description: 'Measure what works and prioritise your best prospects.',
        items: [
          {
            type: 'lesson',
            title: 'Setting Up Lead Scoring in HubSpot',
            content: 'HubSpot\'s predictive lead score uses machine learning, but manual score is often more accurate for early-stage companies. Build a manual lead score using demographic (job title, company size) + behavioural (page visits, email clicks, form submissions) attributes.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('GJAuTZFdJgU'), caption: 'HubSpot CRM Tutorial' }],
          },
          {
            type: 'lesson',
            title: 'Marketing Reports & ROI Dashboards',
            content: 'HubSpot\'s Marketing Reports connect campaign activity to closed revenue. Learn how to build a marketing dashboard showing: MQLs, SQLs, campaign ROI, email performance, and website traffic sources.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: PIC('hubspotreporting'), caption: 'HubSpot marketing dashboard' }],
          },
          {
            type: 'quiz',
            title: 'Scoring & Reporting Quiz',
            description: 'Validate your HubSpot lead scoring knowledge.',
            questions: [
              { questionText: 'What is the difference between an MQL and SQL?', questionType: 'multiple-choice', options: [{ text: 'MQL is a paying customer; SQL is a prospect', isCorrect: false }, { text: 'MQL (Marketing Qualified Lead) meets marketing\'s criteria; SQL (Sales Qualified Lead) has been vetted by sales', isCorrect: true }, { text: 'MQL uses manual scoring; SQL uses predictive scoring', isCorrect: false }, { text: 'They are the same thing', isCorrect: false }], points: 1, explanation: 'The MQL-to-SQL handoff is the critical bridge between marketing and sales — clear criteria prevent conflict.' },
              { questionText: 'What is a "contact property" in HubSpot?', questionType: 'multiple-choice', options: [{ text: 'A piece of real estate owned by a contact', isCorrect: false }, { text: 'A data field on a contact record (e.g., job title, lead score, lifecycle stage)', isCorrect: true }, { text: 'A permission setting for contact privacy', isCorrect: false }, { text: 'A type of HubSpot subscription tier', isCorrect: false }], points: 1, explanation: 'Contact properties store all the data about a contact — they are the building blocks of segmentation and automation.' },
              { questionText: 'What does "attribution" mean in marketing reporting?', questionType: 'multiple-choice', options: [{ text: 'Giving credit for a sale or conversion to the correct marketing touchpoint or campaign', isCorrect: true }, { text: 'Assigning team members to marketing tasks', isCorrect: false }, { text: 'The process of naming and tagging marketing campaigns', isCorrect: false }, { text: 'A method of calculating influencer fees', isCorrect: false }], points: 1, explanation: 'Attribution models (first touch, last touch, multi-touch) determine which marketing activity gets credit for conversions.' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 20 ──────────────────────────────────────────────────────────────────
  {
    title: 'Startup & Entrepreneurship Essentials',
    description: 'Go from idea to validated business. Learn the frameworks, mindset, and tactics that give startups the best chance of success.',
    thumbnail: '/seed-images/entrepreneurship.jpg',
    category: 'Entrepreneurship',
    difficulty: 'beginner',
    tags: ['entrepreneurship', 'startup', 'business model', 'mvp', 'fundraising', 'growth hacking'],
    overview: 'Nine out of ten startups fail. This course teaches the frameworks — Lean Startup, Jobs-to-be-Done, OKRs — used by the founders who succeed to build companies people actually want.',
    estimatedDuration: 280,
    chapters: [
      {
        title: 'The Entrepreneurial Mindset',
        description: 'Think like a founder before you build anything.',
        items: [
          {
            type: 'lesson',
            title: 'From Idea to Opportunity',
            content: 'Most startup failures begin with a solution looking for a problem. Learn how to identify genuine pain points, validate market size, and distinguish a vitamin (nice to have) from a painkiller (must have) opportunity.',
            estimatedDuration: 16,
            media: [{ type: 'video-embed', url: YT('CBYhVcO4WgI'), caption: 'How to Start a Startup — Sam Altman & Dustin Moskovitz (Y Combinator)' }],
          },
          {
            type: 'lesson',
            title: 'Customer Discovery — Talking to Users',
            content: 'The Mom Test (by Rob Fitzpatrick) is the gold standard for customer interviews. Learn how to run discovery conversations that extract honest feedback, identify Jobs-to-be-Done, and validate hypotheses without leading the witness.',
            estimatedDuration: 16,
            media: [{ type: 'image', url: THB('CBYhVcO4WgI'), caption: 'Y Combinator — How to Start a Startup' }, { type: 'image', url: PIC('customerdiscovery'), caption: 'Customer discovery interview framework' }],
          },
          {
            type: 'quiz',
            title: 'Entrepreneurial Mindset Quiz',
            description: 'Test your founder thinking.',
            questions: [
              { questionText: 'What is the "Mom Test" concept in startup customer discovery?', questionType: 'multiple-choice', options: [{ text: 'Asking your mother to test your product', isCorrect: false }, { text: 'A method of asking questions about customer problems in a way that even your mom couldn\'t lie and flatter you', isCorrect: true }, { text: 'A framework for building family-friendly products', isCorrect: false }, { text: 'A way to test products with non-technical users', isCorrect: false }], points: 1, explanation: 'The Mom Test focuses on real behaviour and past actions — not opinions or hypothetical future intent.' },
              { questionText: 'What is a "painkiller" vs "vitamin" product?', questionType: 'multiple-choice', options: [{ text: 'Painkillers are free; vitamins are paid', isCorrect: false }, { text: 'Painkillers solve urgent, existing problems; vitamins are nice-to-have improvements', isCorrect: true }, { text: 'Painkillers target B2B; vitamins target consumers', isCorrect: false }, { text: 'Painkillers are hardware; vitamins are software', isCorrect: false }], points: 1, explanation: 'Investors and customers prioritise painkillers — products that remove a pain they already have now.' },
              { questionText: 'What is "Jobs to be Done" (JTBD) theory?', questionType: 'multiple-choice', options: [{ text: 'A theory about automating jobs with AI', isCorrect: false }, { text: 'A framework that focuses on the underlying job a customer hires a product to accomplish', isCorrect: true }, { text: 'A hiring strategy for early-stage startups', isCorrect: false }, { text: 'A product development methodology for enterprise software', isCorrect: false }], points: 1, explanation: 'JTBD: "People don\'t buy a quarter-inch drill — they buy a quarter-inch hole." Focus on the outcome, not the feature.' },
            ],
          },
        ],
      },
      {
        title: 'Building Your MVP',
        description: 'Validate fast, build only what you need.',
        items: [
          {
            type: 'lesson',
            title: 'The Lean Startup Methodology',
            content: 'Eric Ries\'s Build-Measure-Learn loop is the foundation of modern startup methodology. Learn how to define your riskiest assumptions, build the minimum viable test, measure results, and decide whether to pivot or persevere.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('Pg72m3CjuK4'), caption: 'Everything We Teach at YCombinator in 10 Minutes' }, { type: 'image', url: PIC('leanstartup'), caption: 'Build-Measure-Learn loop visualised' }],
          },
          {
            type: 'lesson',
            title: 'What is an MVP (and What It\'s Not)',
            content: 'An MVP is the simplest version of your product that tests your core value hypothesis with real users. Common MVP types: landing page (Dropbox), manual delivery (Zappos), concierge (Food on the Table). Learn which MVP type fits your stage.',
            estimatedDuration: 14,
            media: [{ type: 'image', url: PIC('mvp'), caption: 'MVP types for different startup stages' }],
          },
          {
            type: 'quiz',
            title: 'MVP & Lean Quiz',
            description: 'Check your Lean Startup knowledge.',
            questions: [
              { questionText: 'What are the three steps in the Lean Startup Build-Measure-Learn loop?', questionType: 'multiple-choice', options: [{ text: 'Ideate, Prototype, Test', isCorrect: false }, { text: 'Build, Measure, Learn', isCorrect: true }, { text: 'Plan, Execute, Review', isCorrect: false }, { text: 'Research, Develop, Launch', isCorrect: false }], points: 1, explanation: 'Build → Measure → Learn is the Lean Startup engine for validated learning with minimum waste.' },
              { questionText: 'What is a "pivot" in startup terminology?', questionType: 'multiple-choice', options: [{ text: 'When a startup\'s co-founder leaves', isCorrect: false }, { text: 'A structured course correction to test a new fundamental hypothesis about the product or business model', isCorrect: true }, { text: 'Rotating a product\'s feature set', isCorrect: false }, { text: 'Moving a startup to a new city or market', isCorrect: false }], points: 1, explanation: 'Famous pivots: Instagram (from Burbn), Slack (from Glitch), YouTube (from a dating site).' },
              { questionText: 'What was Dropbox\'s famous MVP?', questionType: 'multiple-choice', options: [{ text: 'A basic working version of the app with limited storage', isCorrect: false }, { text: 'A 3-minute demo video that generated 75,000 sign-ups overnight before any product was built', isCorrect: true }, { text: 'A simple file-sharing widget shared on Hacker News', isCorrect: false }, { text: 'A physical USB drive sent to early testers', isCorrect: false }], points: 1, explanation: 'Dropbox validated demand with a video MVP — proving people wanted the product before building it.' },
            ],
          },
        ],
      },
      {
        title: 'Growth, Funding & Scaling',
        description: 'Take your validated product to market and beyond.',
        items: [
          {
            type: 'lesson',
            title: 'Growth Hacking & Go-to-Market Strategy',
            content: 'Growth hacking means finding the lowest-cost, highest-impact path to user acquisition. Learn the PIRATE metrics (AARRR: Acquisition, Activation, Retention, Referral, Revenue), viral loops, and how to build a growth flywheel.',
            estimatedDuration: 18,
            media: [{ type: 'video-embed', url: YT('AJ313ei-ayE'), caption: 'How to Start a Startup with Michael Seibel — Y Combinator' }],
          },
          {
            type: 'lesson',
            title: 'Startup Funding — Bootstrapping to Series A',
            content: 'Most startups are bootstrapped. When to raise, from whom (angels, pre-seed funds, YC), how much, and what you give up are the key questions. Learn what investors look for, how to write a one-pager, and what a term sheet means.',
            estimatedDuration: 20,
            media: [{ type: 'image', url: PIC('startupfunding'), caption: 'Startup funding stages overview' }],
          },
          {
            type: 'quiz',
            title: 'Growth & Funding Quiz',
            description: 'Validate your startup growth knowledge.',
            questions: [
              { questionText: 'What does AARRR stand for in startup metrics?', questionType: 'multiple-choice', options: [{ text: 'Attract, Activate, Retain, Refer, Revenue', isCorrect: false }, { text: 'Acquisition, Activation, Retention, Referral, Revenue', isCorrect: true }, { text: 'Awareness, Action, Return, Recommendation, Results', isCorrect: false }, { text: 'Ads, Analytics, Reach, Ranking, ROI', isCorrect: false }], points: 1, explanation: 'The AARRR (Pirate Metrics) framework maps the full customer lifecycle from first touch to revenue generation.' },
              { questionText: 'What is bootstrapping a startup?', questionType: 'multiple-choice', options: [{ text: 'Launching with a large initial team', isCorrect: false }, { text: 'Building and growing a company using personal funds and revenue, without external investment', isCorrect: true }, { text: 'Getting your first customers through cold emails', isCorrect: false }, { text: 'Using open-source tools to reduce costs', isCorrect: false }], points: 1, explanation: 'Bootstrapped founders retain full equity and control — companies like Mailchimp and Basecamp were bootstrapped to $100M+.' },
              { questionText: 'What is "product-market fit"?', questionType: 'multiple-choice', options: [{ text: 'When your product is technically complete', isCorrect: false }, { text: 'When your product satisfies a strong market demand — evidenced by rapid organic growth', isCorrect: true }, { text: 'When your product has been launched in a new market', isCorrect: false }, { text: 'When you have 100 paying customers', isCorrect: false }], points: 1, explanation: 'Marc Andreessen: "You can always feel product/market fit when it\'s happening — customers are buying as fast as you can make it."' },
            ],
          },
        ],
      },
    ],
  },
];

async function seed() {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const admin = await Admin.findOne();
  if (!admin) { console.error('No admin found — run the admin seed first'); process.exit(1); }

  for (const cd of COURSES) {
    const { chapters: chapterDefs, ...courseData } = cd;
    const course = await Course.create({
      ...courseData,
      createdBy: admin._id,
      status: 'published',
    });

    let totalLessons = 0;
    let totalQuizzes = 0;

    for (const [ci, ch] of chapterDefs.entries()) {
      const { items, ...chapterData } = ch;
      const chapter = await Chapter.create({
        course: course._id,
        ...chapterData,
        order: ci,
        blocks: [],
      });

      const blocks = [];

      for (const item of items) {
        if (item.type === 'lesson') {
          const { type, ...lessonData } = item;
          const lesson = await Lesson.create({
            course: course._id,
            chapter: chapter._id,
            ...lessonData,
            order: blocks.length,
          });
          blocks.push({ blockType: 'lesson', refId: lesson._id, order: blocks.length });
          totalLessons++;
        } else if (item.type === 'quiz') {
          const { type, questions, ...quizMeta } = item;
          const totalPoints = questions.reduce((s, q) => s + (q.points || 1), 0);
          const quiz = await Quiz.create({
            course: course._id,
            chapter: chapter._id,
            ...quizMeta,
            questions,
            totalPoints,
            passingScore: 70,
            order: blocks.length,
          });
          blocks.push({ blockType: 'quiz', refId: quiz._id, order: blocks.length });
          totalQuizzes++;
        }
      }

      await Chapter.findByIdAndUpdate(chapter._id, { blocks });
    }

    await Course.findByIdAndUpdate(course._id, { totalLessons, totalQuizzes });
    console.log(`✓ ${course.title} — ${totalLessons} lessons, ${totalQuizzes} quizzes`);
  }

  await mongoose.connection.close();
  console.log('\nSeeding complete — 20 courses inserted.');
}

seed().catch(err => { console.error(err); process.exit(1); });
