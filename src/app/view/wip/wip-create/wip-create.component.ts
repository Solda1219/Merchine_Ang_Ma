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
    var currentTime= new Date();
    var currentTimeString= this.cf.getChineseTime(currentTime)
    this.formGroup = this._formBuilder.group({
      equipmentId: ['', Validators.required],
      workShop: ['', Validators.required],
      technician: ['', Validators.required],
      customerId: [0],
      contactId: [0],
      notes: [''],
      wipstatus: [false],
      visitRequired: [false],
      breakDown: [false],
      engineHoursTillNow: [0],
      dateCompleted: ["2021-06-07T17:00:02.770Z"],
      createdBy: ['', Validators.required],
      isArchive: [false],
      priority: [0],
      warranty: [false],
      location: ['', Validators.required],
      serviceType: ['', Validators.required],
      startDate: ['', Validators.required],
      contractor: ['', Validators.required],
      archiveDate: ["2021-06-07T17:00:02.770Z"],
      archiveBy: ['', Validators.required],
      jobNo: [0],
      ownerFolder: [false],
      idplate: [false],
      promisedDate: ['', Validators.required],
      // ssmaTimeStamp: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      make: ['', Validators.required],
      customerName: [''],
      contactName: [''],
    });
    this.loading= true;
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
        this.loading= false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
  }
  create() {
    if(!this.formGroup.valid){
      this.userService.errorMessage("Please input all input field!");
      return;
    }
    const wipData= this.formGroup.value;
    this.userService.postRequest('api/Wip/CreateWip', wipData, false).subscribe(
      res => {
        this.userService.handleSuccess("WIP created successfully!");
        this.gotoWipContent()
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
  gotoWipContent(){
    this.userService.gotoPage('/wip/content');
  }
}
