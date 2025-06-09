import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from "../services/data.service"
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { Json } from "./../models/json.model";

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {

  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  displayedColumns: string[] = ["id","name", "email","country","postalZip","region","address","currency"];

  pageSizes = [10];
  jsonList: any ;

  constructor( private dataService: DataService,) {
    console.log('Reading local json files');
   
    this.getJsonData();
   }

  ngOnInit() {
  }

   public getJsonData(): void {
    this.dataService.getJsonData().subscribe(
      data => {
       
        console.log(data);
        this.jsonList = data;
        
        this.dataSource = new MatTableDataSource(this.jsonList);
        this.dataSource.paginator = this.paginator;

        console.log(this.jsonList);
      },
      error => console.log(error)
    );
  }


  
}
