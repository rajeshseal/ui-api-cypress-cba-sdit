class HomePage{
    menuHome(){
        return cy.get("ul[class='commbank-list']").children()
    }
}

export default HomePage