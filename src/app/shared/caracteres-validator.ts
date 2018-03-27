import { ValidatorFn } from "@angular/forms";

export class VerifierEspaceValidator{
    static sansEspaces():ValidatorFn{
        return():{ [key: string]: boolean} | null =>{
        return{'sansEspaces':true};
        };
    }
}