const apiSecrets=require("../../fixtures/secrets.json");

describe('Smoke Test - Oxford API Methods', function () {
    Cypress.config({
        baseUrl: 'https://od-api.oxforddictionaries.com/api/v2'
      })

        it('Check 200 : Orgin of word api- insurance',()=>{
            cy.request({
                method: 'GET',
                url: `/entries/en-gb/insurance?fields=etymologies&strictMatch=false`,
                headers:{
                        'app_id': apiSecrets.app_id,
                        'app_key': apiSecrets.app_key
                        } 
              }).then((response) => {
                expect(response).to.have.property('status',200)
                expect(response.body).to.not.be.null
                expect(response.body).has.property("id","insurance")
                
                expect(response.body.results[0].lexicalEntries[0].entries[0].etymologies).to.not.be.null
              })
   
    });

    it('Check 404 : Orgin of word api- insurance',()=>{
        cy.request({
            method: 'GET',
            url: `/entries/en-gb1/insurance?fields=etymologies&strictMatch=false`,
            failOnStatusCode: false,
            headers:{
                    'app_id': apiSecrets.app_id,
                    'app_key': apiSecrets.app_key
                    } 
          }).then((response) => {
            expect(response).to.have.property('status',404)
          })

});
   
it('Check 400 (stubbed) : Orgin of word api- insurance',()=>{

    cy.intercept('GET','*', {  statusCode: 400   })
      
    cy.request({
        method: 'GET',
        url: '/entries/en-gb/insurance?fields=etymologies&strictMatch=false',
        failOnStatusCode: false,
        headers:{
                'app_id': apiSecrets.app_id,
                'app_key': apiSecrets.app_key
                } 
      }).then((response) => {
        expect(response).to.have.property('status',400)
      })
      
});

})