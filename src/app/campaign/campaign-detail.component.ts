import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CampaignService, Campaign } from './campaign.service';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-page-full">
      <main class="main-content">
    <section class="page page-detail" *ngIf="campaign">
      <div class="detail-header">
        <div>
          <span class="eyebrow">Détail campagne</span>
          <h1>{{ campaign.title }}</h1>
          <p *ngIf="campaign.subtitle">{{ campaign.subtitle }}</p>
        </div>
        <a routerLink="/campagnes" class="back-link">← Retour aux campagnes</a>
      </div>

      <div class="detail-grid">
        <div class="detail-copy">
          <p>{{ campaign.description }}</p>
          <div class="metrics" *ngIf="campaign.metrics && campaign.metrics.length > 0">
            <article class="metric-card" *ngFor="let metric of campaign.metrics">
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </article>
          </div>
        </div>
        <div class="detail-preview">
          <div class="preview-card">
            <div class="preview-badge">Statut</div>
            <p>Gérez les actions, les événements et les indicateurs associés à cette campagne.</p>
            <button class="button" style="width: 100%; margin-top: 1rem;" [routerLink]="['/campagnes', campaign.slug, 'participer']">Participer à la campagne</button>
          </div>
        </div>
      </div>
    </section>
    <section class="page page-detail" *ngIf="!campaign">
      <h1>Campagne introuvable</h1>
      <p>Cette campagne n’existe pas ou a été supprimée.</p>
      <a routerLink="/campagnes" class="button">Retour aux campagnes</a>
    </section>
      </main>
    </div>
  `,
  styles: [
    `
      .main-content {
        flex: 1;
        padding: 2rem;
        max-width: 100%;
        background: #f4fbf8;
        min-height: 100vh;
      }

      .page-detail {
        display: grid;
        gap: 2rem;
      }

      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
      }

      .eyebrow {
        display: inline-flex;
        padding: 0.5rem 0.85rem;
        border-radius: 999px;
        background: rgba(15, 143, 77, 0.14);
        color: #0f6f44;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .detail-header h1 {
        margin: 0 0 0.75rem;
        font-size: clamp(2rem, 3vw, 2.75rem);
      }

      .detail-header p {
        margin: 0;
        color: #4a5e45;
        line-height: 1.75;
      }

      .back-link {
        color: #0f8f4d;
        font-weight: 700;
        text-decoration: none;
      }

      .detail-grid {
        display: grid;
        grid-template-columns: 1.6fr 1fr;
        gap: 1.75rem;
      }

      .detail-copy {
        display: grid;
        gap: 1.5rem;
      }

      .detail-copy p {
        margin: 0;
        color: #4a5e45;
        line-height: 1.8;
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
      }

      .metric-card {
        padding: 1.25rem;
        border-radius: 1.25rem;
        background: #f5fbf6;
        border: 1px solid rgba(15, 143, 77, 0.12);
      }

      .metric-card strong {
        display: block;
        font-size: 1.35rem;
        margin-bottom: 0.45rem;
      }

      .metric-card span {
        color: #4a5e45;
      }

      .detail-preview {
        display: grid;
        align-items: start;
      }

      .preview-card {
        padding: 1.75rem;
        border-radius: 1.75rem;
        background: white;
        border: 1px solid rgba(15, 33, 22, 0.08);
        box-shadow: 0 20px 60px rgba(15, 33, 22, 0.08);
      }

      .preview-badge {
        display: inline-flex;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        background: rgba(15, 143, 77, 0.14);
        color: #0f6f44;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.95rem 1.4rem;
        border-radius: 999px;
        background: #0f8f4d;
        color: white;
        text-decoration: none;
        font-weight: 700;
      }

      @media screen and (max-width: 900px) {
        .app-layout {
          flex-direction: column;
        }
        .sidebar {
          width: 100%;
          height: auto;
          position: relative;
        }

        .detail-grid {
          grid-template-columns: 1fr;
        }

        .metrics {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CampaignDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly campaignService = inject(CampaignService);
  protected campaign?: Campaign;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.campaign = this.campaignService.getCampaignBySlug(slug);
    }
  }
}
