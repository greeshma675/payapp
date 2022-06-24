import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }
  loginForm=this.fb.group({
    cus_id:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    cus_password:['',[Validators.required,Validators.pattern('[0-9 ]*')]]
  })
  login(){
    var id=this.loginForm.value.cus_id
    var password=this.loginForm.value.cus_password
    if(this.loginForm.valid){
      var result=this.ds.login(id,password)
      if(result){
        alert("Login successful")
        this.router.navigateByUrl('payhome')
      }
    }else{
      alert("Invalid form")
    }
  }
}
