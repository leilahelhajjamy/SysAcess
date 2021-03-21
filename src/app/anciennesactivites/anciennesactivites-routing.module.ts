import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnciennesactivitesPage } from './anciennesactivites.page';

const routes: Routes = [
  {
    path: '',
    component: AnciennesactivitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnciennesactivitesPageRoutingModule {}
