const app = require('./src/app');
const connectDB = require('./src/config/db');
const port = 5000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();