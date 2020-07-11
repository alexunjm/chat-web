import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LStorageService } from '../services';
import { AuthService } from '../services/api/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private lsProvider: LStorageService,
        private authService: AuthService
    ) { }

    async canActivate() {
        try {

            const localUser = this.lsProvider.get('user') || {};
            // console.log('AuthGuard -> canActivate -> localUser', localUser);
            if (localUser.token && localUser.token.length > 1) {
                const resp = await this.authService.get('user', {});
                const user = resp['user'];
                const itsOk = localUser.email
                  && localUser.email.length > 0
                  && user.email === localUser.email;
                if (itsOk) {return true; }
            }

            this.router.navigate(['/home']);
            return false;
        } catch (error) {

        }
        this.lsProvider.clear();
        return false;
    }
}
