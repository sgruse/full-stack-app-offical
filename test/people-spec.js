//END TO END TESTING WITH PROTRACTOR:

// TESTING ELEMENT TAGES
describe('Protractor Testing', function () {
  it('should have a title', function () {
    browser.get('http://localhost:8080');

    expect(browser.getTitle()).toEqual('Client Side!!!');
  });
});

describe('Testing input fields for new person creation', function() {

  var showButton = element(by.css('button.show-button'));
  var createUserButton = element(by.css('button.lime-button'));
  var saveButton = element(by.css('button.save-button'));

  var nameInput = element(by.model('person.name'));
  var ageInput = element(by.model('person.age'));

//BEFORE EACH BLOCK TO START BROWSER:
beforeEach(function() {
  browser.get('http://localhost:8080');
});

it('should make a new person for further testing', function() {
  createUserButton.click();
  element(by.model('person.name')).sendKeys('Mike');
  element(by.model('person.age')).sendKeys(33);

  element(by.css('button.save-button')).click();
})

// TESTING FOR THE CREATION OF A NEW PERSON
  it('should add a person with name and age', function() {
    element(by.css('button.lime-button')).click();
    nameInput.sendKeys('sam');
    ageInput.sendKeys(26);

    element(by.css('button.save-button')).click();
    expect(element(by.binding('person.name')).getText()).
      toEqual('Name: sam');
    expect(element(by.binding('person.age')).getText()).
      toEqual('Age: 26');
  });

// TESTING FOR THE UPDATE OF AN EXISTING PERSON
  it('Should update the first record with a new name and age', function() {
    showButton.click();
    element(by.css('button.green-button')).click();
    element(by.css('input.update-name')).clear();
    element(by.css('input.update-name')).sendKeys('Jordan');
    element(by.css('input.update-age')).clear();
    element(by.css('input.update-age')).sendKeys(100);

// IF I LINK TO MODEL THEN IT SAYS ELEMENTS ARE HIDDEN

    element(by.css('button.save-update')).click();
    showButton.click();
    expect(element(by.binding('person.name')).getText()).
      toEqual('Name: Jordan');
    expect(element(by.binding('person.age')).getText()).
      toEqual('Age: 100');

  });

// TESTING DELETION OF A PERSON
  it('Should delete the updated user', function() {
    element(by.css('button.show-button')).click();
    element(by.css('button.red-button')).click();
    showButton.click();
    // EXPECT THE SECTION BLOCK TO BE EMPTY!!!

    // expect(element(by.binding('person.name')).getText()).
    //   toEqual('Name: Sam');
    // expect(element(by.binding(person.age)).getText()).
    //   toEqual('Age: 26');
    //   console.log('The updated user, Jordan, has been deleted');

  })
});
