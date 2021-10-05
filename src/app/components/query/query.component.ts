import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Request} from "../../models/request";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html'
})
export class QueryComponent implements OnInit {


  requestTypes: any[] = [
    {
      name: "Petición",
      code: "P"
    },
    {
      name: "Queja",
      code: "Q"
    },
    {
      name: "Reclamo",
      code: "R"
    }];

  queryPQRForm: FormGroup;
  requests: Request[] = [];
  requestSelected: Request | null = null;

  constructor(private _service: RequestService) {

    this.queryPQRForm = new FormGroup({
      sequence: new FormControl('', []),
      requestType: new FormControl('P', Validators.required),
      dateFrom: new FormControl('', []),
      dateTo: new FormControl('', []),
      contains: new FormControl('', [])
    });
  }

  ngOnInit(): void {

  }

  async queryPQR(): Promise<void> {
    this.requests = await this._service.findRequestsByFilters(this.queryPQRForm.value);
  }

  getRequestSelected(request: Request): void {
    this.requestSelected = request;
  }

}
