import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Request} from "../models/request";
import {FiltersQuery} from "../models/filters-query";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public static CONTEXT = 'requests';

  hostContext?: string;

  constructor(private http: HttpClient) {
    this.hostContext = `${environment.host}/${RequestService.CONTEXT}`
  }

  save(request: Request): Promise<any> {
    const url = `${this.hostContext}/create`;
    return this.http.put(url, request).toPromise();
  }

  findRequestsByFilters(filters: FiltersQuery): Promise<Request[]> {
    const url = `${this.hostContext}/query/${filters.requestType}`;
    const httpParams = this.getFiltersHttpParams(filters);
    return this.http.get<Request[]>(url, {params: httpParams}).toPromise();
  }

  findClaimByRequestId(id: string | undefined): Promise<Request> {
    const url = `${this.hostContext}/query/parent/${id}`;
    return this.http.get<Request>(url, {}).toPromise();
  }

  getFiltersHttpParams(filters: FiltersQuery): HttpParams {
    let httpParams = new HttpParams();

    if (filters.sequence) {
      httpParams = httpParams.set('sequence', filters.sequence.toString())
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

}
