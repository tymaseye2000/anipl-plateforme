import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CampaignService, Campaign } from '../campaign/campaign.service';

@Component({
  selector: 'app-campaign-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private campaignService = inject(CampaignService);

  campaign?: Campaign;
  totalAmount = 0;
  statusMessage: { type: 'success' | 'error', text: string } | null = null;

  orderForm = this.fb.group({
    quantity: [1, [Validators.required, Validators.min(1)]],
    notes: ['', [Validators.maxLength(500)]],
    paymentMethod: ['mobile_money', [Validators.required]]
  });

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.campaign = this.campaignService.getCampaignBySlug(slug);
      this.calculateTotal();
    }

    // Recalculer le total à chaque changement de quantité
    this.orderForm.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  calculateTotal() {
    if (this.campaign && this.orderForm.value.quantity) {
      const price = this.campaign.unit_price;
      this.totalAmount = price * this.orderForm.value.quantity;
    }
  }

  onSubmit() {
    if (this.orderForm.valid && this.campaign) {
      const val = this.orderForm.value;

      // Correspondance avec POST /orders
      const orderPayload = {
        campaign_id: this.campaign.id,
        quantity: val.quantity,
        notes: val.notes
      };

      // Correspondance avec POST /payments
      const paymentPayload = {
        amount: this.totalAmount,
        method: val.paymentMethod
      };

      console.log('Création de la commande :', orderPayload);
      console.log('Initialisation du paiement :', paymentPayload);

      this.statusMessage = {
        type: 'success',
        text: 'Votre demande d’adhésion a été enregistrée avec succès. Un administrateur va valider votre commande.'
      };

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 3000);
    }
  }
}