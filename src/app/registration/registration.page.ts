import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public registration = {
    schedule_id: undefined,
    date: '',
    date_string: new Date(Date.now()).toLocaleString('en-CA').slice(0,10),
    name: '',
    email: '',
    phone: '',
    pelatih: false,
    invoice_number: '',
    registration_fee: 0,
    admin_fee: 3500,
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

  private trainer_fee = 0;
  private admin_fee = 3500;

  public capacity: number = 0;

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad(){
    this.registrationService.getSchedule({
      date_string: this.registration.date_string,
      status: true
    },'').subscribe({
      next: (res) => {
        let result = res.data[0];
        if (result){
          this.registration.schedule_id = result.id
          this.trainer_fee = result.trainer_fee;
          this.capacity = result.capacity;
        }
      },
      complete: (() => {
        this.registrationService.getReservation({
          date_string: this.registration.date_string,
          status: true
        },'').subscribe({
          next: (res) => {
            let result = res.data;
            if (result) {
              this.capacity = this.capacity - result.length;
            }
          },
          complete: (() => {
            this.registrationService.getCart({
              date_string: this.registration.date_string,
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
  }

  onSelectDate(payload: any){
    this.capacity = 0;
    this.registration.date_string = payload.detail.value.toLocaleString('en-CA').slice(0,10);
    this.onLoad();
  }

  onEnterEmail(){
    sessionStorage.setItem('email', this.registration.email)
  }

  onSelectRegistrationFee(){
    this.registration.total_fee = this.registration.registration_fee + this.registration.admin_fee;
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
    if (this.registration.registration_fee >= 10000) {
      this.registration.admin_fee = this.admin_fee;
      if (this.registration.trainer_fee > 0) {
        this.invoice_data = {
          name: this.registration.name,
          email: this.registration.email,
          phone: this.registration.phone,
          attribute1: this.registration.date_string,
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
          attribute1: this.registration.date_string,
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
      this.registrationService.createCart(this.registration, '').subscribe({
        next: (res) => {
          this.onClear();
          this.router.navigate(['/user/cart']);
        }
      })
      
    } else {
      alert('Harap masukkan nilai pendaftaran paling rendah Rp10.000,00')
    }
    
  }

  onClear() {
    this.registration = {
      schedule_id: undefined,
      date: '',
      date_string: new Date(Date.now()).toLocaleString('en-CA').slice(0,10),
      name: '',
      email: '',
      phone: '',
      pelatih: false,
      invoice_number: '',
      registration_fee: 0,
      admin_fee: 3500,
      trainer_fee: 0,
      total_fee: 0,
    }
  }

}
