import { UserService } from '../../../service/user.service';

<<<<<<< HEAD

import {AfterViewInit, Component, ViewChild} from '@angular/core';
=======
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
>>>>>>> b25a0409f569db4244c84ac55a9bac77919c928d
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: number;
<<<<<<< HEAD
  name: string;
  progress: string;
  fruit: string;
=======
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
>>>>>>> b25a0409f569db4244c84ac55a9bac77919c928d
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-wip-content',
  styleUrls: ['wip-content.component.scss'],
  templateUrl: 'wip-content.component.html',
})
<<<<<<< HEAD
export class WipContentComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<any>;

=======
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
    "contactName"];
  dataSource: MatTableDataSource<any>;
  wips = [];
>>>>>>> b25a0409f569db4244c84ac55a9bac77919c928d
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
    // Create 100 users
<<<<<<< HEAD
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    console.log(this.dataSource);
=======
    this.dataSource = new MatTableDataSource([]);

  }
  ngOnInit(): void{
    this.userService.getRequest('/api/Wip/GetAllWip').subscribe(
      res => {

        this.dataSource.data= res['data']
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    
>>>>>>> b25a0409f569db4244c84ac55a9bac77919c928d
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
}

/** Builds and returns a new User. */
function createNewUser(id: number){
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id,

    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
  };
}
