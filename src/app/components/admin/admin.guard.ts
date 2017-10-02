import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SignedInUserService } from '../stores/signedInUser.service';
import { Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}   from '@angular/router';

@Injectable()
export class AdminPageGuard implements CanActivate {

  private user: any;

  constructor(private SignedInUserService: SignedInUserService, private router: Router) {
      
    SignedInUserService.getSignedInUserSubscription()
        .subscribe((data: any) => {
            if(data){
                this.user = data;
            }
    })
  }

  canActivate() {
      if(this.checkAdminStatus()){
          return true
      }
      this.router.navigate(['/']);
  }

  checkAdminStatus(): boolean { 
     return this.user && this.user.type == 'admin'
  }
}