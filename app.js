const express = require('express');
const app = express();
const port = 13000; // เปลี่ยนเลขพอร์ตตามต้องการ

// เพิ่ม route สำหรับการ handle request GET
app.get('/', (req, res) => {
  res.send('Hello World!'); // ส่งข้อความ 'Hello World!' กลับไปยัง client
});

// ถ้าไม่พบ route ที่ตรงกับที่ร้องขอ
app.use((req, res) => {
  res.status(404).send('Not Found'); // ส่งข้อความ 'Not Found' และ HTTP status code 404 กลับไปยัง client
});

// เริ่มต้นให้ server ทำงานที่ port ที่กำหนด
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
