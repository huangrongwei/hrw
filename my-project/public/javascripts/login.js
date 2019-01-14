$(() => {
    let signIn = $("#signIn");
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        let data = await login(inputEmail, inputPassword);
        console.log(data);
        let fn = {
            success() {
                console.log('登录成功');
                localStorage.setItem("token", data.token)
                location.href = "query.html"
            },
            fail() {
                alert('登陆失败');
            }
        }
        fn[data.status]()
        // if (data.status === 'success') {
        //     console.log('登录成功');
        //     localStorage.setItem("token",data.token)
        //     location.href = "dashboard.html"
        // } else {
        //     console.log('登录失败');
        // }
    })
})