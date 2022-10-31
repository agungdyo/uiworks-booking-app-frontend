import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public start_date: Date | undefined;
  public end_date: Date | undefined;
  public payments: any[] = [];

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.onLoad()
  }

  onLoad(){
    this.registrationService.getReservation({
      startDate: this.start_date,
      endDate: this.end_date,
      paid: true
    },'').subscribe({
      next: (res) => {
        this.payments = res.data
      },
      complete:(() => {})
    })
  }

}
