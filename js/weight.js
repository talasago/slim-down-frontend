let id_token = localStorage.getItem("idToken");
let access_token = localStorage.getItem("accessToken");
const SUB = localStorage.getItem("sub");
const BELONG_GCOMMUNITY_ID = localStorage.getItem("userBelongCommunityId");


window.onload = () => {
    weightReed();
    setLinkToCommuDetail();
}

function setLinkToCommuDetail() {
    if (BELONG_GCOMMUNITY_ID !== null) {
        let a = document.getElementById("belongCommunity");
        a.href = `./community_detail.html?communityId=${BELONG_GCOMMUNITY_ID}`;
        a.hidden = false;
    }
}


function weightReed(){
    //subはクエリパラメータで取得
    let query_string = window.location.search;
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
        //subに紐づくweightが存在すれば
        if (Object.keys(response_body).length) {
            document.getElementById("weight").value = response_body.weight;
            document.getElementById("regist").hidden = true;
            document.getElementById("update").hidden = false;
        }
    }
}

function weightRegist() {
    //subはtokenで取得
    let endpoint = `${_config.endpoint.weight}/`;
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

function weightUpdate() {
    //subはlocalstrageから取得
    let endpoint = _config.endpoint.weight;
    let data = {
        weight: document.getElementById("weight").value,
        sub: SUB
    };
    let params = {
        method: "PUT",
        mode: 'cors',
        headers: {
            Authorization: id_token
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, params)
    .then(response => {
        if (response.ok) {
            alert("更新しました");
        } else {
            alert("更新時にエラーが発生しました");
        }
    })
    .catch(error => {
        alert("更新時にエラーが発生しました");
        console.log(error);
    });
}
