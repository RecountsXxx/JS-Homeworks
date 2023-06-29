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
        //тут я не проверяю потому что и так понятно что пароль не содержит такие символы, так как при регистрации всё проверяеться
        if(document.getElementById('password').value.length > 3) {
            validator.Validate(document.getElementById("password").value).MinLength(8).MaxLength(16);
            if (validator.GetErrors().length > 0) {
                errorLabel.innerHTML = validator.GetError();
                return;
            }
        }
        else
            errorLabel.innerHTML = "Введите пароль!";
    })
})()