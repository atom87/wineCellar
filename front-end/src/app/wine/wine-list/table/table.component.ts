import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wine } from '../../model/wine';
import { WineService } from '../../services/wine.service';
// import { Router } from '@angular/router';


@Component({
  selector: 'wc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() wines: Wine[];
  @Output() wineDeleted : EventEmitter<number> = new EventEmitter(); //number-jer se parent comp javljamo id vina koje se brise
  @Output()  onSort : EventEmitter<string> = new EventEmitter();
  

  constructor(private wineService : WineService /*, private router: Router*/) { 
 
  }

  ngOnInit() {
  }

  onDelete(id:number):void{
  // console.log('Deleting wine ', id);
  // this.wineService.remove(id);
  this.wineService.remove(id).subscribe(
    wine => {
      this.wineDeleted.emit(wine._id);
    }
  )
  }
  
  // onEditWine(id:number): void{
  //   this.router.navigate(['wines/', id]);
  // }


  sortCriteria(criteria : string){
    this.onSort.emit(criteria);
  }
}
