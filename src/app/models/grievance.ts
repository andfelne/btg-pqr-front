export class Grievance {

  private _id!: string;
  private _description!: string;

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
}
