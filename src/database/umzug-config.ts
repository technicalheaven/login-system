import { Umzug, SequelizeStorage } from "umzug"
import { dbInstance } from "./connection";



const umzug = new Umzug({
    migrations: { glob: 'migrations/*.js' },
    context: dbInstance.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: dbInstance }),
    logger: console,
});

(async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    await umzug.up();
})();
