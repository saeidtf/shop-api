import { sequelize } from "./lib/database/sequelize";
import app from "./app";
import { migrate } from "./lib/database/Seed";
const port = process.env.PORT || 3500;

(async () => {
  await sequelize.sync({ force: true });
  await migrate();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
