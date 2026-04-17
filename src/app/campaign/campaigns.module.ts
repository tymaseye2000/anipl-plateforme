import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './campaigns.component';
import { CampaignDetailComponent } from './campaign-detail.component';

const routes: Routes = [
  { path: '', component: CampaignsComponent },
  { path: ':slug', component: CampaignDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CampaignsComponent,
    CampaignDetailComponent
  ]
})
export class CampaignsModule { }