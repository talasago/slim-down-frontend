const ID_TOKEN = localStorage.getItem("idToken");
const LOGIN_USER_SUB = localStorage.getItem("sub")
const ABLED_INPUT_LIST = ['communityId', 'communityName', 'content']
const ABLED_DIV_LIST = ['communityOwner', 'weight', 'createdAt', 'updatedAt']

//queryParamがないときは新規登録扱いでいい
window.onload = () => {
    (window.location.search === '') ? communityNewRegist() : communityReed();
}

function communityNewRegist() {
    document.getElementById("btnRegistCommunity").hidden = false;
    for (let input_id of ABLED_INPUT_LIST) {
        document.getElementById(input_id).disabled = false;
    }
}

function communityReed(){
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
        //コミュニティ作成者がログインしたユーザーの場合
        if (response_body.communityOwner === LOGIN_USER_SUB) {
            document.getElementById("btnUpdateCommunity").hidden = false;
            document.getElementById("btnDeleteCommunity").hidden = false;

            //HACK:
            for (let body_key of Object.keys(response_body)) {
                if (ABLED_INPUT_LIST.includes(body_key)) {
                    document.getElementById(body_key).value = response_body[body_key];
                    //IDはキーなので変更不可
                    if (body_key !== "communityId") {
                        document.getElementById(body_key).disabled = false;
                    }
                } else if (ABLED_DIV_LIST.includes(body_key)) {
                    document.getElementById(body_key).innerText = response_body[body_key];
                }
            }
        }
    }
}

function updateCommunity() {
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

function registCommunity(){
    let endpoint = `${_config.endpoint.commutityInfo}/`;
    let data = {
        communityId: document.getElementById("communityId").value,
        communityName: document.getElementById("communityName").value,
        communityOwnerSub: LOGIN_USER_SUB,
        content: document.getElementById("content").value
    };
    let params = {
        method: "POST",
        mode: 'cors',
        headers: {
            Authorization: ID_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                alert("登録しました");
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
