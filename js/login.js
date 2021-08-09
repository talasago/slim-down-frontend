function cognitoLogin() {
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

    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: toUsername(email),
        Password: password
    })

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: toUsername(email),
        Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
        //認証成功
        onSuccess: function(result) {
            let accessToken = result.getAccessToken().getJwtToken();
            let idToken = result.getIdToken().getJwtToken();

            console.log("accessToken : " + accessToken);
            console.log("idToken : " + idToken);

            // cognitoIDプールを作成していないため論理削除
            //
            //AWS.config.region = _config.cognito.region;
            //let login_key = `cognito-idp.${_config.cognito.region}.amazonaws.com/${_config.cognito.userPoolId}`
            //AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            //    IdentityPoolId: `}`,
            //    Logins: {
            //        [login_key] : result.getIdToken().getJwtToken(),
            //    },
            //});
            //AWS.config.credentials.refresh(error => {
            //    if (error) {
            //        console.error(error);
            //    } else {
            //        // example: let s3 = new AWS.S3();
            //        console.log('Successfully logged!');
            //    }
            //});
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
}
