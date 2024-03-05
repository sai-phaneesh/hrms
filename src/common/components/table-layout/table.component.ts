import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from 'src/common/services';
import { MenuController, IonicModule } from '@ionic/angular';
import { NgFor, NgIf } from '@angular/common';
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrl: 'table.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgIf,
    MatPaginatorModule,
    MatPaginator,
    MatTableModule,
    MatSortModule,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    NgIf,
    MatIconModule
  ],
  providers: [
    provideAnimations()
  ]
})

export class TabelComponent {
 
  @Input() public displayedColumns: string[];
  @Input() public displayData: any;
  @Input() public approval: boolean;

  public dataSource :any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
  this.dataSource = new MatTableDataSource(this.displayData);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  alert(i:string){
    console.log(i);
  }
}

//   constructor() {
//     // Create 100 users
//     const users: UserData[] = [];
//     for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(users);
//   }
//   ngOnInit(): void {
//     // throw new Error('Method not implemented.');
//   }

//   /**
//    * Set the paginator and sort after the view init since this component will
//    * be able to query its view for the initialized paginator and sort.
//    */
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(filterValue: any) {
//     filterValue = filterValue.value.trim(); // Remove whitespace
//     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
//     this.dataSource.filter = filterValue;
//   }
// }

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }

/** Constants used to fill up our data base. */
// const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES = ['Maia', 'Asher', 'Olivia', 
// 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }