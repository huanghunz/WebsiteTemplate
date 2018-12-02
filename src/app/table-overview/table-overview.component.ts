import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import 'hammerjs'
import { Product } from '../models/products';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.css']
})

export class TableOverviewComponent implements OnInit {

  @Input() headers: string[];
  @Input() itemsList: any[];
  @Input() buttonLabel: string;

  @Output() edit = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  constructor() { 
    
   console.log(" constructor ???")
  }

  ngOnInit() {
    //console.log("itme list", this.itemsList);
    this.dataSource = new MatTableDataSource(this.itemsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    if (this.buttonLabel && this.headers.indexOf(this.buttonLabel) == -1){
      this.headers.push(this.buttonLabel);
    }
    this.displayedColumns = this.headers;
    console.log("displayedColumns",this.displayedColumns);
  }

  applyFilter(filterValue: string) {
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editClicked(key){
    //console.log("edit :", key);
    this.edit.emit(key);
  }
}