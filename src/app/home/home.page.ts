import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public registration_list: any[] = [];
  public selected_date: Date = new Date(Date.now());
  public capacity: number = 0;

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.registrationService.getReservation({
      date_string: this.selected_date.toLocaleString('en-CA').slice(0,10)
    },'').subscribe({
      next: (res) => {
        this.registration_list = res.data
      }
    })
  }

  onSelectDate(payload: any){
    this.selected_date = payload.detail.value
    this.registrationService.getReservation({
      date_string: this.selected_date.toLocaleString('en-CA').slice(0,10)
    },'').subscribe({
      next: (res) => {
        this.registration_list = res.data
      },
      complete:(() => {
        this.registrationService.getSchedule({
          date_string: this.selected_date.toLocaleString('en-CA').slice(0,10)
        }, '').subscribe({
          next: (res) => {
            let result = res.data[0];
            if (result) {
              this.capacity = result.capacity
            } else {
              this.capacity = 0
            }
          },
          complete: (() => {
            this.registrationService.getReservation({
              date_string: this.selected_date.toLocaleString('en-CA').slice(0,10)
            },'').subscribe({
              next: (res) => {
                let result = res.data;
                if (result) {
                  this.capacity = this.capacity - result.length;
                }
              },
              complete: (() => {
                this.registrationService.getCart({
                  date_string: this.selected_date.toLocaleString('en-CA').slice(0,10),
                  status: true
                }, '').subscribe({
                  next: (res) => {
                    let result = res.data;
                    if (result) {
                      this.capacity = this.capacity - result.length;
                    }
                  },
                  complete: (() => {})
                })
              })
            })
            
          })
      })
    })
    
    })
  }

}
