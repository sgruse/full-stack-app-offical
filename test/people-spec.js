// describe('Protractor Testing', function () {
//   it('should have a title', function () {
//     browser.get('http://localhost:8080');
//
//     expect(browser.getTitle()).toEqual('Client Side!!!');
//   });
// });
//


// spec.js
describe('Protractor Demo App', function() {
  it('should add a person', function() {
    browser.get('http://localhost:8080');
    element(by.id('create-button')).click();
    element(by.id('name-field')).sendKeys('sam');
    // element(by.model('person.age')).sendKeys(2);

    element(by.id('save-button')).click();
    console.log("TESTING");
    expect(element(by.id('result-name')).getText()).
        toEqual('sam'); // This is wrong!
  });
});
