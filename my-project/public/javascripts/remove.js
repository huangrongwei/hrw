$(() => {
    let fn = {
        init: async () => {
            let isLogin = await fn.autoLogin();
            // 异步 awiat和async
            fn[isLogin.status]()
        },
        true: async () => {
            $('#btn').click(async () => {
                let inputName = $('#inputName').val().trim();
                let inputTel = $('#inputTel').val().trim();
                let inputSkill = $('#inputSkill').val().trim();
                let inputAge = $('#inputAge').val().trim();
                let inputID = $('#inputID').val().trim();
                if (inputID == '' && inputName == '' && inputTel == '' && inputSkill == '' && inputAge == '') {
                    alert('至少输入一个条件')
                } else {
                    let data = await fn.Delete(inputName, inputTel, inputSkill, inputAge, inputID);
                    if (data.n != 0) {
                        alert('删除成功');
                    } else {
                        alert('没有符合该条件的数据');
                    }
                }
            })
        },
        false() {
            location.href = "login.html";
            return this;
        },
        Delete: (inputName, inputTel, inputSkill, inputAge, inputID) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/users/deletes',
                    data: {
                        inputName,
                        inputTel,
                        inputSkill,
                        inputAge,
                        inputID
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
                    url: "http://localhost:3000/users/autoLogin",
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }
    }
    fn.init();
})