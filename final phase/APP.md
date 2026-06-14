Projet : Plateforme de Test Cognitif en Ligne
Objectif

Créer une plateforme web permettant aux utilisateurs de passer un test cognitif d'environ 10 minutes afin d'obtenir une estimation de leurs performances cognitives.

Le site ne doit pas prétendre fournir un diagnostic psychologique officiel ni reproduire le test WAIS-IV.

Le résultat affiché est une estimation cognitive basée sur plusieurs catégories d'exercices.

Modèle économique
Utilisateur gratuit
Passe le test complet.
Obtient uniquement un score global.
Peut refaire le test autant de fois qu'il le souhaite.
Utilisateur premium
Connexion Google obligatoire.
Obtient :
Score global
Score Logique
Score Mémoire
Score Calcul Mental
Score Raisonnement Spatial
Score Vitesse de Traitement
Stack technique
Frontend
Next.js (App Router)
React
TypeScript
Tailwind CSS
Backend
API Routes Next.js
TypeScript
Base de données
PostgreSQL
Prisma ORM
Authentification
Auth.js (NextAuth)
Google OAuth
Paiement
Stripe
Email
Resend
Hébergement
Vercel
Neon PostgreSQL
Structure du projet

src/

app/

page.tsx

test/

page.tsx

results/

page.tsx

premium/

page.tsx

admin/

page.tsx

api/

auth/

test/

results/

payment/

components/

QuestionCard.tsx

Timer.tsx

ProgressBar.tsx

ScoreCard.tsx

PremiumCard.tsx

AdminTable.tsx

lib/

score.ts

auth.ts

prisma.ts

email.ts

stripe.ts

data/

questions.json

types/

question.ts

result.ts

user.ts

Pages du site
Accueil

Contenu :

Présentation du test
Durée estimée : 10 minutes
Bouton Commencer le test

CTA principal :

"Commencer le test"

Test

Affichage :

Une seule question à la fois
Barre de progression
Chronomètre
Réponses multiples

Fonctionnement :

Temps limité par question
Passage automatique à la question suivante lorsque le temps est écoulé
Aucune possibilité de revenir en arrière
Résultats

Version gratuite :

Afficher :

Score global uniquement

Version premium :

Afficher :

Score global
Détail des catégories
Premium

Contenu :

Présentation des avantages premium
Paiement Stripe
Déblocage immédiat
Admin

Accès réservé administrateur.

Fonctionnalités :

Ajouter une question
Modifier une question
Supprimer une question
Consulter les statistiques
Catégories du test
Logique

Exemples :

Suites logiques
Matrices
Raisonnement abstrait

Nombre de questions :

10

Mémoire

Exemples :

Mémorisation de séquences
Reconnaissance de motifs

Nombre de questions :

10

Calcul mental

Exemples :

Additions
Multiplications
Pourcentages

Nombre de questions :

10

Raisonnement spatial

Exemples :

Rotation mentale
Figures géométriques

Nombre de questions :

10

Vitesse de traitement

Exemples :

Comparaison rapide de symboles
Recherche visuelle

Nombre de questions :

10

Modèle de données
User

id

email

name

image

isPremium

createdAt

Question

id

category

question

answers

correctAnswer

timeLimit

difficulty

createdAt

Result

id

userId

globalScore

logicScore

memoryScore

mathScore

spatialScore

speedScore

completedAt

Payment

id

userId

stripeSessionId

status

createdAt

Exemple Question JSON

{
"id": 1,
"category": "logic",
"question": "2, 4, 8, 16, ?",
"answers": [
"24",
"30",
"32",
"40"
],
"correctAnswer": 2,
"timeLimit": 15
}

Calcul des scores

Pour chaque catégorie :

score = nombre de bonnes réponses

Calcul du score global :

Moyenne pondérée des catégories.

Convertir ensuite le résultat sur une échelle :

70 à 130

Exemple :

0% = 70

50% = 100

100% = 130

Le calcul doit être centralisé dans :

lib/score.ts

Fonctionnalités Email

À la fin du test :

Envoyer automatiquement un email contenant :

Score global
Date du test

Pour les utilisateurs premium :

Détail complet des catégories

Utiliser Resend.

Fonctionnalités Stripe

Créer :

Paiement unique

Après validation :

Mise à jour du champ isPremium
Dashboard Administrateur

Statistiques :

Nombre total de tests
Nombre de comptes premium
Score moyen
Temps moyen de complétion

Analyse des questions :

Taux de réussite
Temps moyen par question

Gestion :

Ajouter question
Modifier question
Supprimer question
Sécurité
Validation serveur
Protection des routes admin
Protection des routes premium
Vérification Stripe côté serveur
Vérification Auth.js côté serveur
Objectif MVP

Version 1 :

Accueil
Test complet
Timer
Calcul du score
Résultats

Version 2 :

PostgreSQL
Prisma
Auth Google

Version 3 :

Stripe
Premium

Version 4 :

Emails

Version 5 :

Dashboard Admin

Le code doit être propre, modulaire, maintenable, typé en TypeScript strict et respecter les bonnes pratiques Next.js 15.
