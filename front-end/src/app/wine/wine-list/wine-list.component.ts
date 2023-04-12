import { Component, OnInit } from '@angular/core';
import { Wine } from '../model/wine';
import { WineService } from '../services/wine.service';


@Component({
  selector: 'wc-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent implements OnInit {

  wineList : Wine[]= [];
  count : number;
  params ={
    sort : "",
    sortDirection : "",
    page: 1,
    pageSize : 5,
    filter : {
      name: ""
    }
  }

  constructor(private wineService : WineService ) {
    
   }
   changePage(newPage :number){
    // console.log("[WineListComponent] New pagination page: ", newPage);
    this.params.page =  newPage;
    this.refreshWineList();
  }
  ngOnInit() {
    this.refreshWineList();
  }

  refreshWineList(){
    this.wineService.getAll(this.params).subscribe(
      wineSearchResult => {
        this.wineList = wineSearchResult.wines;
        this.count = wineSearchResult.count;
      }
    )
  }

  searchByName(name : string){
    this.params.filter.name = name;
    this.refreshWineList();
  }

  changeSortCriteria(criteria : string){
    if (this.params.sort == criteria){
      if(this.params.sortDirection == 'desc'){
        this.params.sortDirection = "";
      } else {
        this.params.sortDirection = "desc";
      }
    } else {
      this.params.sort = criteria;
      this.params.sortDirection = "";
    }
    this.refreshWineList();
  }

}
