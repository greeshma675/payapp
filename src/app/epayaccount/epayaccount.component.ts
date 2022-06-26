import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-epayaccount',
  templateUrl: './epayaccount.component.html',
  styleUrls: ['./epayaccount.component.css']
})
export class EpayaccountComponent implements OnInit {
  cus_id:any
  constructor(private ds:DataService) { 
    this.cus_id=ds.customer_id
  }

  ngOnInit(): void {
  }

}
