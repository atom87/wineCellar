import { Injectable } from '@angular/core';
import { Wine } from '../model/wine';
import { WineSearchResult } from '../model/wineSearchResult';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

const url = "http://localhost:3000/api/wines";

@Injectable({
  providedIn: 'root'
})
export class WineService {

  constructor(private http: HttpClient) {}

  getAll(params? : any): Observable<WineSearchResult>{

    let queryParams ={};
    if(params) {
      queryParams = {params : new HttpParams()
        .set('sort', params.sort || "")
        .set('sortDirection', params.sortDirection || "")
        .set('page', params.page && params.page.toString() || "")
        .set('pageSize', params.pageSize && params.pageSize.toString() || "")
        .set('filter', params.filter && JSON.stringify(params.filter) || "")
      }
    }
    return this.http.get(url, queryParams).pipe(map(
      response => {
        return new WineSearchResult(response);
      }
    ));
  }

  get (id: number): Observable<Wine>{
    return this.http.get(url + "/" + id).pipe(map(
response => {
  return new Wine (response);
}
    ))
  } //dobavljanje vina iz liste prema id

  add(newWine: Wine) : Observable<Wine>{
    return this.http.post(url, newWine).pipe(map(
      response => {
        return new Wine(response);
      }
    ))
  }

  remove(id:number) : Observable<Wine>{
    return this.http.delete(url + "/" + id).pipe(map(
      response => {
        return new Wine(response);
      }
    ))
  }
  update(editedWine: Wine): Observable<Wine>{
    return this.http.put(url + "/" + editedWine._id, editedWine).pipe(map(
      response => {
        return new Wine (response);
      }
    ))
  }
}
