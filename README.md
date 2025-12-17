# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🎨 Design System & Color Scheme

MASAR uses a **luxury dark gold theme** designed for sophisticated investors:

### Primary Colors
- **Primary Gold**: `hsl(45, 85%, 35%)` - Main brand color for buttons, highlights, and key elements
- **Primary Foreground**: `hsl(0, 0%, 100%)` - White text on gold backgrounds
- **Accent Gold**: `hsl(45, 85%, 45%)` - Lighter gold for secondary elements

### Color Usage Guidelines
- **Buttons**: Use primary gold gradient with white text
- **Headers**: Gold gradient text for premium feel
- **Badges**: Dark gold background with white text
- **Icons**: Gold backgrounds with white icons
- **Borders**: Gold borders for premium elements
- **Shadows**: Gold-tinted shadows for luxury effect

### CSS Variables
```css
--primary: 45 85% 35%;
--primary-foreground: 0 0% 100%;
--accent: 45 85% 45%;
--gradient-luxury: linear-gradient(135deg, hsl(45 85% 35%) 0%, hsl(45 85% 45%) 50%, hsl(45 85% 55%) 100%);
```

### Tailwind Classes
- Primary: `bg-primary`, `text-primary`, `border-primary`
- Gradients: `bg-gradient-to-r from-primary to-primary/80`
- Text: Always use `text-white` on gold backgrounds for accessibility

**Important**: All new components must follow this luxury gold theme for brand consistency.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
