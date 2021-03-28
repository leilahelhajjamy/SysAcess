import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticMoiModalPageRoutingModule } from './statistic-moi-modal-routing.module';

import { StatisticMoiModalPage } from './statistic-moi-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticMoiModalPageRoutingModule
  ],
  declarations: [StatisticMoiModalPage]
})
export class StatisticMoiModalPageModule {}
