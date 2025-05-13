import { Sequelize } from "sequelize";

const db = new Sequelize('q_n_a', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;