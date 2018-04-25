import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomId')).sendKeys('fdsaf');
    element(by.id('nomId')).sendKeys('fdfdsaaaaaaaa');
    element(by.id('noProblemeId')).all(by.tagName('option')).get(1).click();
    element.all(by.id('notificationID')).get(0).click();
    element(by.id('descriptionProblemeId')).sendKeys('desc prob');
  }

  boutonSubmit() : ElementFinder {
    return element(by.buttonText('Sauvegarder'));
  }

  setZoneNomProduitCaracteresInsuffisant() : void {
    element(by.id('prenomId')).clear();
    element(by.id('prenomId')).sendKeys('XX');
  }
  setZoneNomProduitCaracteressuffisant() : void {
    element(by.id('prenomId')).clear();
    element(by.id('prenomId')).sendKeys('XXX');
  }

  obtenirClasseZoneNomProduit()   { 
    return element(by.id('prenomId')).getAttribute("class");
  }  
  
  setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notificationID')).get(2).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 
   setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notificationID')).get(1).click();
    element(by.id('courrielId')).sendKeys('aa@bbb.com');
    element(by.id('confCourrielId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 
   
}
