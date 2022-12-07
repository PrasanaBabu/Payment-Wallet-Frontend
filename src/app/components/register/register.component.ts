import { Component, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Wallet } from 'src/app/dto/wallet';
import { WalletService } from 'src/app/services/wallet.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {

  newWallet: Wallet = new Wallet();

  successMsg: String;
  errorMsg: any;

  form = {
    username: '',
    id: '',
    password: '',
    confirmPassword: ''
  };
  constructor(private walletService: WalletService,
    private messageService: MessageService,
    private router:Router
  ) { }

  redirectToSignIn(){
    this.router.navigate(['wallet/login']);
  
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.form));

    this.newWallet.id = parseInt(this.form.id);
    this.newWallet.name = this.form.username;
    this.newWallet.password = this.form.password;
    this.newWallet.balance = 0;
    // "id" : this.form.id,
    // "name": this.form.username,
    // "password": this.form.password
    this.walletService
      .addNewUser(this.newWallet)
      .subscribe(
        {
          next: (data) => {
            this.successMsg = "Added New User Successfully";
            this.errorMsg = ""
            console.log("going inside data")
          },
          error: (err) => {
            this.errorMsg = "Something Went Wrong Try again after some time"
            this.successMsg = "";
            console.log("goin ins error " + this.errorMsg)
            if(err){
              console.log("goin inside if")
              this.addSingle();
            }
          }
        });


  }

  onReset(form: NgForm): void {
    form.reset();
  }

  addSingle() {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Internal Error ',
        detail: 'Try after sometime. If problem persists contact developer .'
      });
  }

}
