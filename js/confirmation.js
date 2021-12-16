function confirmSignUp() {
    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    let poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.clientId
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let email = document.getElementById("email").value;
    let confirmation_code = document.getElementById("confirmationCode").value;

    let userData = {
        Username: toUsername(email),
        Pool: userPool,
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmation_code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        alert("ユーザー登録が完了しました");
        window.location.href = './login.html';
    });
}
