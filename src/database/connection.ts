import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

const { MYSQL_DB_NAME = "", MYSQL_DB_USER = "", MYSQL_DB_PASSWORD = "", MYSQL_DB_HOST = "" } = process.env;

async function createDBifNotExists() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
    });

    const [results]: any[] = await connection.query(
      'SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?',
      [MYSQL_DB_NAME]
    );

    if (!results.length) {
      // Create the database if it doesn't exist
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB_NAME};`);
      console.log('MySQL Database created successfully.');
    } else {
      console.log('MYSQL Database found.');
    }
  } catch (error) {
    console.error('MYSQL Database creation failed:', error);
  } finally {
    if (connection) {
      // Close the connection when done
      console.log('Connection close for mysql2');
      await connection.end();
    }
  }
}

// Create an instance of sequelize
export const dbInstance =
  new Sequelize(
    MYSQL_DB_NAME,
    MYSQL_DB_USER,
    MYSQL_DB_PASSWORD, {
    host: MYSQL_DB_HOST,
    dialect: 'mysql',
    logging: false,
  })

export async function initDB() {
  try {
    // Create the database if it doesn't exist
    await createDBifNotExists();

    // Validate and connect to the database
    await dbInstance.authenticate();
    console.log('Sequelize Successfully connected to the database!');
  } catch (error) {
    console.error('Sequelize Failed to initialize the database:', error);
  }
}
