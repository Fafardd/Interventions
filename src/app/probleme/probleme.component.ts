import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { VerifierEspaceValidator } from '../shared/caracteres-validator';
import { ProblemeService } from './probleme.service';
import { IProbleme } from './probleme';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

// function courrielsValides(c: AbstractControl): {[key: string]: boolean} | null {
// let courriel = c.get('courriel');
// let confCourriel = c.get('confCourriel');

// if(!courriel.value || !confCourriel.value){
//   return null;
// }

// if(courriel.value != confCourriel.value){
//   return null;
// }

// return {'courrielInvalides': true};
// }

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  problemeProduits: IProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private probleme: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierEspaceValidator.sansEspaces(), VerifierEspaceValidator.longueurMinimum(3)]],
      noProbleme: ['',Validators.required],
      telephone: [{value: '', disabled: true}],
      notification: ['PasMeNotifier'],
      courrielsGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        confCourriel: [{value: '', disabled: true}]
      })
    });

    this.probleme.obtenirProbleme()
    .subscribe(cat => this.problemeProduits = cat,
                error => this.errorMessage = <any>error);
  }

  appliquerNotifications(typeNotification: string ): void{
    
    const courrielControl = this.problemeForm.get('courrielsGroup.courriel');
    const confCourrielControl = this.problemeForm.get('courrielsGroup.confCourriel');
    const telephone = this.problemeForm.get('telephone');
    const courrielGroupControl = this.problemeForm.get('courrielsGroup');
    
    courrielControl.clearValidators();
    confCourrielControl.clearValidators();
    telephone.clearValidators();

    courrielControl.reset();
    confCourrielControl.reset();
    telephone.reset();

    courrielControl.disable();
    confCourrielControl.disable();
    telephone.disable();

    if(typeNotification == "MeNotifierCourriel"){
      courrielControl.enable();
      confCourrielControl.enable();
      courrielControl.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      confCourrielControl.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielConfirmation()])]);
    } else if(typeNotification == "MeNotifierMessagerie"){
      telephone.enable();
      telephone.setValidators([Validators.required, Validators.pattern('[0-9]+'),Validators.minLength(10),Validators.maxLength(10)]);
    }
    courrielControl.updateValueAndValidity();
    confCourrielControl.updateValueAndValidity();
    telephone.updateValueAndValidity();
  }

}
