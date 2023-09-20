import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class LoginService{
    numemp:number;
    puesto:string;
    constructor(private router: Router){
        
    }
    login(numemp:number){
        if(numemp>900)
            return true;
        else
            return false;
    }
}