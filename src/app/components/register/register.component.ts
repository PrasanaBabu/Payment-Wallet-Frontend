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
    
    this.walletService
      .addNewUser(this.newWallet)
      .subscribe(
        {
          next: (data) => {
            if(data == "Added Successfully") {
            this.successMsg = "Added New User Successfully";
            this.errorMsg = ""
            this.successToast();
            }
            else if(data.includes('Redundant Id')){
              this.errorMsg = "Redundant Id";
              this.invalidIdToast();

            }
          },
          error: (err) => {
            this.errorMsg = "Something Went Wrong Try again after some time"
            this.successMsg = "";
            this.serverErrorToast();
          }
        });
  }
  onReset(form: NgForm): void {
    form.reset();
  }

  invalidIdToast(){

    this.messageService.add(
      {
        severity: 'info',
        summary: 'ID Exists',
        detail: 'ID already exists try logging in or give another ID'
      }
    );
  }

  successToast(){

    this.messageService.add(
      {
        severity: 'success',
        summary: 'Register Success',
        detail: 'You may now Login with ID and password'
      }
    );

    this.router.navigate(['wallet/login']);
  }

  serverErrorToast() {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Internal Error ',
        detail: 'Try after sometime. If problem persists contact developer .'
      }
    );
  }

}
