import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { jsPDF } from "jspdf"
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  amount: any;
  date: any;


  constructor(private cartService: CartService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.amount = this.cartService.getTotalPrice();


  }

  @ViewChild('content', { static: false }) el!: ElementRef

  title = 'Angular CLI 14 & jsPDF';

  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("receipt.pdf")
      }
    })

  }
  // exportPdf() {
  //       import("jspdf").then(jsPDF => {
  //           import("jspdf-autotable").then(x => {
  //               const doc = new jsPDF.default(0,0);
  //               doc.autoTable('', this.orderList);
  //               doc.save('products.pdf');
  //           })
  //       })
  //   }



}
