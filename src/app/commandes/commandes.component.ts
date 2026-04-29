import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaign/campaign.service';

interface Order {
  id: number;
  reference: string;
  breederName: string;
  campaignTitle: string;
  quantity: number;
  totalAmount: number;
  status: 'en-attente' | 'validee' | 'rejetee';
  createdAt: string;
}

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent {
  private campaignService = inject(CampaignService);
  
  // Liste des campagnes pour le menu déroulant du formulaire
  availableCampaigns = this.campaignService.getCampaigns();

  // Les signaux pour la recherche et le filtre
  searchTerm = signal('');
  statusFilter = signal('all');
  isModalOpen = signal(false);

  // Modèle pour une nouvelle commande
  newOrder = { breederName: '', campaignTitle: '', quantity: 1 };

  // Données de démonstration
  orders = signal<Order[]>([
    { id: 1, reference: 'CMD-25-001', breederName: 'Moussa Diop', campaignTitle: 'Bovins Holstein 2025', quantity: 5, totalAmount: 5000000, status: 'en-attente', createdAt: '2025-01-20T10:00:00Z' },
    { id: 2, reference: 'CMD-25-002', breederName: 'Awa Ndiaye', campaignTitle: 'Bovins Holstein 2025', quantity: 2, totalAmount: 2000000, status: 'validee', createdAt: '2025-01-21T14:30:00Z' },
    { id: 3, reference: 'CMD-25-003', breederName: 'Abdou Fall', campaignTitle: 'Montbéliarde Phase 1', quantity: 10, totalAmount: 12000000, status: 'rejetee', createdAt: '2025-01-22T09:15:00Z' },
  ]);

  // Logique de filtrage réactive
  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    
    return this.orders().filter(order => {
      const matchesSearch = order.breederName.toLowerCase().includes(term) || 
                          order.reference.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || order.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.newOrder = { breederName: '', campaignTitle: '', quantity: 1 };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    // Recherche de la campagne pour obtenir le prix unitaire
    const campaign = this.availableCampaigns.find(c => c.title === this.newOrder.campaignTitle);
    const unitPrice = campaign ? campaign.unit_price : 0;

    const orderToAdd: Order = {
      id: Date.now(),
      reference: `CMD-25-00${this.orders().length + 1}`,
      breederName: this.newOrder.breederName,
      campaignTitle: this.newOrder.campaignTitle,
      quantity: this.newOrder.quantity,
      totalAmount: unitPrice * this.newOrder.quantity,
      status: 'en-attente',
      createdAt: new Date().toISOString()
    };

    this.orders.update(current => [orderToAdd, ...current]);
    this.closeModal();
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'en-attente': return 'En attente';
      case 'validee': return 'Validée';
      case 'rejetee': return 'Rejetée';
      default: return status;
    }
  }

  updateStatus(id: number, newStatus: 'validee' | 'rejetee') {
    const statusMsg = newStatus === 'validee' ? 'valider' : 'rejeter';
    if (confirm(`Voulez-vous vraiment ${statusMsg} cette commande ?`)) {
      this.orders.update(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    }
  }
}