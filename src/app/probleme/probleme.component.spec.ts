import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AngularFontAwesomeModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('Zone PRÉNOM invalide avec 2 caractères', ()=>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères',() => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(5));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () =>{
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBe(false);
  });

  it('Zone PRÉNOM invalide avec 1 caractère ', () =>{
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });
  
  it('Zone PRÉNOM invalide avec 50 espaces ', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(50));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBe(false);
  });

  it('Zone COURRIEL est désactivée si ne pas notifier', ()=>{
    component.appliquerNotifications('NePasMeNotifierNon');

    let zone = component.problemeForm.get('courrielsGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est désactivée si ne pas notifier',()=>{
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMATION COURRIEL est désactivée si ne pas notifier', ()=>{
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide si ne pas notifier', ()=>{
    component.appliquerNotifications('NePasMeNotifierNon');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();

  });

  it('Zone COURRIEL est vide si ne pas notifier', ()=>{
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.get('courrielsGroup.courriel');
    expect(zone.value).toBeNull();

  });

  it('Zone CONFIRMATION COURRIEL est vide si ne pas notifier', ()=>{
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    expect(zone.value).toBeNull();

  });

});
