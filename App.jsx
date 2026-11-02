import { Navigate, Route, Routes } from 'react-router';
import Navigation from './components/Navigation.jsx';
import StreamListPage from './pages/StreamListPage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Navigation />
      <main className="page-container" id="main-content">
        <Routes>
          <Route path="/" element={<StreamListPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>© 2026 EZTechMovie · StreamList</span>
        <span>INT499 · Week 1 Project</span>
      </footer>
    </div>
  );
}
