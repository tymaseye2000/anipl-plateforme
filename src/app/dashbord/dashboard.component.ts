import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService, RegionStats } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  protected router = inject(Router);
  private timerId?: ReturnType<typeof setInterval>;

  protected isSidebarCollapsed = signal(false);
  protected currentDate = signal(new Date());
  
  protected selectedRegion = signal('Dakar');
  protected stats = signal<RegionStats>({ fermes: 0, eleveurs: 0, animaux: 0 });
  protected hoveredRegion = signal<string | null>(null);
  protected hoveredStats = signal<RegionStats | null>(null);

  ngOnInit(): void {
    this.updateStats();
    this.timerId = setInterval(() => this.currentDate.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  protected toggleSidebar(): void {
    this.isSidebarCollapsed.update(collapsed => !collapsed);
  }

  protected updateStats(region?: string): void {
    if (region) this.selectedRegion.set(region);
    this.dashboardService.getStatsByRegion(this.selectedRegion()).subscribe(data => {
      this.stats.set(data);
    });
  }

  protected onMouseEnter(region: string): void {
    this.hoveredRegion.set(region);
    this.dashboardService.getStatsByRegion(region).subscribe(data => {
      this.hoveredStats.set(data);
    });
  }

  protected onMouseLeave(): void {
    this.hoveredRegion.set(null);
    this.hoveredStats.set(null);
  }
}
