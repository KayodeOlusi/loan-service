import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();
const dbSync = {
  migrate() {
    exec(`npx sequelize-cli db:migrate --env ${process.env.ENV}`, function (err, stdout, stderr) {
      if (err) console.error(err);
      console.log(stdout);
    });
  },
  migrateRollback() {
    exec(`npx sequelize-cli db:migrate:undo --env ${process.env.ENV}`, function (err, stdout, stderr) {
      if (err) console.error(err);
      console.log(stdout);
    });
  },
  migrateReset() {
    exec(`npx sequelize-cli db:migrate:undo:all --env ${process.env.ENV}`, function (err, stdout, stderr) {
      if (err) console.error(err);
      console.log(stdout);
    });
  }
}

export default dbSync;