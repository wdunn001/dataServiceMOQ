# Steps I had to perform 

- Since I have an existing compiled version of node sass I had to delete the package-lock.json and force a node-sass rebuild to prevent build errors.
- There was a missing dev dependency webpack-dev-server which was added
- added simple application folder structure
- moved api.service to services folder
- created new question-response interface
- created question interface
- added forms module and reactive forms module
- added simplified http data service to increase readability and abstract http logic
- added crypto-js to implement MD5 with 100% confidence and added generateAuthToken method to data service
- added auto-complete with custom form control
- add formBuilder logic
- added templating
- added custom theme and styling
- add trackByPipe
- add formSubmit logic