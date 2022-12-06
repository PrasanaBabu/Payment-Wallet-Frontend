import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../dto/wallet';
import { Transaction } from '../dto/transaction';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private httpClient: HttpClient) { }

  public addNewUser(newWallet: Wallet): Observable<any> {
    console.log("Inside add new user service");

    return this.httpClient.patch(
      "http://localhost:8080/wallet/new",
      newWallet,
      { responseType: "text" });
  }

  public withdraw(transaction: Transaction): Observable<any> {
    console.log("Inside withdraw service");

    return (this.httpClient.post(
      "http://localhost:8080/wallet/withdraw",
      transaction,
      { responseType: "text" })
    );
  }

  public credit(transaction: Transaction): Observable<any> {
    console.log("Inside credit service");

    return this.httpClient.patch(
      "http://localhost:8080/wallet/add",
      transaction,
      { responseType: "text" }
    );
  }

  public balanceCheck(id: number): Observable<any> {
    console.log("Inside balance check service");
    return this.httpClient.get(
      "http://localhost:8080/wallet/check",
      { responseType: "text" }
    );
  }

  public unregister(wallet: Wallet): Observable<any> {

    console.log("Inside unregister service");

    return this.httpClient.delete(
      "http://localhost:8080/wallet/unregister",
      {
        body: wallet,
        responseType: "text"

      }

    );
  }
}
