import { Component, OnInit, Input,Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-wip-create',
  templateUrl: './wip-create.component.html',
  styleUrls: ['./group-organize.component.scss']
})
export class WipCreateComponent implements OnInit {
  _opened = true;
  selected_group;
  userContentChanged;
  constructor(
    public cf: CommonFunctionService,
  ) { }

  ngOnInit(): void {
  }
}
