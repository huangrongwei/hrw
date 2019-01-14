$(() => {
    let Updata = (inputID, inputName, inputTel, inputSkill, inputAge, inputName1, inputTel1, inputSkill1, inputAge1) => {
        return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: 'http://101.200.32.128:3000/users/updates',
                    data: {
                        inputID,
                        inputName,
                        inputTel,
                        inputSkill,
                        inputAge,
                        inputName1,
                        inputTel1,
                        inputSkill1,
                        inputAge1
                    },
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }

    $('#btn').click(async () => {
        let inputID = $('#inputID').val();
        let inputName = $('#inputName').val();
        let inputTel = $('#inputTel').val();
        let inputSkill = $('#inputSkill').val();
        let inputAge = $('#inputAge').val();
        let inputName1 = $('#inputName1').val();
        let inputTel1 = $('#inputTel1').val();
        let inputSkill1 = $('#inputSkill1').val();
        let inputAge1 = $('#inputAge1').val();
        // console.log(inputSkill);
        if(inputID==''&&inputName==''&&inputTel==''&&inputSkill==''&&inputAge==''){
            alert('至少输入一个条件')
        }else{
            let data = await Updata(inputID, inputName, inputTel, inputSkill, inputAge, inputName1, inputTel1, inputSkill1, inputAge1);
            console.log(data.n);
            if(data.n!=0){
                alert('修改成功'); 
        }else{
            alert('修改失败');  
        }
           }
           
            
        
          

        
    })

})