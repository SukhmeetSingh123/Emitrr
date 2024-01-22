const connectToMongo=require('./db');
var cors=require('cors')
const express = require('express')
connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/progressReport',require('./routes/progressReportRoutes'))
app.use('/api/questionBank',require('./routes/questionBankRoutes'))

app.listen(port, () => {
  console.log(`Emitrr Backened listening on port ${port}`)
})