import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticMoiModalPage } from './statistic-moi-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticMoiModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticMoiModalPageRoutingModule {}
