import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoginService } from "./login.service";


@Injectable()
export class DatosService{
    constructor(private httpClient:HttpClient, private loginService:LoginService){
        
    }

}