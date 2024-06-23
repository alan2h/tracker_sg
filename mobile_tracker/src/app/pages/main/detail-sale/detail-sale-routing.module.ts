import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailSalePage } from './detail-sale.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailSalePageRoutingModule {}
