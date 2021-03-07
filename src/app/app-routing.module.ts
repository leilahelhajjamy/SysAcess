import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lastactivity',
    loadChildren: () => import('./lastactivity/lastactivity.module').then( m => m.LastactivityPageModule)
  },
  {
    path: 'adduser',
    loadChildren: () => import('./adduser/adduser.module').then( m => m.AdduserPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'profiluser',
    loadChildren: () => import('./profiluser/profiluser.module').then( m => m.ProfiluserPageModule)
  },
  {
  path: 'profiluser/:carteId',
  loadChildren: () => import('./profiluser/profiluser.module').then(m => m.ProfiluserPageModule),
  },  {
    path: 'addactivity',
    loadChildren: () => import('./addactivity/addactivity.module').then( m => m.AddactivityPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
