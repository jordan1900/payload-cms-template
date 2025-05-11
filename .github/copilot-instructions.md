# GitHub Copilot Instructions for Payload CMS v3

This is a project built using Payload CMS.

## About Payload CMS

Payload CMS is an open-source, headless CMS and application framework built with TypeScript, Node.js, and React. Version 3.0 brings significant architectural changes and new features, making it the first Next.js-native CMS that installs directly into the app folder of Next.js applications.

Key differentiators:

- Open-source with full code ownership (no SaaS)
- Install directly in your existing Next.js app folder
- Deploy anywhere including serverless on Vercel
- Combines frontend and backend in the same codebase
- Provides a full TypeScript backend and admin panel instantly

## Key Concepts

When providing assistance for Payload CMS v3 projects, keep these core concepts in mind:

- **Next.js Integration**: Payload CMS v3 is designed to install directly into a Next.js app folder, allowing for seamless integration between frontend and backend.
- **Database Adaptors**: Payload works with MongoDB, PostgreSQL, and SQLite through dedicated database adaptors.
- **TypeScript First**: All configurations are strongly typed, providing excellent IDE support and type safety.
- **Collections and Globals**: These define the schema and data structure of the CMS.
- **Fields**: The building blocks of Payload that define document schemas and generate UI components.
- **Live Preview**: Allows editors to see changes in real-time without saving, now supporting server components.
- **Rich Text Editor**: Based on Lexical, supporting custom blocks and components.
- **Jobs Queue**: A fully functional queue for scheduling tasks and workflows.
- **Join Fields**: Database-level relationships for complex data architectures.
- **Admin UI**: A fully customizable admin panel with React components.
- **Access Control**: Granular permission controls at collection and document levels.
- **Hooks**: Lifecycle events for executing custom logic during operations.

## Project Structure

A typical Payload CMS v3 project with the website template has the following structure:

```md
src/
├── access/
├── app/
│   ├── (app)/       # Frontend application routes
│   └── (payload)/   # Payload admin and API routes
│       ├── admin/
│       ├── api/
│       └── _payload-config.ts
├── collections/     # Collection definitions
│   ├── Media/
│   ├── Pages/
│   └── Users/
├── globals/         # Global document definitions
├── blocks/          # Reusable content blocks
├── utilities/
├── payload.config.ts
└── payload-types.ts
```

## Payload Config

The payload.config.ts file is central to everything Payload does:

- It registers all collections, globals, and plugins
- Configures the database adapter (MongoDB, PostgreSQL, SQLite)
- Sets up the admin panel and UI options
- Configures hooks, access control, and authentication
- Defines localization settings and file handling
- Registers jobs and queue configurations

Remember that the Next.js configuration needs the Payload plugin:

```javascript
import { withPayload } from '@payloadcms/next'
export default withPayload(nextConfig)
```

## Collections and Fields

When helping with collections:

- Suggest appropriate field types based on the data model
- Include proper access control patterns based on requirements
- Recommend hooks for data lifecycle management when needed
- Structure admin UI configurations for better usability

Key field types to recommend include:

- Rich text fields with the Lexical editor
- Upload fields for media handling
- Relationship fields for connecting collections
- Blocks fields for flexible content structures
- Array fields for repeatable content
- Group fields for organizing related fields

## Rich Text and Block-based Content

Payload v3's rich text is powered by Lexical, Meta's rich text editor:

- It supports custom blocks and inline elements
- Can be extended with plugins and custom nodes
- Allows for complex formatting and content structures
- Can embed relationships and media directly in content

When advising on rich text implementations:

- Recommend appropriate feature configurations
- Help structure custom block definitions
- Suggest patterns for rendering rich text content in the frontend
- Consider rich text serialization needs for different output formats

## Live Preview

Live Preview in v3 supports server components, which is a major improvement:

- Help implement preview routes in Next.js
- Suggest patterns for draft vs published content
- Recommend state management for live editing
- Consider caching and revalidation strategies

## Next.js Integration

Payload v3 is designed for tight Next.js integration:

- Help structure API routes for Payload data
- Suggest efficient data fetching patterns with server components
- Recommend caching strategies with Next.js
- Consider serverless deployment considerations

## Database Integration

Payload supports multiple databases through adapters:

- MongoDB with the mongoose adapter
- PostgreSQL with the Drizzle adapter
- SQLite for local development

When advising on database integration:

- Consider performance implications for the chosen database
- Recommend appropriate indexing strategies
- Suggest migration patterns for schema changes
- Consider serverless connection pooling needs

## Authentication and Access Control

Payload has a robust auth system:

- Recommend appropriate user collection configuration
- Suggest role-based access control patterns
- Help implement JWT or cookie-based authentication
- Consider security best practices for sensitive operations

## TypeScript Support

Payload generates TypeScript types for collections and globals:

- Recommend using generated types from payload-types.ts
- Suggest running the type generation command after schema changes
- Help implement type-safe components and functions
- Consider extending types for custom needs

## Plugin Development

Payload has an extensible plugin system:

- Suggest modular plugin architecture
- Help implement collection and field extensions
- Recommend patterns for admin UI customization
- Consider plugin configuration and options patterns

## Jobs and Queues

Payload v3 has a powerful job system:

- Recommend job definition patterns with proper typing
- Suggest queue configuration for performance
- Help implement error handling and retries
- Consider scheduling patterns for recurring tasks

## Custom Admin Components

Payload allows extensive admin UI customization:

- Suggest component integration patterns with the admin panel
- Help implement field customizations
- Recommend dashboard and view customizations
- Consider admin UI state management

## Media and Uploads

Payload has robust media handling:

- Recommend appropriate storage configurations
- Suggest image processing and optimization approaches
- Help implement media access control
- Consider cloud storage options with plugins

## Localization

Payload supports multi-language content:

- Suggest proper localization configuration
- Help implement language switching
- Recommend locale-specific validation
- Consider content structure for localized fields

## Website Template Specifics

The Payload CMS Website Template is a comprehensive starter that showcases many Payload v3 features:

- **Server-side Live Preview**: Demonstrates how to implement live preview with server components
- **Custom Rich Text blocks**: Includes examples of custom blocks in the Lexical editor
- **On-demand revalidation**: Shows proper Next.js cache management with Payload
- **Tailwind Integration**: Built with Tailwind CSS for styling, using Tailwind V4
- **Full TypeScript support**: All components and configurations are fully typed
- **Media handling**: Proper media upload and management
- **SEO optimization**: Built-in SEO fields and components

When working with the Website Template, suggest code that follows its patterns and structure, particularly:

- Page building with layout blocks
- Media handling with proper image optimization
- Category and tag management
- Authentication and user management
- SEO field implementation

## Best Practices

Advise on these best practices:

- Keep collection definitions modular and reusable
- Use access control functions consistently
- Leverage TypeScript for type safety
- Follow Next.js best practices for routing and data fetching
- Implement proper error handling
- Use environment variables for configuration
- Build reusable blocks and components
- Implement proper versioning and drafts
