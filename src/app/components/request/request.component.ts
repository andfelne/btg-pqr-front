import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {Request} from "../../models/request";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent {

  @Input() requestType: string | null = null;
  @Input() requestParent: Request | null = null;
  @Output() requestSaved = new EventEmitter<Request>();

  submitted: boolean = false;
  uniqueCode?: number;
  saveSuccessful: any;

  requestForm: FormGroup;

  constructor(private _service: RequestService) {
    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  saveGrievance() {
    this.submitted = true;
    if (this.requestForm.valid) {

      this.requestForm.value['requestType'] = this.requestType;
      this.requestForm.value['requestParent'] = this.requestParent;

      this._service.save(this.requestForm.value).then(
        response => {
          const requestResult = response as Request;
          this.saveSuccessful = true;
          this.uniqueCode = requestResult.sequence;
          this.resetForm();
          this.requestSaved.emit(requestResult);
        },
        error => {
          this.saveSuccessful = false;
        }
      )
    }
  }

  resetForm(): void {
    if (this.requestType != null) {
      this.requestForm.reset(new Request(this.requestType));
    }
    this.submitted = false;
  }

}
