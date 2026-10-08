import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z
    .object({
      title: z.string(),
      published: z.boolean().default(false),
      summary: z.string().default(""),
      client: z.string().default(""),
      year: z.number().optional(),
      status: z.string().default(""),
      services: z.array(z.string()).default([]),
      contribution: z.string().default(""),
      problem: z.string().default(""),
      requirements: z.array(z.string()).default([]),
      approach: z.string().default(""),
      result: z.string().default(""),
      media: z
        .array(
          z.object({
            src: z.string().startsWith("/"),
            alt: z.string().min(1),
            caption: z.string().min(1),
            width: z.number().positive(),
            height: z.number().positive(),
          }),
        )
        .default([]),
      cta: z.object({ label: z.string(), href: z.url() }).optional(),
    })
    .superRefine((p, ctx) => {
      if (p.published) {
        for (const k of [
          "title",
          "summary",
          "client",
          "status",
          "contribution",
          "problem",
          "approach",
          "result",
        ] as const) {
          if (!p[k].trim())
            ctx.addIssue({
              code: "custom",
              message: `Published projects require ${k}`,
              path: [k],
            });
        }
        if (
          !p.year ||
          !p.services.length ||
          !p.requirements.length ||
          !p.media.length
        )
          ctx.addIssue({
            code: "custom",
            message:
              "Published projects require year, services, requirements, and approved media",
          });
      }
    }),
});
export const collections = { work };
