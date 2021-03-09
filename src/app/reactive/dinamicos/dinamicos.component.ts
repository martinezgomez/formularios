import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array([
      ['Metal Gear'],
      ['Gears of War']
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  nombreValido( nombre: string) {
    console.log('estoy en validar')
    console.log(this.miFormulario.controls[nombre].errors 
      && this.miFormulario.controls[nombre].touched)

    return this.miFormulario.controls[nombre].errors 
            && this.miFormulario.controls[nombre].touched;
  }

  agregarFavorito(){
    if( this.nuevoFavorito.invalid ){return;}
    
    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset()
  }

  borrar(i: number){
    this.favoritosArr.removeAt(i)
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched
      return;
    }
    console.log('valido')
    console.log(this.miFormulario.value)

  } 

}
