var fs = require("fs");

fs.readFile('./code.cn', (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
    let variable = data.toString().split("\r\n")
    console.log(variable)
    for (let index = 0; index < variable.length; index++) {
        let msg = variable[index]
        if (/赋值为/.test(msg)) {
            msg = msg.replace("赋值为","=")
            console.log(msg)
        }
        if (/输出/.test(msg)) {
            msg = msg.replace("输出 ","console.log(")
            msg = msg.replace("和",", ")
            msg = [msg,")"].join("")
            console.log(msg)
        }
        if (/字符串/.test(msg)) {
            msg = msg.replace("字符串",`let `)
            let val = msg.match(/=\s.+/)[0].replace(/=\s+/g,"")
            msg = msg.replace(`${val}`,"\"" + val + "\"")
            console.log(msg)
        }
        if(/数字/.test(msg)) {
            msg = msg.replace("数字",`let `)
            console.log(msg)
        }
        fs.appendFile('./code.js',`${msg}\n`,'utf8',(err) => {
            if(err){
                console.log('写文件出错了，错误是：'+err);
            }else{
                console.log('ok');
            }  
        }) 
        
    }
});