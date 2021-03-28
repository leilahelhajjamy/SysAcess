import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticAnneeModalPage } from './statistic-annee-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticAnneeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticAnneeModalPageRoutingModule {}
