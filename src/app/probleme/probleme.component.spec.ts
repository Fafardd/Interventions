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

  it('Zone TELEPHONE est désicativée quand notifier par courriel', ()=>{
    component.appliquerNotifications('MeNotifierCourriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est activée quand notifié par courriel', ()=>{
    component.appliquerNotifications('MeNotifierCourriel');
    let zone = component.problemeForm.get('courrielsGroup.courriel');
    expect(zone.enable).toBeTruthy();
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel',()=>{
    component.appliquerNotifications('MeNotifierCourriel');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    expect(zone.enable).toBeTruthy();
  });

  it('Zone ADRESSE COURRIEL est invalide quand sans valeur notifier par courriel',()=>{
    component.appliquerNotifications('MeNotifierCourriel');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone CONFIRMER COURRIEL est invalide quand sans valeur notifier par courriel',()=>{
    component.appliquerNotifications('MeNotifierCourriel');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme',()=>{
    component.appliquerNotifications('MeNotifierCourriel');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    zone.setValue('gfdsg');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL sans valeur et zone CONFIRMER COURRIEL avec valeur valide retourne null',()=>{
    let errors = {};
    component.appliquerNotifications('MeNotifierCourriel');
    // let zone = component.problemeForm.get('courrielsGroup.courriel');
    // let zone2 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone1 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone2 = component.problemeForm.get('courrielsGroup.courriel');
    zone1.setValue('aaa@aaa.com');
    let group = component.problemeForm.get('courrielsGroup');
    errors = group.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
    
    
  });

  it('Zone ADRESSE COURRIEL avec valeur valide et zone CONFIRMER COURRIEL sans valeur retourne null',()=>{
    let errors = {};
    component.appliquerNotifications('MeNotifierCourriel');
    // let zone = component.problemeForm.get('courrielsGroup.courriel');
    // let zone2 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone1 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone2 = component.problemeForm.get('courrielsGroup.courriel');
    zone2.setValue('aaa@aaa.com');
    let group = component.problemeForm.get('courrielsGroup');
    errors = group.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

  it('Zone ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel',()=>{
    let errors = {};
    component.appliquerNotifications('MeNotifierCourriel');
    // let zone = component.problemeForm.get('courrielsGroup.courriel');
    // let zone2 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone1 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone2 = component.problemeForm.get('courrielsGroup.courriel');
    zone1.setValue('aaa@aaa.com');
    zone2.setValue('aaa@aa.com');
    let group = component.problemeForm.get('courrielsGroup');
    errors = group.errors || {};
   // expect(errors['courrielConfirmation']).toBeUndefined();
   expect(group.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel',()=>{
    let errors = {};
    component.appliquerNotifications('MeNotifierCourriel');
    // let zone = component.problemeForm.get('courrielsGroup.courriel');
    // let zone2 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone1 = component.problemeForm.get('courrielsGroup.confCourriel');
    let zone2 = component.problemeForm.get('courrielsGroup.courriel');
    zone1.setValue('aaa@aaa.com');
    zone2.setValue('aaa@aaa.com');
    let group = component.problemeForm.get('courrielsGroup');
    errors = group.errors || {};
   // expect(errors['courrielConfirmation']).toBeUndefined();
   expect(group.status).toEqual('VALID');
  });

  it('Zone TELEPHONE est activée quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    expect(zone.enable).toBeTruthy();
  });

  it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('courrielsGroup.courriel');
    expect(zone.status).toBe('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('courrielsGroup.confCourriel');
    expect(zone.status).toBe('DISABLED');
  });

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toBe('INVALID');
  });

  it('Zone TELEPHONE est invalide avec des caractères non-numérique quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('gfsdgfs');
    expect(zone.status).toBe('INVALID');
  });

  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('999999999');
    expect(zone.status).toBe('INVALID');
  });

  it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('99999999999');
    expect(zone.status).toBe('INVALID');
  });

  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte',()=>{
    component.appliquerNotifications('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('9999999999');
    expect(zone.status).toBe('VALID');
  });

});
