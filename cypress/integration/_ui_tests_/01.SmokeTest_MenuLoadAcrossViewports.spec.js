import HomePage from '../../pageobjects/poHomePage';

describe('Smoke Test - CBA Portal', function () {
    const objHomePage = new HomePage();
    const screenResolution = require("../../fixtures/screenResolution.json");

    screenResolution.forEach((screen) => {
        it(`Test page loads for different menu options for ${screen.resName} viewport`, () => {
            cy.viewport(parseInt(screen.width), parseInt(screen.height))
            cy.visit('/');
            cy.fixture('menu').then((testMenuDataJSON) => {
                cy.get(testMenuDataJSON).each((menuRecords) => {
                    objHomePage.menuHome().contains(menuRecords.menu).click()
                    cy.url().should('include', menuRecords.url)
                })
            })
        })
    });

    //end of describe block
})