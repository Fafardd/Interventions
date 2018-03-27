import { VerifierEspaceValidator } from "./caracteres-validator";

describe('sansEspaces Validator',()=>{
    it('une chaine vide est invalide',()=>{
        let validator = VerifierEspaceValidator.sansEspaces();
        let result = validator(null);
        expect(result['sansEspaces']).toBe(true);
    });
});