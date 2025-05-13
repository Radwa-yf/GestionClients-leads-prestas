# 📊 Application de Gestion des Leads, Clients et Prestations – Qwenty, Hostay, Azerto

## 1. Introduction

Ce projet est une application web interne développée au sein de notre entreprise regroupant trois entités : **Qwenty**, **Hostay** et **Azerto**.

L'objectif principal de cette application est de centraliser les données des **leads**, des **clients** et des **prestations**, et de faciliter leur gestion quotidienne.

L’application est développée avec :
- **Laravel** pour le backend
- **React.js** (via Inertia) pour le frontend
- **MySQL** pour la base de données



## 2. Prérequis Avant Démarrage

### 2.1. Environnement requis

- PHP 8.1 ou plus
- Composer
- Node.js + npm
- MySQL
- Git

### 2.2. Étapes d'installation

#### - Installer les dépendances PHP
   composer install

#### - Installer les dépendances JavaScript
   npm install

#### - Copier le fichier d’environnement
   cp .env.example .env

#### - Générer la clé d'application
   php artisan key:generate

#### - Configurer votre base de données
#### Ouvrir le fichier `.env` et modifier :
 - DB_DATABASE=nom_de_votre_base
 - DB_USERNAME=utilisateur
 - DB_PASSWORD=motdepasse

#### - Importer le fichier SQL fourni 
    (via phpMyAdmin)

#### - Compiler les assets
   npm run dev

#### - Démarrer le serveur local Laravel
   php artisan serve
## 3. Fonctionnalités Principales

Cette section détaille les Fonctionnalités développées pour la gestion des **leads**, **clients** et **prestations**.



### 3.1. Gestion Lead 

- Un **bouton d’ajout** est présent en haut de page, permettant d’ouvrir un **formulaire de création** d’un nouveau lead.
- L'affichage principal est une **interface en colonnes**, chaque colonne représentant un **statut de lead** :
  - `À traiter`, `Pas encore de réponse`, `En attente de closing`, etc.
- Chaque colonne contient des **cartes individuelles** représentant un lead :
  - La carte affiche :
    - **Nom**
    - **Email**
    - **Numéro de téléphone**
    - **Projet**
    - **Valeur potentielle...** (si renseignée)
- En haut à droite de chaque carte, une **flèche** ouvre un **menu déroulant** avec les options suivantes :
  - **Gestion des notes** :
    - Ajouter une note
    - Modifier une note
    - Supprimer une note
  - **Valeur potentielle** :
    - Ajouter un montant
    - Modifier ce montant
    - Le montant est ensuite affiché en haut de la carte
  - **Changement de statut** :
    - Déplacement de la carte vers une autre colonne
  - **Conversion en client** :
    - Ouvre un **formulaire client pré-rempli**
    - Une fois validé, le lead devient un client
  - **Marquer comme perdu** :
    - Supprime la carte de l’interface
  - **Modifier les informations** :
    - Ouvre un formulaire de modification (nom, entreprise, email, etc.)



### 3.2. Gestion Client 

- En haut de page, un **bouton "Ajouter un client"** permet d’ouvrir un **formulaire complet** :
  - Champs :nom, téléphone, pays, etc.
- Une fois créés, les clients sont listés dans un **tableau** :
  - Informations affichées :
    - Nom
    - Téléphone
    - Pays etc
  - Actions disponibles pour chaque ligne :
    - **Modifier** (ouvre une modal avec le formulaire)
    - **Supprimer** (avec confirmation)
- Le **nom du client est cliquable** :
  - Dirige vers une **fiche client détaillée**
  - Affiche les **informations personnelles du client**
  - Si le client est issu d’un lead, les données sont conservées

#### Détails sur la fiche client :
- Bouton **"Ajouter une prestation"** liée à ce client
- **Tableau des prestations** rattachées :
  - Nom, type, statut etc 
  - Boutons pour modifier ou supprimer
- **Section notes** :
  - Gestion complète : ajout, modification, suppression

> Cette interface centralise toutes les actions et données relatives à un client.



### 3.3. Interface Prestations (Frontend)

> Cette interface est intégrée dans la **fiche client**.

- L’ajout d’une prestation se fait via un **formulaire dynamique** :
  - Déclenché par un bouton
  - Champs dépendants de l’entité choisie :
    - Par exemple, pour `Azerto` :
      - Mots-clés
      - Récurrence etc.
- Les prestations sont listées dans un **tableau interactif** :
  -type, statut
  - Actions : modifier / supprimer
- Chaque prestation est **liée exclusivement à un client** :
  - Accessible uniquement via la fiche client concernée

> L’interface est optimisée pour la saisie rapide et le suivi des prestations par client.


