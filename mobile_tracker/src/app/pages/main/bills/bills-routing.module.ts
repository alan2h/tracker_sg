import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsPage } from './bills.page';

const routes: Routes = [
  {
    path: '',
    component: BillsPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BillsPageRoutingModule { }
