import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HealthRecord {
  id: number;
  animalId: string;
  interventionType: 'Vaccination' | 'Traitement' | 'Examen' | 'Urgence';
  description: string;
  veterinary: string;
  date: string;
  status: 'Terminé' | 'À suivre';
}

@Component({
  selector: 'app-sante-animale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sante-animale.component.html',
  styleUrls: ['./sante-animale.component.scss']
})
export class SanteAnimaleComponent {
  searchTerm = signal('');
  isModalOpen = signal(false);

  // Données de démonstration
  healthRecords = signal<HealthRecord[]>([
    { id: 1, animalId: 'BOV-001', interventionType: 'Vaccination', description: 'Fièvre Aphteuse', veterinary: 'Dr. Faye', date: '2025-01-15', status: 'Terminé' },
    { id: 2, animalId: 'BOV-042', interventionType: 'Traitement', description: 'Infection patte arrière', veterinary: 'Dr. Sow', date: '2025-01-20', status: 'À suivre' },
    { id: 3, animalId: 'BOV-102', interventionType: 'Examen', description: 'Contrôle gestation', veterinary: 'Dr. Faye', date: '2025-01-22', status: 'Terminé' },
  ]);

  // Modèle pour le formulaire
  newRecord: Partial<HealthRecord> = {
    animalId: '',
    interventionType: 'Vaccination',
    description: '',
    veterinary: '',
    status: 'Terminé'
  };

  filteredRecords = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.healthRecords().filter(r => 
      r.animalId.toLowerCase().includes(term) || 
      r.description.toLowerCase().includes(term) ||
      r.veterinary.toLowerCase().includes(term)
    );
  });

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.newRecord = { animalId: '', interventionType: 'Vaccination', description: '', veterinary: '', status: 'Terminé' };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // On extrait l'id pour éviter le doublon lors du spread
    const { id: _, ...data } = this.newRecord;
    const record: HealthRecord = {
      ...data as HealthRecord,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    this.healthRecords.update(prev => [record, ...prev]);
    this.closeModal();
  }

  deleteRecord(id: number) {
    if (confirm('Voulez-vous supprimer ce dossier médical ?')) {
      this.healthRecords.update(prev => prev.filter(r => r.id !== id));
    }
  }
}