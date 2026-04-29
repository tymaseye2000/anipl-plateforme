import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  userProfile = signal({
    name: 'Modou Ndiaye',
    email: 'm.ndiaye@anipl.sn',
    phone: '+221 77 000 00 00',
    role: 'Administrateur'
  });

  notifications = signal({
    emailAlerts: true,
    orderUpdates: true,
    newCampaigns: false
  });

  onUpdateProfile(event: Event) {
    event.preventDefault();
    // Ici, vous pourriez appeler un service pour sauvegarder en base de données
    alert('Profil mis à jour avec succès !');
  }

  onChangePassword(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newPass = (form.elements.namedItem('newPass') as HTMLInputElement).value;
    const confirmPass = (form.elements.namedItem('confirmPass') as HTMLInputElement).value;

    if (newPass !== confirmPass) return alert('Les mots de passe ne correspondent pas');
    alert('Mot de passe modifié !');
    form.reset();
  }
}