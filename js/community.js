let id_token = localStorage.getItem("idToken");
let access_token = localStorage.getItem("accessToken");
let sub = localStorage.getItem("sub");

window.onload = function communityReed(){
    //subはクエリパラメータで取得
    let endpoint = `${_config.endpoint.commutityInfo}/list`;
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
        //itemsがなれけば処理を抜ける
        if (!Object.keys(response_body).length) {
            return null;
        }

        //一覧作成
        let trs = document.createDocumentFragment();
        for (let item of response_body.items) {
            let tr = document.createElement("tr");
            let tds = document.createDocumentFragment();

            // column
            for (let key in item) {
                let td = document.createElement("td");
                td.appendChild(document.createTextNode(item[key]));
                tds.append(td);
            }
            tr.append(tds);
            trs.append(tr);
        }
        document.getElementById('TbodyCommunityList').append(trs);
    }
}
