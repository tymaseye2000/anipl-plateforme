import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  isModalOpen = signal(false);
  isEditing = signal(false);

  users = signal([
    { name: 'Modou Ndiaye', email: 'modou@anipl.sn', role: 'Administrateur', status: 'Actif', dateAdded: new Date() },
    { name: 'Awa Diop', email: 'awa@ferme.sn', role: 'Éleveur', status: 'Actif', dateAdded: new Date() },
    { name: 'Ibrahima Fall', email: 'ibra@suivi.sn', role: 'Agent de Suivi', status: 'Inactif', dateAdded: new Date() },
  ]);

  newUser = {
    name: '',
    email: '',
    role: 'Éleveur'
  };

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isEditing.set(false);
    this.resetForm();
  }

  resetForm() {
    this.newUser = { name: '', email: '', role: 'Éleveur' };
  }

  editUser(user: any) {
    this.isEditing.set(true);
    this.newUser = { ...user };
    this.isModalOpen.set(true);
  }

  deleteUser(email: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.users.update(current => current.filter(u => u.email !== email));
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.newUser.name && this.newUser.email) {
      if (this.isEditing()) {
        this.users.update(current => {
          const index = current.findIndex(u => u.email === this.newUser.email);
          if (index !== -1) {
            current[index] = { ...current[index], ...this.newUser };
          }
          return [...current];
        });
      } else {
        const userToAdd = {
          ...this.newUser as any,
          status: 'Actif',
          dateAdded: new Date()
        };
        this.users.update(current => [...current, userToAdd]);
      }
      this.closeModal();
    }
  }
}