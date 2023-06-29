(() => {
    var loginForm = document.querySelector("#loginForm");
    document.getElementById('create_account_btn').addEventListener('click', () => {
        var validator = new Validator(document.getElementById('email_adress').value);
        var errorLabel = document.getElementById("erorr_label");
        errorLabel.innerHTML = "Всё отлично.";
        validator.MaxLength(64).MinLength(9).IsEmail().IsWrongSimpleLetters();
        if(validator.GetErrors().length > 0) {
            errorLabel.innerHTML = validator.GetError();
            return;
        }
        console.log(0);
        if(document.getElementById('password').value == document.getElementById('confirm_password').value) {
            if (document.getElementById('password').value.length > 3) {
                validator.Validate(document.getElementById("password").value).MinLength(8).MaxLength(16).IsComplexityPassword().IsWrongExtLetters();
                if (validator.GetErrors().length > 0) {
                    errorLabel.innerHTML = validator.GetError();
                    return;
                }
            } else
                errorLabel.innerHTML = "Введите пароль!";
        }
        else{
            errorLabel.innerHTML = "Пароли не совпадают!";
        }
    })
})()