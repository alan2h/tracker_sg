import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule) },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule), canActivate: [AuthGuard] },  {
    path: 'detail-sale',
    loadChildren: () => import('./detail-sale/detail-sale.module').then( m => m.DetailSalePageModule)
  },
  {
    path: 'accounting',
    loadChildren: () => import('./accounting/accounting.module').then( m => m.AccountingPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
