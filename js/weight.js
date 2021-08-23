let id_token = localStorage.getItem("idToken");
let access_token = localStorage.getItem("accessToken");

window.onload = function weightReed(){

    query_string = window.location.search;
    let endpoint = `${_config.endpoint.weight}/${query_string}`;
    let params = {
        method: "GET",
        mode: 'cors',
        headers: {
            Authorization: id_token
        },
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("データ読取時にエラーが発生しました");
            }
        })
        .then((response_body) => {
            readContentScreenApply(response_body);
        })
        .catch(error => {
            alert("データ読取時にエラーが発生しました");
            console.log(error);
        });

    function readContentScreenApply(response_body){
        document.getElementById("weight").value = response_body.sub;
    }
}

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
