#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  IndividualComponentSchema,
  fetchComponentDetails,
  fetchUIComponents,
  fetchTailGridsDocs,
  fetchComponentCategories,
  searchTailGridsDocs,
} from "./utils/index.js";
import { formatComponentName } from "./utils/formatters.js";
import { componentCategories } from "./lib/categories.js";

// Initialize the MCP Server
const server = new McpServer({
  name: "tailgrids-mcp-server",
  version: "1.0.0",
});

// Register the main tool for getting all TailGrids components
server.tool(
  "getTailGridsComponents",
  "Provides a comprehensive list of all TailGrids UI components organized by category.",
  {},
  async () => {
    try {
      const uiComponents = await fetchUIComponents();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(uiComponents, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to fetch TailGrids components",
          },
        ],
        isError: true,
      };
    }
  }
);

// Register tool for getting TailGrids documentation
server.tool(
  "getTailGridsDocs",
  "Fetches TailGrids documentation content for installation and usage guides.",
  {},
  async () => {
    try {
      const docs = await fetchTailGridsDocs();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(docs, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to fetch TailGrids documentation",
          },
        ],
        isError: true,
      };
    }
  }
);

// Register tool for getting component categories
server.tool(
  "getTailGridsCategories",
  "Lists all available TailGrids component categories and their contents.",
  {},
  async () => {
    try {
      const categories = await fetchComponentCategories();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(categories, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to fetch TailGrids categories",
          },
        ],
        isError: true,
      };
    }
  }
);

// Register tool for searching documentation
server.tool(
  "searchTailGridsDocs",
  "Search TailGrids documentation for specific topics or components.",
  {
    query: {
      type: "string",
      description: "Search query for TailGrids documentation",
    },
  },
  async (args: { query: string }) => {
    try {
      const searchResults = await searchTailGridsDocs(args.query);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(searchResults, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to search TailGrids documentation for "${args.query}"`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function fetchComponentsByCategory(
  categoryName: string,
  categoryComponents: string[]
) {
  const componentResults = [];

  for (const componentName of categoryComponents) {
    try {
      const componentDetails = await fetchComponentDetails(componentName, categoryName);

      const validatedComponent = IndividualComponentSchema.parse({
        name: componentDetails.name,
        type: componentDetails.type,
        description: componentDetails.description,
        category: componentDetails.category,
        usage: componentDetails.usage,
        installation: componentDetails.installation,
        features: componentDetails.features,
        formats: componentDetails.formats,
        url: componentDetails.url,
      });

      componentResults.push(validatedComponent);
    } catch (error) {
      console.error(`Error processing component ${componentName}:`, error);
    }
  }

  return componentResults;
}

// Registers tools for each TailGrids component category
async function registerComponentsCategoryTools() {
  for (const [category, categoryComponents] of Object.entries(
    componentCategories
  )) {
    const componentNamesString = categoryComponents.join(", ");

    server.tool(
      `get${category}`,
      `Provides TailGrids ${category} components: ${componentNamesString}. Shows usage instructions, features, and available formats.`,
      {},
      async () => {
        try {
          const categoryResults = await fetchComponentsByCategory(
            category,
            categoryComponents
          );

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(categoryResults, null, 2),
              },
            ],
          };
        } catch (error) {
          let errorMessage = `Error processing TailGrids ${category} components`;
          if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
          }
          return {
            content: [{ type: "text", text: errorMessage }],
            isError: true,
          };
        }
      }
    );
  }
}

// Start the MCP server
async function startServer() {
  try {
    // Initialize category tools first
    await registerComponentsCategoryTools();
    // Connect to stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error("❌ Error starting MCP server:", error);

    // Try to start server anyway with basic functionality
    try {
      const transport = new StdioServerTransport();
      await server.connect(transport);
      console.error("⚠️ MCP server started with limited functionality");
    } catch (connectionError) {
      console.error("❌ Failed to connect to transport:", connectionError);
      process.exit(1);
    }
  }
}

// Start the server
startServer();
