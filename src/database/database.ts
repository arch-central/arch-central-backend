import process from 'process';
import { Sequelize } from 'sequelize'

console.log(process.env.USER)
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb'
});

export default sequelize