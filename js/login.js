function cognitoLogin() {
    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    let endpoint = "https://a5pca4fu68.execute-api.ap-northeast-1.amazonaws.com/dev/auth";
    let data = {
        email: toUsername(document.getElementById("email").value),
        password: document.getElementById("password").value
    };
    let params = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                return response.json;
            } else {
                alert("ログイン時にエラーが発生しました");
            }
        })
        .then((result) => {
            authSuccess(result);
        })
        .catch(error => {
            alert("ログイン時にエラーが発生しました");
            console.log(error);
        });

    function authSuccess(json){
        data = json.body;

        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("accessToken", data.accessToken);

        alert("ログインしました");

        // ログイン後のページへ遷移
        window.location.href = `./weight.html?sub=${data.sub}`

    }
    //let poolData = {
    //    UserPoolId: _config.cognito.userPoolId,
    //    ClientId: _config.cognito.clientId
    //};
    //let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


    //let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    //    Username: toUsername(email),
    //    Password: password
    //})

    //let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    //    Username: toUsername(email),
    //    Pool: userPool
    //});

}
