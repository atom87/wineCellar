import { Wine } from './wine';

export class WineSearchResult {
    count : number;
    wines : Wine[];

        constructor (obj? : any){
            this.count = obj && obj.count || 0;
            this.wines = obj && obj.results.map(elem =>
             new Wine(elem)) || [];
        }
}