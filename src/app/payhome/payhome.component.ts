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
  type_pay:any
  payment_status:any
  pstatus:boolean=false
  // result:any
  e_bill:any


  //receipt
  r_cus_id:any
  r_cus_name:any
  r_bill_amount:any
  r_typ:any
  r_sub:any
  r_epay_balance:any
  r_amount_paid:any
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

    //receipt
    this.r_cus_id=this.customer_id
    this.r_cus_name=JSON.parse(localStorage.getItem("customer_name")||'')
    this.r_bill_amount=JSON.parse(localStorage.getItem("e-bill")||'')
    this.r_sub=this.getsubamount()
    this.r_epay_balance=JSON.parse(localStorage.getItem("e-pay-amount")||'')

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
      
      const result=this.ds.payamount(this.customer_id,cus_acno,cus_money,this.showpaydiv,this.type_pay)
     
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
  this.type_pay=1
 }
 payepay(){
  this.showpaydiv=false
  this.type_pay=10
 }
 getsubamount(){
  if(this.r_bill_amount>200&&this.r_bill_amount<=500){
    return (this.e_bill*15)/100
  }else if(this.r_bill_amount>500&&this.r_bill_amount<=800){
    return (this.e_bill*10)/100
  }else{
    return (this.e_bill*5)/100
  }
 }
}
