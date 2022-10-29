import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public data = [
    {
      id: 1,
      name: 'Putra Abbas',
      schedule: '2022-10-31',
      pelatih: true
    },
    {
      id: 2,
      name: 'Syahnan Poerba',
      schedule: '2022-10-31',
      pelatih: false
    },
    {
      id: 3,
      name: 'Tyo',
      schedule: '2022-10-28',
      pelatih: false
    }
  ]
  public registration_list: any;
  public selected_date: Date = new Date(Date.now());

  constructor() { }

  ngOnInit() {
    this.registration_list = this.data.filter(item => item.schedule === new Date(Date.now()).toLocaleString('en-CA').slice(0,10));
  }

  onSelectDate(payload: any){
    this.selected_date = payload.detail.value
    this.registration_list = this.data.filter(item => item.schedule === this.selected_date.toLocaleString('en-CA').slice(0,10));
  }

}
