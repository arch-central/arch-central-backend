import process from 'process';
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mariadb'
});

export default sequelize