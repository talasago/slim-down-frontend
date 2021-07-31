function cognitoRegist() {


    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    let poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.clientId
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    userPool.signUp(toUsername(email), password, null, null,
        function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            let cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        }
    );
}
