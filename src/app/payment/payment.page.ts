import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public start_date: string = new Date(Date.now()).toLocaleString('en-CA').slice(0,10),;
  public end_date: string = new Date(Date.now()).toLocaleString('en-CA').slice(0,10),;
  public payments: any[] = [];

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.onLoad()
  }

  onLoad(){
    this.registrationService.getReservation({
      startDate: new Date(this.start_date).toLocaleString('en-CA').slice(0,10),
      endDate: new Date(this.end_date).toLocaleString('en-CA').slice(0,10),
      paid: true
    },'').subscribe({
      next: (res) => {
        this.payments = res.data
      },
      complete:(() => {})
    })
  }

}
