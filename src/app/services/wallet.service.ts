import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../dto/wallet';
import { Transaction } from '../dto/transaction';
import { UserAuthGuard } from '../guard/user-auth.guard';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  static userActive: boolean;
  static currentUserId: number;

  public static setCurrectUser(curentUser: number){
    this.userActive = true;
    this.currentUserId = curentUser;
  }
  public static removeUser(){
    this.userActive = false;
    this.currentUserId = -1;
  }

  constructor(private httpClient: HttpClient,
    private auth: UserAuthGuard) { }

    currentUserId = this.auth.loggedInUserId;

  public addNewUser(newWallet: Wallet): Observable<any> {
    console.log("Inside add new user service");

    return this.httpClient.post(
      "http://localhost:8080/wallet/new",
      newWallet,
      { responseType: "text" });
  }


  public transfer(transaction: Transaction):Observable<any>{
    console.log("Inside transfer service");

    return (this.httpClient.post(
      "http://localhost:8080/wallet/transfer",
      transaction,
      { responseType: "text" })
    );
  }

  public withdraw(transaction: Transaction): Observable<any> {
    console.log("Inside withdraw service");

    return (this.httpClient.patch(
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
      "http://localhost:8080/wallet/check/"+id,
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

  public login(wallet: Wallet): Observable<any>{

   
    return this.httpClient.post(
      "http://localhost:8080/wallet/login",
      wallet,
      { responseType: "text" });


  }
}
