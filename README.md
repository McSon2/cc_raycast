# 🚀 Project Manager - Raycast Extension

Extension Raycast complète pour gérer et ouvrir rapidement tes projets avec Cursor et Claude Code.

## ✨ Fonctionnalités

- **Add Project** : Ajoute un nouveau projet avec nom, chemin et terminal préféré
- **Open Project** : Ouvre un projet dans Cursor et/ou Terminal + Claude Code
- **List Projects** : Liste tous tes projets avec leurs détails
- **Delete Project** : Supprime un projet de la liste

## 📦 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- npm
- Raycast installé

### Étapes d'installation

1. **Installer les dépendances :**
```bash
cd /Users/maximesaltet/Desktop/All_Projects/cc_raycast
npm install
```

2. **Lancer en mode développement :**
```bash
npm run dev
```

L'extension apparaîtra automatiquement dans Raycast !

## 🎯 Utilisation

### 1️⃣ Ajouter un projet
- Lance **"Add Project"** dans Raycast (⌘ + Espace)
- Remplis :
  - Nom du projet
  - Chemin du dossier (sélecteur de fichiers)
  - Fichier workspace (optionnel) : Sélectionne un fichier `.workspace` pour l'ouvrir directement dans Cursor
  - Terminal préféré (Ghostty, iTerm, ou Terminal)

### 2️⃣ Ouvrir un projet
- Lance **"Open Project"** dans Raycast
- Cherche ton projet dans la liste
- Choisis une action :
  - **Open Both** : Ouvre Cursor + Terminal + Claude Code
  - **Open in Cursor Only** : Ouvre uniquement Cursor
  - **Open in Terminal + Claude Code** : Ouvre uniquement le terminal avec cc

### 3️⃣ Lister les projets
- Lance **"List Projects"** pour voir tous tes projets

### 4️⃣ Supprimer un projet
- Lance **"Delete Project"**
- Sélectionne le projet à supprimer
- Confirme la suppression

## 🏗️ Structure du projet

```
cc_raycast/
├── package.json           # Configuration de l'extension
├── tsconfig.json          # Configuration TypeScript
├── assets/
│   └── icon.png          # Icône de l'extension (à créer)
└── src/
    ├── add-project.tsx    # Commande: Ajouter un projet
    ├── open-project.tsx   # Commande: Ouvrir un projet
    ├── list-projects.tsx  # Commande: Lister les projets
    ├── delete-project.tsx # Commande: Supprimer un projet
    └── utils/
        └── storage.ts     # Gestion du stockage local
```

## 💾 Stockage des données

Les projets sont stockés dans le LocalStorage de Raycast. Format :

```typescript
interface Project {
  id: string;
  name: string;
  path: string;
  terminal: "ghostty" | "iterm" | "terminal";
  workspaceFile?: string; // Chemin optionnel vers un fichier .workspace
}
```

### 📄 Fichiers Workspace

Tu peux associer un fichier `.workspace` à ton projet. Quand tu ouvres le projet dans Cursor, c'est le workspace qui sera ouvert au lieu du simple dossier. Cela permet de :
- Conserver tes onglets ouverts
- Garder ta configuration d'éditeur spécifique au projet
- Ouvrir plusieurs dossiers en même temps (multi-root workspace)

## 💡 Terminaux supportés

- **Ghostty** : Terminal moderne et rapide
- **iTerm** : Terminal avancé pour macOS
- **Terminal** : Terminal natif macOS

Chaque terminal lance automatiquement Claude Code (`cc`) dans le dossier du projet.

## 🔧 Dépendances

- `@raycast/api` : API Raycast pour les extensions
- `@raycast/utils` : Utilitaires Raycast
- `Cursor` : Éditeur de code
- `Claude Code CLI (cc)` : Doit être installé et accessible dans le PATH

## 🛠️ Développement

```bash
# Installer les dépendances
npm install

# Lancer en mode dev
npm run dev

# Build pour production
npm run build

# Linter
npm run lint

# Fix lint automatiquement
npm run fix-lint
```

## 📝 TODO

- [ ] Ajouter une vraie icône PNG (512x512px minimum)
- [ ] Ajouter la possibilité d'éditer un projet existant
- [ ] Ajouter des raccourcis clavier personnalisés
- [ ] Ajouter support pour d'autres éditeurs (VSCode, Zed, etc.)
- [x] Support pour les fichiers `.workspace` de Cursor
- [ ] Ajouter des tags/catégories pour organiser les projets
- [ ] Recherche avancée avec filtres

## 📄 Licence

MIT

---

Créé avec ❤️ pour gérer tes projets rapidement avec Raycast, Cursor et Claude Code !
