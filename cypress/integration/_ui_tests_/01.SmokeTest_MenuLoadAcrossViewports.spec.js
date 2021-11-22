import HomePage from '../../pageobjects/poHomePage';

describe('Smoke Test - CBA Portal', function () {
    const objHomePage = new HomePage();
    //const testMenuData= require("../../../fixtures/menu.json");
    const screenResolution=require("../../fixtures/screenResolution.json");

    screenResolution.forEach((screen) => {
        it(`Test page loads for different menu options for ${screen.resName} viewport`,()=>{
            cy.viewport(parseInt(screen.width),parseInt(screen.height))
            cy.visit('/');
            cy.fixture('menu').then((testMenuDataJSON)=>{
                /*  for (let j = 0; j < testMenuDataJSON.length; j++){
                        objHomePage.menuHome().contains(testMenuDataJSON[j].menu).click()
                        cy.url().should('include', testMenuDataJSON[j].url)
                    }  */
                    cy.get(testMenuDataJSON).each((menuRecords) =>
                    {
                        objHomePage.menuHome().contains(menuRecords.menu).click()
                        cy.url().should('include', menuRecords.url)
                    })
            })
        })
    });

    //end of describe block
})