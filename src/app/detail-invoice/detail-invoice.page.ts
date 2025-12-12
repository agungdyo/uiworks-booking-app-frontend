import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.page.html',
  styleUrls: ['./detail-invoice.page.scss'],
})
export class DetailInvoicePage implements OnInit {

  public appPages = [
    { title: 'Home', url: '/user/home', icon: 'calendar' },
    { title: 'Registration', url: '/user/registration', icon: 'document-text' },
    { title: 'Detail Invoice', url: '/user/detail-invoice', icon: 'calender' },
    { title: 'Cart', url: '/user/cart', icon: 'cart' },

  ];

  constructor() { }

  ngOnInit() {
  }

}
