import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-payhome',
  templateUrl: './payhome.component.html',
  styleUrls: ['./payhome.component.css']
})
export class PayhomeComponent implements OnInit {
  customer_id:any
  showpaydiv:boolean=true
  cus_id:any
  result:any
  e_bill:any
  paymentForm=this.fb.group({
    cus_id:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    cus_acno:['',[Validators.pattern('[0-9 ]*')]],
    cus_money:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
  })
  constructor(private ds:DataService,private fb:FormBuilder) { 
    this.customer_id=ds.customer_id
    this.cus_id=this.customer_id
    this.e_bill=ds.e_bill
    // alert(this.customer_id)
  }

  ngOnInit(): void {
  }
 paymoney(){
    // var cus_id=this.paymentForm.value
    var cus_acno=this.paymentForm.value.cus_acno
    var cus_money=this.paymentForm.value.cus_money
    // console.log(cus_id);
    if(this.paymentForm.valid){
      if(this.showpaydiv){
        if(cus_money==this.e_bill)
        this.result=this.ds.payamount(this.customer_id,cus_acno,cus_money)
        else
        alert("Your e-pay bill amount is "+this.e_bill)
    }
      // else{
      //   this.result=this.ds.payamount(this.customer_id,"",cus_money)
      // }
      if(this.result){
          alert("Payment successfull")
      }
    }
    else{
      alert("Invalid form")
    }
 }
 paybank(){
  this.showpaydiv=true
 }
 payepay(){
  this.showpaydiv=false
 }
}
