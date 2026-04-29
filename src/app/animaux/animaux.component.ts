import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Cattle {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Mâle' | 'Femelle';
  status: 'Disponible' | 'Vendu' | 'Réservé';
  photoUrl: string;
}

@Component({
  selector: 'app-animaux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animaux.component.html',
  styleUrl: './animaux.component.scss'
})
export class AnimauxComponent {
  searchTerm = signal('');
  isModalOpen = signal(false);

  // Modèle pour un nouvel animal
  newAnimal: Partial<Cattle> = {
    name: '',
    breed: '',
    age: '',
    gender: 'Femelle',
    status: 'Disponible'
  };

  // Liste des bovins disponibles (Données exemples)
  cattleList = signal<Cattle[]>([
    { id: 'BV-001', name: 'Belle', breed: 'Holstein', age: '24 mois', gender: 'Femelle', status: 'Disponible', photoUrl: '/bovin1.png' },
    { id: 'BV-002', name: 'Ranger', breed: 'Montbéliarde', age: '18 mois', gender: 'Mâle', status: 'Disponible', photoUrl: '/bovin2.png' },
    { id: 'BV-003', name: 'Daisy', breed: 'Jersiaise', age: '30 mois', gender: 'Femelle', status: 'Réservé', photoUrl: '/bovin3.png' },
    { id: 'BV-004', name: 'Titan', breed: 'Guzerá', age: '36 mois', gender: 'Mâle', status: 'Disponible', photoUrl: '/bovin4.png' },
    { id: 'BV-005', name: 'Luna', breed: 'Bruna', age: '22 mois', gender: 'Femelle', status: 'Disponible', photoUrl: '/bovin5.png' },
    { id: 'BV-006', name: 'Milo', breed: 'N’Dama', age: '12 mois', gender: 'Mâle', status: 'Vendu', photoUrl: '/bovin6.png' },
  ]);

  // Filtrage dynamique selon la recherche
  filteredCattle = computed(() => {
    const term = (this.searchTerm() ?? '').toLowerCase();
    return this.cattleList().filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.breed.toLowerCase().includes(term) ||
      c.id.toLowerCase().includes(term)
    );
  });

  getStatusClass(status: string): string {
    switch (status) {
      case 'Disponible': return 'status-available';
      case 'Réservé': return 'status-reserved';
      case 'Vendu': return 'status-sold';
      default: return '';
    }
  }

  openAddAnimalModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.newAnimal = { name: '', breed: '', age: '', gender: 'Femelle', status: 'Disponible' };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.newAnimal.name && this.newAnimal.breed) {
      const animalToAdd: Cattle = {
        ...this.newAnimal as Cattle,
        id: `BV-00${this.cattleList().length + 1}`,
        photoUrl: '/bovin1.png' // Image par défaut
      };

      this.cattleList.update(list => [animalToAdd, ...list]);
      this.closeModal();
    }
  }
}