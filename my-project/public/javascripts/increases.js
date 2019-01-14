$(() => {
    let fn = {
        init: async () => {
            let isLogin = await fn.autoLogin();
            // 异步 awiat和async
            fn[isLogin.status]()
        },
        true() {
            $('#btn').on('click', fn.clicks)
        },
        false() {
            location.href = "login.html";
            return this;
        },
        Insrt: (inputName, inputTel, inputSkill, inputAge) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: 'http://101.200.32.128:3000/users/inser',
                    data: {
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
        clicks: async () => {
            let inputName = $('#inputName').val().trim();
            let inputTel = $('#inputTel').val().trim();
            let inputSkill = $('#inputSkill').val().trim();
            let inputAge = $('#inputAge').val().trim();
            if (inputName, inputTel, inputSkill, inputAge) {
                let data = await fn.Insrt(inputName, inputTel, inputSkill, inputAge);
                if (data.result.n != 0) {
                    alert('添加成功');
                }
            } else {
                alert('数据不能为空');
            }
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