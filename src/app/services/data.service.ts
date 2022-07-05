import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customer_id:any
  customer_name:any
  type_pay:any
  e_bill:any
  e_pay_amount:any
  payment_status:any
  cus_code:any
  sub_amount:any
  code_status:any
  db:any={
    1000:{"cus_id":1000,"cus_name":"Adam","cus_address":"abc","cus_phone":123,"cus_password":1000,"e-bill":500,"e-pay-amount":100,"status":0,"payment_status":0,"type_pay":0,"sub_code":"","code_status":0},
    1001:{"cus_id":1000,"cus_name":"Adam","cus_address":"bbc","cus_phone":223,"cus_password":1001,"e-bill":500,"e-pay-amount":100,"status":0,"payment_status":0,"type_pay":0,"sub_code":"","code_status":0}
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
        this.code_status=db[cus_id]["code_status"]
        this.customer_name=db[cus_id]["cus_name"]
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
  register(cus_name:any,cus_address:any,cus_phone:any,cus_id:any,cus_password:any,e_bill:any,e_payamount:any,status:any,payment_status:any,cus_code:any,code_status:any){
    let db=this.db
    if(cus_id in db){
      alert("User already existing")
      return false
    }else{
      db[cus_id]={cus_id,cus_name,cus_address,cus_phone,cus_password,e_bill,e_payamount,status,payment_status,cus_code,code_status}
      // this.customer_id=cus_id
      this.saveDetails()
      return true
    }
  }
  payamount(cus_id:any,cus_acno:any,cus_money:any,showpaydiv:any,type_pay:any){
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
          // this.e_bill=db[cus_id]["e-bill"]
          // db[cus_id]["payment_status"]=1
          // this.payment_status=db[cus_id]["payment_status"]
          // this.saveDetails()
          db[cus_id]["status"]=1

          alert("Your e-pay account credited with 50Rs. on your first payment")
        }else{
          db[cus_id]["e-bill"]=0
          // this.e_bill=db[cus_id]["e-bill"]
          // db[cus_id]["payment_status"]=1
          // this.payment_status=db[cus_id]["payment_status"]
        }
          db[cus_id]["payment_status"]=1
          this.payment_status=db[cus_id]["payment_status"]

          db[cus_id]["type_pay"]=type_pay
          this.type_pay=db[cus_id]["type_pay"]
          
          this.saveDetails()
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
          db[cus_id]["e-pay-amount"]=db[cus_id]["e-pay-amount"]-this.e_bill
          this.e_pay_amount=db[cus_id]["e-pay-amount"]

          db[cus_id]["e-bill"]=0
          // this.e_bill=db[cus_id]["e-bill"]
          db[cus_id]["status"]=1
          // db[cus_id]["payment_status"]=1
          // this.payment_status=db[cus_id]["payment_status"]
          // this.saveDetails()
          alert("Your e-pay account credited with 50Rs. on your first payment")
        }else{
          db[cus_id]["e-bill"]=0
          // this.e_bill=db[cus_id]["e-bill"]
          db[cus_id]["e-pay-amount"]=db[cus_id]["e-pay-amount"]-this.e_bill
          this.e_pay_amount=db[cus_id]["e-pay-amount"]
          // db[cus_id]["payment_status"]=1
          // this.payment_status=db[cus_id]["payment_status"]
          // this.saveDetails()
        }
        db[cus_id]["payment_status"]=1
        this.payment_status=db[cus_id]["payment_status"]
        //payment type
        db[cus_id]["type_pay"]=type_pay
        this.type_pay=db[cus_id]["type_pay"]
        this.saveDetails()
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
 submitcode(cus_id:any,cus_code:any,e_bill:any){
  let db=this.db
  // alert(cus_code)
  if(cus_code!=null){
    if(this.code_status!=1){
    if(cus_code=="sub15"){
        // alert(this.e_bill)
        this.sub_amount=(this.e_bill*15)/100
        // alert(this.sub_amount)
    }else if(cus_code=="sub10"){
        this.sub_amount=(this.e_bill*10)/100
      }else if(cus_code=="sub5"){
        this.sub_amount=(this.e_bill*5)/100
      }
      alert("Your e-pay account credited with "+this.sub_amount+"Rs.")
      db[cus_id]["e-pay-amount"]+=this.sub_amount
      this.e_pay_amount=db[cus_id]["e-pay-amount"]
      db[cus_id]["code_status"]=1
      this.code_status=1
      this.saveDetails()
      window.location.reload()
      return true
    }else{
      alert("Code already used")
      return false
    }}else{
      alert("No code available")
      return false
    }
 }
  saveDetails(){
    if(this.db){
      localStorage.setItem("database",JSON.stringify(this.db))
    }
    if(this.customer_id){
      localStorage.setItem("customer_id",JSON.stringify(this.customer_id))
    }
    if(this.customer_name){
      localStorage.setItem("customer_name",JSON.stringify(this.customer_name))
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
    if(this.code_status){
      localStorage.setItem("code_status",JSON.stringify(this.code_status))
    }
    if(this.type_pay){
      localStorage.setItem("type_pay",JSON.stringify(this.type_pay))
    }
  }
  getDetails(){
    if(localStorage.getItem("database")){
      this.db=JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("customer_id")){
      this.customer_id=JSON.parse(localStorage.getItem("customer_id")||'')
    }
    if(localStorage.getItem("customer_name")){
      this.customer_name=JSON.parse(localStorage.getItem("customer_name")||'')
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
    if(localStorage.getItem("code_status")){
      this.code_status=JSON.parse(localStorage.getItem("code_status")||'')
    }
    if(localStorage.getItem("type_pay")){
      this.type_pay=JSON.parse(localStorage.getItem("type_pay")||'')
    }
  }
}
