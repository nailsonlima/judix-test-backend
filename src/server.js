import app from './app.js';
import { config } from './config/config.js';
import connectDB from './config/db.js';

const PORT = config.port;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on http://localhost:${PORT}`);
});
