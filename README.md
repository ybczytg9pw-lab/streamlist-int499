# StreamList — INT499 Week 1

React-based starter application for EZTechMovie's StreamList project. This submission covers **Week 1 only**: page navigation, a working user input form, CSS styling, and logging submitted titles to the browser console.

## Requirements

- Node.js 20.19+ or 22.12+
- Visual Studio Code (recommended)
- An internet connection to install dependencies and load Google Material Symbols icons

## Run on your computer

1. Extract the submitted ZIP file.
2. In Visual Studio Code, select **File > Open Folder** and choose the `StreamList_Week1` folder.
3. Open **Terminal > New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the localhost URL printed by Vite (usually `http://localhost:5173`).

To verify the production build, run `npm run build`.

## Week 1 checklist

- [x] React application created with Vite
- [x] `BrowserRouter`, `Routes`, `Route`, and `NavLink` provide seamless navigation
- [x] StreamList homepage includes a controlled input form
- [x] Form passes the trimmed title to the parent through an `onSubmitTitle` prop
- [x] Parent logs the input with `console.log('StreamList input:', title)`
- [x] Movies, Cart, and About are navigable placeholder pages with no movie/cart/company data
- [x] Responsive custom CSS and free Material Symbols icons (Google Fonts)
- [x] No database, service worker, authentication, checkout, or movie search is claimed at this stage

## Test the input

1. Open the StreamList page.
2. Press **F12** in Chrome or Edge, then open the **Console** tab.
3. Enter `The Pursuit of Happyness` and click **Add title**.
4. Confirm that the console displays: `StreamList input: The Pursuit of Happyness`.
5. Check the confirmation message below the form and navigate to Movies, Cart, and About.

## Folder structure

```text
StreamList_Week1/
├── index.html
├── package.json
├── vite.config.js
├── public/favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── StreamListForm.jsx
│   │   └── ComingSoon.jsx
│   └── pages/
│       ├── StreamListPage.jsx
│       ├── MoviesPage.jsx
│       ├── CartPage.jsx
│       └── AboutPage.jsx
└── README.md
```

## GitHub upload

Create a new public GitHub repository named `streamlist-int499`, then run these commands in the **StreamList_Week1** directory (replace `YOUR_USERNAME`):

```bash
git init
git add .
git commit -m "Week 1 StreamList React starter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/streamlist-int499.git
git push -u origin main
```

The `.gitignore` excludes `node_modules` and production `dist` files. Do **not** include credentials or payment-card information in the project.

Copy the resulting GitHub URL into your submission and Part 2 reflection paper.

## A note for later weeks

The business overview describes a broader movie-streaming service, subscriptions, shopping cart, account access, and payment management. These features are **not** implemented in this Week 1 build. They should be added when the corresponding weekly assignments call for them, following security and privacy best practices.

## Sources

- React Router documentation: https://reactrouter.com/start/declarative/routing
- Vite documentation: https://vite.dev/guide/
- Google Material Symbols: https://fonts.google.com/icons

