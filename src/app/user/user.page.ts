import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public appPages = [
    { title: 'Home', url: '/user/home', icon: 'calendar' },
    { title: 'Registration', url: '/user/registration', icon: 'document-text' },
    { title: 'Cart', url: '/user/cart', icon: 'cart' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
