import { Component, OnInit, Input,Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-wip-create',
  templateUrl: './wip-create.component.html',
  styleUrls: ['./group-organize.component.scss']
})
export class WipCreateComponent implements OnInit {
  loading;
  equipments = [];
  workShops = [];
  technicians = [];
  customers = [];
  contacts = [];
  wipStatuses = [];
  locations = [];
  serviceTypes = [];

  formGroup: FormGroup;
  constructor(
    public cf: CommonFunctionService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userService.getRequest('api/Equipment/GetEquipmentList').subscribe(
      res => {
        this.equipments = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    this.userService.getRequest('api/Wip/GetWorkshops').subscribe(
      res => {
        this.workShops = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    this.userService.getRequest('api/Wip/GetTechnicians').subscribe(
      res => {
        this.technicians = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    // customers

    //contacts
    
    this.userService.getRequest('api/Customer/GetCustomerContacts').subscribe(
      res => {
        this.contacts = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    this.userService.getRequest('api/Wip/GetWipStatuses').subscribe(
      res => {
        this.wipStatuses = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    this.userService.getRequest('api/Wip/GetLocaitons').subscribe(
      res => {
        this.locations = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    this.userService.getRequest('api/Wip/GetWipServiceTypes').subscribe(
      res => {
        this.serviceTypes = res['data'];
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
  }
}
