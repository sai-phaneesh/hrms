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
  displayedColumns: string[]= ['position', 'name', 'symbol', 'weight'];
  displayData: Object[];

  constructor() { }

  ngOnInit() { 
    this.getManagerApprovalList();
  }

  getManagerApprovalList() {
    // Main page list for approval

    // Get api response and send that value for table display like below
    this.displayData = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    ];
  }

}
