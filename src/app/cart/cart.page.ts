import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MajaService } from '../services/maja.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private token: any;
  public payment_method: string = 'bni';
  private invoice_data: any;
  public registration: any;
  public invoice_result: any;

  constructor(
    private majaService: MajaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registration = JSON.parse(sessionStorage.getItem('registration'))
    if (!this.registration){
      this.registration = {
        schedule: new Date(),
        name: '',
        email: '',
        phone: '',
        pelatih: false,
        registration_fee: 0,
        admin_fee: 0,
        trainer_fee: 0,
        total_fee: 0,
      };
    }
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
        this.invoice_result = res;
        sessionStorage.setItem('invoice_result', JSON.stringify(this.invoice_result))
      },
      complete: (() => {
        this.onClearCart()
      }),
      error: ((e) => console.log(e.error))
    })
  }

  onClearCart(){
    sessionStorage.clear()
    this.registration = {
      schedule: new Date(),
      name: '',
      email: '',
      phone: '',
      pelatih: false,
      registration_fee: 0,
      admin_fee: 0,
      trainer_fee: 0,
      total_fee: 0,
    };
    this.router.navigate(['/home'])
  }

}
