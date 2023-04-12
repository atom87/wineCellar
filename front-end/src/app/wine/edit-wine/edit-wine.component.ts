import { Component, OnInit } from '@angular/core';
import { Wine } from '../model/wine';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WineService } from '../services/wine.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wc-edit-wine',
  templateUrl: './edit-wine.component.html',
  styleUrls: ['./edit-wine.component.css']
})
export class EditWineComponent implements OnInit {

  wine: Wine; //dodali smo model podataka koji ce forma koristiti
  wineForm: FormGroup;
  

  constructor(private fb: FormBuilder, private wineService: WineService, private router: Router,
    private route: ActivatedRoute) { 
    this.createForm(); //f-ja se poziva u konstruktoru kako bi se odmah izvrsila po kreiranju komponente
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params.id; //preuzimanja param. id iz URLa u vidu stringa
    // console.log('id param from URL: ', id); 
    if(id){
      //ako smo u navbaru kliknuli na addWine, vrednot id-ja je null ili undefined; ako bismo pokusali tu da ga castujemo u number, desila bi se greska pa se zato dodaje if(id) koji obezbedjuje da dobavljamo vino od servisa samo ako je id vina definisan
      // this.wine = this.wineService.get(Number(id)); //id se parsira u int
      this.wineService.get(Number(id)).subscribe( wine => {
        this.wine = wine;
        this.wineForm.patchValue(this.wine); //patchValue podesava vrednosti kontrola forme na vrednosti koje se nalaze u wine polju
      });
    }
  }

  createForm(){

    this.wineForm = this.fb.group({
      //vrednosti (value iz html-a) polja forme
      'name': ["", [Validators.required, Validators.minLength(2)] ],
      'year': ["", Validators.required],
      'grapes': ["", Validators.required],
      'country': ["",Validators.required],
      'region': ["",Validators.required],
      'description': ["", Validators.required]
    });
  }
 

  onSubmit(){
   
  // this.wine = this.wineForm.value //sinhronizacija modela 'wine' sa vrednostima koje je korisnik uneo u formu, time se jedino _id ne podesava, i to je prvi korak koji nam vise ne treba jer smo ga ubacili u submittedWine
  // console.log(this.wine);

    let submittedWine : Wine = new Wine(this.wineForm.value);
    if(this.wine && this.wine._id){ //provera da li je this.wine razlicito od null i da li ima definisan id parametar

      submittedWine._id = this.wine._id;
      this.wineService.update(submittedWine).subscribe(wine => {

        this.wineForm.reset(); //resetuje formu na prazna polja
        this.router.navigate(['wines']); //automatska redirekcija nakon dodavanja itema
      });
    } else {
      this.wineService.add(submittedWine).subscribe(wine => {
        this.wineForm.reset(); 
        this.router.navigate(['wines']); 
      }) 
    }
    
  }

}
