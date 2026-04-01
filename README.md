# TimeTravel Agency - Webapp Interactive

Webapp interactive pour une agence de voyage temporel fictive, realisee dans
le cadre du projet supervise IA M1/M2 Ynov.

## Stack technique

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Mistral AI API (modele mistral-small-latest)
- Deploiement : Vercel

## Fonctionnalites

- Page d'accueil avec hero editorial anime
- Navigation sticky avec blur au scroll
- Galerie bento des 3 destinations temporelles
- Chatbot IA conversationnel (Chronos) avec glassmorphism
- Quiz de recommandation personnalise
- Texture grain overlay, typographie Cormorant Garamond + Satoshi
- Design dark mode, identite visuelle coherente
- Responsive mobile-first

## Destinations

- Chine des 3 Royaumes (220-280 ap. J.-C.) — 5 400 euros
- Japon Feodal (1185-1600 apr. J.-C.) — 4 900 euros
- Carthage Antique (264-146 av. J.-C.) — 3 800 euros

## Installation locale

```
npm install
cp .env.example .env.local
# Renseigner la cle Mistral dans .env.local
npm run dev
```

## Variables d'environnement

VITE_MISTRAL_API_KEY : cle API Mistral (console.mistral.ai, gratuit)

## Outils IA utilises

- Cursor (assistance au developpement)
- Mistral Small (chatbot conversationnel)
- Images des destinations : generees avec IA lors de la Session 1

## Equipe

Elyes Ghouaiel — hero, navigation, chatbot, animations, deploiement
Killian Chenal — destinations, quiz de personnalisation

## Reflexion sur le processus

Nous avons utilise Cursor comme assistant de developpement pour accelerer
la generation de code et l'integration de l'API Mistral. La structure du
projet a ete pensee pour permettre un travail en parallele via des branches
Git independantes sans conflits de merge.

## Licence

Projet pedagogique — M1/M2 Digital et IA — Ynov 2026
