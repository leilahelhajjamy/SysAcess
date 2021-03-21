import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabscomponentPage } from './tabscomponent.page';

const routes: Routes = [
  {
    path: '',
    component: TabscomponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabscomponentPageRoutingModule {}
