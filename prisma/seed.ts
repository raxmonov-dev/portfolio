import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { readingTimeMinutes } from "../lib/reading-time";

const prisma = new PrismaClient();

const agi = `# How I'm thinking about AGI

This is a **sample journal entry** for the site — a clear-eyed note on the idea of AGI, not a claim about building it.

Artificial general intelligence is a phrase that gets used as a destination, a threat, and a marketing line. I want a quieter version: what the idea actually points at, and why a product person should care without drowning in science fiction.

## What is AGI?

Most systems we call AI today are *narrow*. They are very good at a family of tasks — language, images, code — and then suddenly empty outside that family.

AGI, as people use the term, is a system that can learn and act across domains the way a competent human can: not perfect, not omniscient, but transferable.

> Intelligence, in this sense, is less a score and more a range of things you can become useful at.

That is still a research idea. It is not a product spec.

## Why the idea matters

Even if AGI stays far away, the *direction* changes how products get designed.

- Tools become collaborators instead of forms
- Interfaces have to show **intent**, not just output
- Trust becomes a product surface: what did the system do, and why?

If you are building anything with models today, you are already living on the slope that leads toward more general systems — whether or not we ever arrive.

### A useful distinction

| Term | What people usually mean |
| --- | --- |
| Narrow AI | Strong at a bounded task |
| AGI | Broad, transferable competence |
| Superintelligence | Beyond human across most domains |

Most shipping products are in the first row. Talking as if they are in the third is how the conversation gets sloppy.

## Current approaches

Laboratories are trying different bets. From the outside, a few patterns keep showing up:

1. Scale existing architectures and hope generality emerges
2. Combine models with tools, memory and environments
3. Train systems that can improve themselves inside a loop

I do not know which of these is "the" path. I am not in those labs. What I can see, as someone who builds products, is that **tool use** and **memory** already change what a model feels like to a user.

\`\`\`typescript
type AgentStep = {
  goal: string;
  action: "think" | "tool" | "ask";
  note: string;
};

function nextStep(goal: string): AgentStep {
  return { goal, action: "think", note: "Stay inspectable." };
}
\`\`\`

A system that can call tools is not AGI. It is a more useful narrow system. That is already enough to redesign software around.

## What I find interesting

The interesting part is not the movie version.

It is this: as models get more general, *product taste* matters more, not less. Someone still has to decide what the system is for, what it must never do, and how a human stays in the loop.

- [x] Separate the research claim from the product claim
- [x] Design for inspectability
- [ ] Pretend a chatbot is a mind

If AGI arrives, the winners will not be the people who shouted the word the most. They will be the ones who learned how to put capable systems inside products that stay understandable.

## A small Python sketch

Narrow systems are already programmable objects. Treat them that way.

\`\`\`python
def useful(output: str) -> bool:
    return bool(output.strip()) and "I don't know" not in output
\`\`\`

## Conclusion

I am not announcing a timeline. I do not have one.

I am treating AGI as a serious idea and a noisy word. The work, for me, is to keep building things that help a real person do a real task — and to stay honest about how general the machine actually is.

---

*Sample article. Written as demo content for this journal, not as a research paper or a personal memoir.*
`;

const firstProduct = `# What I learned from building a first AI product

This is a **sample essay** about product lessons that show up when you put a model in front of people. It is not a case study of a specific launch, and it does not invent users, revenue or traction.

## The first mistake is starting with the model

It is tempting to open a notebook, get a clever completion, and call that a product.

A product is the rest of the sentence: who it is for, what job it finishes, and what happens when the model is wrong.

### A cleaner order

1. Name the job in one line
2. Write the interface as if the model is mediocre
3. Only then choose the model

If the interface only works when the model is magic, the product is fragile.

## Taste is a constraint

AI products accumulate features because the model can *kind of* do everything. That is how you get a pile of buttons and no spine.

I would rather have:

- one job
- one obvious next action
- a way to undo

than a homepage that advertises twelve capabilities.

> Constraint is not a lack of ambition. It is how a product becomes itself.

## Evaluation is part of design

If you cannot tell whether an answer was good, you cannot improve the product.

That does not require a dashboard full of vanity charts. It can be as small as:

\`\`\`json
{
  "task": "explain a concept",
  "pass": "clear, short, no invented facts",
  "fail": "confident and wrong"
}
\`\`\`

Write the fail case down. It will show up in the interface later — in empty states, in disclaimers, in the decision to ask a follow-up question instead of guessing.

## Shipping is a research method

You do not need a fake metric to learn. You need contact with reality: a person trying to do the job.

The lesson I keep is simple. **Start narrower than feels impressive.** Breadth can come later. Confusion arrives immediately.

---

*Sample article. Demo content for the journal — general product notes, not a claim about a launched company.*
`;

const buildingPublic = `# Building in public as a student

This is a **sample note** on learning in public. It is not a diary of events that did not happen, and it is not a growth-hack guide.

## Why write while you are still learning

There is a version of "building in public" that is just performance. There is another version that is closer to a lab notebook: here is what I am trying, here is what is confusing, here is what I would do next.

The second one is useful even if nobody reads it.

### What to share

- The question you are actually stuck on
- The constraint (time, tools, knowledge)
- The next experiment, not the brand story

What to skip until it is real: user counts, revenue, awards, cinematic origin stories.

## A student advantage

You are allowed to be unfinished. That is not a weakness if the writing stays precise.

A short public note can be a way to:

- keep a record of how your taste is changing
- practice explaining a system until it is simple
- find the one or two people who care about the same problem

It does not have to be a personal brand.

## A working format

| Section | Purpose |
| --- | --- |
| Context | What you are trying to do |
| Attempt | What you tried |
| Result | What happened, without theatre |
| Next | The smallest next step |

If a week had no result, write that. Silence is how notes become fiction.

\`\`\`bash
# A private log is still building in public with yourself
date >> journal.txt
\`\`\`

## Keep the ego small

The internet will reward a sharper story than you have earned. Resist it.

I would rather publish three honest paragraphs about a confusing week than a thread that sounds like a company.

---

*Sample article. Demo content about the practice of learning in public.*
`;

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@localhost").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "change-me-locally";

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await hash(password, 12),
    },
  });

  const categoryData = [
    "AI",
    "Startups",
    "Product",
    "Technology",
    "Cybersecurity",
    "Learning",
    "Personal",
  ];

  const categories = new Map<string, string>();
  for (const name of categoryData) {
    const slug = name.toLowerCase();
    const category = await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    categories.set(name, category.id);
  }

  const tagNames = ["AI", "AGI", "Startups", "Product", "Learning", "Students", "Writing"];
  const tags = new Map<string, string>();
  for (const name of tagNames) {
    const slug = name.toLowerCase();
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    tags.set(name, tag.id);
  }

  const posts = [
    {
      title: "How I'm Thinking About AGI",
      slug: "how-im-thinking-about-agi",
      excerpt:
        "A sample note on what AGI means, why the idea matters for builders, and how to talk about it without the theatre.",
      content: agi,
      coverImage: "/blog/agi.svg",
      category: "AI",
      tags: ["AI", "AGI", "Product"],
      featured: true,
      publishedAt: new Date("2026-09-23T06:00:00.000Z"),
      seoTitle: "How I'm Thinking About AGI",
      seoDescription:
        "A clear, sample essay on AGI — what the term means and why it matters for people who build products.",
    },
    {
      title: "What I Learned From Building My First AI Product",
      slug: "what-i-learned-from-building-my-first-ai-product",
      excerpt:
        "Sample product notes: start with the job, keep the interface honest, and treat evaluation as design.",
      content: firstProduct,
      coverImage: "/blog/product.svg",
      category: "Startups",
      tags: ["AI", "Startups", "Product"],
      featured: false,
      publishedAt: new Date("2026-09-18T09:00:00.000Z"),
      seoTitle: "What I Learned From Building My First AI Product",
      seoDescription:
        "A sample essay on lessons that show up when you put a model inside a product.",
    },
    {
      title: "Building in Public as a Student",
      slug: "building-in-public-as-a-student",
      excerpt:
        "A sample note on learning in public without turning your life into a pitch.",
      content: buildingPublic,
      coverImage: "/blog/learning.svg",
      category: "Learning",
      tags: ["Learning", "Students", "Writing"],
      featured: false,
      publishedAt: new Date("2026-09-10T09:00:00.000Z"),
      seoTitle: "Building in Public as a Student",
      seoDescription:
        "Sample notes on writing while you learn — precise, unfinished, and honest.",
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        authorId: admin.id,
        categoryId: categories.get(post.category)!,
        status: "published",
        featured: post.featured,
        publishedAt: post.publishedAt,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        readingTime: readingTimeMinutes(post.content),
        isDemo: true,
        tags: {
          create: post.tags.map((name) => ({ tagId: tags.get(name)! })),
        },
      },
    });
  }

  await prisma.post.upsert({
    where: { slug: "notes-on-interfaces" },
    update: {},
    create: {
      title: "Notes on interfaces",
      slug: "notes-on-interfaces",
      excerpt: "An unpublished draft — only visible in admin.",
      content:
        "## Draft\n\nThis draft exists so the admin panel has something to unpublish, edit and delete.\n\nIt should never appear on the public journal.",
      authorId: admin.id,
      categoryId: categories.get("Product")!,
      status: "draft",
      featured: false,
      readingTime: 1,
      isDemo: true,
    },
  });

  console.log("Seeded admin, categories, tags and sample posts.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
