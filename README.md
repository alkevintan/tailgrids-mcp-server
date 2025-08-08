# TailGrids MCP Server

A **Model Context Protocol (MCP) server** for TailGrids, providing AI assistants like Claude with access to TailGrids' comprehensive UI component library and documentation.

## 🎯 What is this?

This MCP server enables AI assistants to help you find, understand, and implement TailGrids components. It provides access to:
- 600+ TailGrids UI components across 6 categories
- Component usage instructions and features
- Installation and implementation guidance
- Documentation search capabilities

## 🚀 Features

- **TailGrids Integration** - Direct access to TailGrids component library
- **Categorized Components** - 6 main categories: Core, Application UI, Marketing UI, E-Commerce, Dashboard, AI Components  
- **Documentation Access** - Search and retrieve TailGrids documentation
- **Multi-format Support** - HTML, React, Vue, and Figma formats
- **TypeScript Support** - Full type safety with Zod validation
- **Development Tools** - Hot reload and MCP inspector for testing

## 📋 Prerequisites

- Node.js 18 or higher  
- pnpm (recommended) or npm
- Claude Code CLI (for easy integration)

## 🚀 Quick Start with Claude

The easiest way to add this MCP server to your project is using Claude Code:

```bash
# Add the TailGrids MCP server to your project
claude mcp add tailgrids-server node /path/to/tailgrids-mcp-server/dist/server.js

# Or add it locally to your user configuration
claude mcp add --scope user tailgrids-server node /path/to/tailgrids-mcp-server/dist/server.js
```

**Note**: Make sure to build the project first (`pnpm run build`) before adding it to Claude.

## 🤝 Use Cases

Perfect for developers working with:

- **TailGrids components** - Get instant access to component documentation
- **Tailwind CSS projects** - Find the right TailGrids component for your needs  
- **Web applications** - Discover components for dashboards, marketing sites, e-commerce
- **AI-assisted development** - Let Claude help you implement TailGrids components

## 🛠️ Manual Installation

If you prefer to set up manually:

1. Clone this repository:

```bash
git clone https://github.com/alkevintan/tailgrids-mcp-server.git
cd tailgrids-mcp-server
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm run build
```

4. Add to Claude manually by editing your MCP configuration:

```json
{
  "mcpServers": {
    "tailgrids-server": {
      "command": "node",
      "args": ["/absolute/path/to/tailgrids-mcp-server/dist/server.js"]
    }
  }
}
```

## ⚙️ Configuration

This MCP server is pre-configured for TailGrids and ready to use out of the box. The configuration includes:

- **TailGrids URLs**: Points to `https://tailgrids.com/docs` and `https://tailgrids.com/components`
- **Component Categories**: Pre-defined with TailGrids' 6 main categories
- **Server Metadata**: Configured as `tailgrids-mcp-server`

### Component Categories Included

- **CoreComponents**: buttons, checkboxes, accordions, alerts, badges, etc.
- **ApplicationUI**: blogs, cards, contacts, footers, headers, modals, etc.  
- **MarketingUI**: hero-sections, features, pricing-tables, testimonials, etc.
- **ECommerce**: product-grids, checkout-forms, shopping-carts, etc.
- **Dashboard**: charts, calendars, profiles, statistics-cards, etc.
- **AIComponents**: ai-headers, ai-navbars, chat-interfaces, etc.

## 🏃‍♂️ Development

### Start Development Server

```bash
pnpm run dev
```

### Build for Production

```bash
pnpm run build
```

### Inspect MCP Server

```bash
pnpm run inspect
```

This opens the MCP Inspector to test your TailGrids MCP server tools interactively. You can test the `getTailGridsComponents`, category-specific tools, and documentation search functionality. 

## 📚 Available Tools

The MCP server provides the following tools for AI assistants:

### Main Tools

- **`getTailGridsComponents`** - Returns all TailGrids components organized by category
- **`getTailGridsDocs`** - Fetches TailGrids documentation content
- **`getTailGridsCategories`** - Lists all component categories with descriptions  
- **`searchTailGridsDocs`** - Search documentation for specific topics

### Category-specific Tools

Dynamic tools for each TailGrids category:

- **`getCoreComponents`** - Basic UI elements (buttons, forms, alerts, etc.)
- **`getApplicationUI`** - App components (navbars, cards, tables, etc.) 
- **`getMarketingUI`** - Marketing sections (hero, pricing, testimonials, etc.)
- **`getECommerce`** - E-commerce components (product grids, checkout, etc.)
- **`getDashboard`** - Dashboard elements (charts, analytics, profiles, etc.)
- **`getAIComponents`** - AI-focused components (chat interfaces, generators, etc.)

Each tool provides:

- Component descriptions and usage instructions
- Available formats (HTML, React, Vue, Figma)
- TailGrids website links for implementation
- Installation guidance

## 🏗️ Project Structure

```
tailgrids-mcp-server/
├── src/
│   ├── server.ts              # Main MCP server implementation
│   ├── lib/
│   │   ├── config.ts          # TailGrids configuration
│   │   └── categories.ts      # TailGrids component categories
│   └── utils/
│       ├── api.ts             # TailGrids API utilities
│       ├── formatters.ts      # Data formatting helpers
│       ├── schemas.ts         # Zod validation schemas  
│       └── index.ts           # Utility exports
├── dist/                      # Built files
├── package.json
└── README.md
```

## 🔧 Customization

### Adding New TailGrids Components

To add new components to existing categories, edit `src/lib/categories.ts`:

```typescript
export const componentCategories = {
  CoreComponents: [
    "buttons",
    "checkboxes", 
    "your-new-component",  // Add here
    // ... existing components
  ],
  // ... other categories
};
```

### Creating New Categories

Add a new category to `src/lib/categories.ts`:

```typescript
export const componentCategories = {
  // ... existing categories
  YourNewCategory: [
    "component-one",
    "component-two",
    "component-three"
  ],
};
```

The server will automatically create a `getYourNewCategory` tool.

### Why Categories?

Categories help organize TailGrids' 600+ components logically:
- Makes it easier for AI assistants to find relevant components
- Prevents overwhelming the AI with too many tools at once
- Mirrors TailGrids' own organization structure
- Enables focused searches within specific component types

## 🌐 How it Works

Since TailGrids doesn't provide a traditional API, this MCP server:

1. **Organizes Components** - Maps TailGrids' component structure into categories
2. **Provides Guidance** - Gives usage instructions and implementation tips  
3. **Links to Source** - Directs to TailGrids website for actual component code
4. **Searches Docs** - Enables documentation search and retrieval
5. **Formats Information** - Structures data for easy AI consumption

## 🚀 Deployment

### Using Claude Code (Recommended)

```bash
# Build first
pnpm run build

# Add to Claude
claude mcp add tailgrids-server node /absolute/path/to/tailgrids-mcp-server/dist/server.js

# Or add to user configuration  
claude mcp add --scope user tailgrids-server node /absolute/path/to/tailgrids-mcp-server/dist/server.js
```

### Manual Configuration

1. Build the project:
```bash
pnpm run build
```

2. Add to your MCP client configuration:
```json
{
  "mcpServers": {
    "tailgrids-server": {
      "command": "node", 
      "args": ["/absolute/path/to/tailgrids-mcp-server/dist/server.js"]
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Model Context Protocol SDK](https://github.com/modelcontextprotocol/sdk)
- Inspired by the original MCP server starter template
- TailGrids for providing an excellent component library
- Thanks to the MCP community for their contributions

## 🔗 Links

- [TailGrids Website](https://tailgrids.com)
- [TailGrids Documentation](https://tailgrids.com/docs)  
- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [Claude Code CLI](https://github.com/anthropics/claude-code)
