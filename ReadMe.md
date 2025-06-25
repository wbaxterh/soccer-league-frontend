# ⚽ Soccer League Frontend

This is the **React / Next.js / TypeScript** frontend for the Soccer League App — a modern web interface for organizing and managing amateur soccer leagues.

## 🔥 Features

- Public view of leagues, teams, schedules, and standings
- Admin dashboard to manage:
  - Leagues
  - Teams (incl. coach info, division, stats)
  - Player rosters
  - Game scheduling and score entry
- Mobile-responsive design with Tailwind CSS
- Clean routing using Next.js App Router
- API integration with backend services

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/) for API requests
- **Deployed via [AWS Amplify](https://aws.amazon.com/amplify/)**

## 🚀 Deployment (AWS Amplify)

This app is configured for deployment via **AWS Amplify**. Push your code to a GitHub branch and connect it through the Amplify Console to handle:

- Continuous deployment
- Custom domains
- Environment variables
- Hosting

## 🧠 Cursor Model Context

This repo includes a [Cursor](https://cursor.sh) context file for AI-assisted development using the **Model Context Protocol**.

- 📁 `.cursor/contexts/soccer-league-frontend.json`

This context file describes:

- Page routes and UI components
- Admin features and data models
- API integration points
- Design references based on screenshots

To use it:

1. Make sure you're running an MCP server (see `.cursor/mcp.json`)
2. Use `Cmd+K → Set Model Context` inside Cursor to enable `soccer-league-frontend`

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Run the local dev server
pnpm dev
```
