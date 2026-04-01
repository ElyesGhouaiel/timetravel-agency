# TimeTravel Agency - Webapp Interactive

Webapp interactive pour une agence de voyage temporel fictive, realisee dans
le cadre du projet supervise IA M1/M2 Ynov.

URL du site : https://timetravel-agency-lemon.vercel.app/

## Stack technique

- React 18 + Vite
- Tailwind CSS v4
- Framer Motion
- Mistral AI API (modele mistral-small-latest)
- Vercel Serverless Functions (proxy API)
- Deploiement : Vercel

## Architecture du projet

```
timetravel-agency/
├── api/
│   └── chat.js                  # Serverless function (proxy Mistral)
├── public/
│   └── images/                  # Visuels des 3 destinations (Session 1)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation sticky + blur + menu mobile
│   │   ├── Hero.jsx             # Hero editorial 2 colonnes + carousel
│   │   ├── DestinationCard.jsx  # Carte destination avec highlights
│   │   ├── DestinationsGrid.jsx # Grille bento + tri + modale detail
│   │   ├── ChatWidget.jsx       # Widget chatbot glassmorphism
│   │   ├── PersonalityQuiz.jsx  # Quiz de recommandation (4 questions)
│   │   └── Footer.jsx           # Pied de page asymetrique
│   ├── pages/
│   │   └── Home.jsx             # Assemblage de la page d'accueil
│   ├── hooks/
│   │   └── useChat.js           # Hook de gestion du chat (appel /api/chat)
│   ├── data/
│   │   └── destinations.js      # Donnees des 3 destinations
│   ├── App.jsx                  # Router + grain overlay
│   ├── index.css                # Design tokens + reset + responsive
│   └── main.jsx                 # Point d'entree React
├── vercel.json                  # Config rewrites Vercel
└── index.html                   # HTML avec polices Cormorant + Satoshi
```

## Fonctionnalites

- Page d'accueil avec hero editorial anime (titre stagger, carousel images)
- Navigation sticky avec blur au scroll, menu mobile plein ecran
- Galerie bento asymetrique des 3 destinations temporelles
- Tri des destinations par prix (croissant / decroissant)
- Modale de detail au clic sur une destination
- Chatbot IA conversationnel (Chronos) avec glassmorphism
- Quiz de recommandation personnalise (4 questions, algo deterministe)
- Serverless function pour securiser la cle API Mistral
- Texture grain overlay, typographie Cormorant Garamond + Satoshi
- Design dark mode, identite visuelle coherente
- Responsive mobile-first
- Animations au scroll (Framer Motion)

## Destinations

- Chine des 3 Royaumes (220-280 ap. J.-C.) — 5 400 euros
- Japon Feodal (1185-1600 apr. J.-C.) — 4 900 euros
- Carthage Antique (264-146 av. J.-C.) — 3 800 euros

## Installation locale

```
git clone https://github.com/ElyesGhouaiel/timetravel-agency.git
cd timetravel-agency
npm install
cp .env.example .env.local
```

Renseigner la cle Mistral dans .env.local :
```
MISTRAL_API_KEY=votre_cle_ici
```

Pour lancer avec le chatbot fonctionnel (serverless functions) :
```
npm i -g vercel
vercel dev
```

Pour lancer le frontend seul (chat non fonctionnel) :
```
npm run dev
```

## Variables d'environnement

| Variable | Description | Ou la configurer |
|---|---|---|
| MISTRAL_API_KEY | Cle API Mistral (console.mistral.ai) | .env.local (local) / Vercel Settings (prod) |

La cle n'est jamais exposee au navigateur. Elle transite uniquement par la
serverless function api/chat.js cote serveur.

## Outils IA utilises

| Outil | Usage |
|---|---|
| Cursor | Assistance au developpement (generation de code, debug) |
| Mistral Small (mistral-small-latest) | Chatbot conversationnel Chronos, via API |
| IA generative (Session 1) | Generation des visuels des 3 destinations |

## Prompts documentes

### Prompt systeme du chatbot Chronos (api/chat.js)

```
Tu es Chronos, l'assistant virtuel de TimeTravel Agency,
une agence de voyage temporel de luxe.
Ton role : conseiller les clients sur les 3 destinations disponibles.
Ton ton : professionnel, passionne d'histoire, chaleureux mais jamais familier.
Tu connais parfaitement :
- Chine des 3 Royaumes (220-280 ap. J.-C.) : guerre, honneur, cour imperiale,
  cavalerie. A partir de 5400 euros.
- Japon Feodal (1185-1600 apr. J.-C.) : samourais, chateaux, sakura, ceremonie
  du the. A partir de 4900 euros.
- Carthage Antique (264-146 av. J.-C.) : port mediterraneen, commerce phenicien,
  Hannibal. A partir de 3800 euros.
Reponds toujours en francais. Sois concis (3 phrases max).
Si l'utilisateur hesite, pose une question pour identifier ses gouts
et recommande la destination adaptee.
```

### Logique du quiz de recommandation (PersonalityQuiz.jsx)

4 questions a choix multiples. Chaque reponse attribue +1 point a une destination.
La destination avec le score le plus eleve est recommandee. En cas d'egalite,
la reponse a la derniere question (paysage) departage.

## Organisation du travail

Le projet a ete structure en branches Git independantes pour eviter les conflits :

- main : socle commun (design system, data, config)
- feature/hero-chat (Elyes) : Navbar, Hero, ChatWidget, Footer, useChat, api/chat.js
- feature/destinations-quiz (Killian) : DestinationCard, DestinationsGrid, PersonalityQuiz

Les fichiers touches par chaque developpeur sont distincts, ce qui a permis
un merge sans conflit.

## Equipe

- Elyes Ghouaiel — hero, navigation, chatbot, animations, backend serverless, deploiement
- Killian Chenal — destinations (cards, grille, modale, tri), quiz de personnalisation

## Reflexion sur le processus

Nous avons utilise Cursor comme assistant de developpement pour accelerer
la generation de code et l'integration de l'API Mistral. L'outil nous a permis
d'iterer rapidement sur le design system et les composants React.

Points cles de notre demarche :
- Architecture pensee des le depart pour le travail en parallele (branches Git,
  fichiers separes par feature)
- Design system avec variables CSS custom pour garantir la coherence visuelle
  entre les contributions des deux developpeurs
- Securisation de la cle API via une serverless function Vercel plutot qu'une
  exposition cote client
- Approche mobile-first pour le responsive
- Le chatbot utilise un prompt systeme detaille pour rester dans le personnage
  de Chronos et fournir des reponses pertinentes et contextuelles

Les limites identifiees : le quiz pourrait etre enrichi avec plus de questions
et un algorithme de scoring plus fin. Le chatbot pourrait memoriser les
preferences entre les sessions via du stockage local.

## Licence

Projet pedagogique — M1/M2 Digital et IA — Ynov 2026
