describe("Testing form inputs.", () =>{
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("tests inputs", () => {

        cy.get(`[data-cy="orderBtn"]`).click();

        cy.get(`[data-cy="name"]`).type("Taylor").should("have.value", "Taylor");

        cy.get(`[data-cy="specInstr"]`).type("Randomness").should("have.value", "Randomness");

        cy.get(`[data-cy="size"]`).select("12 inch").should("have.value", "12 inch");

        cy.get('[type="radio"]').first().check()

        cy.get('[type=checkbox]')
        .check()
        .should("be.checked")

        cy.get(`[data-cy="submitBtn"]`).click()

    })
})