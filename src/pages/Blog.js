// Simulation d'une base de données d'articles (à remplacer par une vraie BD plus tard)
let articles = [
  {
    id: 3,
    title: "Guide Complet des Commandes Terminal",
    content: `
    Le terminal est un outil puissant pour interagir avec votre ordinateur. Voici les commandes essentielles à connaître :

    📁 **Navigation dans les fichiers**
    - \`ls\` : Lister les fichiers et dossiers
    - \`cd [dossier]\` : Changer de dossier
    - \`pwd\` : Afficher le chemin actuel
    - \`mkdir [nom]\` : Créer un dossier
    - \`rm [fichier]\` : Supprimer un fichier
    - \`rm -r [dossier]\` : Supprimer un dossier

    🔍 **Recherche et information**
    - \`find [dossier] -name [nom]\` : Rechercher un fichier
    - \`grep [texte] [fichier]\` : Rechercher du texte
    - \`cat [fichier]\` : Afficher le contenu d'un fichier
    - \`less [fichier]\` : Afficher le contenu page par page

    🌐 **Réseau**
    - \`ping [adresse]\` : Tester la connexion
    - \`lsof -i :[port]\` : Voir qui utilise un port
    - \`kill [PID]\` : Arrêter un processus
    - \`netstat\` : Voir les connexions réseau

    💻 **Gestion des processus**
    - \`ps\` : Voir les processus en cours
    - \`top\` : Moniteur de processus
    - \`killall [nom]\` : Arrêter tous les processus d'un programme

    🔒 **Permissions**
    - \`chmod\` : Modifier les permissions
    - \`chown\` : Changer le propriétaire
    - \`sudo [commande]\` : Exécuter en administrateur

    Ces commandes sont essentielles pour tout développeur. Pratiquez-les régulièrement !
    `,
    excerpt: "Un guide complet des commandes terminal les plus utiles pour les développeurs, avec des explications claires et des exemples pratiques.",
    author: "Admin Otorsia",
    date: "2024-03-25",
    image: "https://picsum.photos/seed/terminal/800/400",
    category: "Terminal",
    keywords: ["terminal", "commandes", "linux", "macos", "développement"],
    comments: []
  },
  {
    id: 2,
    title: "Comment Utiliser le Serveur Local",
    content: `
    🚀 **Guide étape par étape pour gérer votre serveur local**

    1️⃣ **Démarrer le serveur**
    \`\`\`bash
    python3 -m http.server 8000
    \`\`\`
    - Le serveur démarre sur http://localhost:8000
    - Vous verrez les logs des requêtes dans le terminal
    - Gardez le terminal ouvert pendant l'utilisation

    2️⃣ **Arrêter le serveur**
    - Méthode 1 : Appuyez sur \`Ctrl + C\` dans le terminal
    - Méthode 2 : 
      \`\`\`bash
      lsof -i :8000    # Trouver le PID
      kill [PID]       # Arrêter le processus
      \`\`\`

    3️⃣ **Résoudre les problèmes courants**
    - Si "Port déjà utilisé" :
      1. Trouvez le processus : \`lsof -i :8000\`
      2. Notez le PID (numéro du processus)
      3. Arrêtez-le : \`kill [PID]\`
      4. Redémarrez le serveur

    4️⃣ **Bonnes pratiques**
    - Vérifiez que le port 8000 est libre avant de démarrer
    - Gardez un œil sur les logs dans le terminal
    - Arrêtez proprement le serveur après utilisation
    - Utilisez un autre port si le 8000 pose problème

    5️⃣ **Structure des fichiers**
    - Placez vos fichiers dans le dossier du projet
    - Le serveur sert les fichiers depuis ce dossier
    - Les URLs correspondent à la structure des dossiers

    🎯 **Pour tester que tout fonctionne**
    1. Démarrez le serveur
    2. Ouvrez http://localhost:8000
    3. Vous devriez voir votre site
    4. Vérifiez les logs dans le terminal

    En suivant ces étapes, vous aurez un environnement de développement local stable et efficace !
    `,
    excerpt: "Apprenez à gérer efficacement votre serveur de développement local avec ce guide complet étape par étape.",
    author: "Admin Otorsia",
    date: "2024-03-25",
    image: "https://picsum.photos/seed/server/800/400",
    category: "Serveur",
    keywords: ["serveur", "local", "développement", "python", "http"],
    comments: []
  },
  {
    id: 1,
    title: "Introduction à l'IA",
    content: "L'intelligence artificielle est un domaine passionnant...",
    excerpt: "Découvrez les bases de l'intelligence artificielle et son impact sur notre société.",
    author: "John Doe",
    date: "2024-03-25",
    image: "https://picsum.photos/800/400",
    category: "IA",
    keywords: ["intelligence artificielle", "technologie", "innovation"],
    comments: [
      { id: 1, author: "Alice", content: "Super article !", date: "2024-03-25" }
    ]
  }
];

// Fonction pour créer un nouvel article
const createArticle = (articleData) => {
  const newArticle = {
    id: articles.length + 1,
    ...articleData,
    date: new Date().toISOString().split('T')[0],
    comments: [],
    excerpt: articleData.content.substring(0, 150) + '...',
    keywords: articleData.keywords || []
  };
  articles.unshift(newArticle);
  return newArticle;
};

// Fonction pour filtrer les articles
const filterArticles = (filters) => {
  return articles.filter(article => {
    if (filters.category && article.category !== filters.category) return false;
    if (filters.keyword && !article.keywords.includes(filters.keyword)) return false;
    return true;
  });
};

// Fonction pour trier les articles
const sortArticles = (articles, sortBy) => {
  return [...articles].sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    return new Date(b.date) - new Date(a.date);
  });
};

// Fonction pour ajouter un commentaire
const addComment = (articleId, commentData) => {
  const article = articles.find(a => a.id === articleId);
  if (article) {
    const newComment = {
      id: article.comments.length + 1,
      ...commentData,
      date: new Date().toISOString().split('T')[0]
    };
    article.comments.push(newComment);
    return newComment;
  }
  return null;
};

// Template pour le formulaire de création d'article
const createArticleForm = () => `
  <div class="modal" id="createArticleModal">
    <div class="modal__content">
      <div class="modal__header">
        <h2>Créer un nouvel article</h2>
        <button class="modal__close" onclick="document.getElementById('createArticleModal').classList.remove('active')">&times;</button>
      </div>
      <form id="articleForm" class="form">
        <div class="form__group">
          <label for="articleTitle">Titre</label>
          <input type="text" id="articleTitle" required>
        </div>
        <div class="form__group">
          <label for="articleContent">Contenu</label>
          <textarea id="articleContent" rows="10" required></textarea>
        </div>
        <div class="form__group">
          <label for="articleImage">Image</label>
          <input type="file" id="articleImage" accept="image/*">
          <div id="imagePreview" class="image-preview"></div>
        </div>
        <div class="form__group">
          <label for="articleAuthor">Auteur</label>
          <input type="text" id="articleAuthor" required>
        </div>
        <button type="submit" class="btn btn--primary">Publier</button>
      </form>
    </div>
  </div>
`;

// Template pour les filtres
const filtersTemplate = () => {
  const categories = [...new Set(articles.map(a => a.category))];
  const keywords = [...new Set(articles.flatMap(a => a.keywords))];
  
  return `
    <div class="blog__filters">
      <div class="filter-group">
        <label for="categoryFilter">Catégorie:</label>
        <select id="categoryFilter" class="filter-select">
          <option value="">Toutes</option>
          ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
      </div>
      
      <div class="filter-group">
        <label for="keywordFilter">Mot-clé:</label>
        <select id="keywordFilter" class="filter-select">
          <option value="">Tous</option>
          ${keywords.map(kw => `<option value="${kw}">${kw}</option>`).join('')}
        </select>
      </div>
      
      <div class="filter-group">
        <label for="sortFilter">Trier par:</label>
        <select id="sortFilter" class="filter-select">
          <option value="newest">Plus récent</option>
          <option value="oldest">Plus ancien</option>
        </select>
      </div>
    </div>
  `;
};

// Template pour un article
const articleTemplate = (article, index) => `
  <article class="article" data-article-id="${article.id}">
    <div class="article__image">
      <img src="${article.image}" alt="${article.title}">
    </div>
    <div class="article__content">
      <div class="article__meta">
        <span class="article__category">${article.category}</span>
        <span class="article__date">${article.date}</span>
      </div>
      <h2 class="article__title">${article.title}</h2>
      <div class="article__author">Par ${article.author}</div>
      <div class="article__excerpt">${article.excerpt}</div>
      <div class="article__full-content hidden">
        <div class="article__text">
          ${article.content.split('\n').map(line => 
            line.trim() ? `<p>${line.trim()}</p>` : ''
          ).join('\n')}
        </div>
        <div class="article__keywords">
          ${article.keywords.map(kw => `<span class="keyword">${kw}</span>`).join('')}
        </div>
        <div class="article__comments">
          <h3>Commentaires (${article.comments.length})</h3>
          <div class="comments-list">
            ${article.comments.map(comment => `
              <div class="comment">
                <div class="comment__meta">
                  <strong>${comment.author}</strong> - ${comment.date}
                </div>
                <div class="comment__content">
                  ${comment.content}
                </div>
              </div>
            `).join('')}
          </div>
          <form class="comment-form" onsubmit="return handleCommentSubmit(event, ${article.id})">
            <div class="form__group">
              <label for="commentAuthor_${article.id}">Votre nom</label>
              <input type="text" id="commentAuthor_${article.id}" required>
            </div>
            <div class="form__group">
              <label for="commentContent_${article.id}">Votre commentaire</label>
              <textarea id="commentContent_${article.id}" required></textarea>
            </div>
            <button type="submit" class="btn btn--secondary">Commenter</button>
          </form>
        </div>
      </div>
      <button class="btn btn--text read-more" data-article-id="${article.id}">
        Lire la suite
      </button>
    </div>
  </article>
`;

// Export de la fonction principale du blog
export const Blog = () => {
  // Initialisation des gestionnaires d'événements après le rendu
  setTimeout(() => {
    // Gestionnaire pour les filtres
    const applyFilters = () => {
      const categoryFilter = document.getElementById('categoryFilter').value;
      const keywordFilter = document.getElementById('keywordFilter').value;
      const sortFilter = document.getElementById('sortFilter').value;
      
      let filteredArticles = filterArticles({
        category: categoryFilter,
        keyword: keywordFilter
      });
      
      filteredArticles = sortArticles(filteredArticles, sortFilter);
      
      const articlesContainer = document.querySelector('.blog__content');
      articlesContainer.innerHTML = filteredArticles.map((article, index) => 
        articleTemplate(article, index)
      ).join('');
      
      // Réattacher les gestionnaires d'événements
      attachReadMoreHandlers();
    };
    
    // Attacher les gestionnaires aux filtres
    document.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', applyFilters);
    });
    
    // Gestionnaire pour le bouton "Lire la suite"
    const attachReadMoreHandlers = () => {
      document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (e) => {
          const articleId = e.target.dataset.articleId;
          const article = document.querySelector(`article[data-article-id="${articleId}"]`);
          const content = article.querySelector('.article__full-content');
          const excerpt = article.querySelector('.article__excerpt');
          
          content.classList.toggle('hidden');
          excerpt.classList.toggle('hidden');
          e.target.textContent = content.classList.contains('hidden') ? 
            'Lire la suite' : 'Réduire';
        });
      });
    };
    
    attachReadMoreHandlers();

    // Gestionnaire pour le formulaire d'article
    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
      articleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newArticle = createArticle({
          title: document.getElementById('articleTitle').value,
          content: document.getElementById('articleContent').value,
          author: document.getElementById('articleAuthor').value,
          image: document.getElementById('imagePreview').style.backgroundImage.slice(5, -2) || 'https://picsum.photos/800/400'
        });
        
        // Fermer le modal et rafraîchir la page
        document.getElementById('createArticleModal').classList.remove('active');
        window.location.reload();
      });
    }

    // Gestionnaire pour l'aperçu d'image
    const imageInput = document.getElementById('articleImage');
    if (imageInput) {
      imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            document.getElementById('imagePreview').style.backgroundImage = `url(${e.target.result})`;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Mise à jour de la fonction handleCommentSubmit
    window.handleCommentSubmit = (e, articleId) => {
      e.preventDefault();
      const authorInput = document.getElementById(`commentAuthor_${articleId}`);
      const contentInput = document.getElementById(`commentContent_${articleId}`);
      
      const newComment = addComment(articleId, {
        author: authorInput.value,
        content: contentInput.value
      });
      
      if (newComment) {
        // Rafraîchir uniquement la section des commentaires
        const article = document.querySelector(`article[data-article-id="${articleId}"]`);
        const commentsList = article.querySelector('.comments-list');
        const commentHTML = `
          <div class="comment">
            <div class="comment__meta">
              <strong>${newComment.author}</strong> - ${newComment.date}
            </div>
            <div class="comment__content">
              ${newComment.content}
            </div>
          </div>
        `;
        commentsList.insertAdjacentHTML('beforeend', commentHTML);
        
        // Mettre à jour le compteur de commentaires
        const commentCount = article.querySelector('h3');
        const count = article.querySelectorAll('.comment').length;
        commentCount.textContent = `Commentaires (${count})`;
        
        // Réinitialiser le formulaire
        authorInput.value = '';
        contentInput.value = '';
      }
      
      return false;
    };
  }, 0);

  return `
    <div class="page-header">
      <h1>Blog</h1>
      <p>Découvrez nos derniers articles et partagez vos connaissances</p>
    </div>
    <div class="blog">
      <div class="blog__header">
        <button class="btn btn--primary" onclick="document.getElementById('createArticleModal').classList.add('active')">
          Créer un article
        </button>
      </div>
      ${filtersTemplate()}
      <div class="blog__content">
        ${sortArticles(articles, 'newest').map((article, index) => 
          articleTemplate(article, index)
        ).join('')}
      </div>
      ${createArticleForm()}
    </div>
  `;
};