import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Transaction } from 'src/app/dto/transaction';
import { WalletService } from 'src/app/services/wallet.service';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  errMsg: string;
  msgGotBack: any;
  userId: number = WalletService.currentUserId;
  balance = "";

  constructor(private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private walletService: WalletService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  showBalance() {

    console.log("balance method clicked with amount = " + this.balance + " id = " + this.userId);

    this.walletService
      .balanceCheck(this.userId)
      .subscribe(
        {
          next: data => {
            this.msgGotBack = data;
            this.successToast();
          },
          error: err => {
            this.errMsg = err.error;
            this.msgGotBack = this.errMsg;

            if (this.msgGotBack == "Amount to add must be greater than or equal to 1") {
              this.errMsg = "Amount Too Less to add. Minimum amount = 1 ";
              console.error("min amount got");

              this.minAmountToast();
            }
            else if (this.msgGotBack.includes(' Invalid ID')) {
              this.errMsg = "Invalid Id"
              this.invalidIdToast();
            }
          }
        }
      );
  }
  minAmountToast() {
    this.messageService.add(
      {
        severity: 'info',
        summary: 'Failed ',
        detail: 'Minimum Amount should be given to add'
      });
  }

  invalidIdToast() {

    this.messageService.add(
      {
        severity: 'info',
        summary: 'Invalid ID ',
        detail: this.errMsg
      });

  }

  successToast() {
    this.messageService.add(
      {
        severity: 'success',
        summary: 'Balance Got ',
        detail: this.msgGotBack
      });

    this.balance = this.msgGotBack;
    //this.router.navigate(['/wallet/home']);
  }

}
