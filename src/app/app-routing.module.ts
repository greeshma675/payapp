import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpayaccountComponent } from './epayaccount/epayaccount.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PayhomeComponent } from './payhome/payhome.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },{
    path:'payhome',component:PayhomeComponent
  },
  {
    path:'epayac',component:EpayaccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
