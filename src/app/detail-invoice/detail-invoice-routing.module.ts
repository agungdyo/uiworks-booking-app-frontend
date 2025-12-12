import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailInvoicePage } from './detail-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: DetailInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailInvoicePageRoutingModule {}
