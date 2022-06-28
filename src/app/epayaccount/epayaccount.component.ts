import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-epayaccount',
  templateUrl: './epayaccount.component.html',
  styleUrls: ['./epayaccount.component.css']
})
export class EpayaccountComponent implements OnInit {
  cus_id:any
  ac_amount:any
  sub_code:any
  e_bill:any
  sub_amount:any
  accountForm=this.fb.group({
    cus_id:[''],
    cus_code:['',[Validators.required,Validators.pattern('[0-9A-Za-z ]*')]]
   })
  constructor(private ds:DataService,private fb:FormBuilder) { 
    this.cus_id=ds.customer_id
    this.ac_amount=ds.e_pay_amount
    this.sub_code=ds.cus_code
    this.e_bill=ds.e_bill
    // alert(ds.e_bill)
  }
  
  ngOnInit(): void {
  }
  submitcode(){
    if(this.accountForm.valid){
      if(this.e_bill>200&&this.e_bill<=500){
        this.sub_amount=(this.e_bill*15)/100
      }else if(this.e_bill>500&&this.e_bill<=800){
        this.sub_amount=(this.e_bill*10)/100
      }else{
        this.sub_amount=(this.e_bill*5)/100
      }
    }else{ 
      alert("Invalid subsidy code")
    }
  }

}
 