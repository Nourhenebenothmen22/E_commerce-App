// middlewares/validators/userValidator.js
const { body } = require("express-validator");

exports.registerUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Le nom est requis")
    .isLength({ min: 3 })
    .withMessage("Le nom doit contenir au moins 3 caractères"),

  body("email")
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Email invalide"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),

  body("role")
    .optional()
    .isIn(["customer", "admin"])
    .withMessage("Rôle invalide"),
];
