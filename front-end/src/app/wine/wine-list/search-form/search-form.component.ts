import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'wc-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
 @Output() onSearch : EventEmitter <string> = new EventEmitter();
 searchForm : FormGroup;
 
  constructor(private fb : FormBuilder) {
    this.searchForm = this.fb.group({
      'searchText' : ""
    });
   }

  ngOnInit(): void {
  }
  search() : void{
    this.onSearch.emit(this.searchForm.value.searchText);
  }


}
