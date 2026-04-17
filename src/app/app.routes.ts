import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashbord/dashboard.component';
import { FarmsComponent } from './fermes/farms.component';
import { UsersComponent } from './users/users.component';
import { CampaignsComponent } from './campaign/campaigns.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // Routes pour les campagnes
  { path: 'campagnes', component: CampaignsComponent }, 
  { path: 'campagnes/:id', component: HomeComponent }, // À remplacer par votre composant de détail
  { path: 'campagnes/:id/participate', component: HomeComponent }, // À remplacer par votre composant de participation
  { path: 'campaigns', redirectTo: 'campagnes' }, // Redirection pour gérer l'anglais
  { path: 'campaigns/:id', redirectTo: 'campagnes/:id' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'farms', component: FarmsComponent },

  // Redirection par défaut pour les liens cassés
  { path: '**', redirectTo: 'home' }
];