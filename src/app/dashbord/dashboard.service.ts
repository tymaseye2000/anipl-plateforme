import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface RegionStats {
  fermes: number;
  eleveurs: number;
  animaux: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // Simulation de données par région
  private data: Record<string, RegionStats> = {
    'Dakar': { fermes: 18000, eleveurs: 12000, animaux: 45000 },
    'Thiès': { fermes: 15000, eleveurs: 10000, animaux: 38000 },
    'Saint-Louis': { fermes: 12000, eleveurs: 8000, animaux: 30000 }
  };

  getStatsByRegion(region: string): Observable<RegionStats> {
    const stats = this.data[region] || { fermes: 0, eleveurs: 0, animaux: 0 };
    return of(stats); // Simule une réponse asynchrone immédiate
  }
}