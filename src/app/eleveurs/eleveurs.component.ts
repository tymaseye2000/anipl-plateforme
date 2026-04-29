import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Breeder {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  region: string;
  countAnimals: number;
  status: 'Actif' | 'Inactif';
}

@Component({
  selector: 'app-eleveurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eleveurs.component.html',
  styleUrl: './eleveurs.component.scss'
})
export class EleveursComponent {
  isModalOpen = signal(false);
  searchTerm = signal('');

  // Liste initiale d'éleveurs
  breeders = signal<Breeder[]>([
    { id: 1, firstName: 'Moussa', lastName: 'Sarr', phone: '771234567', email: 'moussa@gmail.com', region: 'Dakar', countAnimals: 12, status: 'Actif' },
    { id: 2, firstName: 'Fatou', lastName: 'Diagne', phone: '789876543', email: 'fatou@farm.sn', region: 'Thiès', countAnimals: 5, status: 'Actif' },
    { id: 3, firstName: 'Oumar', lastName: 'Sow', phone: '705554433', email: 'oumar@elevage.sn', region: 'Saint-Louis', countAnimals: 0, status: 'Inactif' },
  ]);

  // Filtrage dynamique
  filteredBreeders = computed(() => {
    const term = (this.searchTerm() ?? '').toLowerCase();
    return this.breeders().filter(b => 
      (b.firstName ?? '').toLowerCase().includes(term) || 
      (b.lastName ?? '').toLowerCase().includes(term) ||
      (b.phone ?? '').includes(term)
    );
  });

  newBreeder: Partial<Breeder> = this.resetBreederForm();

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.newBreeder = this.resetBreederForm();
  }

  resetBreederForm(): Partial<Breeder> {
    return { firstName: '', lastName: '', phone: '', email: '', region: 'Dakar', status: 'Actif' as 'Actif', countAnimals: 0 };
  }

  deleteBreeder(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet éleveur ?')) {
      this.breeders.update(list => list.filter(b => b.id !== id));
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const breederToAdd = { ...this.newBreeder, id: Date.now() } as Breeder;
    this.breeders.update(list => [...list, breederToAdd]);
    this.closeModal();
  }
}