import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Request} from "../../models/request";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html'
})
export class QueryComponent {

  @ViewChild('closebuttonform') closebuttonform?: any;

  requestSelected?: Request;

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

  filtersForm: FormGroup;
  requests: Request[] = [];
  dateLimitMakeClaim:Date = new Date();
  submmited: boolean = false;

  constructor(private _service: RequestService) {
    this.dateLimitMakeClaim.setDate(new Date().getDate() - 5);
    this.filtersForm = new FormGroup({
      sequence: new FormControl('', []),
      requestType: new FormControl('P', Validators.required),
      dateFrom: new FormControl('', []),
      dateTo: new FormControl('', [])
    });
  }

  async queryPQR(): Promise<void> {
    this.submmited = true;
    this.requests = await this._service.findRequestsByFilters(this.filtersForm.value);
  }

  showClaimOption(request: Request) : boolean {
    return <boolean>(
      this.isPetitionOrGrievance(request) &&
      this.haveResponseAndNotHaveClaim(request)  ||
      this.isFilingDateLessThanDateLimitMakeClaim(request));
  }

  isFilingDateLessThanDateLimitMakeClaim(request: Request) : boolean {
    return (request.haveClaim == false && (new Date(request.filingDate).getTime() < this.dateLimitMakeClaim.getTime()));
  }

  isPetitionOrGrievance(request: Request): boolean {
    return (request.requestType === 'P' || request.requestType === 'Q');
  }

  haveResponseAndNotHaveClaim(request: Request): boolean {
    return request.response != null && !request.haveClaim ? true : false;
  }

  showModalForClaim(request: Request) {
    this.requestSelected = request;
    this.getClaimAndLoad();
  }

  async getClaimAndLoad(): Promise<void> {
    if (this.requestSelected?.haveClaim) {
      const claim = await this._service.findClaimByRequestId(this.requestSelected?.id)
      this.requestSelected = claim;
    }
  }

  getRequestSaved(requestSaved: Request): void {
    this.updateRequestOfList(requestSaved);
  }

  private updateRequestOfList(requestSaved: Request) {
    this.requests.map(request => {
      if (requestSaved.requestParent?.id == request.id) {
        request.haveClaim = true;
        this.closebuttonform['nativeElement'].click();
      }
    });
  }


}
