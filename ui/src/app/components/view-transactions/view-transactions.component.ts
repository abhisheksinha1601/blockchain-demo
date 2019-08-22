import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.services';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {

  transactions$;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      return this.router.navigate(['/login']);
    }
    this.getTransactions();
  }

  getTransactions() {
    this.transactions$ = this.appService.getTransactions();
  }
}
