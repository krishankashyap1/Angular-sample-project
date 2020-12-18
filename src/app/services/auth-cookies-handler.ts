import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthCookie {
    constructor() { }

    getAuth(): string {
        return Cookie.get('user');
    }

    setAuth(name: string, email: string): void {
        //0.0138889//this accept day not minuts
        Cookie.set('user', JSON.stringify({'name':name, 'email':email}), 0.0138889);
    }

    deleteAuth(): void {
        Cookie.delete('user');
    }  
}