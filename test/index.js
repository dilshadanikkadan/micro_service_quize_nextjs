const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.get('/',(req,res)=>{
    res.send('server is running in port 4000')
})
app.listen(4000,()=>{
    console.log(`server is running in test`);
})