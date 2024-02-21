describe('Segment Creation', () => {
  it('should create a new segment with specified criteria', () => {
    cy.visit('https://app.gameball.co'); // Gameball login URL

    // Wait for the title to be 'Gameball | Dashboard'
    cy.title().should('eq', 'Gameball | Dashboard');

    // Wait for the email input field to be available and type the values in the fields 
    cy.wait(2000);
    cy.get('[data-automation-id="textfield_username"]').type('testgameballacct@gmail.com');
    cy.get('[data-automation-id="textfield_password"]').type('Testing1234@');
    cy.get('[data-automation-id="btn_login"]').click();

    // Skip the two-factor authentication
    cy.wait(2000); 
    cy.get('[data-automation-id="btn_skipAuth"]').click();

    // Navigate to Players then Segments 
    cy.get('[data-automation-id="link_players"]').click();
    cy.wait(2000);
    cy.get('[data-automation-id="link_segments"]').click();

    // Click on Create new segment button
    cy.get('[data-automation-id="btn_createSegment"]').click({force:true});

    // Fill in the randomly generated segment and tag
    const segmentName = generateRandomString(10);
    const segmentTag = generateRandomString(8);

    cy.get('[data-automation-id="textfield_segmentName"]').type(segmentName);
    cy.get('[data-automation-id="textfield_segmentTag"]').type(segmentTag);

    cy.get('[data-automation-id="dropdown_"]').click(); // Clicking on the first dropdown
    cy.get('[data-automation-id="dropdown_item__1"]').contains('Player Attribute').click(); // Choosing Player Attribute item from the first dropdown
    
    cy.get('[data-automation-id="dropdown_"]').contains('Choose Filter Attribute').click(); // After the first dropdown appears it should contain 'Choose Filter Attribute' as both dropdowns have the same data-automation-id
    cy.get('[data-automation-id="dropdown_item__1"]').contains('Player Email').click(); // Choose Player Email in the second dropdown
    
    cy.get('[data-automation-id="dropdown_segmentOperator"]').click();
    cy.get('[data-automation-id="dropdown_item_segmentOperator_1"]').contains('is').click();

    cy.get('[data-automation-id="textfield_segmentPoints"]').type('testgameballacct@gmail.com'); 

    // Click on Create button
    cy.get('[data-automation-id="btn_segmentCreate"]').click(); //After all the segment details are ready confirm by clicking the create button

    // Verify segment name creation
    cy.contains('[data-automation-id="p_segmentName_1"]', segmentName).should('be.visible');
    //cy.contains('[data-automation-id="div_segmentTag_1"]', segmentTag).should('be.visible'); //the segment tag itself doesnt have its own data-automation id, im guessing the one that exists is for the entire svg so i wasnt able to verify the tag name 
    
    //Delete the segment that you have created
    cy.get('[data-automation-id="p_segmentName_1"]').click();
    cy.get('[data-automation-id="img_deleteSegment"]').click();
    cy.get('[data-automation-id="btn_confirmDelete"]').click();
    //Verify Deleting the segment
    cy.contains('[data-automation-id="p_segmentName_1"]', segmentName).should('not.exist');
  });
});


function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

