$(() => {
    let fn = {
        init: async () => {
            let isLogin = await fn.autoLogin();
            // 异步 awiat和async
            fn[isLogin.status]()
        },
        true: async () => {
            let data = await fn.qurey('', '', '', '', '');
            // console.log(data);
            let html = data.map((item, index) => {
                return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.tel}</td>
                            <td>${item.skill}</td>
                            <td>${item.age}</td>
                        </tr>            
                    `
            }).join("");
            $("#list").html(html);
            $('#btn').click(async () => {
                let inputID = $('#inputID').val();
                let inputName = $('#inputName').val();
                let inputTel = $('#inputTel').val();
                let inputSkill = $('#inputSkill').val();
                let inputAge = $('#inputAge').val();
                if (inputID == '' && inputName == '' && inputTel == '' && inputSkill == '' && inputAge == '') {
                    alert('至少输入一个条件')
                } else {
                    let data = await fn.qurey(inputName, inputTel, inputSkill, inputAge, inputID);
                    // console.log(data);
                    let html = data.map((item, index) => {
                        return `
                                <tr>
                                    <td>${item._id}</td>
                                    <td>${item.name}</td>
                                    <td>${item.tel}</td>
                                    <td>${item.skill}</td>
                                    <td>${item.age}</td>
                                </tr>            
                            `
                    }).join("");
                    $("#list1").html(html);
                }
            })
        },
        false() {
            location.href = "login.html";
            return this;
        },
        qurey: (inputName, inputTel, inputSkill, inputAge, inputID) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: 'http://101.200.32.128:3000/users/findUser',
                    data: {
                        inputID,
                        inputName,
                        inputTel,
                        inputSkill,
                        inputAge
                    },
                    success(data) {
                        resolve(data)
                    }
                })
            })
        },
        autoLogin() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    headers: {
                        token: localStorage.getItem("token")
                    },
                    url: "http://101.200.32.128:3000/users/autoLogin",
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }
    }
    fn.init();




})