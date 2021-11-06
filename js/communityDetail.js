const ID_TOKEN = localStorage.getItem("idToken");
const LOGIN_USER_SUB = localStorage.getItem("sub")

window.onload = function communityReed(){
    let queryParam = window.location.search;
    let endpoint = `${_config.endpoint.commutityInfo}/${queryParam}`;
    let params = {
        method: "GET",
        mode: 'cors',
        headers: {
            Authorization: ID_TOKEN
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
        // APIで取得した内容を設定

        let input_list = ['communityId', 'communityName', 'content']
        let div_list = ['communityOwner', 'weight', 'createdAt', 'updatedAt']

        //コミュニティ作成者がログインしたユーザーの場合
        if (response_body.communityOwner === LOGIN_USER_SUB) {
            for (let body_key of Object.keys(response_body)) {
                if (input_list.includes(body_key)) {
                    document.getElementById(body_key).value = response_body['body_key'];
                    document.getElementById(body_key).disabled = false;
                } else if (div_list.includes(body_key)) {
                    document.getElementById(body_key).innerText = response_body['body_key'];
                }
            }
        }
    }
}
