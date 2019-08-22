import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { ViewTransactionsComponent } from './components/view-transactions/view-transactions.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTransactionComponent,
    ViewTransactionsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
