import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Request} from "../../models/request";

@Component({
  selector: 'app-modal-request',
  templateUrl: './modal-request.component.html'
})
export class ModalRequestComponent implements OnInit {

  @Input() requestSelected: Request | null = null;

  constructor() {}

  ngOnInit(): void {
  }


}
