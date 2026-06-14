# TASKS — Plateforme de Test Cognitif

> Statuts : `[ ]` À faire · `[-]` En cours · `[x]` Fait

---

## V1 — MVP Core (Accueil · Test · Score · Résultats)

### Setup initial
- [ ] Réorganiser la structure en `src/` (app, components, lib, data, types)
- [ ] Configurer les alias TypeScript (`@/*` → `src/*`)
- [ ] Créer le fichier `.env.local` (variables d'environnement)

### Types TypeScript
- [ ] `src/types/question.ts` — type `Question`
- [ ] `src/types/result.ts` — type `Result`
- [ ] `src/types/user.ts` — type `User`

### Données
- [ ] `src/data/questions.json` — 50 questions (10 par catégorie : logic, memory, math, spatial, speed)

### Calcul des scores
- [ ] `src/lib/score.ts` — score par catégorie + score global (échelle 70–130)

### Composants UI
- [ ] `src/components/QuestionCard.tsx` — affichage question + réponses multiples
- [ ] `src/components/Timer.tsx` — compte à rebours par question + passage automatique
- [ ] `src/components/ProgressBar.tsx` — barre de progression du test
- [ ] `src/components/ScoreCard.tsx` — affichage score global

### Pages
- [ ] `src/app/page.tsx` — page d'accueil (présentation + CTA "Commencer le test")
- [ ] `src/app/test/page.tsx` — interface de test (une question à la fois, no-back)
- [ ] `src/app/results/page.tsx` — page résultats (score global uniquement pour gratuit)

---

## V2 — Base de données · Auth Google

### Base de données
- [ ] Installer `prisma` + `@prisma/client`
- [ ] `prisma/schema.prisma` — modèles User, Question, Result, Payment
- [ ] Configurer Neon PostgreSQL (variable `DATABASE_URL`)
- [ ] `src/lib/prisma.ts` — client Prisma singleton
- [ ] Migrations initiales (`prisma migrate dev`)

### Authentification
- [ ] Installer `next-auth` (Auth.js v5)
- [ ] Configurer Google OAuth (credentials dans `.env.local`)
- [ ] `src/lib/auth.ts` — config NextAuth + Google Provider
- [ ] `src/app/api/auth/[...nextauth]/route.ts` — route Auth.js
- [ ] Protection des routes premium et admin côté serveur

### Persistance des résultats
- [ ] `src/app/api/results/route.ts` — enregistrement des résultats en base
- [ ] Lier les résultats à l'utilisateur connecté (userId)

---

## V3 — Stripe · Premium

### Intégration Stripe
- [ ] Installer `stripe`
- [ ] `src/lib/stripe.ts` — client Stripe + création session de paiement
- [ ] `src/app/api/payment/route.ts` — création checkout session
- [ ] `src/app/api/payment/webhook/route.ts` — webhook Stripe (mise à jour `isPremium`)
- [ ] Vérification Stripe côté serveur (signature webhook)

### Pages & Composants Premium
- [ ] `src/components/PremiumCard.tsx` — présentation avantages premium
- [ ] `src/app/premium/page.tsx` — page d'upgrade (avantages + bouton paiement)
- [ ] `src/app/results/page.tsx` — afficher détail catégories si `isPremium === true`

---

## V4 — Emails (Resend)

### Intégration Resend
- [ ] Installer `resend`
- [ ] `src/lib/email.ts` — client Resend + templates email
- [ ] Email automatique à la fin du test : score global + date
- [ ] Email premium : détail complet des catégories

---

## V5 — Dashboard Admin

### Composant
- [ ] `src/components/AdminTable.tsx` — tableau de gestion des questions

### Page Admin
- [ ] `src/app/admin/page.tsx` — accès restreint administrateur
  - [ ] Statistiques globales (nb tests, nb premium, score moyen, temps moyen)
  - [ ] Analyse par question (taux de réussite, temps moyen)
  - [ ] CRUD questions (ajouter, modifier, supprimer)
- [ ] `src/app/api/admin/questions/route.ts` — API CRUD questions (protégée)

---

## Sécurité (transversal)

- [ ] Validation serveur sur toutes les routes API
- [ ] Protection des routes `/admin` (vérification rôle admin)
- [ ] Protection des routes `/premium` (vérification `isPremium`)
- [ ] Vérification Auth.js côté serveur sur les routes sensibles
