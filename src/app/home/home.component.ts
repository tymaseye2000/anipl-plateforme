import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Campaign, CampaignService } from '../campaign/campaign.service';

interface HomeStat {
  icon: string;
  value: string;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private campaignService = inject(CampaignService);

  isDarkMode = false;

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme', this.isDarkMode);
    }
  }

  // Section Statistiques (Image 2)
  stats: HomeStat[] = [
    { icon: '🐄', value: '100 %', label: 'Traçabilité des animaux', desc: 'Chaque animal est identifié, suivi et historisé.' },
    { icon: '⏱️', value: '-60 %', label: 'Réduction du temps de gestion', desc: 'Automatisation des tâches administratives.' },
    { icon: '🚚', value: '90 %', label: 'Suivi des campagnes d\'importation', desc: 'Suivi en temps réel des arrivées.' },
    { icon: '🏥', value: '100 %', label: 'Suivi sanitaire des animaux', desc: 'Vaccinations et historique médical enregistrés.' },
    { icon: '🥛', value: '+35 %', label: 'Production laitière optimisée', desc: 'Analyse précise des performances par animal.' },
    { icon: '🌐', value: '24h/24 – 7j/7', label: 'Accès à la plateforme', desc: 'Disponible à tout moment sur web et mobile.' }
  ];

  // Section Défis (Images 3 & 4)
  challenges = [
    { id: '01', title: 'Manque de traçabilité', desc: 'Impossible de suivre l\'origine et les mouvements.' },
    { id: '02', title: 'Difficultés des campagnes', desc: 'Opérations d\'importation difficiles à organiser.' },
    { id: '03', title: 'Erreurs de commandes', desc: 'Commandes mal enregistrées entraînant des pertes.' },
    { id: '04', title: 'Mauvaise visibilité production', desc: 'Difficulté à analyser les performances laitières.' },
    { id: '05', title: 'Suivi santé complexe', desc: 'Informations sanitaires non centralisées.' },
    { id: '06', title: 'Prise de décision lente', desc: 'Manque de données fiables pour la stratégie.' }
  ];

  // Section FAQ
  faqs = [
    { question: "Comment s'inscrire sur ANIPL ?", answer: "C'est très simple ! Cliquez sur le bouton 'S'inscrire' en haut à droite, remplissez vos informations professionnelles et vous recevrez un accès immédiat à votre tableau de bord." },
    { question: "Quels types d'animaux puis-je gérer ?", answer: "ANIPL est spécialisée dans l'intensification de la production laitière. Vous pouvez gérer vos vaches laitières, génisses et suivre l'historique complet de chaque tête de bétail." },
    { question: "Est-ce que mes données sont sécurisées ?", answer: "La sécurité est notre priorité. Toutes vos données d'élevage sont cryptées et stockées sur des serveurs sécurisés, accessibles uniquement par vous." },
    { question: "Proposez-vous un accompagnement terrain ?", answer: "Oui, l'ANIPL collabore étroitement avec les conseillers agricoles pour vous aider à interpréter vos résultats et optimiser votre production." }
  ];

  // Section Fonctionnalités (Image 5)
  features = [
    { icon: 'pets', title: 'Gestion des animaux', desc: 'Enregistrez chaque animal avec un identifiant unique.' },
    { icon: 'local_shipping', title: 'Campagnes d\'importation', desc: 'Organisez les opérations d\'importation animale.' },
    { icon: 'assignment_ind', title: 'Commandes éleveurs', desc: 'Permettez aux éleveurs de participer aux campagnes.' },
    { icon: 'monitoring', title: 'Production laitière', desc: 'Analysez les performances des animaux.' },
    { icon: 'health_and_safety', title: 'Suivi sanitaire', desc: 'Assurez la santé et la traçabilité.' },
    { icon: 'dashboard', title: 'Tableaux de bord', desc: 'Prenez de meilleures décisions grâce aux données.' }
  ];

  // Section Campagnes d'importation (Images 6 & 7)
  protected allImportations: Campaign[] = [];

  selectedAnimal: Campaign | null = null;

  get importations() {
    return this.allImportations;
  }

  showAnimalDescription(animal: Campaign): void {
    this.selectedAnimal = animal;
  }

  closeDetail(): void {
    this.selectedAnimal = null;
  }

  // Section Témoignages (Image 8)
  testimonials = [
    {
      name: 'Mamadou Diop',
      role: 'Responsable de ferme laitière',
      quote: 'Anipl nous permet de suivre chaque animal avec précision. Nous pouvons enregistrer la production de lait, consulter l\'historique sanitaire et analyser les performances de la ferme en quelques secondes.',
      image: '',
      icon: '👨‍🌾'
    },
    {
      name: 'Aïssatou Ndiaye',
      role: 'Éleveuse',
      quote: 'Avant Anipl, il était difficile de participer aux campagnes d\'importation. Aujourd\'hui je peux consulter les campagnes, commander mes animaux et suivre l\'arrivée directement depuis la plateforme.',
      image: '',
      icon: '👩‍🌾'
    },
    {
      name: 'Abdoulaye Fall',
      role: 'Responsable importation animale',
      quote: 'La gestion des campagnes d\'importation est beaucoup plus simple avec Anipl. Nous pouvons suivre les commandes, organiser les lots d\'animaux et gérer la réception de manière efficace.',
      image: '',
      icon: '👨‍💼'
    }
  ];

  constructor() {
    this.allImportations = this.campaignService.getCampaigns();
  }

  ngOnInit(): void { }

  onContactSubmit(): void {
    console.log('Question envoyée !');
  }
}