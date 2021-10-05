import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {Request} from "../../models/request";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {

  @Input() requestType: string | null = null;
  @Input() requestParent: Request | null = null;

  requestForm: FormGroup;
  submitted: boolean = false;
  saveSuccessful: any;
  uniqueCode?: number;
  claim?: Request;

  constructor(private _service: RequestService) {
    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getClaimAndLoad();
  }

  async getClaimAndLoad(): Promise<void> {
    if (this.requestParent?.haveClaim) {
      this.claim = await this._service.findClimByRequestId(this.requestParent?.id)
    } else if (this.requestParent?.requestParent) {
      this.claim = this.requestParent;
    }
    if (this.claim) {
      this.requestForm.reset(this.claim);
    }
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
          this.reset();
        },
        error => {
          this.saveSuccessful = false;
        }
      )
    }
  }

  reset(): void {
    if (this.requestType != null) {
      this.requestForm.reset(new Request(this.requestType));
    }
    this.submitted = false;
  }

}
