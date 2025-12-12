import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailInvoicePageRoutingModule } from './detail-invoice-routing.module';

import { DetailInvoicePage } from './detail-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailInvoicePageRoutingModule
  ],
  declarations: [DetailInvoicePage]
})
export class DetailInvoicePageModule {}
