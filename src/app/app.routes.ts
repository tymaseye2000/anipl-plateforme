import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashbord/dashboard.component';
import { FarmsComponent } from './fermes/farms.component';
import { UsersComponent } from './users/users.component';
import { CampaignsComponent } from './campaign/campaigns.component';
import { LoginComponent } from './login/login.component';
import { CampaignDetailComponent } from './campaign/campaign-detail.component';
import { SignupComponent } from './signup/signup.component';
import { EleveursComponent } from './eleveurs/eleveurs.component';
import { AnimauxComponent } from './animaux/animaux.component';
import { GestionCampagnesComponent } from './gestion_campagnes/gestion-campagnes.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ProductionLaitiereComponent } from './production_laitiere/production-laitiere.component';
import { SanteAnimaleComponent } from './sante_animale/sante-animale.component';
import { PaiementsComponent } from './paiements/paiements.component';
import { SettingsComponent } from './settings/settings.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // Routes pour les campagnes
  { path: 'campagnes', component: CampaignsComponent }, 
  { path: 'campagnes/:id', component: CampaignDetailComponent }, 
  { path: 'campagnes/:id/commander', component: CampaignsComponent, data: { view: 'membership' } },
  { path: 'campagnes/:id/participate', redirectTo: 'campagnes/:id/commander' },
  { path: 'campaigns', redirectTo: 'campagnes' }, // Redirection pour gérer l'anglais
  { path: 'campaigns/:id', redirectTo: 'campagnes/:id' },

  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'farms', component: FarmsComponent },
      { path: 'eleveurs', component: EleveursComponent },
      { path: 'animaux', component: AnimauxComponent },
      { path: 'campagnes', component: GestionCampagnesComponent },
      { path: 'orders', component: CommandesComponent },
      { path: 'production-laitiere', component: ProductionLaitiereComponent },
      { path: 'sante-animale', component: SanteAnimaleComponent },
      { path: 'paiements', component: PaiementsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },

  // Redirection par défaut pour les liens cassés
  { path: '**', redirectTo: 'home' }
];