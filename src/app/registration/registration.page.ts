import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public registration = {
    schedule: new Date(),
    name: '',
    email: '',
    phone: '',
    pelatih: false,
    registration_fee: 0,
    admin_fee: 0,
    trainer_fee: 0,
    total_fee: 0,
  }

  public invoice_data = {
    name: '',
    email: '',
    phone: '',
    attribute1: '',
    attribute2: this.registration.pelatih ? "Dengan pelatih" : "",
    amount: 0,
    activeDate: '',
    date: '',
    items: [],
    payMethod: '',
    attributes: []
  }

  private trainer_fee = 250000;
  private admin_fee = 3500;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSelectDate(payload: any){
    this.registration.schedule = payload.detail.value.toLocaleString('en-CA').slice(0,10)
  }

  onEnterEmail(){
    sessionStorage.setItem('email', this.registration.email)
  }

  onSelectRegistrationFee(){
    this.registration.total_fee = this.registration.registration_fee + this.trainer_fee;
  }

  onSelectInstructor(e: any){
    if (e.detail.checked) {
      this.registration.trainer_fee = this.trainer_fee;
      this.registration.total_fee = this.registration.registration_fee + this.trainer_fee;
    }
    if (!e.detail.checked) {
      this.registration.trainer_fee = 0;
      this.registration.total_fee = this.registration.total_fee - this.trainer_fee;
    }
  }

  onAddtoCart(){
    if (this.registration.registration_fee >= 100000) {
      this.registration.total_fee = this.registration.total_fee + this.admin_fee;
      this.registration.admin_fee = this.admin_fee;
      if (this.registration.trainer_fee > 0) {
        this.invoice_data = {
          name: this.registration.name,
          email: this.registration.email,
          phone: this.registration.phone,
          attribute1: this.registration.schedule.toLocaleString('en-CA').slice(0, 10),
          attribute2: this.registration.pelatih ? "Dengan pelatih" : "",
          amount: this.registration.total_fee,
          activeDate: new Date(Date.now()).toLocaleString('en-CA').slice(0, 10),
          date: new Date(Date.now()).toLocaleString('en-CA').slice(0, 10),
          items: [
            {
              "description": 'Biaya Pendaftaran',
              "unitPrice": this.registration.registration_fee,
              "qty": 1,
              "amount": this.registration.registration_fee
            },
            {
              "description": 'Biaya Pelatih',
              "unitPrice": this.registration.trainer_fee,
              "qty": 1,
              "amount": this.registration.trainer_fee
            },
            {
              "description": 'Biaya Administrasi',
              "unitPrice": this.admin_fee,
              "qty": 1,
              "amount": this.admin_fee
            },
          ],
          payMethod: '',
          attributes: []
        }
      } else {
        this.invoice_data = {
          name: this.registration.name,
          email: this.registration.email,
          phone: this.registration.phone,
          attribute1: this.registration.schedule.toLocaleString('en-CA').slice(0, 10),
          attribute2: this.registration.pelatih ? "Dengan pelatih" : "",
          amount: this.registration.total_fee,
          activeDate: new Date(Date.now()).toLocaleString('en-CA').slice(0, 10),
          date: new Date(Date.now()).toLocaleString('en-CA').slice(0, 10),
          items: [
            {
              "description": 'Biaya Pendaftaran',
              "unitPrice": this.registration.registration_fee,
              "qty": 1,
              "amount": this.registration.registration_fee
            },
            {
              "description": 'Biaya Administrasi',
              "unitPrice": this.admin_fee,
              "qty": 1,
              "amount": this.admin_fee
            },
          ],
          payMethod: '',
          attributes: []
        }
      }
      sessionStorage.setItem('invoice', JSON.stringify(this.invoice_data))
      sessionStorage.setItem('registration', JSON.stringify(this.registration))
      this.onClear();
      this.router.navigate(['/cart']);
    } else {
      alert('Harap masukkan nilai pendaftaran paling rendah Rp100.000,00')
    }
    
  }

  onClear() {
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
    }
  }

}
