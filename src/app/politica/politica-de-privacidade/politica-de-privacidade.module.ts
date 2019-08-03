import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PoliticaDePrivacidadePage } from './politica-de-privacidade.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticaDePrivacidadePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PoliticaDePrivacidadePage]
})
export class PoliticaDePrivacidadePageModule {}
