import { ValidatorFn, AbstractControl } from "@angular/forms";

export class emailMatcherValidator{
    static courrielConfirmation(): ValidatorFn{
        return(c: AbstractControl): { [key: string]: boolean} | null =>{
            let courriel = c.get('courriel');
            let confCourriel = c.get('confCourriel');

            if(!courriel.value || !confCourriel.value){
                return null;
            }

            if(courriel.value === confCourriel.value){
                return null;
            }
            
            return {'courrielConfirmation': true};
            
        };
    }
}   