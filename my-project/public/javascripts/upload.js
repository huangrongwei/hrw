$(function(){
    $('#file').change(function(){
        var myForm = new FormData();    // 创建一个空的FormData对象
        // myForm.append("username", document.querySelector('#username').value);       // append()方法添加字段
        // myForm.append("pwd", document.querySelector('#pwd').value);   // 数字123456立即被转换成字符串“123456”
        let files = document.querySelector('#file').files;
        // console.log(files);
        
        myForm.append("file_img", files[0]);  
        // console.log(myForm)              
        
        $.ajax({
            url: 'http://localhost:3000/users/upload',
            type: 'POST',
            data: myForm,
            contentType: false,
            processData: false,
            success: function(res){
             let data = res.file;
             
            //  console.log(data.path);
               $('.img').attr('src',data.filename)
              $('#file').val(null) ;
            }
        })
    })
})
