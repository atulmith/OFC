import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserRights} from './userrights';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let roles = route.data["roles"] as Array<string>;
        if (roles && localStorage.getItem('currentUser')) {

            //as done on 8 feb 2017 by Mandar
            //to retrieve userrights from localStorage
            let userrightStorage = localStorage.getItem('userrights');
            let rights :string[]=[];
            rights= JSON.parse(userrightStorage);

            for(let i=0;i<rights.length;i++)
            {
                let userrights: any = rights[i];
                let obj:UserRights = userrights;
                if(obj.screenname==roles[0])
                {
                    if(obj.authentication=="true"){
                        return true;
                    }
                    else{
                        this.router.navigate(['/login']);
                        return false;
                    }
                }

            }

            
            // logged in so return true
            //return true;
        }

        // not logged in so redirect to login page with the return url
        
        //as done on 8 feb 2017 by Mithun sir
        
        //this.router.navigate(['/login', { returnUrl: state.url }]);

        this.router.navigate(['/login']);
        return false;
    }
}