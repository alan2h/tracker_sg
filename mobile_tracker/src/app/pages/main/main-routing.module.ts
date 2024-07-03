import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'bills',
        loadChildren: () => import('./bills/bills-form/bills.module').then(m => m.BillsPageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesPageModule)
      }, 
      {
        path: 'confirm',
        loadChildren: () => import('./confirm/confirm.module').then(m => m.ConfirmPageModule)
      },
      {
        path: 'detail_sale',
        loadChildren: () => import('./detail-sale/detail-sale.module').then(m => m.DetailSalePageModule)
      },
      {
        path: 'accounting',
        loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingPageModule)
      },
      {
        path: 'mybills',
        loadChildren: () => import('./bills/bills-view/bills-view.module').then( m => m.BillsViewPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
