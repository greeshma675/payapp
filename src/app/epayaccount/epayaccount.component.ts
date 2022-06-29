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
  sub_amount:any
  sub_code:any
  e_bill:any
  code_status:any
  accountForm=this.fb.group({
    cus_id:[''],
    cus_code:['']
   })
  constructor(private ds:DataService,private fb:FormBuilder) { 
    this.cus_id=ds.customer_id
    this.ac_amount=ds.e_pay_amount
    this.sub_code=ds.cus_code
    this.e_bill=ds.e_bill
    this.code_status=ds.code_status
  }
  
  ngOnInit(): void {
  }
  submitcode(){
    if(this.accountForm.valid){
      const result=this.ds.submitcode(this.cus_id,this.sub_code,this.e_bill)    
  }else{
    alert("Invalid form")
  }
}

}
 