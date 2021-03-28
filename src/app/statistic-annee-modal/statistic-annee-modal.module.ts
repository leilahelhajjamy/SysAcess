import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticAnneeModalPageRoutingModule } from './statistic-annee-modal-routing.module';

import { StatisticAnneeModalPage } from './statistic-annee-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticAnneeModalPageRoutingModule
  ],
  declarations: [StatisticAnneeModalPage]
})
export class StatisticAnneeModalPageModule {}
