import { Component } from '@angular/core';
import { WalletService } from './services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'payment-wallet-frontend';

  activeUser = WalletService.userActive;
  constructor(){
    this.activeUser = WalletService.userActive;
    console.log('active usser = '  + this.activeUser)
  }
  
}
