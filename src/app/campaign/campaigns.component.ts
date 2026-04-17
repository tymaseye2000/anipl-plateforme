import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CampaignService, Campaign } from './campaign.service';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent implements OnInit {
  private campaignService = inject(CampaignService);
  private route = inject(ActivatedRoute);

  // Liste des races de bovins (9 au total après ajout)
  campaigns: Campaign[] = [];
  
  // Gestion de l'affichage du formulaire
  selectedCampaign: Campaign | null = null;
  showMembershipForm = false;

  // Modèle de données pour la demande d'adhésion
  order = {
    firstName: '',
    lastName: '',
    phone: '',
    cni: '',
    email: '',
    quantity: 1,
    notes: '',
    paymentMethod: 'mobile' // Par défaut sur Mobile Money
  };

  ngOnInit(): void {
    // Initialisation des données depuis le service
    this.campaigns = this.campaignService.getCampaigns();

    // Vérifie si on doit afficher le formulaire d'adhésion directement
    if (this.route.snapshot.data['view'] === 'membership') {
      if (this.campaigns.length > 0) {
        this.selectedCampaign = this.campaigns[0];
      }
      this.showMembershipForm = true;
    }
  }

  /**
   * Sélectionne une campagne et affiche le formulaire
   */
  selectCampaign(campaign: Campaign): void {
    this.selectedCampaign = campaign;
    this.showMembershipForm = true;
    // Réinitialisation de la quantité à 1 lors d'une nouvelle sélection
    this.order.quantity = 1; 
  }

  /**
   * Calcule dynamiquement le montant total
   */
  get totalAmount(): number {
    if (!this.selectedCampaign) return 0;
    return this.selectedCampaign.unit_price * this.order.quantity;
  }

  /**
   * Envoie la demande d'adhésion
   */
  submitOrder(): void {
    // Vérification des champs obligatoires
    if (!this.order.firstName || !this.order.lastName || !this.order.phone || !this.order.cni) {
      alert('Veuillez remplir tous les champs obligatoires (Nom, Prénom, Téléphone et CNI).');
      return;
    }
    
    // Vérification du stock
    if (this.selectedCampaign && this.order.quantity > this.selectedCampaign.remaining_quantity) {
      alert('Désolé, il ne reste que ' + this.selectedCampaign.remaining_quantity + ' animaux disponibles.');
      return;
    }
    
    console.log('Données de la demande ANIPL :', {
      animal: this.selectedCampaign?.race?.name,
      client: `${this.order.firstName} ${this.order.lastName}`,
      contact: this.order.phone,
      cni: this.order.cni,
      montant: this.totalAmount,
      paiement: this.order.paymentMethod
    });

    alert('Votre demande d\'adhésion a été enregistrée avec succès !');
    
    // Réinitialisation et retour à la liste
    this.showMembershipForm = false;
    this.selectedCampaign = null;
    this.order = {
      firstName: '', lastName: '', phone: '', cni: '', email: '',
      quantity: 1, notes: '', paymentMethod: 'mobile'
    };
  }
}
