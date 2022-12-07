import { Component } from '@angular/core';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Transaction } from 'src/app/dto/transaction';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent {

  msgs: Message[] = [];
  errMsg: "";
  userId: number;
  amountToAdd = "";
  transaction: Transaction = new Transaction();

  success: String;


  position: string;

  constructor(private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private walletService: WalletService) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure  you want to add ' + this.amountToAdd + ' to ID: ' + this.userId,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.userId == undefined || this.amountToAdd == "") {
          this.msgs = [{ severity: 'error', summary: 'Rejected', detail: 'Please Enter Id and amount' }];

        }
        else {
          this.msgs = [
            {
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Request Successfully sent to server please wait for confirmation'
            }
          ];
          this.addFund();
        }
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  addFund() {

    console.log("Accept method clicked with amount = " + this.amountToAdd + " id = " + this.userId);
    this.transaction.amount = parseInt(this.amountToAdd);
    this.transaction.customerId = this.userId;

    this.walletService
      .credit(this.transaction)
      .subscribe(
        {
          next: data => { data = this.success },

          error: err => { this.errMsg = err }


        }
      );

    console.log("succ = " + this.success);
  }

}
