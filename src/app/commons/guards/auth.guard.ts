
import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    return new Promise(async (resolve, reject) => {
        const loggedIn = await authService.getLoggedIn();
        if (!loggedIn){
            router.navigate(['login']);
        }
        resolve(loggedIn);
    })
}