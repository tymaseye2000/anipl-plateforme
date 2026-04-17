import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    farmName: '',
    region: 'Dakar',
    password: ''
  };

  constructor(private router: Router) {}

  onSignup() {
    console.log('Nouvel utilisateur ANIPL :', this.user);
    // Simuler une inscription réussie
    alert('Compte créé avec succès ! Bienvenue à l\'ANIPL.');
    this.router.navigate(['/dashboard']);
  }
}