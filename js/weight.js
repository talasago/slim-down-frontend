let id_token = localStorage.getItem("idToken");
let access_token = localStorage.getItem("accessToken");

async function weightRegist() {
    let endpoint = "https://3x6mu44qq7.execute-api.ap-northeast-1.amazonaws.com/dev/";
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

    let res = await fetch(endpoint, params);

    if (res.ok){
        alert("登録しました");
    } else {
        alert("登録時にエラーが発生しました");
        console.log(res.text());
    };
}

function weightDelete() {

}
