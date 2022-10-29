import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'calendar' },
    { title: 'Registration', url: '/registration', icon: 'document-text' },
    { title: 'Cart', url: '/cart', icon: 'cart' },
  ];

  constructor() {}
}
