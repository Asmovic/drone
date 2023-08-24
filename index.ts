import { app } from './app';
import { sequelize } from './database';

// Implement other endpoints similarly

// Start the server
const PORT = process.env.PORT || 4000;
(async () => {
  await sequelize.sync(); // Sync models with the database
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
