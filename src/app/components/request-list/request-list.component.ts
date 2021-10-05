import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Request} from "../../models/request";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styles: [
  ]
})
export class RequestListComponent implements OnInit {

  @Input()
  requests: Request[] = [];

  @Output()
  requestSelected = new EventEmitter();

  dateLimitMakeClaim:Date = new Date();

  constructor() {
    this.dateLimitMakeClaim.setDate(new Date().getDate() - 5);
  }

  ngOnInit(): void {
  }

  showModalForClaim(request: Request) {
    this.requestSelected.emit(request);
  }

  showClaimOption(request: Request) : boolean {
    console.log("Show claim option: ", request)
    return <boolean>(
      this.isPetitionOrGrievance(request) &&
      this.haveResponseAndNotClaim(request)  &&
      this.isFilingDateLessThanDateLimitMakeClaim(request.filingDate));
  }

  isFilingDateLessThanDateLimitMakeClaim(dateString: string) : boolean {
    return new Date(dateString).getTime() < this.dateLimitMakeClaim.getTime();
  }

  isPetitionOrGrievance(request: Request): boolean {
    return (request.requestType === 'P' || request.requestType === 'Q');
  }

  haveResponseAndNotClaim(request: Request): boolean {
    return request.response && !request.haveClaim ? true : false;
  }

}
