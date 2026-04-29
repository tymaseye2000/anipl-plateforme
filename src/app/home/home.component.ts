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

  get importations() {
    return this.allImportations;
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

  ngOnInit(): void {}

  onContactSubmit(): void {
    console.log('Question envoyée !');
  }
}