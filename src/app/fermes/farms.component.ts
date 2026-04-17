import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Farm {
  name: string;
  owner: string;
  region: string;
  status: 'Actif' | 'Maintenance' | 'Inactif';
  createdAt: Date;
}

@Component({
  selector: 'app-farms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farms.component.html',
  styleUrl: './farms.component.scss'
})
export class FarmsComponent {
  protected readonly isModalOpen = signal(false);

  protected readonly farms = signal<Farm[]>([
    { name: 'Ferme Niayes Plénitude', owner: 'Mamadou Diop', region: 'Dakar', status: 'Actif', createdAt: new Date('2024-01-15') },
    { name: 'Élevage du Fleuve', owner: 'Awa Ndiaye', region: 'Saint-Louis', status: 'Actif', createdAt: new Date('2024-03-20') },
    { name: 'Terranga Livestock', owner: 'Ibrahima Fall', region: 'Thiès', status: 'Maintenance', createdAt: new Date('2023-11-05') },
  ]);

  protected newFarm: Partial<Farm> = this.getDefaultFarm();

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  private resetForm() {
    this.newFarm = this.getDefaultFarm();
  }

  private getDefaultFarm(): Partial<Farm> {
    return { name: '', owner: '', region: 'Dakar', status: 'Actif' };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.newFarm.name && this.newFarm.owner) {
      const farmToAdd = {
        ...this.newFarm as Farm,
        createdAt: new Date()
      };
      
      this.farms.update(current => [...current, farmToAdd]);
      this.closeModal();
    }
  }
}