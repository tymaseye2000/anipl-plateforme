import { Injectable } from '@angular/core';

export interface Campaign {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'closed';
  available_quantity: number;
  remaining_quantity: number;
  unit_price: number;
  start_at: string;
  deadline_at: string;
  image_url: string | null;
  description?: string;
  species: { id: number; name: string };
  race: { id: number; name: string } | null;
  country: { id: number; name: string } | null;
  orders_count?: number;
  // Pour la compatibilité avec votre vue actuelle si nécessaire
  subtitle?: string; 
  metrics?: { label: string; value: string }[]; 
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private campaigns: Campaign[] = [
    { 
      id: 1, 
      title: 'Importation Bovins - Holstein', 
      slug: 'importation-bovins-holstein',
      status: 'published',
      available_quantity: 2000,
      remaining_quantity: 1200,
      unit_price: 1000000,
      start_at: '2021-01-01T00:00:00Z',
      deadline_at: '2021-06-21T00:00:00Z',
      image_url: '/bovin1.png', 
      description: 'La Holstein est la race laitière la plus répandue.', 
      species: { id: 1, name: 'Bovin' },
      race: { id: 1, name: 'Holstein' },
      country: { id: 1, name: 'France' },
      subtitle: 'Production laitière intensive', 
      metrics: [{ label: 'Objectif', value: '2000' }, { label: 'Restant', value: '1200' }, { label: 'Race', value: 'Holstein' }] 
    },
    { 
      id: 2, 
      title: 'Importation Bovins - Montbéliarde', 
      slug: 'importation-bovins-montbeliarde',
      status: 'published',
      available_quantity: 1500,
      remaining_quantity: 800,
      unit_price: 1200000,
      start_at: '2026-01-01T00:00:00Z',
      deadline_at: '2026-07-15T00:00:00Z',
      image_url: '/bovin2.png',
      description: 'La Montbéliarde est une race rustique, excellente pour le lait et la viande.',
      species: { id: 1, name: 'Bovin' },
      race: { id: 2, name: 'Montbéliarde' },
      country: { id: 1, name: 'France' },
      subtitle: 'Mixte Lait & Viande',
      metrics: [{ label: 'Objectif', value: '1500' }, { label: 'Restant', value: '800' }, { label: 'Race', value: 'Montbéliarde' }]
    },
    { 
      id: 3, title: 'Importation Bovins - Jersey', slug: 'importation-bovins-jersey', status: 'published',
      start_at: '2021-03-01T00:00:00Z',
      available_quantity: 1000, remaining_quantity: 500, unit_price: 950000, deadline_at: '2021-09-30T00:00:00Z',
      image_url: '/bovin3.png', description: 'La Jersey produit un lait très riche.',
      species: { id: 1, name: 'Bovin' }, race: { id: 3, name: 'Jersey' }, country: { id: 1, name: 'France' }
    },
    {
      id: 4,
      slug: 'importation-montbeliarde',
      title: 'Importation Bovins - Montbéliarde',
      status: 'published', 
      image_url: '/bovin4.png',
      species: { id: 1, name: 'Bovin' },
      race: { id: 2, name: 'Montbéliarde' },
      available_quantity: 100,
      remaining_quantity: 45,
      unit_price: 1300000,
      start_at: '2026-02-15T00:00:00Z',
      deadline_at: '2026-08-15T00:00:00Z',
      description: 'Excellente race laitière reconnue pour la qualité et la richesse de son lait.',
      country: { id: 1, name: 'France' }
    },
    {
      id: 5,
      slug: 'importation-brune-alpes',
      title: 'Importation Bovins - Brune des Alpes',
      status: 'published', 
      image_url: '/bovin5.png',
      species: { id: 1, name: 'Bovin' },
      race: { id: 4, name: 'Brune des Alpes' },
      available_quantity: 80,
      remaining_quantity: 30,
      unit_price: 1450000,
      start_at: '2026-03-01T00:00:00Z',
      deadline_at: '2026-09-01T00:00:00Z',
      description: 'Race rustique avec une très bonne longévité et une production laitière constante.',
      country: { id: 1, name: 'France' }
    },
    {
      id: 6,
      slug: 'importation-simmental',
      title: 'Importation Bovins - Simmental',
      status: 'published', 
      image_url: '/bovin6.png',
      species: { id: 1, name: 'Bovin' },
      race: { id: 5, name: 'Simmental' },
      available_quantity: 60,
      remaining_quantity: 25,
      unit_price: 1250000,
      start_at: '2026-01-20T00:00:00Z',
      deadline_at: '2026-07-20T00:00:00Z',
      description: 'Race à double fin (lait et viande), très appréciée pour sa robustesse en milieu tropical.',
      country: { id: 1, name: 'France' }
    }
  ];

  // Correspond à GET /public/campaigns/{slug}
  getCampaignBySlug(slug: string | null): Campaign | undefined {
    if (!slug) return undefined;
    return this.campaigns.find(c => c.slug === slug);
  }

  getCampaignById(id: number | string | null): Campaign | undefined {
    if (!id) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.campaigns.find(c => c.id === numericId);
  }

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  addCampaign(campaign: Campaign): void {
    this.campaigns.push(campaign);
  }

  deleteCampaign(id: number): void {
    this.campaigns = this.campaigns.filter(c => c.id !== id);
  }
}