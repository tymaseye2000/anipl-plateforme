import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, RegionStats } from '../dashbord/dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: '../dashbord/dashboard.component.scss' // On réutilise le style du dashboard
})
export class DashboardHomeComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  protected selectedRegion = 'Dakar';
  protected stats: RegionStats = { fermes: 0, eleveurs: 0, animaux: 0 };
  protected hoveredRegion: string | null = null;
  protected hoveredStats: RegionStats | null = null;

  ngOnInit(): void {
    this.updateStats();
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