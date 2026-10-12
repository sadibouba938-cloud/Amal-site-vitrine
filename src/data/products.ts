export type PackagingShape =
  | 'detergent_bottle'
  | 'dish_bottle'
  | 'industrial_jerrycan'
  | 'trigger_spray'
  | 'bleach_bottle'
  | 'soap_bar'
  | 'pump_bottle'
  | 'powder_bucket';

export type ProductCategory =
  | 'Lessives & Soin du Linge'
  | 'Vaisselle & Cuisine Pro'
  | 'Détergence Industrielle & B2B'
  | 'Désinfection & Hygiène'
  | 'Savonnerie Traditionnelle';

export interface ProductSpec {
  ph: string;
  viscosity: string;
  biodegradability: string;
  activeMatter: string;
  packagingUnit: string;
  palletCapacity: string;
  certifications: string[];
  ingredients: { name: string; role: string; percentage: string }[];
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  shape: PackagingShape;
  volume: string;
  badge: string;
  shortDesc: string;
  description: string;
  // Authentic UGC Image & Context
  ugcImage: string;
  ugcContext: string;
  ugcHighlight: string;
  // Visual accents
  bottleColor: string;
  capColor: string;
  liquidColor: string;
  labelAccent: string;
  labelTheme: 'dark' | 'light' | 'industrial' | 'eco';
  bottleTranslucency: number;
  // Pricing & B2B
  unitPriceHT: number;
  unitsPerCarton: number;
  cartonsPerPallet: number;
  minOrderPallets: number;
  specs: ProductSpec;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'amal-oxypower-3l',
    code: 'AML-LES-3000',
    name: 'AMAL OxyPower 3L',
    subtitle: 'Lessive Liquide Concentrée 5-Enzymes',
    category: 'Lessives & Soin du Linge',
    shape: 'detergent_bottle',
    volume: '3 Litres (60 Lavages)',
    badge: 'Best-Seller Lessive',
    shortDesc:
      'Formule haute concentration aux 5 enzymes bio-actives. Détachage moléculaire dès 20°C et protection durable des fibres.',
    description:
      'Développée dans nos laboratoires de formulation détergente, la lessive liquide AMAL OxyPower 3L combine des tensioactifs anioniques et non-ioniques de dernière génération avec un complexe exclusif de 5 enzymes. Elle élimine les taches grasses, protéiques et amylacées dès les basses températures tout en préservant l’éclat du blanc et des couleurs.',
    ugcImage: 'images/products/amal-oxypower-3l.jpg',
    ugcContext: 'Mise en situation réelle • Buanderie & Soin du Linge',
    ugcHighlight: 'Étiquette AMAL OxyPower 3L • Bouchon doseur gradué anti-goutte',
    bottleColor: '#0B2847',
    capColor: '#00E5FF',
    liquidColor: '#00B4D8',
    labelAccent: '#00E5FF',
    labelTheme: 'dark',
    bottleTranslucency: 0.25,
    unitPriceHT: 4.85,
    unitsPerCarton: 4,
    cartonsPerPallet: 48,
    minOrderPallets: 1,
    specs: {
      ph: '8.4 ± 0.3',
      viscosity: '650 cPs (20°C)',
      biodegradability: '> 95% (OCDE 301)',
      activeMatter: '24.5% Matière Active',
      packagingUnit: 'Carton de 4 x 3L (PEHD Recyclable)',
      palletCapacity: '192 Flacons / Palette Europe',
      certifications: ['ISO 9001', 'ISO 14001', 'Testé Dermatologiquement'],
      ingredients: [
        {
          name: 'Tensioactifs Anioniques & Non-ioniques',
          role: 'Décollement des graisses et émulsion',
          percentage: '15 - 30%',
        },
        {
          name: 'Savon Végétal Purifié',
          role: 'Adoucissant naturel & anti-redéposition',
          percentage: '5 - 15%',
        },
        {
          name: 'Complexe 5 Enzymes (Protéase, Lipase, Amylase)',
          role: 'Action détachante ciblée basse température',
          percentage: '< 5%',
        },
        {
          name: 'Azurant Optique & Parfum Micro-encapsulé',
          role: 'Blancheur éclatante et fraîcheur 14 jours',
          percentage: '< 2%',
        },
      ],
    },
  },
  {
    id: 'amal-citronzyme-1l',
    code: 'AML-VAI-1000',
    name: 'AMAL CitronZyme 1L',
    subtitle: 'Liquide Vaisselle Ultra-Dégraissant Concentré',
    category: 'Vaisselle & Cuisine Pro',
    shape: 'dish_bottle',
    volume: '1 Litre Ultra-Concentré',
    badge: 'Formule 3x Active',
    shortDesc:
      'Pouvoir émulsifiant extrême contre les graisses brûlées. Mousse dense longue durée au citron vert naturel et glycérine.',
    description:
      'AMAL CitronZyme 1L est un liquide vaisselle hyper-concentré formulé pour les particuliers exigeants et la restauration. Quelques gouttes suffisent pour dissoudre instantanément les films lipidiques tenaces, tout en protégeant l’épiderme grâce à son pH neutre et son enrichissement en glycérine végétale.',
    ugcImage: 'images/products/amal-citronzyme-1l.jpg',
    ugcContext: 'Mise en situation réelle • Cuisine & Dégraissage Citron Vert',
    ugcHighlight: 'Étiquette AMAL CitronZyme 1L • Flacon PET Cristal & Mousse Active',
    bottleColor: '#E8FFF5',
    capColor: '#10B981',
    liquidColor: '#10B981',
    labelAccent: '#10B981',
    labelTheme: 'eco',
    bottleTranslucency: 0.85,
    unitPriceHT: 1.95,
    unitsPerCarton: 12,
    cartonsPerPallet: 60,
    minOrderPallets: 1,
    specs: {
      ph: '7.0 ± 0.2 (Neutre Peau)',
      viscosity: '1 200 cPs (Gel Concentré)',
      biodegradability: '97% (OCDE 301B)',
      activeMatter: '28.0% Matière Active',
      packagingUnit: 'Carton de 12 x 1L (PET Cristal)',
      palletCapacity: '720 Flacons / Palette Europe',
      certifications: ['ISO 9001', 'Conforme Contact Alimentaire', 'pH Neutre'],
      ingredients: [
        {
          name: 'Alkyl Éther Sulfate de Sodium',
          role: 'Moussant haute densité & dégraissant',
          percentage: '15 - 25%',
        },
        {
          name: 'Bétaïne de Coco Amphotère',
          role: 'Douceur cutanée & stabilisateur de mousse',
          percentage: '5 - 10%',
        },
        {
          name: 'Glycérine Végétale & Huile Essentielle Citron',
          role: 'Hydratation des mains & parfum frais',
          percentage: '< 5%',
        },
      ],
    },
  },
  {
    id: 'amal-proclean-hd-5l',
    code: 'AML-IND-5000',
    name: 'AMAL ProClean HD 5L',
    subtitle: 'Détergent Dégraissant Surpuissant CHR & Industrie',
    category: 'Détergence Industrielle & B2B',
    shape: 'industrial_jerrycan',
    volume: 'Bidon 5 Litres Pro',
    badge: 'Norme HACCP',
    shortDesc:
      'Dégraissant alcalin haute performance pour cuisines centrales, ateliers, autolaveuses et surfaces industrielles.',
    description:
      'Conçu pour les environnements professionnels les plus sévères (industrie agroalimentaire, hôtellerie-restauration, grande distribution, ateliers mécaniques), AMAL ProClean HD 5L saponifie et émulsionne instantanément les huiles minérales, graisses animales et résidus carbonisés.',
    ugcImage: 'images/products/amal-proclean-hd-5l.jpg',
    ugcContext: 'Mise en situation réelle • Cuisine Professionnelle & CHR',
    ugcHighlight: 'Étiquette Industrielle AMAL ProClean HD 5L • Certifié HACCP',
    bottleColor: '#1E293B',
    capColor: '#F59E0B',
    liquidColor: '#F59E0B',
    labelAccent: '#F59E0B',
    labelTheme: 'industrial',
    bottleTranslucency: 0.12,
    unitPriceHT: 8.9,
    unitsPerCarton: 4,
    cartonsPerPallet: 32,
    minOrderPallets: 1,
    specs: {
      ph: '11.5 ± 0.3 (Alcalin Contrôlé)',
      viscosity: '280 cPs (Fluide Dosage Auto)',
      biodegradability: '> 92% (Réglementation CE 648/2004)',
      activeMatter: '32.0% Matière Active',
      packagingUnit: 'Carton de 4 x 5L (Bidon PEHD Renforcé)',
      palletCapacity: '128 Bidons / Palette',
      certifications: ['HACCP Certifié', 'ISO 9001', 'Usage Autolaveuse & Haute Pression'],
      ingredients: [
        {
          name: 'Tensioactifs Non-ioniques à Mousse Contrôlée',
          role: 'Mouillage rapide & compatible autolaveuse',
          percentage: '10 - 20%',
        },
        {
          name: 'Agents Séquestrants Écologiques (GLDA)',
          role: 'Action anti-calcaire en eau très dure',
          percentage: '5 - 15%',
        },
        {
          name: 'Solvants Hydrophiles Biodégradables',
          role: 'Dissolution immédiate des graisses cuites',
          percentage: '5 - 10%',
        },
      ],
    },
  },
  {
    id: 'amal-cristalspray-750',
    code: 'AML-SPR-0750',
    name: 'AMAL CristalSpray 750ml',
    subtitle: 'Spray Désinfectant & Dégraissant Multi-Surfaces',
    category: 'Désinfection & Hygiène',
    shape: 'trigger_spray',
    volume: '750 ml Pistolet Mousse/Jet',
    badge: 'Bactéricide EN 1276',
    shortDesc:
      'Double action détergente et désinfectante sans javel. Élimine 99,99% des bactéries et laisse une brillance cristalline.',
    description:
      'Grâce à sa buse bi-fonction (pulvérisation fine ou mousse active adhérente), AMAL CristalSpray 750ml nettoie, dégraisse et désinfecte en un seul geste les plans de travail, inox, vitres, sanitaires et équipements collectifs sans laisser de traces ni d’odeur agressive.',
    ugcImage: 'images/products/amal-cristalspray-750.jpg',
    ugcContext: 'Mise en situation réelle • Plan de Travail Marbre & Menthe Eucalyptus',
    ugcHighlight: 'Étiquette AMAL CristalSpray 750ml • Pistolet Mousse/Jet Haute Précision',
    bottleColor: '#E0F7FA',
    capColor: '#00E5FF',
    liquidColor: '#00E5FF',
    labelAccent: '#00E5FF',
    labelTheme: 'light',
    bottleTranslucency: 0.82,
    unitPriceHT: 2.3,
    unitsPerCarton: 12,
    cartonsPerPallet: 50,
    minOrderPallets: 1,
    specs: {
      ph: '9.2 ± 0.2',
      viscosity: '15 cPs (Pulvérisation Micronisée)',
      biodegradability: '96%',
      activeMatter: '8.5% Prêt à l’Emploi',
      packagingUnit: 'Carton de 12 x 750ml avec Pistolet Pro',
      palletCapacity: '600 Sprays / Palette',
      certifications: ['Norme EN 1276', 'Norme EN 14476', 'Sans Chlore'],
      ingredients: [
        {
          name: 'Chlorure de Didécyldiméthylammonium',
          role: 'Principe actif biocides & virucide',
          percentage: '< 2%',
        },
        {
          name: 'Alkylpolyglucosides Végétaux (APG)',
          role: 'Tensioactif bio-sourcé sans traces',
          percentage: '< 5%',
        },
        {
          name: 'Essence Naturelle Menthe & Eucalyptus',
          role: 'Fraîcheur purifiante longue durée',
          percentage: '< 1%',
        },
      ],
    },
  },
  {
    id: 'amal-chloreactif-25l',
    code: 'AML-JAV-2500',
    name: 'AMAL ChloreActif 2.5L',
    subtitle: 'Eau de Javel Détergente Parfumée & Stabilisée 12° Chl',
    category: 'Désinfection & Hygiène',
    shape: 'bleach_bottle',
    volume: '2,5 Litres Sécurité',
    badge: 'Haute Pureté 12°',
    shortDesc:
      'Formule gel moussante qui adhère aux parois pour une désinfection profonde, un blanchiment supérieur et une hygiène totale.',
    description:
      'Contrairement aux eaux de javel classiques liquides qui éclaboussent, AMAL ChloreActif 2.5L intègre des agents viscosants et tensioactifs résistants au chlore. Il nettoie, détache, désodorise et aseptise les sols, sanitaires et textiles blancs avec une stabilité garantie sous climat chaud.',
    ugcImage: 'images/products/amal-chloreactif-25l.jpg',
    ugcContext: 'Mise en situation réelle • Buanderie & Désinfection Domestique/Pro',
    ugcHighlight: 'Étiquette AMAL ChloreActif 2.5L • Bouchon Sécurité ISO 8317',
    bottleColor: '#F8FAFC',
    capColor: '#0284C7',
    liquidColor: '#38BDF8',
    labelAccent: '#0284C7',
    labelTheme: 'light',
    bottleTranslucency: 0.1,
    unitPriceHT: 2.1,
    unitsPerCarton: 6,
    cartonsPerPallet: 45,
    minOrderPallets: 1,
    specs: {
      ph: '12.5 ± 0.3',
      viscosity: '850 cPs (Gel Anti-Éclaboussures)',
      biodegradability: 'Décomposition en sel naturel (NaCl)',
      activeMatter: '3.6% Chlore Actif Stabilisé',
      packagingUnit: 'Carton de 6 x 2.5L (Bouchon Sécurité Enfant)',
      palletCapacity: '270 Flacons / Palette',
      certifications: ['Bactéricide EN 13697', 'Fongicide', 'Bouchon Certifié ISO 8317'],
      ingredients: [
        {
          name: 'Hypochlorite de Sodium Purifié',
          role: 'Désinfectant & blanchissant spectre total',
          percentage: '3.6% Cl actif',
        },
        {
          name: 'Oxyde d’Amine Tensioactif',
          role: 'Effet moussant dégraissant stable au chlore',
          percentage: '< 5%',
        },
        {
          name: 'Stabilisant Thermique Exclusif AMAL',
          role: 'Conservation longue durée jusqu’à 40°C',
          percentage: '< 1%',
        },
      ],
    },
  },
  {
    id: 'amal-marseille-400g',
    code: 'AML-SAV-0400',
    name: 'AMAL Pur Ménage 400g',
    subtitle: 'Pain de Savon Traditionnel 72% Huiles Végétales',
    category: 'Savonnerie Traditionnelle',
    shape: 'soap_bar',
    volume: 'Pain Solide 400g (Estampillé)',
    badge: '72% Huiles Végétales',
    shortDesc:
      'Le cœur historique de la Savonnerie AMAL. Cuit en chaudron, 100% végétal, sans colorant ni conservateur synthétique.',
    description:
      'Symbole du savoir-faire maître savonnier d’AMAL, ce pain de 400g est obtenu par saponification traditionnelle d’huiles végétales nobles purifiées. Ultra-compact, il ne ramollit pas à l’eau, détache efficacement le linge délicat, lave les mains et respecte les peaux les plus sensibles.',
    ugcImage: 'images/products/amal-marseille-400g.jpg',
    ugcContext: 'Mise en situation réelle • Savonnerie Traditionnelle & Linge Naturel',
    ugcHighlight: 'Gravure AMAL 72% Extra Pur & Bague Kraft Officielle AMAL 400g',
    bottleColor: '#D4A359',
    capColor: '#B4823C',
    liquidColor: '#E5BA73',
    labelAccent: '#F59E0B',
    labelTheme: 'eco',
    bottleTranslucency: 0.05,
    unitPriceHT: 0.95,
    unitsPerCarton: 25,
    cartonsPerPallet: 80,
    minOrderPallets: 1,
    specs: {
      ph: '9.8 ± 0.2 (Alcalinité Douce Naturelle)',
      viscosity: 'Solide Haute Densité (Extrudé Sous Vide)',
      biodegradability: '99.8% Biodégradable en 28 jours',
      activeMatter: '72% Acides Gras Végétaux',
      packagingUnit: 'Carton de 25 Pains x 400g (10 kg net)',
      palletCapacity: '2 000 Pains (80 Cartons) / Palette',
      certifications: ['100% Origine Végétale', 'Hypoallergénique', 'Zéro Phosphate'],
      ingredients: [
        {
          name: 'Sodium Palmate & Sodium Cocoate',
          role: 'Base lavante végétale saponifiée au chaudron',
          percentage: '> 72%',
        },
        {
          name: 'Glycérine Naturelle Issue de Saponification',
          role: 'Protection hydrolipidique de la peau',
          percentage: '3 - 5%',
        },
        {
          name: 'Chlorure de Sodium & Eau Purifiée',
          role: 'Relargage traditionnel et dureté cristalline',
          percentage: 'Q.S.P.',
        },
      ],
    },
  },
  {
    id: 'amal-dermasoft-500ml',
    code: 'AML-SLQ-0500',
    name: 'AMAL DermaSoft 500ml',
    subtitle: 'Savon Crème Lavant Mains Glycériné & Antibactérien',
    category: 'Savonnerie Traditionnelle',
    shape: 'pump_bottle',
    volume: '500 ml Flacon Pompe Doseuse',
    badge: 'Soin Dermatologique',
    shortDesc:
      'Savon liquide surgras enrichi à l’extrait d’Aloe Vera et glycérine végétale. Hygiène parfaite pour la maison, le médical et le tertiaire.',
    description:
      'Alliant la tradition savonnière d’AMAL à la dermo-cosmétique moderne, AMAL DermaSoft nettoie et assainit les mains même lors de lavages intensifs répétés. Sa pompe doseuse délivre la quantité exacte de crème nacrée onctueuse.',
    ugcImage: 'images/products/amal-dermasoft-500ml.jpg',
    ugcContext: 'Mise en situation réelle • Hygiène des Mains & Soin Aloe Vera',
    ugcHighlight: 'Étiquette AMAL DermaSoft 500ml • Texture Crème Nacrée Glycérinée',
    bottleColor: '#CCFBF1',
    capColor: '#0D9488',
    liquidColor: '#14B8A6',
    labelAccent: '#14B8A6',
    labelTheme: 'eco',
    bottleTranslucency: 0.75,
    unitPriceHT: 1.75,
    unitsPerCarton: 12,
    cartonsPerPallet: 64,
    minOrderPallets: 1,
    specs: {
      ph: '5.5 (pH Physiologique Cutané)',
      viscosity: '2 400 cPs (Crème Nacrée)',
      biodegradability: '98%',
      activeMatter: '18.0% Base Lavante Douce',
      packagingUnit: 'Carton de 12 x 500ml avec Pompe Verrouillable',
      palletCapacity: '768 Flacons / Palette',
      certifications: ['Testé Sous Contrôle Dermatologique', 'Sans Parabène', 'ISO 22716 BPF'],
      ingredients: [
        {
          name: 'Coco-Glucoside & Glycéryl Oléate',
          role: 'Agent surgraissant biomimétique',
          percentage: '10 - 15%',
        },
        {
          name: 'Glycérine Végétale Pure (5%)',
          role: 'Barrière hydratante anti-dessèchement',
          percentage: '5%',
        },
        {
          name: 'Acide Lactique Naturel',
          role: 'Équilibre du microbiome et action antibactérienne douce',
          percentage: '< 2%',
        },
      ],
    },
  },
  {
    id: 'amal-oxyblanc-10kg',
    code: 'AML-PDR-10KG',
    name: 'AMAL OxyBlanc Pro 10kg',
    subtitle: 'Seau Lessive Poudre Atomisée Hôtellerie & Blanchisserie',
    category: 'Détergence Industrielle & B2B',
    shape: 'powder_bucket',
    volume: 'Seau Hermétique 10 kg (160 Lavages)',
    badge: 'Spécial Collectivités',
    shortDesc:
      'Poudre atomisée haute densité enrichie à l’oxygène actif (percarbonate) pour un blanc immaculé dès 40°C.',
    description:
      'Destinée aux blanchisseries industrielles, hôtels, hôpitaux et grossistes, la lessive poudre AMAL OxyBlanc Pro 10kg est fabriquée par tour d’atomisation garantissant une dissolution instantanée sans résidus et une action détachante oxygénée sur le linge plat et les éponges.',
    ugcImage: 'images/products/amal-oxyblanc-10kg.jpg',
    ugcContext: 'Mise en situation réelle • Blanchisserie Hôtelière & Industrielle',
    ugcHighlight: 'Seau 10kg Étiqueté AMAL OxyBlanc Pro • Anse Métallique & Couvercle Hermétique',
    bottleColor: '#F1F5F9',
    capColor: '#00E5FF',
    liquidColor: '#38BDF8',
    labelAccent: '#0284C7',
    labelTheme: 'industrial',
    bottleTranslucency: 0.0,
    unitPriceHT: 16.5,
    unitsPerCarton: 1,
    cartonsPerPallet: 48,
    minOrderPallets: 1,
    specs: {
      ph: '10.5 (En solution à 1%)',
      viscosity: 'Granulométrie Homogène 450 g/L',
      biodegradability: '> 94%',
      activeMatter: '26.0% Tensioactifs + Oxygène Actif',
      packagingUnit: 'Seau Polypropylène Robuste 10kg avec Anse',
      palletCapacity: '48 Seaux (480 kg) / Palette',
      certifications: ['Blanchisserie Pro', 'Zéro Phosphate', 'Anti-Calcaire Intégré'],
      ingredients: [
        {
          name: 'Percarbonate de Sodium (Oxygène Actif)',
          role: 'Blanchiment hygiénique et désinfection thermique',
          percentage: '15 - 25%',
        },
        {
          name: 'Tensioactifs Anioniques Atomisés',
          role: 'Élimination profonde des salissures organiques',
          percentage: '10 - 20%',
        },
        {
          name: 'Zéolithes & Polycarboxylates',
          role: 'Adoucissement de l’eau et protection des résistances',
          percentage: '15 - 30%',
        },
      ],
    },
  },
];

export const CATEGORIES: ('Tous' | ProductCategory)[] = [
  'Tous',
  'Lessives & Soin du Linge',
  'Vaisselle & Cuisine Pro',
  'Détergence Industrielle & B2B',
  'Désinfection & Hygiène',
  'Savonnerie Traditionnelle',
];

export const MANUFACTURING_STEPS = [
  {
    step: '01',
    title: 'Laboratoire R&D & Formulation Moléculaire',
    subtitle: 'Chimie Verte & Tensioactifs Haute Efficacité',
    description:
      'Nos ingénieurs chimistes conçoivent et testent chaque formule en laboratoire : sélection des tensioactifs biodégradables, dosage enzymatique, stabilité viscosimétrique entre 5°C et 45°C et tests d’efficacité détergente normalisés.',
    metric: '120+ Formules Certifiées',
    temp: '22°C Contrôlé',
    iconName: 'FlaskConical',
  },
  {
    step: '02',
    title: 'Saponification & Réacteurs Inox 316L',
    subtitle: 'Cuves Automatisées & Mélangeurs Haut Cisaillement',
    description:
      'Production en cuves inoxydables 316L de 10 000L équipées de turbines homogénéisatrices sous vide et de chaudrons de saponification traditionnelle pour nos pains de savon 72% huiles végétales.',
    metric: '150 Tonnes / Jour',
    temp: '85°C Saponification',
    iconName: 'Factory',
  },
  {
    step: '03',
    title: 'Extrusion-Soufflage Emballages In-Situ',
    subtitle: 'Autonomie Plasturgie PEHD & PET Recyclable',
    description:
      'L’usine AMAL intègre son propre atelier d’extrusion-soufflage : fabrication sur place de nos flacons ergonomiques, bidons industriels 5L/20L et bouchons de sécurité avec jusqu’à 50% de résine recyclée (rPEHD / rPET).',
    metric: '100% Emballages Recyclables',
    temp: '180°C Extrusion',
    iconName: 'Box',
  },
  {
    step: '04',
    title: 'Conditionnement Robotisé & Étiquetage AMAL',
    subtitle: 'Lignes Haute Cadence & Traçabilité Laser',
    description:
      'Remplissage volumétrique débitmétrique sans mousse, vissage dynamométrique des bouchons et pistolets, étiquetage haute précision AMAL et marquage jet d’encre/laser de chaque lot de fabrication.',
    metric: '14 000 Flacons / Heure',
    temp: 'Précision ±0.2%',
    iconName: 'Cpu',
  },
  {
    step: '05',
    title: 'Contrôle Qualité ISO & Logistique Export',
    subtitle: 'Analyses Physico-Chimiques & Conteneurisation B2B',
    description:
      'Chaque lot fait l’objet d’une rétention d’échantillon au laboratoire qualité (pH, matière active, microbiologie) avant palettisation robotisée et expédition vers la grande distribution, les grossistes et l’export.',
    metric: '0 Défaut Toléré • ISO 9001',
    temp: 'Expédition 24/48h',
    iconName: 'ShieldCheck',
  },
];
