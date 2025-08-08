import { mcpConfig } from "../lib/config.js";
import { componentCategories } from "../lib/categories.js";
import {
  ComponentDetailSchema,
  ComponentSchema,
  TailGridsDocumentationSchema,
  TailGridsComponentSchema,
} from "./schemas.js";

/**
 *  Fetches TailGrids documentation content
 *  @returns Documentation content
 */
export async function fetchTailGridsDocs() {
  try {
    const response = await fetch(mcpConfig.docsUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch TailGrids docs: ${response.statusText} - Status: ${response.status}`
      );
    }
    const html = await response.text();
    
    // Parse the HTML to extract documentation content
    return {
      name: "tailgrids-docs",
      type: "documentation",
      description: "TailGrids Documentation - Comprehensive guide for using TailGrids components",
      content: html,
      url: mcpConfig.docsUrl
    };
  } catch (error) {
    console.error("Error fetching TailGrids docs:", error);
    return null;
  }
}

/**
 *  Fetches all UI components from TailGrids by category
 *  @returns An array of components organized by category
 */
export async function fetchUIComponents() {
  try {
    const components = [];
    
    // Generate components based on our categories
    for (const [category, componentList] of Object.entries(componentCategories)) {
      for (const componentName of componentList) {
        components.push({
          name: componentName,
          type: "tailgrids:component",
          description: `${componentName} component from TailGrids ${category} category`,
          category: category,
          url: `${mcpConfig.componentsUrl}/${category.toLowerCase()}/${componentName}`
        });
      }
    }

    return components.map((item: any) => {
      try {
        return ComponentSchema.parse({
          name: item.name,
          type: item.type,
          description: item.description,
          category: item.category,
          url: item.url
        });
      } catch (parseError) {
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error("Error generating TailGrids components:", error);
    return [];
  }
}

/**
 * Fetches details for a specific TailGrids component by scraping the web page
 * @param componentName The name of the component.
 * @param category The category of the component.
 * @returns The details of the component.
 */
export async function fetchComponentDetails(componentName: string, category?: string) {
  try {
    // Since TailGrids doesn't have an API, we'll provide structured information
    // based on the component name and category
    const componentInfo = {
      name: componentName,
      type: "tailgrids:component",
      category: category || "unknown",
      description: `${componentName} component from TailGrids`,
      usage: `Visit https://tailgrids.com/components to find and copy the ${componentName} component code`,
      installation: "TailGrids components are copy-paste ready. Simply copy the HTML/React/Vue code from the TailGrids website.",
      features: [
        "Tailwind CSS based",
        "Responsive design",
        "Dark mode support",
        "Customizable styling",
        "Copy-paste ready"
      ],
      formats: ["HTML", "React", "Vue", "Figma"],
      url: `${mcpConfig.componentsUrl}`
    };

    return ComponentDetailSchema.parse(componentInfo);
  } catch (error) {
    console.error(`Error fetching component ${componentName}:`, error);
    throw error;
  }
}

/**
 * Fetches TailGrids component categories and their descriptions
 * @returns An array of component categories with descriptions
 */
export async function fetchComponentCategories() {
  try {
    const categories = [];
    
    for (const [categoryName, components] of Object.entries(componentCategories)) {
      categories.push({
        name: categoryName,
        type: "tailgrids:category",
        description: `${categoryName} category containing ${components.length} component types`,
        components: components,
        url: `${mcpConfig.componentsUrl}#${categoryName.toLowerCase()}`
      });
    }

    return categories;
  } catch (error) {
    console.error("Error fetching component categories:", error);
    return [];
  }
}

/**
 * Searches TailGrids documentation for specific content
 * @param query The search query
 * @returns Relevant documentation content
 */
export async function searchTailGridsDocs(query: string) {
  try {
    const docs = await fetchTailGridsDocs();
    if (!docs) {
      return null;
    }

    // Simple text matching - in a real implementation, you might want
    // to use a proper text search or AI-powered search
    const queryLower = query.toLowerCase();
    const contentLower = docs.content.toLowerCase();
    
    if (contentLower.includes(queryLower)) {
      return {
        query: query,
        found: true,
        description: `Documentation content related to "${query}"`,
        url: docs.url,
        suggestion: `Visit ${docs.url} for complete documentation on "${query}"`
      };
    }

    return {
      query: query,
      found: false,
      description: `No specific documentation found for "${query}"`,
      url: docs.url,
      suggestion: `Visit ${docs.url} to browse all available documentation`
    };
  } catch (error) {
    console.error(`Error searching docs for "${query}":`, error);
    return null;
  }
}
