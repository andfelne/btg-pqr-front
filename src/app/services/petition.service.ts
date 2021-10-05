import { Injectable } from '@angular/core';
import {Petition} from "../models/petition";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(private http: HttpClient) { }

  save(petition: Petition): Promise<any> {
    console.log(petition);
    return this.http.put('http://127.0.0.1:8080/petitions/create', petition).toPromise();
  }
}
