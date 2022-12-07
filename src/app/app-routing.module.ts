import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFundComponent } from './components/add-fund/add-fund.component';
import { BalanceComponent } from './components/balance/balance.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { UnregisterComponent } from './components/unregister/unregister.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { UserAuthGuard } from './guard/user-auth.guard';

const routes: Routes = [
  {path: 'wallet/home', component:HomeComponent},
  {path: 'wallet/login', component:LoginComponent,},
  {path: 'wallet/register', component:RegisterComponent},
  {path: 'wallet/addfund', component:AddFundComponent, canActivate:[UserAuthGuard]},
  {path: 'wallet/withdraw', component: WithdrawComponent, canActivate:[UserAuthGuard]},
  {path: 'wallet/transfer', component: TransferComponent, canActivate:[UserAuthGuard]},
  {path: 'wallet/unregister', component:UnregisterComponent, canActivate:[UserAuthGuard]},
  {path: 'wallet/check', component:BalanceComponent, canActivate:[UserAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
