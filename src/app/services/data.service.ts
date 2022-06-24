import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customer_id:any
  e_bill:any
  db:any={
    1000:{"cus_id":1000,"cus_name":"Adam","cus_address":"abc","cus_phone":123,"cus_password":1000,"e-bill":500},
    1001:{"cus_id":1000,"cus_name":"Adam","cus_address":"bbc","cus_phone":223,"cus_password":1001,"e-bill":500},
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
  register(cus_name:any,cus_address:any,cus_phone:any,cus_id:any,cus_password:any,e_bill:any){
    let db=this.db
    if(cus_id in db){
      alert("User already existing")
      return false
    }else{
      db[cus_id]={cus_id,cus_name,cus_address,cus_phone,cus_password,e_bill}
      // this.customer_id=cus_id
      this.saveDetails()
      return true
    }
  }
  payamount(cus_id:any,cus_acno:any,cus_money:any){
    if(cus_acno="")
    {
      return false
    }else{
      return true
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
  }
}
