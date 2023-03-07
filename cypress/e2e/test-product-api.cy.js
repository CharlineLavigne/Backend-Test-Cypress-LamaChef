describe("Products API requests", () => {

  let productId;

  it("Creates and retrieves a new product", () => {
    cy.fixture("data.json").then((object) => {
      cy.request(
        "POST", 
        "/product", {
        name: object.name,
        quantity: object.quantity,
        description: object.description,
      })

        .then((res) => {
          cy.log(JSON.stringify(res));
          expect(res.status).to.eq(200); //code response for POST request is supposed to be 201 but it hasn't been yet implemented 
          expect(res.body).has.property("name", object.name);
          productId = res.body.id;
        })

        .then(() => {
          cy.request(
            "GET", 
            "/product/" + productId)

          .then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).has.property("description", object.description);
          });
        });
    });
  });


  it("Modifies a product informations", () => {
    cy.fixture("data.json").then((object) => {

      cy.request(
        "PUT", 
        "/product/" + productId, {
        name: object.name + " updated",
        quantity: object.quantity,
        description: object.description,
      })
      
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.name).include("updated");
      });
    });
  });


  it("Deletes a product", () => {
    cy.request(
        "DELETE", 
        "/product/" + productId)

    .then((res) => {
      expect(res.status).to.eq(200); //code response for DELETE request is supposed to be 204 but it hasn't been yet implemented
      expect(res.body).to.eq(true);
    });
  });


  it("Retrieves the first product from all products availables", () => {
    cy.request(
        "GET", 
        "/products")

      .then((res) => {
        const product = res.body[0].id;
        return product;
      })
      .then((product) => {
        cy.request(
            "GET", 
            "/product/" + product)
            
        .then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).has.property("id", product);
        });
      });
  });
});


