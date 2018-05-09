const express = require('express'), // tạo ra biến express và gọi gói express ra xài.
      app  = express(); // tạo ra biến app gán biến express cho nó.

app.set('view engine' , 'ejs'); // sử dụng template engine ejs
app.set('views' , './views'); // đi vào thư mục view 

//  mọi yêu cầu gởi lên server tự đi vào thư mục __diranme (ở đây nó sẽ vào thư mục views) mà tìm.
app.use(express.static(__dirname));

/* 
 - "/": khách hàng truy cập vào http://3000 lúc này server sẽ gọi function bên dưới ra
  - "req": là tham số khách hàng gởi lên, res là những gì server node trả về
  - res.render('home'): nó sẻ đi vào thư mục view và tìm đến file home.ejs để chạy
*/
app.get("/", (req, res) => {
    res.render('home');
});

// mở 1 cổng để khách hàng gọi lên server , ở đây mình mở port 3000.
let port = 4200;
app.listen(port , () => {
    console.log(`We are running in port ${port}`);
});