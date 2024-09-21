const ps = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "~!@#$%^&*()-_=+[]{}|;:<.>/?,",
};
const passwordLength = document.querySelector(".pass-length input");
const passwordDetails = document.querySelector(".details span");
const passwordIndicator = document.querySelector(".pass-indicator");
const passwordInput = document.querySelector(".input-box input");
const copyButton = document.querySelector(".input-box span");

//  Функція вибирає випадкове число з діапазона
const randomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

const shuffleString = (str) =>
  str
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

const updatePasswordIndicator = (l) => {
  passwordDetails.textContent = l;
  passwordIndicator.classList.remove("strong", "medium");
  if (l > 16) passwordIndicator.classList.add("strong");
  else if (l >= 8) passwordIndicator.classList.add("medium");
};

//  Функція копіює дані з інпута в буфер
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyButton.textContent = "select_check_box";
  copyButton.style.color = "red";
  setTimeout(function () {
    copyButton.textContent = "copy_all";
    copyButton.style.color = "#707070";
  }, 1000);
};

//  Функція зберігає опції при перезагрузці сторінки
const restorePasswordOptions = () => {
  if (localStorage.getItem("passwordOption")) {
    const passwordOption = JSON.parse(localStorage.getItem("passwordOption"));
    uppercase.checked = passwordOption["uppercase"];
    numbers.checked = passwordOption["numbers"];
    symbols.checked = passwordOption["symbols"];
    passwordLength.value = passwordOption.length;
  }
};

//  Функція зберігає опції при перезагрузці сторінки
const savePasswordOption = () => {
  const passwordOption = {};
  passwordOption["length"] = +passwordLength.value;
  passwordOption["uppercase"] = uppercase.checked;
  passwordOption["numbers"] = numbers.checked;
  passwordOption["symbols"] = symbols.checked;
  localStorage.setItem("passwordOption", JSON.stringify(passwordOption));
};

const generatePassword = () => {
  savePasswordOption();
  const length = +passwordLength.value;
  updatePasswordIndicator(length);
  let passString = shuffleString(ps.lowercase);
  if (uppercase.checked) passString = shuffleString(passString + ps.uppercase);

  if (numbers.checked) passString = shuffleString(passString + ps.numbers);
  if (symbols.checked) passString = shuffleString(passString + ps.symbols);

  let randomPassword = "";

  for (let i = 0; i < length; i++) {
    let random = randomInteger(0, passString.length - 1);
    randomPassword += passString[random];
  }
  passwordInput.value = randomPassword;
};

restorePasswordOptions();
passwordLength.oninput = generatePassword;
document.querySelector(".generate-btn").onclick = generatePassword;
generatePassword();
copyButton.onclick = copyPassword;
