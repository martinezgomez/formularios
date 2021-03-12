import { AbstractControl, AsyncValidator, ControlContainer, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor( private http: HttpClient ) { }
  
  validate( control: AbstractControl): Observable<ValidationErrors | null>{

    const email = control.value;
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
        .pipe(
            map( r => {
              return ( r.length === 0 )? null : {emailOcupado: true}
            })
        )

  }
  
}
