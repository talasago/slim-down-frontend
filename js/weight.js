let id_token = localStorage.getItem("idToken");
let access_token = localStorage.getItem("accessToken");

function weightRegist() {
    let endpoint = "https://p6k8t7vfe1.execute-api.ap-northeast-1.amazonaws.com/dev/";
    let data = {
        weight: document.getElementById("weight").value
    };
    let params = {
        method: "POST",
        mode: 'cors',
        headers: {
            Authorization: id_token
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                alert("登録しました");
            } else {
                alert("登録時にエラーが発生しました");
            }
        })
        .catch(error => {
            alert("登録時にエラーが発生しました");
            console.log(error);
        });
}

function weightDelete() {

}
