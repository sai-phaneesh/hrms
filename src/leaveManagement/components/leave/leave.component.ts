import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/common/components/header/header.component';
import { CardComponent } from 'src/common/components/card-layout/card.component';
import { TabelComponent } from 'src/common/components/table-layout/table.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    IonicModule,
    RouterLink,
    HeaderComponent,
    CardComponent,
    TabelComponent
  ],
})
export class LeaveComponent implements OnInit {
  public title = 'Leave Management';
  displayedColumns: string[]= ['Position', 'Name', 'Symbol', 'Weight', 'Approval'];
  displayData: Object[];
  segment: any = "manager";
  approval: boolean = true;
  
  constructor() { }

  ngOnInit() { 
    this.getManagerApprovalList();
  }

  getManagerApprovalList() {
    // Main page list for approval

    // Get api response and send that value for table display like below
    this.displayData = [
      // { Position: 1, Name: 'Hydrogen', Weight: 1.0079, Symbol: 'H', Approval: 'Approved' },
      // {Position: 2, Name: 'Helium', Weight: 4.0026, Symbol: 'He', Approval: 'new'},
      // {Position: 3, Name: 'Lithium', Weight: 6.941, Symbol: 'Li', Approval: 'Rejected'},
      // {Position: 4, Name: 'Beryllium', Weight: 9.0122, Symbol: 'Be', Approval: 'pending'},
      // {Position: 5, Name: 'Boron', Weight: 10.811, Symbol: 'B', Approval: 'Approved'},
      // {Position: 6, Name: 'Carbon', Weight: 12.0107, Symbol: 'C', Approval: 'Approved'},
      // {Position: 7, Name: 'Nitrogen', Weight: 14.0067, Symbol: 'N', Approval: 'Approved'},
      // {Position: 8, Name: 'Oxygen', Weight: 15.9994, Symbol: 'O', Approval: 'Approved'},
      // {Position: 9, Name: 'Fluorine', Weight: 18.9984, Symbol: 'F', Approval: 'Approved'},
      // {Position: 10, Name: 'Neon', Weight: 20.1797, Symbol: 'Ne', Approval: 'Approved'},
      // {Position: 11, Name: 'Sodium', Weight: 22.9897, Symbol: 'Na', Approval: 'Approved'},
      // {Position: 12, Name: 'Magnesium', Weight: 24.305, Symbol: 'Mg', Approval: 'Approved'},
      // {Position: 13, Name: 'Aluminum', Weight: 26.9815, Symbol: 'Al', Approval: 'Approved'},
      // {Position: 14, Name: 'Silicon', Weight: 28.0855, Symbol: 'Si', Approval: 'Approved'},
      // {Position: 15, Name: 'Phosphorus', Weight: 30.9738, Symbol: 'P', Approval: 'Approved'},
      // {Position: 16, Name: 'Sulfur', Weight: 32.065, Symbol: 'S', Approval: 'Approved'},
      // {Position: 17, Name: 'Chlorine', Weight: 35.453, Symbol: 'Cl', Approval: 'Approved'},
      // {Position: 18, Name: 'Argon', Weight: 39.948, Symbol: 'Ar', Approval: 'Approved'},
      // {Position: 19, Name: 'Potassium', Weight: 39.0983, Symbol: 'K', Approval: 'Approved'},
      // {Position: 20, Name: 'Calcium', Weight: 40.078, Symbol: 'Ca', Approval: 'Approved'},
    ];
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
