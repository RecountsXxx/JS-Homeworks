'use strict'

class Validator {
    #_validateStr = "";
    #_errors = [];
    #_etalonSimple = "0123456789.@wertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    #_etalonExt = "0123456789!@#$%^&*()qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    GetError = (index = 0) => {
        return this.#_errors[index];
    }
    GetErrors = () => {
        return this.#_errors;
    }
    constructor(validateStr) {
        this.Validate(validateStr);
    }

    Validate = (validateStr) => {
        this.#_validateStr = validateStr;
        this.#_errors = [];
        return this;
    }

    MaxLength = (maxCountLetters = 32) => {
        if(this.#_validateStr.length > maxCountLetters) {
            this.#_errors.push("Слишком большая длина");
        }
        return this;
    }
    MinLength = (minCountLetters = 3) => {
        if(this.#_validateStr.length < minCountLetters) {
            this.#_errors.push("Слишком маленькая длина");
        }
        return this;
    }
    IsWrongSimpleLetters = () => {
        for (let i = 0; i < this.#_validateStr.length; i++) {
            if(!this.#_etalonSimple.includes(this.#_validateStr[i])) {
                this.#_errors.push("Строка содержит некоректные символы");
                return this;
            }
        }

        return this;
    }

    IsWrongExtLetters = () => {
        for (let i = 0; i < this.#_validateStr.length; i++) {
            if(!this.#_etalonExt.includes(this.#_validateStr[i])) {
                this.#_errors.push("Строка содержит некоректные символы");
                return this;
            }
        }

        return this;
    }
    IsEmail = () => {
            const emailRegPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (!emailRegPattern.test(this.#_validateStr)) {
                this.#_errors.push("Неверный формат E-mail`a");

        }
        return this;
    }
    IsComplexityPassword = () => {
            const regPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (!regPattern.test(this.#_validateStr)) {
                this.#_errors.push("Пароль не валиден - не достаточно надежен");

        }
        return this;
    }
}
