import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfiluserPage } from './profiluser.page';

const routes: Routes = [
  {
    path: '',
    component: ProfiluserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiluserPageRoutingModule {}
