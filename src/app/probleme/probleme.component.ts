import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierEspaceValidator } from '../shared/caracteres-validator';
import { ProblemeService } from './probleme.service';
import { IProbleme } from './probleme';

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
      courrielControl.setValidators([Validators.required, Validators.email]);
      confCourrielControl.setValidators([Validators.required, Validators.email]);
    } else if(typeNotification == "MeNotifierTelephone"){
      telephone.enable();
      telephone.setValidators([Validators.required]);
    }
    courrielControl.updateValueAndValidity();
    confCourrielControl.updateValueAndValidity();
    telephone.updateValueAndValidity();
  }

}
