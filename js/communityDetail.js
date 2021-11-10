const ID_TOKEN = localStorage.getItem("idToken");
const LOGIN_USER_SUB = localStorage.getItem("sub")

//queryParamがないときは新規登録扱いでいい
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
        let input_list = ['communityName', 'content']
        let div_list = ['communityOwner', 'weight', 'createdAt', 'updatedAt']

        //コミュニティ作成者がログインしたユーザーの場合
        if (response_body.communityOwner === LOGIN_USER_SUB) {
            document.getElementById("btnUpdateCommunity").hidden = false;
            document.getElementById("btnDeleteCommunity").hidden = false;

            for (let body_key of Object.keys(response_body)) {
                if (input_list.includes(body_key)) {
                    document.getElementById(body_key).value = response_body[body_key];
                    document.getElementById(body_key).disabled = false;
                } else if (div_list.includes(body_key)) {
                    document.getElementById(body_key).innerText = response_body[body_key];
                }
            }
        }
    }
}

function updateCommunity(){
    let endpoint = `${_config.endpoint.commutityInfo}/`;
    let data = {
        communityId: document.getElementById("communityId").value,
        communityName: document.getElementById("communityName").value,
        content: document.getElementById("content").value
    };
    let params = {
        method: "PUT",
        mode: 'cors',
        headers: {
            Authorization: ID_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                alert("更新しました");
            } else {
                alert("データ読取時にエラーが発生しました");
            }
        })
        .catch(error => {
            alert("データ読取時にエラーが発生しました");
            console.log(error);
        });
}

function deleteCommunity(){

}

function dispAlertForCommunity(type){
    if (type === "join") {
        // アラートでok,ng
        // okならjoinのAPI叩く
    } else if (type == "leave") {

    }
}
