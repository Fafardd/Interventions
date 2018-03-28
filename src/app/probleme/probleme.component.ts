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
      noProbleme: ['',Validators.required]
    });

    this.probleme.obtenirProbleme()
    .subscribe(cat => this.problemeProduits = cat,
                error => this.errorMessage = <any>error);
  }

}
