# Appversal | Simplified Survey Campaign Builder

A simplified **Survey Campaign Builder** that allows users to configure a survey campaign from **Content** and **Styling** tabs while displaying an interactive, high-fidelity live mobile preview that updates instantly.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: `https://github.com/<your-username>/appversal-builder` (Replace with your repository link)
- **Live Deployment URL**: `https://appversal-builder.vercel.app` (Once deployed, add your Vercel URL here)

---

## ✨ Features

### 1. Content Panel Configurator
- **Introduction Page**: Dynamically specify the number of survey pages (each representing one question). Adding or removing pages instantly creates or truncates question sections.
- **Question Pages**: 
  - Edit Question Title & Subtitle.
  - Manage Option Lists: Add options, edit options, or delete options (ensures a minimum of 2 options).
  - Additional Comments Toggle: Enable or disable a textarea comments box.
  - Conditional Logic: Enable simple redirection rules (e.g., if option A is selected, jump to Question X, skip to Thank You, or redirect to a custom URL).
  - Submit Button Customization: Configure button label per question.
- **Thank You Page**:
  - Toggle Thank You page on/off.
  - Upload Custom Media: Select image/gif/video files to preview instantly on the screen.
  - Customize Title, Description, and CTA Button Text.
  - Click-Redirect Action: Set CTA button action to "Close Survey" or "Redirect to URL".

### 2. Styling Configurator
- **General Appearance**: Customize backdrop color, backdrop opacity (%), survey card background, card corner radii (TL, TR, BL, BR), display delay timer (seconds), and screen entrance animation ('Slide Up', 'Fade In', 'Scale In').
- **Typography Overrides**: Customize text color, font family, font size, weight, styles (bold/italic/underline), text alignment (left/center/right), and top/bottom/left/right margins for both Title and Subtitle.
- **Option List Styling**:
  - Layout choice: Radio Style, Checkbox Style, Filled Option, or Alternative (2-Column Grid).
  - Sizing details: Option heights, option vertical spacing, bullet-to-text spacing, and option corner radius.
  - Selection states: Customize border colors, background colors, text colors, and border widths uniquely for both **Selected** and **Unselected** options.
- **Comments Field**: Customize background, text, border colors, and border width.
- **CTA Button**: Toggle full width vs custom width, border/text/background colors, height, width, border width, corner radii (TL, TR, BL, BR), alignment, and margins.
- **Cross Close Button**: Toggle on/off, choose predefined shapes ('Sleek Circle', 'Transparent', 'Modern Square', 'Pill Box'), upload custom close icon (SVG/PNG), customize icon color/fill/stroke, and set sizing & margins.
- **Thank You Page**: Stylize Title, Subtitle, Media dimensions (width % and height px), and the thank-you CTA button.

### 3. Live Mobile Preview
- Displays a high-fidelity mock mobile phone frame on the right side of the screen.
- Synchronizes with configuration panels immediately—no save or refresh required.
- Implements entrance delay simulation (waiting X seconds before animating popup survey).
- Interactive navigation: Users can click option pills, type in comments, navigate using Back/Next/Skip, close using the cross icon, and view the Thank You page.
- Clicking the final CTA triggers a **Confetti Explosion** and alerts the user of redirection targets.

### 4. Theme Presets
- Built-in visual themes let users toggle styling packages instantly (e.g. *Neon Dream*, *Minimal Glass*, *Golden Sunset*, *Forest Fresh*).

---

## 🛠️ Tech Stack
- **Framework**: [React.js](https://react.dev/) (v19)
- **Bundler**: [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Vanilla CSS (maximum control, fluid grids, premium dark-mode interface)

---

## 📂 Folder Structure

```
appversal/
├── public/
│   └── favicon.svg           # Application favicon
├── src/
│   ├── assets/               # Starter assets
│   ├── components/
│   │   ├── Sidebar.jsx       # Left configuration form (tabs, accordions, inputs)
│   │   ├── MobilePreview.jsx # Right mobile preview device, styling injection, navigation logic
│   │   └── ThemePresets.jsx  # Presets buttons bar
│   ├── utils/
│   │   └── defaultState.js   # State structure schemas, theme presets definitions
│   ├── App.css               # Empty placeholder
│   ├── App.jsx               # Root application component containing central state managers
│   ├── index.css             # Main styling system, layout structures, scrollbars, phone mockup styles
│   └── main.jsx              # React entry mount point
├── index.html                # Entry HTML document (includes SEO metadata, Google font preconnects)
├── package.json              # Dependencies and run scripts
└── vite.config.js            # Vite configuration details
```

---

## 💻 Local Setup Instructions

1. **Clone the repository** (if hosted on GitHub) or locate the directory:
   ```bash
   git clone <repository-url>
   cd appversal
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173`).

4. **Compile the production bundle**:
   ```bash
   npm run build
   ```
   This will output optimized, static assets inside the `/dist` directory.

---

## ☁️ How to Deploy on Vercel (Step-by-Step Guide)

You can deploy this frontend application to Vercel either using the **Vercel Web Dashboard** (recommended) or the **Vercel CLI**.

### Option A: Deploying via Vercel Web Dashboard (GitHub integration)

1. **Push your code to GitHub**:
   - Initialize a Git repository, commit your files, and push to a new GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/your-username/appversal-builder.git
     git push -u origin main
     ```

2. **Log in to Vercel**:
   - Visit [Vercel.com](https://vercel.com/) and log in with your GitHub account.

3. **Import Project**:
   - Click **Add New** > **Project** on the dashboard.
   - Authorize Vercel to access your GitHub repositories if you haven't already.
   - Click **Import** next to the `appversal-builder` repository.

4. **Configure Project Settings**:
   - Vercel automatically detects the project is built with **Vite**.
   - Ensure the following default configurations are set:
     - **Framework Preset**: `Vite`
     - **Root Directory**: `./` (leave default)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - You do not need to add any Environment Variables.

5. **Deploy**:
   - Click the **Deploy** button.
   - Vercel will clone the repository, run the build command, and deploy the application.
   - Once completed, Vercel will provide a **Live Demo URL** (e.g. `https://appversal-builder.vercel.app`).
   - Copy this URL and paste it into this README under the Live Demo link.

### Option B: Deploying via Vercel CLI (Command Line)

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel via CLI**:
   ```bash
   vercel login
   ```
   Follow the login instructions in your browser.

3. **Deploy from your project folder**:
   - Make sure you are in the root directory `appversal` and run:
     ```bash
     vercel
     ```
   - Respond to the configuration prompts:
     - *Set up and deploy?* `yes`
     - *Which scope?* (Select your Vercel account)
     - *Link to existing project?* `no`
     - *What name?* `appversal-builder`
     - *In which directory?* `./`
     - *Want to modify settings?* `no` (it will auto-detect Vite)

4. **Deploy to production**:
   - Run the production build flag command to complete the release:
     ```bash
     vercel --prod
     ```
   - The terminal will display the final deployed URL. Update your README.md and submit.
