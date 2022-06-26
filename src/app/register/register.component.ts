import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm=this.fb.group({
    cus_name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    cus_address:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    cus_phone:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    cus_id:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    cus_password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }
  register(){
    var cus_name=this.registerForm.value.cus_name
    var cus_address=this.registerForm.value.cus_address
    var cus_phone=this.registerForm.value.cus_phone
    var cus_id=this.registerForm.value.cus_id
    var cus_password=this.registerForm.value.cus_password
    if(this.registerForm.valid){
      const result=this.ds.register(cus_name,cus_address,cus_phone,cus_id,cus_password,500,0,0,0)
      if(result){
        alert("Registered user successfully")
        this.router.navigateByUrl('login')
      }
    }else{
      alert("Invalid form")
    }
  }
}
