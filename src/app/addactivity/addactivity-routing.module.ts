import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddactivityPage } from './addactivity.page';

const routes: Routes = [
  {
    path: '',
    component: AddactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddactivityPageRoutingModule {}
