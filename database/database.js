const Pool = require('pg').Pool;


const credentials = {
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
};



const postgresConnection = async () => {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()")
    await pool.end();

    return now;
};


module.exports = {postgresConnection,credentials}
  