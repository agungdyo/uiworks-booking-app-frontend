import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public appPages = [
    // { title: 'Home', url: '/admin/home', icon: 'calendar' },
    { title: 'Registration', url: '/admin/registration', icon: 'document-text' },
    // { title: 'Cart', url: '/admin/cart', icon: 'cart' },
    { title: 'Pembayaran', url: '/admin/payment', icon: 'cash' },
    { title: 'Settings', url: '/admin/settings',  icon: 'settings' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
