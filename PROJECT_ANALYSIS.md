# AXION Project - Comprehensive Analysis

## 🎯 Project Overview
**Project Name:** Axion (formerly LiveTerm)  
**Type:** Next.js Terminal Emulator Website  
**Purpose:** Interactive terminal-styled website showcasing an autonomous AI operations platform for business intelligence  
**Technology Stack:** React 18, Next.js 12, TypeScript, Tailwind CSS  
**Current Version:** 0.1.0

---

## 📦 Tech Stack & Dependencies

### Core Framework
- **Next.js 12.1.6** - React framework for production
- **React 18.1.0** - UI library
- **React DOM 18.1.0** - DOM rendering

### Styling
- **Tailwind CSS 3.0.24** - Utility-first CSS framework
- **PostCSS 8.4.13** - CSS transformation tool
- **Autoprefixer 10.4.7** - Vendor prefix support

### Utilities
- **Axios 0.27.2** - HTTP client for API requests
- **DOMPurify 3.3.0** - HTML sanitization for XSS prevention
- **React Icons 4.3.1** - Icon library

### Development Tools
- **TypeScript 4.6.4** - Type safety
- **ESLint 8.15.0** - Code linting
- **Prettier 2.6.2** - Code formatting
- **Husky 8.0.1** - Git hooks
- **@types/react** - TypeScript definitions

---

## 📁 Directory Structure

```
axion/
├── src/
│   ├── pages/
│   │   ├── _app.tsx          # Root app wrapper, layout, styling
│   │   ├── index.tsx         # Main terminal page
│   │   └── 404.tsx           # 404 redirect to home
│   ├── components/
│   │   ├── Ps1.tsx           # Prompt display (user@host format)
│   │   ├── input.tsx         # Terminal input handling
│   │   ├── ErrorBoundary.tsx # Error boundary component
│   │   └── history/
│   │       ├── History.tsx   # History display component
│   │       ├── hook.ts       # useHistory hook for state management
│   │       └── interface.ts  # History TypeScript interface
│   ├── styles/
│   │   └── global.css        # Global styles & font definitions
│   └── utils/
│       ├── api.ts            # External API calls (GitHub, Weather)
│       ├── shell.ts          # Command execution logic
│       ├── commandExists.ts  # Validate if command exists
│       ├── sanitize.ts       # HTML sanitization
│       ├── tabCompletion.ts  # Tab completion logic
│       └── bin/
│           ├── index.ts      # Exports all commands
│           ├── commands.ts   # Built-in terminal commands (help, echo, etc)
│           ├── api_commands.ts # API-dependent commands (weather, projects)
│           └── sumfetch.ts   # Summary fetch command with ASCII art
├── public/
│   ├── assets/fonts/         # Custom fonts
│   ├── manifest.json         # PWA manifest
│   ├── browserconfig.xml     # Browser config
│   └── robots.txt
├── config.json               # Main configuration file
├── tailwind.config.js        # Tailwind theme configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration (minimal)
└── package.json              # Dependencies & scripts
```

---

## 🏗️ Architecture & Data Flow

### Component Hierarchy
```
_app.tsx (Root)
  └── ErrorBoundary
      └── Main Container
          └── index.tsx (IndexPage)
              ├── History Component
              │   └── Displays all past commands/outputs
              └── Input Component
                  ├── Ps1 (Prompt)
                  └── <input> (Command input field)
```

### Data Flow
```
User Types Command
    ↓
Input Component (input.tsx)
    ↓
Key Down Event Handler
    ↓
Shell Utility (shell.ts)
    ↓
Command Validation (commandExists.ts)
    ↓
Execute Command Function
    ├── Local Commands (commands.ts)
    ├── API Commands (api_commands.ts, api.ts)
    └── Special Commands (clear, help, etc)
    ↓
Generate Output
    ↓
HTML Sanitization (sanitize.ts)
    ↓
Add to History (useHistory hook)
    ↓
Save to localStorage
    ↓
Display in History Component
    ↓
Scroll Input into View
```

---

## 🎮 Core Components Explained

### 1. **_app.tsx** - Application Root
- Wraps entire application with ErrorBoundary
- Sets up global CSS
- Manages global input reference for focus management
- Allows clicking anywhere to focus terminal
- Sets viewport meta tags

### 2. **index.tsx** - Terminal Page
- Main terminal interface
- Manages banner display on initial load
- Handles history hook initialization
- Scrolls to input after each command
- Uses `useEffect` to prevent SSR hydration issues

### 3. **Input Component** (input.tsx)
**Keyboard Shortcuts:**
- `Tab` - Auto-complete command
- `Enter` - Execute command
- `Ctrl+C` - Clear input
- `Ctrl+L` - Clear history
- `ArrowUp/Down` - Navigate command history

### 4. **History Component** (History.tsx)
- Maps through history array
- Displays command + prompt for each entry
- Sanitizes HTML output with DOMPurify
- Maintains formatted output (pre-wrap for whitespace)

### 5. **useHistory Hook** (hook.ts)
- State management for terminal commands
- localStorage persistence with filtering
- Tracks last command index for arrow key navigation
- Hydration-aware (prevents SSR hydration mismatch)
- Auto-saves on changes

### 6. **Ps1 Component** (Ps1.tsx)
- Shows terminal prompt: `username@hostname:$ ~`
- Colors from config (yellow/gray/green)
- Reusable throughout terminal

### 7. **ErrorBoundary** (ErrorBoundary.tsx)
- Class component that catches React errors
- Displays error message with reload button
- Prevents entire app from crashing

---

## ⚙️ Utilities Explained

### **shell.ts** - Command Router
- Parses command string into args
- Validates command existence
- Routes to appropriate command function
- Handles special commands: `clear`, empty string
- Returns error if command not found
- Clears input after execution

### **commandExists.ts** - Validation
- Checks if entered command exists
- Includes 'clear' in valid commands
- Used by Input component to color input (green=valid, red=invalid)

### **sanitize.ts** - XSS Prevention
- Uses DOMPurify to sanitize HTML
- Allows safe tags: links, formatting, code, divs, spans
- Allows classes for styling (Tailwind)
- Prevents script injection
- Server-side safe (checks for window)

### **tabCompletion.ts** - Auto-completion
- Filters commands starting with typed text
- Auto-completes if only one match
- Uses Object.keys(bin) to get available commands

### **api.ts** - External API Calls
```typescript
- getProjects()    // GitHub repos
- getReadme()      // GitHub README
- getWeather(city) // Weather from wttr.in
- getQuote()       // Random quotes from quotable.io
```

---

## 📋 Command System

### Built-in Commands (commands.ts)

**Information:**
- `help` - Show available commands
- `about` - About the creator
- `sumfetch` - ASCII summary with contact info

**Axion Mission (Business Logic):**
- `problem` - Explains traditional BI failures
- `solution` - Describes Axion autonomous platform
- `vision` - Mission statement
- `waitlist` - Join private beta (with email form)

**Contact/Social:**
- `email` - Opens mailto link
- `github` - Opens GitHub profile
- `linkedin` - Opens LinkedIn profile
- `resume` - Opens resume PDF
- `donate` - Shows donation links

**Search:**
- `google [query]` - Google search
- `duckduckgo [query]` - DuckDuckGo search
- `bing [query]` - Bing search (with humor)
- `reddit [query]` - Reddit search

**Unix-like Commands:**
- `echo [text]` - Echo text
- `whoami` - Show username
- `ls` - List directories (fake)
- `cd` - Change directory (humor + donation link)
- `date` - Show current date/time
- `vi`, `vim`, `nvim`, `emacs` - Editor jokes
- `sudo` - Permission denied joke (rickroll)

**Special:**
- `banner` - Show ASCII banner
- `clear` - Clear terminal history

### API Commands (api_commands.ts)
- `projects` - Fetch GitHub repos and display as links
- `quote` - Display random inspirational quote
- `readme` - Fetch and display GitHub README
- `weather [city]` - Get weather for city

---

## 🎨 Configuration System

### config.json
```json
{
  "readmeUrl": "GitHub README URL",
  "title": "Website title",
  "name": "Your name",
  "ascii": "ascii art identifier",
  "social": {
    "github": "handle",
    "linkedin": "handle"
  },
  "email": "your@email.com",
  "ps1_hostname": "terminal hostname",
  "ps1_username": "terminal username",
  "resume_url": "path to resume",
  "repo": "GitHub repo URL",
  "donate_urls": {
    "paypal": "link",
    "patreon": "link"
  },
  "colors": {
    "light": { background, foreground, yellow, green, gray, blue, red },
    "dark": { same color scheme }
  }
}
```

### Tailwind Integration
- Colors pulled from config.json
- Supports both light and dark modes
- Custom color names: `light-background`, `dark-foreground`, etc.
- Media query for dark mode detection

### Global Styles (global.css)
- Custom font: Hack Nerd Font
- Full-height layout
- Custom scrollbar styling
- Tailwind directives

---

## 🔄 State Management Flow

### History State (useHistory)
```
Initial: []
User types: npm run dev
User presses Enter: 
  → command = "npm run dev"
  → Executes and gets output
  → setHistory(output) adds to history array
  → localStorage saves: [{ id, date, command, output }]
  → History component re-renders
  → Input clears
```

### Input Validation
```
User types: "help"
  → commandExists("help") returns true
  → Input text color: GREEN
  → User presses Enter
  → Executes help command

User types: "xyz123"
  → commandExists("xyz123") returns false
  → Input text color: RED
  → User presses Enter
  → Shows: "shell: command not found: xyz123"
```

---

## 🌓 Theming System

### Light Theme
- Background: #FBF1C9 (cream)
- Foreground: #3C3836 (dark gray)
- Accent colors for syntax highlighting

### Dark Theme
- Background: #2E3440 (dark blue-gray)
- Foreground: #E5E9F0 (light gray)
- Muted accent colors for readability

### Theme Selection
- Auto-detects via `prefers-color-scheme` media query
- Can be customized in themes.json
- Applied via Tailwind dark mode classes

---

## 📱 Responsive Design

- Mobile-first approach
- Responsive font sizes: `text-xs md:text-base`
- Responsive min-width: `min-w-max md:min-w-full`
- Scrollable container for long content
- Viewport meta tags for proper scaling

---

## 🔐 Security Measures

1. **HTML Sanitization** - DOMPurify prevents XSS
2. **TypeScript** - Type safety catches bugs
3. **Error Boundary** - Prevents app crashes from component errors
4. **localStorage Filtering** - Only saves valid commands
5. **Allowed HTML Tags** - Restricted to safe tags only

---

## 🚀 Build & Deploy

### Development
```bash
npm run dev          # Start dev server
npm run lint         # Run ESLint
```

### Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Deployment Options
- **Vercel** (recommended) - Zero-config Next.js deployment
- **Docker** - docker-compose.yml provided
- **Other Node hosts** - Standard Node.js app

---

## 🎯 Key Features

1. **Interactive Terminal** - Full terminal emulation in browser
2. **Command History** - Persistent with localStorage
3. **Tab Completion** - Auto-complete with Tab key
4. **History Navigation** - Arrow keys for command history
5. **Rich Output** - HTML output with sanitization
6. **API Integration** - GitHub, Weather, Quotes APIs
7. **Customizable** - One config.json file changes everything
8. **Dark Mode** - Automatic theme detection
9. **Error Handling** - Global error boundary
10. **Type Safe** - Full TypeScript support

---

## 🔧 Development Patterns

### Command Function Pattern
```typescript
export const commandName = async (args: string[]): Promise<string> => {
  // Implementation
  return outputString; // Can include HTML
};
```

### State Update Pattern
```typescript
// Using hooks in functional components
const [state, setState] = useState(initialValue);
const [history, setHistory] = useHistory([]);
```

### Async Command Pattern
```typescript
// In shell.ts
const output = await commandFn(args.slice(1));
setHistory(output);
```

---

## 📊 File Statistics

- **Total TypeScript Files:** 14
- **React Components:** 5
- **Pages:** 3
- **Utility Files:** 7
- **Command Functions:** 30+
- **Lines of Code:** ~2000

---

## 🎓 Learning Points

1. **Next.js** - SSR-aware components, page routing, API patterns
2. **React Hooks** - Custom hooks, state management, side effects
3. **TypeScript** - Interfaces, generics, type safety
4. **Terminal UI** - Keyboard event handling, history management
5. **API Integration** - Axios, error handling, async operations
6. **Security** - XSS prevention, HTML sanitization
7. **Tailwind CSS** - Utility-first design, dark mode, responsive
8. **localStorage** - Persistence, data serialization
9. **Git Hooks** - Husky pre-commit hooks
10. **Error Handling** - Error boundaries, try-catch patterns

---

## 🚦 Current Status

✅ **Complete Features:**
- Core terminal interface
- Command execution system
- History management & persistence
- Theme support (light/dark)
- API integration
- Error handling
- Type safety

🔄 **Potential Enhancements:**
- More commands
- Advanced tab completion
- Search functionality
- Multi-line input
- Piping commands
- Environment variables
- Custom command creation UI

---

## 📝 Next Steps for Development

1. **Identify** what features you want to add/modify
2. **Check** which files are affected
3. **Implement** changes following existing patterns
4. **Test** with `npm run dev`
5. **Deploy** to Vercel or Docker

---

**Analysis Complete!** 🎉

The Axion project is a well-structured, type-safe terminal emulator built with modern web technologies. It demonstrates clean architecture, proper separation of concerns, and follows React/Next.js best practices.
