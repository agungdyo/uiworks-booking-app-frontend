import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MajaService } from '../services/maja.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private token: any;
  public payment_method: string = 'bni';
  public invoice_data: any;
  public registration: any;
  public invoice_result: any;

  constructor(
    private majaService: MajaService,
    private registrationService: RegistrationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registration = JSON.parse(sessionStorage.getItem('registration'))
    // if (!this.registration){
    //   this.registration = {
    //     schedule_id: '',
    //     date_string: '',
    //     name: '',
    //     email: '',
    //     phone: '',
    //     pelatih: false,
    //     invoice_id: '',
    //     registration_fee: 0,
    //     admin_fee: 0,
    //     trainer_fee: 0,
    //     total_fee: 0,
    //     status: false
    //   };
    // }
    this.invoice_data = JSON.parse(sessionStorage.getItem('invoice'))
  }

  onGetToken(){
    this.invoice_data.payMethod = this.payment_method;
    this.majaService.getToken().subscribe({
      next: (res)=> {
        this.token = res.access_token;
      },
      complete: (() => {
        this.onCreateInvoice()
      })
    })
  }

  onCreateInvoice(){
    this.majaService.createInvoice(this.invoice_data, this.token).subscribe({
      next: (res) => {
        this.invoice_result = res.data;
        if (this.invoice_result) {
          this.registration.invoice_number = this.invoice_result.number;
          this.registration.status = false;
          this.registration.date = new Date(this.registration.date_string);
          sessionStorage.setItem('invoice_result', JSON.stringify(this.invoice_result));
          this.registrationService.createReservation(this.registration, '').subscribe({
            complete: (() => {
              this.onClearCart()
            })
          })
        }
      },
      complete: (() => {
        
      }),
      error: ((e) => console.log(e.error))
    })
  }

  onClearCart(){
    sessionStorage.removeItem('registration')
    this.registration = {
      schedule_id: '',
      date_string: '',
      name: '',
      email: '',
      phone: '',
      pelatih: false,
      invoice_id: '',
      registration_fee: 0,
      admin_fee: 0,
      trainer_fee: 0,
      total_fee: 0,
      status: false
    };
    this.router.navigate(['/user/home'])
  }

}
