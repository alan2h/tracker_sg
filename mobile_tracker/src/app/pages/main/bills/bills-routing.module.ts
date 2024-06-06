import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsPage } from './bills.page';

const routes: Routes = [
  {
    path: '',
    component: BillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsPageRoutingModule {}
