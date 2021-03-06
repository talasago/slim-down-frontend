const ID_TOKEN = localStorage.getItem("idToken");
const LOGIN_USER_SUB = localStorage.getItem("sub");
const ACCESS_TOKEN = localStorage.getItem("accessToken");
const BELONG_GCOMMUNITY_ID = localStorage.getItem("userBelongCommunityId");
const ABLED_INPUT_LIST = ['communityId', 'communityName', 'content'];
const ABLED_DIV_LIST = ['communityOwner', 'weight', 'createdAt', 'updatedAt'];

//queryParamがないときは新規登録扱いでいい
window.onload = () => {
    (window.location.search === '') ? communityNewRegist() : communityReed();
    setLink();
}

function setLink() {
    let a = document.getElementById("linkWeightRegist");
    a.href = `./weight.html?sub=${LOGIN_USER_SUB}`;
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
        //コミュニティ作成者がログインしたユーザーの場合
        if (response_body.communityOwner === LOGIN_USER_SUB) {
            document.getElementById("btnUpdateCommunity").hidden = false;
            document.getElementById("btnDeleteCommunity").hidden = false;
        }

        // 該当のコミュニティに入っている場合
        let user_belong_communityid = localStorage.getItem("userBelongCommunityId");
        if (user_belong_communityid === response_body.communityId) {
            document.getElementById("btnCommunityLeave").hidden = false;
        } else if (user_belong_communityid === null
                || user_belong_communityid === ''
                || user_belong_communityid === 'null') {
            document.getElementById("btnCommunityJoin").hidden = false;
        }

        // APIレスポンスの内容を設定
        //HACK:
        for (let body_key of Object.keys(response_body)) {
            if (ABLED_INPUT_LIST.includes(body_key)) {
                document.getElementById(body_key).value = response_body[body_key];
                //IDはキーなので変更不可。新規登録だけ可能。
                if (body_key !== "communityId") {
                    document.getElementById(body_key).disabled = false;
                }
            } else if (ABLED_DIV_LIST.includes(body_key)) {
                document.getElementById(body_key).innerText = response_body[body_key];
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
                alert("データ更新時にエラーが発生しました");
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
                localStorage.setItem("userBelongCommunityId", document.getElementById("communityId").value);
            } else {
                alert("データ登録時にエラーが発生しました");
            }
        })
        .catch(error => {
            alert("データ登録時にエラーが発生しました");
            console.log(error);
        });
}

function deleteCommunity(){
    let endpoint = `${_config.endpoint.commutityInfo}/`;
    let data = {
        communityId: document.getElementById("communityId").value,
    };
    let params = {
        method: "DELETE",
        mode: 'cors',
        headers: {
            Authorization: ID_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                alert("削除しました");
                localStorage.removeItem("userBelongCommunityId");
            } else {
                alert("データ削除時にエラーが発生しました");
            }
        })
        .catch(error => {
            alert("データ削除時にエラーが発生しました");
            console.log(error);
        });
}

function joinCommunity(){
    let endpoint = `${_config.endpoint.community}/`;
    let data = {
        communityId: document.getElementById("communityId").value,
        sub: LOGIN_USER_SUB,
        //NOTE:tokenをbodyに入れていいのだろうか...
        AccessToken: ACCESS_TOKEN
    };
    let params = {
        method: "PUT",
        mode: 'cors',
        headers: {
            Authorization: ID_TOKEN,
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                alert("コミュニティに参加しました");
                localStorage.setItem("userBelongCommunityId", document.getElementById("communityId").value);
                document.getElementById("btnCommunityJoin").hidden = true;
                document.getElementById("btnCommunityLeave").hidden = false;
            } else {
                alert("コミュニティに参加時にエラーが発生しました");
            }
        })
        .catch(error => {
            alert("コミュニティに参加時にエラーが発生しました");
            console.log(error);
        });
}

function leaveCommunity(){
    let endpoint = `${_config.endpoint.community}/`;
    let data = {
        communityId: document.getElementById("communityId").value,
        sub: LOGIN_USER_SUB,
        //NOTE:tokenをbodyに入れていいのだろうか...
        AccessToken: ACCESS_TOKEN
    };
    let params = {
        method: "DELETE",
        mode: 'cors',
        headers: {
            Authorization: ID_TOKEN
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
        .then(response => {
            if (response.ok) {
                alert("コミュニティから退会しました");
                localStorage.setItem("userBelongCommunityId", "");
                document.getElementById("btnCommunityJoin").hidden = false;
                document.getElementById("btnCommunityLeave").hidden = true;
            } else {
                alert("コミュニティ退会時にエラーが発生しました");
            }
        })
        .catch(error => {
            alert("コミュニティ退会時にエラーが発生しました");
            console.log(error);
        });
}
