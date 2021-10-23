let id_token = localStorage.getItem("idToken");

window.onload = function communityReed(){
    let queryParam = window.location.search;
    let endpoint = `${_config.endpoint.commutityInfo}/${queryParam}`;
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

        // APIで取得した内容設定
        if (typeof response_body.communityId !== "undefined") {
            document.getElementById('communityId').innerText = response_body.communityId
        }
        if (typeof response_body.communityName !== "undefined") {
            document.getElementById('communityName').innerText = response_body.communityName
        }
        if (typeof response_body.communityOwner !== "undefined") {
            document.getElementById('communityOwner').innerText = response_body.communityOwner
        }
        if (typeof response_body.content !== "undefined") {
            document.getElementById('content').innerText = response_body.content
        }
        if (typeof response_body.weight !== "undefined") {
            document.getElementById('weight').innerText = response_body.weight
        }
        if (typeof response_body.createdAt !== "undefined") {
            document.getElementById('createdAt').innerText = response_body.createdAt
        }
        if (typeof response_body.updatedAt !== "undefined") {
            document.getElementById('updatedAt').innerText = response_body.updatedAt
        }
    }
}
