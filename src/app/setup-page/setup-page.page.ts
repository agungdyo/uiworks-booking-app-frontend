import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.page.html',
  styleUrls: ['./setup-page.page.scss'],
})
export class SetupPagePage implements OnInit {

  public multiple: boolean = false;

  public payload = {
    id: undefined,
    date: new Date(Date.now()).toLocaleString('en-CA').slice(0,10),
    start_date: '',
    end_date: '',
    capacity: 0,
    trainer_fee: 0,
    updated_by: 'admin'
  }

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onToggle(payload: boolean){
    this.multiple = payload
  }

  onCreateSchedule(){
    if (this.multiple === false) {
      if (this.payload.id) {
        this.onUpdateSchedule()
      } else {
        this.registrationService.createSchedule(this.payload, '').subscribe({
          next: (res) => {
            
          },
          complete: (() => {
            this.payload = {
              id: undefined,
              date: new Date(Date.now()).toLocaleString('en-CA').slice(0,10),
              start_date: '',
              end_date: '',
              capacity: 0,
              trainer_fee: 0,
              updated_by: 'admin'
            };
            this.router.navigate(['/admin/home'])
          })
        })
      }
    }
    if (this.multiple === true) {
      this.registrationService.bulkCreateSchedule(this.payload, '').subscribe({
        next: (res) => {

        },
        complete: (() => {
          this.payload = {
            id: undefined,
            date: new Date(Date.now()).toLocaleString('en-CA').slice(0,10),
            start_date: '',
            end_date: '',
            capacity: 0,
            trainer_fee: 0,
            updated_by: 'admin'
          };
          this.multiple = false;
          this.router.navigate(['/admin/home'])
        })
      })
    }
  }

  onSelectDate(){
    if (this.multiple === false){
      let date_string = new Date(this.payload.date).toLocaleString('en-CA').slice(0,10);
      this.registrationService.getSchedule({
        date_string: date_string
      }, '').subscribe({
        next: (res) => {
          let result = res.data[0];
          if (result) {
            this.payload.id = result.id;
            this.payload.capacity = result.capacity;
            this.payload.trainer_fee = result.trainer_fee;
          }
        }
      })
    }
  }

  onUpdateSchedule(){
    if (this.multiple === false){
      let schedule = {
        id: this.payload.id,
        date: this.payload.date,
        date_string: new Date(this.payload.date).toLocaleString('en-CA').slice(0,10),
        capacity: this.payload.capacity,
        trainer_fee: this.payload.trainer_fee,
        status: true,
        updated_at: new Date(Date.now()),
        updated_by: 'admin',
      }
      this.registrationService.updateSchedule(this.payload.id, schedule, '').subscribe({
        next: (res) => {
          console.log(res.data)
        }
      })
    }
  }

}
