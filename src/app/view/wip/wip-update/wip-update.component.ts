import { Component, OnInit, Input,Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wip-update',
  templateUrl: './wip-update.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class WipUpdateComponent implements OnInit {
  loading;
  detailedWip= {};
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
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var wipId= this.actRoute.snapshot.params.WipId;
    this.userService.getRequest('api/Wip/GetWipDetailByID?wipId='+ wipId).subscribe(
      res => {
        this.detailedWip = res['data'];
        let customerId= this.detailedWip['customerId'];
        this.userService.getRequest('api/Customer/GetCustomerContacts?customerId='+customerId).subscribe(
          res => {
            this.contacts = res['data'];
            
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        );
        this.formGroup = this._formBuilder.group({
          id: [this.detailedWip['id'], Validators.required],
          equipmentId: [this.detailedWip['equipmentId'], Validators.required],
          workShop: [this.detailedWip['workShop'], Validators.required],
          technician: [this.detailedWip['technician'], Validators.required],
          customerId: [this.detailedWip['customerId'], Validators.required],
          contactId: [this.detailedWip['contactId'], Validators.required],
          notes: [this.detailedWip['notes']],
          wipstatus: [this.detailedWip['wipstatus']],
          visitRequired: [this.detailedWip['visitRequired']],
          breakDown: [this.detailedWip['breakDown']],
          engineHoursTillNow: [this.detailedWip['engineHoursTillNow']],
          dateCompleted: [this.detailedWip['dateCompleted'], Validators.required],
          createdBy: [this.detailedWip['createdBy'], Validators.required],
          isArchive: [this.detailedWip['isArchive']],
          priority: [0],
          warranty: [this.detailedWip['warranty']],
          location: [this.detailedWip['location'], Validators.required],
          serviceType: [this.detailedWip['serviceType'], Validators.required],
          startDate: [this.detailedWip['startDate'], Validators.required],
          contractor: [this.detailedWip['contractor'], Validators.required],
          archiveDate: [this.detailedWip['archhiveDate'], Validators.required],
          archiveBy: [this.detailedWip['archiveBy'], Validators.required],
          jobNo: [this.detailedWip['jobNo']],
          ownerFolder: [this.detailedWip['ownerFolder']],
          idplate: [this.detailedWip['idplate']],
          promisedDate: [this.detailedWip['promisedDate'], Validators.required],
          // ssmaTimeStamp: [this.detailedWip['contactId'], Validators.required],
          model: [this.detailedWip['model'], Validators.required],
          serialNumber: [this.detailedWip['serialNumber'], Validators.required],
          make: [this.detailedWip['make'], Validators.required],
          customerName: [this.detailedWip['customerName']],
          contactName: [this.detailedWip['contactName']],
        });
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    var currentTime= new Date();
    var currentTimeString= this.cf.getChineseTime(currentTime)
    this.formGroup = this._formBuilder.group({
      id: [this.detailedWip['id'], Validators.required],
      equipmentId: [this.detailedWip['equipmentId'], Validators.required],
      workShop: [this.detailedWip['workShop'], Validators.required],
      technician: [this.detailedWip['technician'], Validators.required],
      customerId: [this.detailedWip['customerId'], Validators.required],
      contactId: [this.detailedWip['contactId'], Validators.required],
      notes: [this.detailedWip['notes']],
      wipstatus: [this.detailedWip['wipstatus']],
      visitRequired: [this.detailedWip['visitRequired']],
      breakDown: [this.detailedWip['breakDown']],
      engineHoursTillNow: [this.detailedWip['engineHoursTillNow']],
      dateCompleted: [this.detailedWip['dateCompleted'], Validators.required],
      createdBy: [this.detailedWip['createdBy'], Validators.required],
      isArchive: [this.detailedWip['isArchive']],
      priority: [0],
      warranty: [this.detailedWip['warranty']],
      location: [this.detailedWip['location'], Validators.required],
      serviceType: [this.detailedWip['serviceType'], Validators.required],
      startDate: [this.detailedWip['startDate'], Validators.required],
      contractor: [this.detailedWip['contractor'], Validators.required],
      archiveDate: [this.detailedWip['archiveDate'], Validators.required],
      archiveBy: [this.detailedWip['archiveBy'], Validators.required],
      jobNo: [this.detailedWip['jobNo']],
      ownerFolder: [this.detailedWip['ownerFolder']],
      idplate: [this.detailedWip['idplate']],
      promisedDate: [this.detailedWip['promisedDate'], Validators.required],
      // ssmaTimeStamp: [this.detailedWip['contactId'], Validators.required],
      model: [this.detailedWip['model'], Validators.required],
      serialNumber: [this.detailedWip['serialNumber'], Validators.required],
      make: [this.detailedWip['make'], Validators.required],
      customerName: [this.detailedWip['customerName']],
      contactName: [this.detailedWip['contactName']],
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
    this.userService.getRequest('api/Customer/GetCustomerList').subscribe(
      res => {
        this.customers = res['data'].slice(0, 5001);
        this.loading= false;
        console.log(this.customers);
        console.log(this.customers[0]);
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    //contacts
    
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
  onCustomerChange(customerId) {
    this.userService.getRequest('api/Customer/GetCustomerContacts?customerId='+customerId).subscribe(
      res => {
        this.contacts = res['data'];
        
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
  }
  update() {
    if(!this.formGroup.valid){
      this.userService.errorMessage("Please input all input field!");
      return;
    }

    const wipData= this.formGroup.value;
    this.userService.postRequest('/api/Wip/UpdateWip', wipData, false).subscribe(
      res => {

        this.userService.handleSuccess("WIP updated successfully!");
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
