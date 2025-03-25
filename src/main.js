// Point d'entrée principal
console.log('Bienvenue sur otorsia');

// Import des pages
import { Code } from './pages/Code.js';

// Configuration des routes
const routes = {
  '/': { title: 'Accueil', render: () => `<h1>Accueil</h1><p>Bienvenue sur otorsia</p>` },
  '/blog': { title: 'Blog', render: () => `<h1>Blog</h1><p>Découvrez nos articles</p>` },
  '/creation': { title: 'Création', render: () => `<h1>Création</h1><p>Espace de création</p>` },
  '/market': { title: 'Market', render: () => `<h1>Market</h1><p>Marketplace otorsia</p>` },
  '/code': { title: 'Code', render: Code },
  '/documentation': { title: 'Documentation', render: () => `<h1>Documentation</h1><p>Guide d'utilisation</p>` },
  '/forum': { title: 'Forum', render: () => `<h1>Forum</h1><p>Espace de discussion</p>` },
  '/ia-center': { title: 'IA Center', render: () => `<h1>IA Center</h1><p>Centre d'intelligence artificielle</p>` },
};

// Composants de layout
const Header = () => `
  <header class="header">
    <a href="/" class="header__logo">otorsia</a>
    <div class="header__profile">
      <button class="mobile-menu-btn" aria-label="Menu">☰</button>
    </div>
  </header>
`;

const Sidebar = () => `
  <aside class="sidebar">
    <nav class="nav">
      ${Object.entries(routes).map(([path, { title }]) => `
        <a href="${path}" class="nav__item ${window.location.pathname === path ? 'active' : ''}">
          ${title}
        </a>
      `).join('')}
    </nav>
  </aside>
  <div class="mobile-overlay"></div>
`;

const Footer = () => `
  <footer class="footer">
    <div class="footer__links">
      <a href="/mentions-legales" class="footer__link">Mentions légales</a>
      <a href="/contact" class="footer__link">Contact</a>
      <a href="/liens-utiles" class="footer__link">Liens utiles</a>
    </div>
  </footer>
`;

// Gestionnaire de navigation
const handleNavigation = (event) => {
  if (event) {
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
  }

  const path = window.location.pathname;
  const route = routes[path] || routes['/'];
  
  const mainContent = `
    <div class="page-header">
      <h1>${route.title}</h1>
    </div>
    ${route.render()}
  `;

  document.querySelector('.main').innerHTML = mainContent;
  
  // Mise à jour de la classe active dans la sidebar
  document.querySelectorAll('.nav__item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === path);
  });
};

// Initialisation de l'application
const initApp = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${Header()}
    ${Sidebar()}
    <main class="main"></main>
    ${Footer()}
  `;

  // Gestion des événements de navigation
  document.addEventListener('click', (e) => {
    if (e.target.matches('a') && e.target.href.startsWith(window.location.origin)) {
      handleNavigation(e);
      // Fermer le menu mobile si ouvert
      document.querySelector('.sidebar').classList.remove('active');
      document.querySelector('.mobile-overlay').classList.remove('active');
    }
  });

  // Gestion du bouton menu mobile
  document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.mobile-overlay').classList.toggle('active');
  });

  // Fermer le menu mobile en cliquant sur l'overlay
  document.querySelector('.mobile-overlay').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.mobile-overlay').classList.remove('active');
  });

  // Gestion du bouton retour du navigateur
  window.addEventListener('popstate', () => handleNavigation());

  // Navigation initiale
  handleNavigation();
};

// Démarrage de l'application
document.addEventListener('DOMContentLoaded', initApp);