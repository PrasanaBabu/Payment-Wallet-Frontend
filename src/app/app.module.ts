import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddFundComponent } from './components/add-fund/add-fund.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { UnregisterComponent } from './components/unregister/unregister.component';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';



import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { MatchPasswordDirective } from './directives/match-password.directive';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import { MessagesModule } from 'primeng/messages';


import {InputTextModule} from 'primeng/inputtext';

import {TooltipModule} from 'primeng/tooltip';

import {ToastModule} from 'primeng/toast';
import { UserAuthGuard } from './guard/user-auth.guard';
import { BalanceComponent } from './components/balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AddFundComponent,
    WithdrawComponent,
    TransferComponent,
    UnregisterComponent,
    MatchPasswordDirective,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmDialogModule,

    FormsModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MessagesModule,

    InputTextModule,
    TooltipModule,

    ToastModule

  ],
  providers: [UserAuthGuard,ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
