describe('API Test', () => {
    let userId;
    it('should display response body', () => {
      // Make a GET request to the API
      cy.request('https://reqres.in/api/users/2')
        .then(response => {
          // Log the response body to the Cypress command log
          cy.log(JSON.stringify(response.body, null, 2));
           // Get the user object from the response body
        const email = response.body.data.email;
        cy.log(email);
        });
    });
        it('should display user data from POST response', () => {
          // Make a POST request to the API
          cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
              id: 500,
              name: 'John Doe',
              job: 'Software QA'
             
            }
          }).then(response => {
            // Get the name from the response body
            const name = response.body.name;
            const job = response.body.job;
      
            // Log the name to the Cypress command log
            cy.log(name + " - " +job);
            userId = response.body.id;
            cy.log('Created user ID:', userId);
          });
        });

        it('should update user data using PATCH request', () => {
            // Check if userId is set (from the POST request)
            if (!userId) {
              throw new Error('User ID is not set');
            }
        
            // Make a PATCH request to update the user
            cy.request({
              method: 'PATCH',
              url: `https://reqres.in/api/users/${userId}`,
              body: {
                name: 'John Foe',
                job: 'QA Lead'
              }
            }).then(response => {
              // Log the response body to the Cypress command log
              cy.log(JSON.stringify(response.body, null, 2));
            });
          });
          it('should put additional info', () => {
          
            // Make a GET request to get the updated user data
            cy.request({
              method: 'PUT',
              url: `https://reqres.in/api/users/${userId}`,
              body: {
                name: 'John Foe',
                job: 'QA Lead',
                age: 45
              }
            }).then(response => {
                expect(response.status).to.eq(200);
              cy.log(JSON.stringify(response.body, null, 2)); })
                
            });
          
          it('should display error when not found', () => {
            if (!userId) {
                throw new Error('User ID is not set');
              }
              // Make a GET request to get the updated user data
              cy.request({
                method: 'GET',
                url: `https://reqres.in/api/users/${userId}`,
                failOnStatusCode: false
              }).then(response => {
                if (response.status === 404) {
                    // Handle the 404 response
                    cy.log('User not found');
                    expect(response.status).to.eq(404);
                  } else {
                cy.log(JSON.stringify(response.body, null, 2)); }
                  });
            
          });

          it('should delete user using DELETE request', () => {
            // Make a DELETE request to the API to delete the user with id 2
            cy.request({
              method: 'DELETE',
              url: 'https://reqres.in/api/users/2'
            }).then(response => {
              // Log the response body to the Cypress command log
              expect(response.status).to.eq(204);
              cy.log(JSON.stringify(response.body, null, 2));

            });
          });
        });
      