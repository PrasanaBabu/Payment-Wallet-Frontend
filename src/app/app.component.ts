import { Component, OnInit } from '@angular/core';
import { WalletService } from './services/wallet.service';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'payment-wallet-frontend';
  itemsLoggedIn: MenuItem[];
  items: MenuItem[];
  activeUser = WalletService.userActive;
  constructor(private primengConfig: PrimeNGConfig, service: WalletService, private router: Router) {

  }
  ngOnInit(): void {

    this.itemsLoggedIn = [
      {
        label: 'Logout', icon: 'pi pi-power-off', command: () => {
          this.logout();
        }
      },
    ];


    this.items = [
      {
        label: 'Login', icon: 'pi pi-user', command: () => {
          this.login();
        }
      },
      {
        label: 'Register', icon: 'pi pi-user-plus', command: () => {
          this.register();
        }
      },
    ];
  }
  login() {
    this.router.navigate(['/wallet/login'])
  }
  register() {

    this.router.navigate(['/wallet/register'])
  }
  logout() {
    this.router.navigate(['/wallet/login'])
  }
  checkItem() {
    if (WalletService.userActive)
      return true;
    return false
  }
}
