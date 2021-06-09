import { UserService } from '../../../service/user.service';

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface UserData {
  id: number;
  equipmentId: number;
  workShop: string;
  technician: string;
  customerId: number;
  contactId: number;
  notes: string;
  wipstatus: boolean;
  visitRequired: boolean;
  breakDown: boolean;
  engineHoursTillNow: number;
  dateCompleted: string;
  createdBy: string;
  isArchive: boolean;
  priority: number;
  warranty: boolean;
  location: string;
  serviceType: string;
  startDate: string;
  contractor: string;
  archiveDate: string;
  archiveBy: string;
  jobNo: number;
  ownerFolder: boolean;
  idplate: boolean;
  promisedDate: string;
  ssmaTimeStamp: string;
  model: string;
  serialNumber: string;
  make: string;
  customerName: string;
  contactName: string;
}
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-wip-content',
  styleUrls: ['wip-content.component.scss'],
  templateUrl: 'wip-content.component.html',
})
export class WipContentComponent implements AfterViewInit, OnInit {
  loading = true;
  displayedColumns: string[] = [
    "jobNo",
    "serviceType",
    "wipstatus",
    "model",
    "serialNumber",
    "make",
    "technician",
    "workShop",
    "customerName",

    "visitRequired",
    "breakDown",
    "action"];
  dataSource: MatTableDataSource<any>;
  wips = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
    // Create 100 users
    this.dataSource = new MatTableDataSource([]);
    
  }
  ngOnInit(): void{
    this.userService.getRequest('/api/Wip/GetAllWip').subscribe(
      res => {
        this.loading = false;
        res['data'].sort((a, b) => {
          return a.priority - b.priority;
        });
        this.dataSource.data= res['data']
        console.log("sorted wips", res['data']);
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateCreate() {
    this.userService.gotoPage('/wip/create');
  }
  edit(id){
    this.userService.gotoPage('/wip/update/'+ id);
  }
  deleteWip(id){
    this.userService.deleteRequest('/api/Wip/ArchiveWip?wipId='+ id).subscribe(
      res => {
        this.userService.getRequest('/api/Wip/GetAllWip').subscribe(
          res => {
            res['data'].sort((a, b) => {
              return a.priority - b.priority;
            });
            this.dataSource.data = res['data']
            this.userService.handleSuccess("WIP deleted successfully!");
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        );
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
  }
  upPriority(id){
    let upId= id;
    let downId= 0;
    let upPriority= 0;
    let downPriority= 0;
    for(let i= 0; i<this.dataSource.data.length; i++){
      if(this.dataSource.data[i]['id']== id){
        if(i== 0){
          return;
        }
        else{
          upPriority= this.dataSource.data[i-1]['priority'];
          downId= this.dataSource.data[i-1]['id'];
          downPriority= this.dataSource.data[i]['priority'];
          break;
        }
      }
      

    }
    let upData= {'id':upId, 'priority': upPriority, 'isPrioritySwapped': true};
    let downData = { 'id': downId, 'priority': downPriority, 'isPrioritySwapped': true };
    console.log("updata", upData);
    console.log("downData", downData);
    this.userService.postRequest('/api/Wip/UpdateWip', upData, false).subscribe(
      res => {
        this.userService.postRequest('/api/Wip/UpdateWip', downData, false).subscribe(
          res => {
            this.userService.getRequest('/api/Wip/GetAllWip').subscribe(
              res => {
                res['data'].sort((a, b) => {
                  return a.priority - b.priority;
                });
                this.dataSource.data = res['data']
                this.userService.handleSuccess("WIP priority updated successfully!");
              },
              err => {
                console.log(err)
                this.loading = false;
                this.userService.handleError(err)
              }
            );
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        )
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
  downPriority(id) {
    let downId= id;
    let upId= 0;
    let upPriority= 0;
    let downPriority= 0;
    for(let i= 0; i<this.dataSource.data.length; i++){
      if(this.dataSource.data[i]['id']== id){
        if(i== this.dataSource.data.length-1){
          return;
        }
        else{
          downPriority= this.dataSource.data[i+1]['priority'];
          upId= this.dataSource.data[i+1]['id'];
          upPriority= this.dataSource.data[i]['priority'];
          break;
        }
      }
      

    }
    let upData= {'id':upId, 'priority': upPriority, 'isPrioritySwapped': true};
    let downData = { 'id': downId, 'priority': downPriority, 'isPrioritySwapped': true };
    this.userService.postRequest('/api/Wip/UpdateWip', upData, false).subscribe(
      res => {
        this.userService.postRequest('/api/Wip/UpdateWip', downData, false).subscribe(
          res => {
            this.userService.getRequest('/api/Wip/GetAllWip').subscribe(
              res => {
                res['data'].sort((a, b) => {
                  return a.priority - b.priority;
                });
                this.dataSource.data = res['data']
                this.userService.handleSuccess("WIP priority updated successfully!");
              },
              err => {
                console.log(err)
                this.loading = false;
                this.userService.handleError(err)
              }
            );
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        )
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )

  }
}


