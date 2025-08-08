import { z } from "zod";

// Base component schema for TailGrids
export const ComponentSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  url: z.string().optional(),
});

// TailGrids specific schemas
export const TailGridsComponentSchema = ComponentSchema.extend({
  category: z.string(),
  usage: z.string(),
  installation: z.string(),
  features: z.array(z.string()),
  formats: z.array(z.string()),
  url: z.string(),
});

export const TailGridsDocumentationSchema = z.object({
  name: z.string(),
  type: z.literal("documentation"),
  description: z.string(),
  content: z.string(),
  url: z.string(),
});

export const TailGridsCategorySchema = z.object({
  name: z.string(),
  type: z.literal("tailgrids:category"),
  description: z.string(),
  components: z.array(z.string()),
  url: z.string(),
});

export const TailGridsSearchResultSchema = z.object({
  query: z.string(),
  found: z.boolean(),
  description: z.string(),
  url: z.string(),
  suggestion: z.string(),
});

// Updated component detail schema for TailGrids
export const ComponentDetailSchema = z.object({
  name: z.string(),
  type: z.string(),
  category: z.string(),
  description: z.string(),
  usage: z.string(),
  installation: z.string(),
  features: z.array(z.string()),
  formats: z.array(z.string()),
  url: z.string(),
});

// Individual component schema for detailed responses
export const IndividualComponentSchema = ComponentSchema.extend({
  category: z.string(),
  usage: z.string(),
  installation: z.string(),
  features: z.array(z.string()),
  formats: z.array(z.string()),
  url: z.string(),
});
