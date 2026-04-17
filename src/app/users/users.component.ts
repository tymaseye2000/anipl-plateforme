import { Component } from '@angular/core';
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
  isModalOpen = false;

  users = [
    { name: 'Modou Ndiaye', email: 'modou@anipl.sn', role: 'Administrateur', status: 'Actif', dateAdded: new Date() },
    { name: 'Awa Diop', email: 'awa@ferme.sn', role: 'Éleveur', status: 'Actif', dateAdded: new Date() },
    { name: 'Ibrahima Fall', email: 'ibra@suivi.sn', role: 'Agent de Suivi', status: 'Inactif', dateAdded: new Date() },
  ];

  newUser = {
    name: '',
    email: '',
    role: 'Éleveur'
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newUser = { name: '', email: '', role: 'Éleveur' };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.newUser.name && this.newUser.email) {
      this.users.push({
        ...this.newUser,
        status: 'Actif',
        dateAdded: new Date()
      });
      this.closeModal();
    }
  }
}