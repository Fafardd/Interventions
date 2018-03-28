import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierEspaceValidator } from '../shared/caracteres-validator';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.minLength(3), Validators.required, VerifierEspaceValidator.sansEspaces(), VerifierEspaceValidator.longueurMinimum(3)]],
      quantite:['',[VerifierEspaceValidator.sansEspaces()]]
      
    });
  }

}
