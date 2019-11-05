const express = require('express');
const { PROT } = require('./config.json');
const allRouter = require('./routers');

const app = express();

// 静态资源服务器
app.use(express.static('./'));

app.use(allRouter);

app.listen(PROT, () => {
    console.log(`server is running on PROT:${PROT}`);
})