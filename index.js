require('dotenv').config();
const app = require('./app');


const port = +process.env.PORT || 3024;

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
