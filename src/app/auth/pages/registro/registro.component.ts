import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  get emailErrorMsg(): string{
    const error = this.miFormulario.get('email')?.errors
    if(error?.required){
      return 'El email es obligatorio'
    }else if(error?.pattern){
      return 'El campo email es incorrecto, debe tener un formato email'
    }else if(error?.emailOcupado){
      return 'El email esta ocupado'
    }else{ return ''}
  }

  miFormulario: FormGroup = this.fb.group({
    nombre:   [ '', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ] ],
    email:    [ '', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [this.emailVal] ],
    userName: [ '', [ Validators.required, this.validatorService.noPuedeSerStrider ] ],
    password:    [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required ] ],
  }, {
    validators: [ this.validatorService.camposIguales( 'password', 'password2' ) ]
  })

  constructor(private fb: FormBuilder, 
              private validatorService: ValidatorService,
              private emailVal: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Enrique Martinez',
      email: 'test1@test.com',
      userName: 'Quique',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido( campo: string ){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
