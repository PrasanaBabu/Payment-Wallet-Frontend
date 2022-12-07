import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Transaction } from 'src/app/dto/transaction';
import { WalletService } from 'src/app/services/wallet.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  msgs: Message[] = [];
  errMsg: any;
  msgGotBack: any;
  userId: number =  WalletService.currentUserId;;
  receiverId: number;
  amountToAdd = "";
  transaction: Transaction = new Transaction();

  success: String;


  position: string;

  constructor(private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private walletService: WalletService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure  you want to transfer ' +
        this.amountToAdd + ' from ID: ' +
        this.userId + ' to ID: ' + this.receiverId,

      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.userId == undefined || this.amountToAdd == "" || this.receiverId == undefined) {
          this.msgs = [
            {
              severity: 'error',
              summary: 'Invalid',
              detail: 'Please Enter Both Id and amount'
            }];

        }
        else if ((this.errMsg) != undefined) {
          this.msgs = [
            {
              severity: 'info',
              summary: 'Internal Error',
              detail: 'Server Error Please try after some time'
            }
          ];
        }
        else {
          this.msgs = [
            {
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Request Successfully sent to server please wait for confirmation'
            }
          ];
          this.transferFund();
        }
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected'
          }
        ];
      }
    });
  }

  transferFund() {

    console.log("Transfer method clicked with amount = " + this.amountToAdd + " id = " + this.userId);
    this.transaction.amount = parseInt(this.amountToAdd);
    this.transaction.customerId = this.userId;
    this.transaction.receiverId = this.receiverId;

    this.walletService
      .transfer(this.transaction)
      .subscribe(
        {
          next: data => {
            this.msgGotBack = data;
              this.successToast();
              this.errMsg = ""
            
          },
          error: err => {
            this.errMsg = err.error;

            this.msgGotBack = this.errMsg;
            if (this.msgGotBack == "Amount Low For Transfer") {
              this.errMsg = "Amount Too Less to Transfer. Minimum amount = 1 ";
              console.error("less than min amount got inside data");

              this.minAmountToast();
            }
            else if (this.msgGotBack == "From Id Invalid") {
              this.errMsg = "Sender ID Invalid"
              this.senderInvalidIdToast();
            }
            else if (this.msgGotBack == "Receiver Id Invalid") {
              this.errMsg = "Receiver ID Invalid"
              this.receiverInvalidIdToast();
            }
            else if (this.msgGotBack == "Sender wallet Insufficient Balance") {
              this.errMsg = "Sender wallet Insufficient Balance"
              this.insufficientBalanceToast();
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
        detail: 'Minimum Amount should be given to transfer'
      });
      this.msgs=[]
  }

  senderInvalidIdToast() {

    this.messageService.add(
      {
        severity: 'info',
        summary: 'Sender Invalid ID ',
        detail: this.errMsg
      });

      this.msgs=[]
  }
  receiverInvalidIdToast() {

    this.messageService.add(
      {
        severity: 'info',
        summary: 'Receiver Invalid ID ',
        detail: this.errMsg
      });

      this.msgs=[]
  }

  insufficientBalanceToast() {

    this.messageService.add(
      {
        severity: 'info',
        summary: 'Sender Balance Low ',
        detail: this.errMsg
      });

      this.msgs=[]
  }
  successToast() {
    this.messageService.add(
      {
        severity: 'success',
        summary: 'Added ',
        detail: this.msgGotBack
      });
      this.msgs=[]

    //this.router.navigate(['/wallet/home']);
  }


}
