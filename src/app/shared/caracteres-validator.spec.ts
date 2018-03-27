import { VerifierEspaceValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator',()=>{
    it('une chaine vide est invalide',()=>{
        let control = { value: '' };
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });

    it('une chaine avec 10 espaces est invalide', ()=>{
        let control = { value: '          ' };
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });

    it('une chaine avec des mots', ()=>{
        let control = { value: 'kevin' };
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });

    it('une chaine avec des mots', ()=>{
        let control = { value: '   qwe   ' };
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });
});