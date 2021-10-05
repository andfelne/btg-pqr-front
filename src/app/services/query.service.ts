import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FiltersQuery} from "../models/filters-query";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  findRequestsByFilters(filters: FiltersQuery): Promise<Request[]> {
    const url = `/requests/query/${filters.requestType}`;
    const httpParams = this.getFiltersHttpParams(filters);
    return this.http.get<Request[]>(url, {params: httpParams}).toPromise();
  }

  getFiltersHttpParams(filters: FiltersQuery): HttpParams {
    let httpParams = new HttpParams();

    if (filters.contains) {httpParams.set('contains', filters.contains)}
    if (filters.dateFrom) {httpParams.set('dateFrom', filters.dateFrom.toString())}
    if (filters.dateTo) {httpParams.set('dateTo', filters.dateTo.toString())}

    return httpParams;
  }
}
