import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierEspaceValidator{
    static sansEspaces(): ValidatorFn {
        return(c: AbstractControl): { [key: string]: boolean} | null =>{
            if(c.value.trim().length == 0){
                return{'sansEspaces':false}
            }
            return null;
        };
    }

    static longueurMinimum(min: number): ValidatorFn {
        return(c: AbstractControl): { [key: string]: boolean} | null =>{
            if(c.value.trim().length >= min){
                return null;
            }

            return{'longueurMinimum':false};
        };
    }
}