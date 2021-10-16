let id_token = localStorage.getItem("idToken");
let access_token = localStorage.getItem("accessToken");
let sub = localStorage.getItem("sub");

window.onload = function communityReed(){
    //subはクエリパラメータで取得
    let endpoint = `${_config.endpoint.weight}/info/`;
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
        console.log(response_body)
    }
}
