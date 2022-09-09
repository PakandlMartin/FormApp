// NAČÍTÁNÍ ELEMENTŮ Z HTML
const userNameInput = document.querySelector(".userName");
const passwordInput = document.querySelector(".password");
const passwordConfirmInput = document.querySelector(".passwordConfirm");
const emailInput = document.querySelector(".email");
const dateInput = document.querySelector(".date");
const registerBtn = document.querySelector(".btnRegister");
const userListCardParagraph = document.querySelector(".userListCardParagraph");

// FUNKCE NA VALIDACI POMOCÍ REGEXU
const validationFunc = (value, regex) => {
  return regex.test(value) ? true : false;
};

// OBJEKT UŽIVATELE - JSOU ZDE ÚKLÁDÁNY JENDOTLIVÉ INFOMRACE Z FORMULÁŘE
let user = {
  userName: "",
  password: "",
  passwordValid: false,
  passwordValidConfirm: false,
  email: "",
  date: "",
};

// VALIDACE JMÉNA
const validateUserNameInput = () => {
  if (validationFunc(userNameInput.value, /^.{4,64}$/)) {
    document.querySelector(".userNameWarning").style.display = "none";
    user.userName = userNameInput.value;
  } else {
    document.querySelector(".userNameWarning").style.display = "block";
  }
};

// ZJIŠŤUJE ZDA SE V TEXTU NACHÁZÍ VELKÉ PÍSMENO
const findUpperCase = (text) => {
  if (text.toLowerCase() === text) {
    return false;
  } else {
    return true;
  }
};
// VALIDACE HESLA
const validatepasswordInput = () => {
  if (
    validationFunc(passwordInput.value, /^.{8,64}$/) &&
    validationFunc(passwordInput.value, /\W|_/g) &&
    findUpperCase(passwordInput.value)
  ) {
    document.querySelector(".passwordWarningLengthVal").style.display = "none";
    document.querySelector(".passwordWarningChararactersVal").style.display =
      "none";

    user.passwordValid = true;
  }

  if (!validationFunc(passwordInput.value, /^.{8,64}$/)) {
    document.querySelector(".passwordWarningLengthVal").style.display = "block";
  } else if (
    validationFunc(passwordInput.value, /\W|_/g) &&
    findUpperCase(passwordInput.value)
  ) {
    document.querySelector(".passwordWarningChararactersVal").style.display =
      "none";
  }

  if (
    !validationFunc(passwordInput.value, /\W|_/g) ||
    !findUpperCase(passwordInput.value)
  ) {
    document.querySelector(".passwordWarningChararactersVal").style.display =
      "block";
  } else if (validationFunc(passwordInput.value, /^.{8,64}$/)) {
    document.querySelector(".passwordWarningLengthVal").style.display = "none";
  }
  user.password = passwordInput.value;
};

// VALIDACE STEJNÉ HODNOTY U OBOU HESEL
const confirmPasswordInput = () => {
  if (passwordConfirmInput.value === user.password) {
    user.passwordValidConfirm = true;
    document.querySelector(".passwordConfirmWarning").style.display = "none";
  } else {
    document.querySelector(".passwordConfirmWarning").style.display = "block";
  }
};

// VALIDACE EMAILU
const confirmEmail = () => {
  const mailString = emailInput.value;
  const mailArr = mailString.split("");
  const mailConfirm = mailArr.some((str) => {
    return str === "@";
  });

  if (!mailConfirm) {
    document.querySelector(".emailConfirmWarning").style.display = "block";
  } else {
    document.querySelector(".emailConfirmWarning").style.display = "none";
    user.email = emailInput.value;
  }
};

// VALIDACE DATA
const validatedateInput = () => {
  user.date = dateInput.value;
  if (dateInput.value) {
    document.querySelector(".dateConfirmWarning").style.display = "none";
  } else {
    document.querySelector(".dateConfirmWarning").style.display = "block";
  }
};

// VYČISTÍ INPUTY U FORMULÁŘE
const clearInputs = () => {
  userNameInput.value = "";
  passwordInput.value = "";
  passwordConfirmInput.value = "";
  emailInput.value = "";
  dateInput.value = "";
  registerBtn.value = "";
};

// ZJISTÍ, ZDA JSOU ZADÁNY VŠECHNY POTŘEBNÉ ÚDAJE
const userValidateInfo = () => {
  if (
    user.userName &&
    user.password &&
    user.passwordValid &&
    user.passwordValidConfirm &&
    user.email &&
    user.date
  ) {
    return true;
  } else {
    return false;
  }
};

// UKÁŽE INFORMACE O UŽIVATELI NA STRÁNCE
const saveUser = () => {
  userListCardParagraph.innerHTML = `${user.userName} - ${user.email} - ${user.date}`;
};

// REAGUJE NA KLIKNUTÍ TLAČÍTKA REGISTER
registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateUserNameInput();
  validatepasswordInput();
  confirmPasswordInput();
  confirmEmail();
  validatedateInput();
  
  // POKUD NEJSOU INFORMACE VALIDNÍ, VYMAŽE INFORMACE Z OBJEKTU UŽIVATELE
if (!userValidateInfo()) {
    clearInputs();
}

  // POKUD JSOU VŠECHNY INFORMACE VALIDNÍ, VYČISTÍ INPUTY A UKÁŽE INFORMACE O UŽIVATELI
  if (userValidateInfo()) {
    saveUser();
    clearInputs();
  }
});
