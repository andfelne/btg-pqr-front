export class Request {

  id?: string;
  sequence?: number;
  requestType!: string;
  filingDate!: string;
  description!: string;
  response?: string;
  requestParent?: Request;
  haveClaim?: boolean;


  constructor(requestType: string) {
    this.requestType = requestType;
  }

}
