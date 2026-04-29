import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MilkProduction {
  id: number;
  farmName: string;
  animalId: string;
  quantity: number; // en litres
  collectionDate: string;
  period: 'Matin' | 'Soir';
}

@Component({
  selector: 'app-production-laitiere',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './production-laitiere.component.html',
  styleUrls: ['./production-laitiere.component.scss']
})
export class ProductionLaitiereComponent {
  searchTerm = signal('');
  isModalOpen = signal(false);

  // Données de démonstration
  productions = signal<MilkProduction[]>([
    { id: 1, farmName: 'Ferme de la Vallée', animalId: 'BOV-001', quantity: 12.5, collectionDate: '2025-01-22', period: 'Matin' },
    { id: 2, farmName: 'Ferme du Nord', animalId: 'BOV-042', quantity: 8.0, collectionDate: '2025-01-22', period: 'Matin' },
    { id: 3, farmName: 'Ferme de la Vallée', animalId: 'BOV-001', quantity: 10.2, collectionDate: '2025-01-22', period: 'Soir' },
    { id: 4, farmName: 'Exploitation Diop', animalId: 'BOV-102', quantity: 15.0, collectionDate: '2025-01-21', period: 'Matin' },
  ]);

  // Modèle pour une nouvelle saisie
  newRecord = { farmName: '', animalId: '', quantity: 0, period: 'Matin' as const };

  filteredProductions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.productions().filter(p => 
      p.farmName.toLowerCase().includes(term) || 
      p.animalId.toLowerCase().includes(term)
    );
  });

  // Stats rapides
  totalVolume = computed(() => this.productions().reduce((acc, curr) => acc + curr.quantity, 0));
  
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.newRecord = { farmName: '', animalId: '', quantity: 0, period: 'Matin' };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const record: MilkProduction = {
      ...this.newRecord,
      id: Date.now(),
      collectionDate: new Date().toISOString().split('T')[0]
    };
    this.productions.update(prev => [record, ...prev]);
    this.closeModal();
  }

  deleteRecord(id: number) {
    if (confirm('Supprimer cet enregistrement de production ?')) {
      this.productions.update(prev => prev.filter(p => p.id !== id));
    }
  }
}