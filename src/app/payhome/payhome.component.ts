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
  payment_status:any
  pstatus:boolean=false
  // result:any
  e_bill:any
  // e_pay_amount:any
  paymentForm=this.fb.group({
    cus_id:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    cus_acno:['',[Validators.pattern('[0-9 ]*')]],
    cus_money:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
  })
  constructor(private ds:DataService,private fb:FormBuilder) { 
    this.customer_id=ds.customer_id
    this.cus_id=this.customer_id
    this.payment_status=ds.payment_status
    this.e_bill=ds.e_bill
    // this.e_pay_amount=ds.e_pay_amount
    // alert(this.customer_id)
    if(this.payment_status==0)
      this.pstatus=true
      else
      this.pstatus=false
    
  }

  ngOnInit(): void {
  }
 paymoney(){
    // var cus_id=this.paymentForm.value
    var cus_acno=this.paymentForm.value.cus_acno
    var cus_money=this.paymentForm.value.cus_money
    // console.log(cus_id);
    if(this.paymentForm.valid){
    //   if(this.showpaydiv){
    //     if(cus_money==this.e_bill)
    //     this.result=this.ds.payamount(this.customer_id,cus_acno,cus_money)
    //     else
    //     alert("Your e-pay bill amount is "+this.e_bill)
    // }else{
    //   if(cus_money==this.e_bill)
    //   {
    //   if(cus_money<=this.e_pay_amount){
    //     this.result=this.ds.payamount(this.customer_id,cus_acno,"")
    //   }else{
    //     alert("Your e-pay-account has only "+this.e_pay_amount+" Rs.")
    //   }}
    //   else{
    //     alert("Your e-pay bill amount is "+this.e_bill)
    //   }
      
      const result=this.ds.payamount(this.customer_id,cus_acno,cus_money,this.showpaydiv)
     
      if(result){
          alert("Payment successfull")
          window.location.reload()
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
