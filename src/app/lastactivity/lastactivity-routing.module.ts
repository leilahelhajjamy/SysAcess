import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';

import { LastactivityPage } from './lastactivity.page';

const routes: Routes = [
  {
    path: '',
    component: LastactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastactivityPageRoutingModule {}
