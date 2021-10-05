export class FiltersQuery {
  private _sequence!: number;
  private _requestType!: string;
  private _dateFrom: any;
  private _dateTo: any;
  private _contains!: string;


  constructor(sequence: number, requestType: string, dateFrom: any, dateTo: any, contains: string) {
    this._sequence = sequence;
    this._requestType = requestType;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._contains = contains;
  }

  get sequence(): number {
    return this._sequence;
  }

  set sequence(value: number) {
    this._sequence = value;
  }

  get requestType(): string {
    return this._requestType;
  }

  set requestType(value: string) {
    this._requestType = value;
  }

  get dateFrom(): any {
    return this._dateFrom;
  }

  set dateFrom(value: any) {
    this._dateFrom = value;
  }

  get dateTo(): any {
    return this._dateTo;
  }

  set dateTo(value: any) {
    this._dateTo = value;
  }

  get contains(): string {
    return this._contains;
  }

  set contains(value: string) {
    this._contains = value;
  }
}
