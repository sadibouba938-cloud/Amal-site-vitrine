# AMAL Savonnerie & Détergents — Site Vitrine 3D & Portail B2B

Site vitrine industriel et showroom 3D interactif conçu pour **AMAL Savonnerie & Détergents**, spécialisé dans la fabrication de détergents ménagers et professionnels (lessives, liquides vaisselle, dégraissants CHR, désinfectants, eau de javel) ainsi que la savonnerie traditionnelle (pains de savon 72% huiles végétales et savons liquides).

## Fonctionnalités Clés

1. **Moteur WebGL / Three.js 3D Temps Réel (`Product3DCanvas`)** :
   - Modélisation procédurale haute précision de **8 conditionnements industriels 3D** :
     - Flacon Lessive Liquide 3L avec poignée ergonomique et jauge de niveau
     - Flacon Liquide Vaisselle 1L en PET cristal translucide avec bouchon push-pull
     - Bidon Industriel Empilable 5L (PEHD) avec bague d'inviolabilité
     - Flacon Spray Pistolet 750ml avec tube plongeur interne visible
     - Flacon Eau de Javel 2,5L sécurisé
     - Pain de Savon Traditionnel 400g (72% huiles végétales) avec sceau estampillé en relief (bump map)
     - Flacon Pompe Doseuse 500ml pour savon crème lavant
     - Seau Industriel 10kg avec anse métallique pour lessive poudre atomisée
   - **Vue Éclatée 3D** : séparation animée du bouchon/pompe, de l'étiquette et du cœur liquide actif.
   - **Mode CAO (Maillage Industriel)** : inspection géométrique filaire de l'emballage.
   - **Système de Particules & Molécules** : bulles irisées et tensioactifs actifs en orbite 3D.
   - **Éclairage Studio Dynamique (HDR RoomEnvironment)** : ambiances *Labo Cyan*, *Or Solaire* et *Bio Émeraude*.

2. **Showroom 3D & Catalogue Complet (`#catalogue`)** :
   - Filtrage par gamme (Lessives, Vaisselle, Détergence Industrielle B2B, Désinfection, Savonnerie).
   - Chambre d'inspection 3D interactive synchronisée avec chaque fiche produit.
   - Consultation des **Fiches Techniques & Sécurité (TDS / FDS)** (pH, viscosité, matière active, biodégradabilité, composition et palettisation).

3. **Configurateur 3D Marque Blanche / MDD (`#configurateur-b2b`)** :
   - Personnalisation en direct du type de flacon/emballage 3D, du **nom de votre marque** gravé/imprimé en temps réel sur l'étiquette 3D, de la formule/parfum, des couleurs du flacon et du bouchon, et calcul instantané des coûts par palette.

4. **Simulateur de Devis B2B & Jauge Conteneur (`#devis-b2b`)** :
   - Calcul automatique du nombre de palettes Europe, du nombre total d'unités, du taux de remplissage conteneur (**20 pieds** ou **40 pieds HQ**) et conversion instantanée **EUR (€) / FCFA (XOF)**.

## Démarrage Rapide

```bash
npm install
npm run dev
```

Pour générer l'export statique de production (`./out`) compatible GitHub Pages :

```bash
npm run build
```
