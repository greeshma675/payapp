import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customer_id:any
  e_bill:any
  e_pay_amount:any
  payment_status:any
  cus_code:any
  db:any={
    1000:{"cus_id":1000,"cus_name":"Adam","cus_address":"abc","cus_phone":123,"cus_password":1000,"e-bill":500,"e-pay-amount":500,"status":0,"payment_status":0,"sub_code":""},
    1001:{"cus_id":1000,"cus_name":"Adam","cus_address":"bbc","cus_phone":223,"cus_password":1001,"e-bill":500,"e-pay-amount":100,"status":0,"payment_status":0,"sub_code":""}
  }
    
  constructor() {
    // localStorage.clear()
    this.getDetails()
   }
  login(cus_id:any,cus_password:any){
    let db=this.db
    // alert(cus_id+""+cus_password);
    
    if(cus_id in db){
      if(cus_password == db[cus_id]["cus_password"]){    
        this.customer_id=cus_id
        this.e_bill=db[cus_id]["e-bill"]
        this.e_pay_amount=db[cus_id]["e-pay-amount"]
        this.payment_status=db[cus_id]["payment_status"]
        this.saveDetails()    
        return true
      }else{
        alert("Invalid password")
        return false
      }
    }else{
      alert("Invalid customer Id")
      return false
    }
  }
  register(cus_name:any,cus_address:any,cus_phone:any,cus_id:any,cus_password:any,e_bill:any,e_payamount:any,status:any,payment_status:any,cus_code:any){
    let db=this.db
    if(cus_id in db){
      alert("User already existing")
      return false
    }else{
      db[cus_id]={cus_id,cus_name,cus_address,cus_phone,cus_password,e_bill,e_payamount,status,payment_status,cus_code}
      // this.customer_id=cus_id
      this.saveDetails()
      return true
    }
  }
  payamount(cus_id:any,cus_acno:any,cus_money:any,showpaydiv:any){
    let db=this.db
    // if(db[cus_id]["status"]==0){
    //   alert("yes")
    // return true
    // }
    // else{
    //   return true
    // }
    if(this.e_bill>200&&this.e_bill<=500){
      db[cus_id]["sub_code"]="sub15"
      this.cus_code=db[cus_id]["sub_code"]
      this.saveDetails()
    }else if(this.e_bill>500&&this.e_bill<=800){
      db[cus_id]["sub_code"]="sub10"
      this.cus_code=db[cus_id]["sub_code"]
      this.saveDetails()
    }else{
      db[cus_id]["sub_code"]="sub5"
      this.cus_code=db[cus_id]["sub_code"]
      this.saveDetails()
    }

    if(showpaydiv){
      if(cus_money==this.e_bill)
      {
        if(db[cus_id]["status"]==0){
          db[cus_id]["e-pay-amount"]+=50
          this.e_pay_amount=db[cus_id]["e-pay-amount"]
          db[cus_id]["e-bill"]=0
          this.e_bill=db[cus_id]["e-bill"]
          db[cus_id]["status"]=1
          db[cus_id]["payment_status"]=1
          this.payment_status=db[cus_id]["payment_status"]
          this.saveDetails()
          // this.saveDetails()
          alert("Your e-pay account credited with 50Rs. on your first payment")
        }else{
          db[cus_id]["e-bill"]=0
          this.e_bill=db[cus_id]["e-bill"]
          db[cus_id]["payment_status"]=1
          this.payment_status=db[cus_id]["payment_status"]
        this.saveDetails()
        }
        
        return true
      }
      else
      alert("Your e-pay bill amount is "+this.e_bill)
      return false
  }else{
    if(cus_money==this.e_bill)
    {
      if(cus_money<=this.e_pay_amount){
        if(db[cus_id]["status"]==0){
          db[cus_id]["e-pay-amount"]+=50
          this.e_pay_amount=db[cus_id]["e-pay-amount"]-this.e_bill
          db[cus_id]["e-bill"]=0
          this.e_bill=db[cus_id]["e-bill"]
          db[cus_id]["status"]=1
          db[cus_id]["payment_status"]=1
          this.payment_status=db[cus_id]["payment_status"]
          this.saveDetails()
          // this.saveDetails()
          alert("Your e-pay account credited with 50Rs. on your first payment")
        }else{
          db[cus_id]["e-bill"]=0
          this.e_bill=db[cus_id]["e-bill"]
          db[cus_id]["payment_status"]=1
          this.payment_status=db[cus_id]["payment_status"]
          this.saveDetails()
          // this.saveDetails()
        }
       
        return true
      }else{
      alert("Your e-pay-account has only "+this.e_pay_amount+" Rs.")
      return false
    }}
    else{
      alert("Your e-pay bill amount is "+this.e_bill)
      return false
    }
  }

}
 
  saveDetails(){
    if(this.db){
      localStorage.setItem("database",JSON.stringify(this.db))
    }
    if(this.customer_id){
      localStorage.setItem("customer_id",JSON.stringify(this.customer_id))
    }
    if(this.e_bill){
      localStorage.setItem("e-bill",JSON.stringify(this.e_bill))
    }
    if(this.e_pay_amount){
      localStorage.setItem("e-pay-amount",JSON.stringify(this.e_pay_amount))
    }
    if(this.cus_code){
      localStorage.setItem("sub_code",JSON.stringify(this.cus_code))
    }
    if(this.payment_status){
      localStorage.setItem("payment_status",JSON.stringify(this.payment_status))
    }
  }
  getDetails(){
    if(localStorage.getItem("database")){
      this.db=JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("customer_id")){
      this.customer_id=JSON.parse(localStorage.getItem("customer_id")||'')
    }
    if(localStorage.getItem("e-bill")){      
      this.e_bill=JSON.parse(localStorage.getItem("e-bill")||'')
    }
    if(localStorage.getItem("e-pay-amount")){
      this.e_pay_amount=JSON.parse(localStorage.getItem("e-pay-amount")||'')
    }
    if(localStorage.getItem("sub_code")){
      this.cus_code=JSON.parse(localStorage.getItem("sub_code")||'')
    }
    if(localStorage.getItem("payment_status")){
      this.payment_status=JSON.parse(localStorage.getItem("payment_status")||'')
    }
  }
}
