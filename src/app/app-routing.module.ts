import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFundComponent } from './components/add-fund/add-fund.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { UnregisterComponent } from './components/unregister/unregister.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const routes: Routes = [
  {path: 'wallet/home', component:HomeComponent},
  {path: 'wallet/login', component:LoginComponent},
  {path: 'wallet/register', component:RegisterComponent},
  {path: 'wallet/addfund', component:AddFundComponent},
  {path: 'wallet/withdraw', component: WithdrawComponent},
  {path: 'wallet/transfer', component: TransferComponent},
  {path: 'wallet/unregister', component:UnregisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
