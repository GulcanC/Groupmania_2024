const passwordValidator = require("password-validator")

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(6)                                  // Minimum length 6
    .is().max(6)                                  // Maximum length 6
    .has().uppercase(1)                           // Must have uppercase letters
    .has().lowercase(1)                           // Must have lowercase letters
    .has().digits(3)                              // Must have  3 digits
    .has().symbols(1)                             // 1 symbol                   
    .has().not().spaces()                         // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passwordSchema;