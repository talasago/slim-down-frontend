function cognitoLogin() {
    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    let endpoint = _config.endpoint.auth;
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
                return response.json();
            } else {
                alert("ログイン時にエラーが発生しました");
            }
        })
        .then((response_body) => {
            authSuccess(response_body);
        })
        .catch(error => {
            alert("ログイン時にエラーが発生しました");
            console.log(error);
        });

    function authSuccess(response_body){
        localStorage.setItem("idToken", response_body.idToken);
        localStorage.setItem("accessToken", response_body.accessToken);
        localStorage.setItem("sub", response_body.sub);
        localStorage.setItem("userBelongCommunityId", response_body.userBelongCommunityId);

        alert("ログインしました");

        // ログイン後のページへ遷移
        //window.location.href = `./weight.html?sub=${response_body.sub}`
        window.location.href = `./community_list.html`
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
