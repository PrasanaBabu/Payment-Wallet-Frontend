import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Wallet } from 'src/app/dto/wallet';
import { UserAuthGuard } from 'src/app/guard/user-auth.guard';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-unregister',
  templateUrl: './unregister.component.html',
  styleUrls: ['./unregister.component.css']
})
export class UnregisterComponent {


  constructor(private walletService: WalletService,
    private messageService: MessageService,
    private router: Router,
    private auth: UserAuthGuard) { }

  msg: any;
  errorMsg: any;
  form = {
    id: WalletService.currentUserId,
    password: ""
  }
  position: string;
  newWallet: Wallet = new Wallet();

  loggedIn: boolean;

  callRegister() {
    this.router.navigate(['wallet/register']);
  }
  onSubmit(): void {

    console.log("INside onSubmit");
    console.log(JSON.stringify(this.form));
    this.newWallet.id = this.form.id;
    this.newWallet.password = this.form.password;

    this.walletService.login(this.newWallet).subscribe(
      {
        next: (data) => {
          this.msg = data;
          this.errorMsg = "";
          if (this.msg == "Login Passed") {
            this.loggedIn = true;
            this.auth.isLoggedIn = true;
            this.auth.loggedInUserId = this.newWallet.id;
            this.successToast();
          }
          else {
            this.failToast();
          }
          console.log("data portion " + this.msg);
        },
        error: (error) => {
          this.errorMsg = "Internal Server Error Please Try after some time."
          console.log("error portion")
          this.serverErrorToast();
          this.msg = "";
        },
        complete: () => { }
      })
  }

  successToast() {
    this.walletService.unregister(this.newWallet).subscribe(
      {
        next: data => {
          this.deletedToast();
        },
        error: err => {}
        
      })
  }
  failToast() {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'ID/Password Error ',
        detail: 'Invalid Id/ Password. Please check and retry.'
      });
  }
  serverErrorToast() {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Internal Error ',
        detail: 'Try after sometime. If problem persists contact developer .'
      });
  }

deletedToast(){
  this.messageService.add(
    {
      severity: 'success',
      summary: 'Deleted Wallet ',
      detail: 'Wallet deleted'
    });

    this.auth.isLoggedIn = false;
    this.auth.loggedInUserId = null;
    WalletService.removeUser();
}
}
