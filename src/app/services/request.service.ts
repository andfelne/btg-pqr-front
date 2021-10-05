import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Request} from "../models/request";
import {FiltersQuery} from "../models/filters-query";
import {DatePipe, formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  save(request: Request): Promise<any> {
    console.log("Tenemos :  " , request);
    return this.http.put('http://127.0.0.1:8080/requests/create', request).toPromise();
  }

  findRequestsByFilters(filters: FiltersQuery): Promise<Request[]> {
    const url = `http://127.0.0.1:8080/requests/query/${filters.requestType}`;
    const httpParams = this.getFiltersHttpParams(filters);
    return this.http.get<Request[]>(url, {params: httpParams}).toPromise();
  }

  getFiltersHttpParams(filters: FiltersQuery): HttpParams {
    let httpParams = new HttpParams();

    if (filters.sequence) {
      httpParams = httpParams.set('sequence', filters.sequence.toString())
    }
    if (filters.contains) {
      httpParams = httpParams.set('contains', filters.contains.toString())
    }
    if (filters.dateFrom) {
      const dateFrom = this.convertObjectToDate(filters.dateFrom).getTime();
      httpParams = httpParams.set('dateFrom', dateFrom);
    }
    if (filters.dateTo) {
      const dateTo = this.convertObjectToDate(filters.dateTo).getTime();
      httpParams = httpParams.set('dateTo', dateTo)
    }

    return httpParams;
  }

  convertObjectToDate(dateObject: any) : Date {
      return new Date(dateObject['year'], dateObject['month']-1, dateObject['day']);
  }

  findClimByRequestId(id: string | undefined): Promise<Request> {
    const url = `http://127.0.0.1:8080/requests/query/parent/${id}`;
    return this.http.get<Request>(url, {}).toPromise();
  }
}
