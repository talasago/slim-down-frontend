function cognitoRegist() {
    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    let poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.clientId
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let attributeList = [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let dataEmail = {
        Name: 'email',
        Value: email
    };
    let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(toUsername(email), password, attributeList, null,
        function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            let cognitoUser = result.user;
            //TODO:登録成功メッセージの追加
            console.log('user name is ' + cognitoUser.getUsername());
        }
    );
}
