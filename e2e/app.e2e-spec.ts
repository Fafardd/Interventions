import { AppPage } from './app.po';

describe('interventions App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton sauvegarder avec champs valide scénario nominal', ()=>{
    page.setChampsValidesScenarioNominal();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });
  
  it('doit activer le bouton Sauvegarder avecchamps valides scénario alternatif Parmessage TEXTE', ()=>{
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });
  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', ()=>{
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });
  it('zone NOM a une bordure vert si nombre de caractères suffisant', () => {
    page.setZoneNomProduitCaracteressuffisant();  
    expect(page.obtenirClasseZoneNomProduit()).toContain('is-valid');
  });  
  it('zone NOM a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneNomProduitCaracteresInsuffisant();  
    expect(page.obtenirClasseZoneNomProduit()).toContain('is-invalid');
  });  
});
