import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Transaction } from 'src/app/dto/transaction';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent {

  msgs: Message[] = [];
  errMsg: string;
  msgGotBack: any;
  userId: number = WalletService.currentUserId;
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
      message: 'Are you sure  you want to add ' + this.amountToAdd + ' to ID: ' + this.userId,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.userId == undefined || this.amountToAdd == "") {
          this.msgs = [
            {
              severity: 'error',
              summary: 'Invalid',
              detail: 'Please Enter Id and amount'
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
          this.addFund();
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

  addFund() {

    console.log("Accept method clicked with amount = " + this.amountToAdd + " id = " + this.userId);
    this.transaction.amount = parseInt(this.amountToAdd);
    this.transaction.customerId = this.userId;

    this.walletService
      .credit(this.transaction)
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
              
              if (this.msgGotBack == "Amount to add must be greater than or equal to 1") {
                this.errMsg = "Amount Too Less to add. Minimum amount = 1 ";
                console.error("min amount got");
                
                this.minAmountToast();
              }
              else if(this.msgGotBack.includes(' Invalid ID')){
                this.errMsg = "Invalid Id"
                this.invalidIdToast();
              }
              
            
            
          }
        }
      );
  }
  minAmountToast(){
    this.messageService.add(
      {
        severity: 'info',
        summary: 'Failed ',
        detail: 'Minimum Amount should be given to add'
      });
  }

  invalidIdToast(){

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
        summary: 'Added ',
        detail: this.msgGotBack
      });

      //this.router.navigate(['/wallet/home']);
  }

}
