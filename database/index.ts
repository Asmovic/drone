import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

/* (async () => {
  try {
    await sequelize.sync(); // Synchronize models with the database
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Database synchronization error:', error);
  } finally {
    await sequelize.close(); // Close the database connection
  }
})(); */
