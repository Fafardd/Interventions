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
        let control = { value: 'kevin est un etudiant' };
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });

    it('une phrase avec des espaces, un mot et des espaces', ()=>{
        let control = { value: '   qwe   ' };
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });

    it('une expression avec 1 espace et 2 caractère est invalide', ()=>{
        let control = { value: ' xx'};
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une expression avec 2 espaces et 1 caractère est invalide', ()=>{
        let control = { value: '  x'};
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', ()=>{
        let control = { value: "   J'aime Angular"};
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', ()=>{
        let control = { value: "     J'aime Angular     "};
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });
});