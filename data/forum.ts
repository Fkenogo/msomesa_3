import { ForumCategory, ForumPost, ForumReply } from '../types';

export const mockForumCategories: ForumCategory[] = [
    {
        id: 'cat-1',
        name: 'General Discussion',
        description: 'For any topic related to parenting and education in Uganda.',
        icon: 'general',
    },
    {
        id: 'cat-2',
        name: 'Exam Preparation Tips',
        description: 'Share strategies for helping children prepare for PLE, UCE, and UACE.',
        icon: 'tips',
    },
    {
        id: 'cat-3',
        name: 'Choosing a School',
        description: 'Discussions about secondary schools, A-level choices, and more.',
        icon: 'school',
    },
    {
        id: 'cat-4',
        name: 'Platform Feedback & Support',
        description: 'Ask questions about Msomesa or suggest new features.',
        icon: 'feedback',
    },
];

export const mockForumPosts: ForumPost[] = [
    {
        id: 'post-0',
        categoryId: 'cat-1',
        title: 'Welcome to the Msomesa Parent Community! Introduce Yourself Here.',
        content: `Hello and a very warm welcome to all parents!

This forum is a dedicated space for you to connect, share experiences, ask questions, and support one another on this journey of educating our children in Uganda.

To get us started, please reply to this message and introduce yourself! Tell us a little bit about yourself and what level your child is at (PLE, UCE, or UACE).

---

**Community Rules of Engagement:**

To ensure this remains a safe, respectful, and helpful space for everyone, please adhere to the following guidelines:

1.  **Be Respectful:** Treat everyone with courtesy. Healthy debates are natural, but kindness is required. No personal attacks, hate speech, or bullying will be tolerated.
2.  **Stay On Topic:** Please keep discussions relevant to the category you are posting in.
3.  **No Advertising:** This forum is not for commercial advertising or self-promotion.
4.  **Protect Privacy:** Do not share personal information about yourself, your children, or others that you wouldn't want made public (e.g., full names, phone numbers, specific locations).
5.  **Report Concerns:** If you see a post that violates these rules, please report it to the admin team.

We are so excited to build this community with you!`,
        authorId: '6', // Community Admin
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        isPinned: true,
        isLocked: false,
        tags: ['welcome', 'rules'],
        views: 1250,
    },
    {
        id: 'post-1',
        categoryId: 'cat-2',
        title: 'Best way to create a study timetable for a PLE candidate?',
        content: "My son is preparing for his PLE exams this year and we are struggling to create a study schedule that works without burning him out. He loves football, so it's hard to balance. What has worked for other parents here?",
        authorId: '2', // Corresponds to Sarah (Parent)
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        isPinned: true,
        isLocked: false,
        tags: ['ple', 'timetable', 'study-habits'],
        views: 843,
    },
    {
        id: 'post-6',
        categoryId: 'cat-2',
        title: 'How to use AI explanations effectively?',
        content: "I just upgraded to Premium for my daughter Anita. The AI explanations look great, but I want to make sure she's actually learning from them and not just reading them. Any tips on how to guide her?",
        authorId: '8', // Musa K.
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isPinned: false,
        isLocked: false,
        tags: ['premium', 'ai-tutor', 'learning-tips'],
        views: 120,
    },
    {
        id: 'post-4',
        categoryId: 'cat-2',
        title: 'Managing Exam Stress: What are your tips?',
        content: "As exams get closer, my daughter is getting more and more anxious. She's studying hard, but I'm worried about the pressure. How do you help your children manage exam-related stress?",
        authorId: '2',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isPinned: false,
        isLocked: false,
        tags: ['uce', 'mental-health', 'stress'],
        views: 632,
    },
    {
        id: 'post-2',
        categoryId: 'cat-3',
        title: 'Top UCE schools for science subjects?',
        content: "Hello everyone, my daughter wants to focus on sciences for A-level. We are looking for UCE schools with strong science departments. Any recommendations in the central region?",
        authorId: '2', // Sarah
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        isPinned: false,
        isLocked: false,
        tags: ['uce', 'school-choice', 'sciences'],
        views: 980,
    },
    {
        id: 'post-5',
        categoryId: 'cat-3',
        title: "Day School vs. Boarding School: What's best for A-level?",
        content: "We're at a crossroads trying to decide between a day school and a boarding school for our son's A-levels. Boarding seems to offer more focus, but day school keeps him close to home. What are your thoughts and experiences? Pros and cons?",
        authorId: '2',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        isPinned: false,
        isLocked: false,
        tags: ['uace', 'school-choice', 'boarding'],
        views: 451,
    },
    {
        id: 'post-3',
        categoryId: 'cat-4',
        title: 'Suggestion: Add more practice papers for SST',
        content: "The platform is great, but it would be even better if there were more practice papers available for Social Studies. The existing ones are very helpful.",
        authorId: '2', // Sarah
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        isPinned: false,
        isLocked: true,
        tags: ['feedback', 'content-request'],
        views: 215,
    },
];

export const mockForumReplies: ForumReply[] = [
    {
        id: 'reply-0',
        postId: 'post-0',
        parentId: null,
        content: "Hello everyone! My name is Sarah, and my son James is in P.7, preparing for his PLE. Looking forward to sharing and learning with you all.",
        authorId: '2', // Sarah
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'reply-8',
        postId: 'post-0',
        parentId: null,
        content: "Hi everyone, I am Musa. My daughter Anita is in S.4 (UCE). We are finding the platform very useful so far!",
        authorId: '8', // Musa
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'reply-1',
        postId: 'post-1',
        parentId: null,
        content: "We found that shorter, focused study sessions of about 45 minutes followed by a 15-minute break work well. We also make sure to schedule his football practice as a 'reward' after he completes his study blocks for the day. Good luck!",
        authorId: '2', // Sarah
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
        id: 'reply-2',
        postId: 'post-1',
        parentId: null,
        content: "I agree with the rewards system. Also, involving him in creating the timetable gave him a sense of ownership, so he was more likely to stick to it.",
        authorId: '2',
        createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 23 hours ago
    },
    {
        id: 'reply-7',
        postId: 'post-1',
        parentId: 'reply-2',
        content: "That's a great point about ownership! We will try that this evening. Thank you for the suggestion.",
        authorId: '2',
        createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    },
     {
        id: 'reply-4',
        postId: 'post-4',
        parentId: null,
        content: "This is so relatable. We make sure our daughter gets enough sleep, eats well, and takes breaks to do something fun that's not related to school. A little bit of exercise, like a short walk, also helps clear her head.",
        authorId: '2',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'reply-5',
        postId: 'post-5',
        parentId: null,
        content: "We chose boarding for our older son and it was the best decision for him academically. There were fewer distractions, and he had more time for revision with his classmates. However, we did miss having him at home during the week.",
        authorId: '2',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'reply-6',
        postId: 'post-5',
        parentId: null,
        content: "For us, day school was better. It allowed us to stay more involved in his daily studies and offer immediate support. The travel time was a bit of a challenge, but we felt the family connection was more important during those crucial years.",
        authorId: '2',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'reply-3',
        postId: 'post-2',
        parentId: null,
        content: "Have you considered St. Mary's College Kisubi? They have a fantastic track record in sciences.",
        authorId: '2',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
];
