import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService, RegionStats } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  private timerId: any;

  protected isSidebarCollapsed = false;
  protected currentDate: Date = new Date();
  protected selectedRegion = 'Dakar';
  protected stats: RegionStats = { fermes: 0, eleveurs: 0, animaux: 0 };
  protected hoveredRegion: string | null = null;
  protected hoveredStats: RegionStats | null = null;

  ngOnInit(): void {
    this.updateStats();
    this.timerId = setInterval(() => this.currentDate = new Date(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  protected toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  protected updateStats(region?: string): void {
    if (region) this.selectedRegion = region;
    this.dashboardService.getStatsByRegion(this.selectedRegion).subscribe(data => {
      this.stats = data;
    });
  }

  protected onMouseEnter(region: string): void {
    this.hoveredRegion = region;
    this.dashboardService.getStatsByRegion(region).subscribe(data => {
      this.hoveredStats = data;
    });
  }

  protected onMouseLeave(): void {
    this.hoveredRegion = null;
    this.hoveredStats = null;
  }
}
