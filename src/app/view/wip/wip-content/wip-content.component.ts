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
  displayedColumns: string[] = ["id",
    "equipmentId",
    "workShop",
    "technician",
    "customerId",
    "contactId",
    "notes",
    "wipstatus",
    "visitRequired",
    "breakDown",
    "engineHoursTillNow",
    "dateCompleted",
    "createdBy",
    "isArchive",
    "priority",
    "warranty",
    "location",
    "serviceType",
    "startDate",
    "contractor",
    "archiveDate",
    "archiveBy",
    "jobNo",
    "ownerFolder",
    "idplate",
    "promisedDate",
    "ssmaTimeStamp",
    "model",
    "serialNumber",
    "make",
    "customerName",
    "contactName",
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
        this.dataSource.data= res['data']
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
    console.log("will be deleted ", id);
  }
}


