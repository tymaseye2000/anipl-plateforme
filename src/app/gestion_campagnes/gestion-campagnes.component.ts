import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService, Campaign } from '../campaign/campaign.service';

@Component({
  selector: 'app-gestion-campagnes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-campagnes.component.html',
  styleUrls: ['../dashbord/dashboard.component.scss', './gestion-campagnes.component.scss'] // Réutilisation des styles globaux du dashboard et ajout de styles spécifiques
})
export class GestionCampagnesComponent implements OnInit {
  private campaignService = inject(CampaignService);

  campaigns = signal<Campaign[]>([]);
  isModalOpen = signal(false);

  newCampaign: Partial<Campaign> = {
    title: '',
    available_quantity: 0,
    unit_price: 0,
    deadline_at: '',
    status: 'draft',
    description: ''
  };

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.campaigns.set(this.campaignService.getCampaigns());
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.newCampaign = { title: '', available_quantity: 0, unit_price: 0, deadline_at: '', status: 'draft', description: '' };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.newCampaign.title) {
      const campaign: Campaign = {
        id: Date.now(),
        title: this.newCampaign.title!,
        slug: this.newCampaign.title!.toLowerCase().replace(/\s+/g, '-'),
        status: this.newCampaign.status as any,
        available_quantity: this.newCampaign.available_quantity || 0,
        remaining_quantity: this.newCampaign.available_quantity || 0,
        unit_price: this.newCampaign.unit_price || 0,
        start_at: new Date().toISOString(),
        deadline_at: this.newCampaign.deadline_at || '',
        image_url: null,
        description: this.newCampaign.description,
        species: { id: 1, name: 'Bovin' },
        race: null,
        country: null
      };
      this.campaignService.addCampaign(campaign);
      this.loadCampaigns();
      this.closeModal();
    }
  }

  deleteCampaign(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette campagne ?')) {
      this.campaignService.deleteCampaign(id);
      this.loadCampaigns();
    }
  }
}