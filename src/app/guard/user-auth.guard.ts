import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  isLoggedIn:boolean = true;
  loggedInUserId: number;
  constructor(private router:Router){}
  canActivate():boolean{
    console.log("can activate called");
    if(this.isLoggedIn){
      return true ;
    } 
    else {
      this.router.navigate(['wallet/login']);
      return false;
    };
  }
  
}
