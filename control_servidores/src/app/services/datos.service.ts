import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from "./login.service";
import { Catalogo_Servidor } from "../models/catalogo_servidor.model";
import { Observable } from "rxjs";


@Injectable()
export class DatosService{
    constructor(private httpClient:HttpClient, private loginService:LoginService){
        
    }
    private apiCatalogo_Servidor = 'http://localhost:3001/catalogo_servidor';

    

}