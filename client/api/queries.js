const { Pool } = require("pg");
const moment = require("moment");

const connectionString =
  "postgresql://postgres:postgres@localhost:5432/postgres";
const pool = new Pool({
  connectionString,
});
// const pool = new Pool({
//   user: "postgres",
//   host: "192.168.55.114",
//   database: "postgres",
//   password: "postgres",
//   port: 5432,
// });

pool.connect();

const getDatas = (req, res) => {
  pool.query(
    // `SELECT
    //     T1.DENPYONO,
    //     T3.BUMONCD,
    //     T1.DENPYODT,
    //     T1.UKETUKEDT,
    //     T1.SUITOKB,
    //     T1.BIKO,
    //     T1.KINGAKU
    // FROM
    //     CMN.BUMON T3,
    //     CMN.ES_YDENPYO T1
    // WHERE
    //   T1.BUMONCD_YKANR = T3.BUMONCD
    // ORDER BY T1.DENPYONO`,
    `select * from cmn.es_ydenpyo order by denpyono`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getVouchers = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    `select * from cmn.es_ydenpyod where denpyono = $1 order by gyono`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const searchSchedule = (req, res) => {
  console.log("request.body", req.body);
  const {
    kaikeind,
    denpyono_start,
    denpyono_end,
    denpyodt_start,
    denpyodt_end,
    uketukedt_start,
    uketukedt_end,
    suitokb_1,
    suitokb_2,
  } = req.body;
  let WHERE = "";
  // let CONDITION = "";
  if (
    kaikeind &&
    denpyono_start &&
    denpyono_end &&
    denpyodt_start &&
    denpyodt_end &&
    uketukedt_start &&
    uketukedt_end &&
    suitokb_1 &&
    suitokb_2
  ) {
    WHERE += ` kaikeind = ${kaikeind} and kaikeind = ${kaikeind}`;
  } else if (kaikeind) {
    WHERE += ` kaikeind = ${kaikeind}`;
  }
  if (denpyono_start && denpyono_end) {
    // denyono_start = moment(denyono_start).format("yyyy-mm-dd");
    // denyono_end = moment(denyono_end).format("yyyy-mm-dd");
    WHERE += `denpyono between ${denpyono_start} and ${denpyono_end}`;
  }
  if (denpyodt_start && denpyodt_end) {
    console.log(denpyodt_start, denpyodt_end);
    let start = new Date(denpyodt_start);
    let end = new Date(denpyodt_end);
    denpyodt_start = moment(start).utcOffset(420).format("yyyy-mm-dd");
    denpyodt_end = moment(end).utcOffset(420).format("yyyy-mm-dd");
    console.log(denpyodt_start, denpyodt_end);
    WHERE += `denpyodt between ${denpyodt_start} and ${denpyodt_end}`;
  }
  pool.query(
    WHERE
      ? `select * from cmn.es_ydenpyo where ${WHERE} order by denpyono`
      : `select * from cmn.es_ydenpyo order by denpyono`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createUser = (request, response) => {
  const { name, email } = request.body;
  pool.query(
    // "INSERT INTO cmn.DENPYONO (name, email) VALUES ($1, $2)",
    `INSERT INTO (DENPYONO,
        KAIKEIND,
        UKETUKEDT,
        DENPYODT,
        BUMONCD,
        BIKO,
        SUITOKB,
        SHIHARAIDT,
        KINGAKU,
        INSERT_OPE_ID,
        INSERT_PGM_ID,
        INSERT_PGM_PRM,
        INSERT_DATE,
        UPDATE_OPE_ID,
        UPDATE_PGM_IDL,
        UPDATE_PGM_PRM,
        UPDATE_DATE) VALUES()`[(name, email)],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const getZooms = (req, res) => {
  pool.query(`select * from cmn.bumon order by bumoncd`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
const searchZooms = (req, res) => {
  const { bumoncd, bumonnm } = req.body;
  console.log("req", bumoncd, bumonnm);
  let WHERE;
  if (bumoncd && bumonnm) {
    WHERE = `where bumoncd like '${bumoncd}' and bumonnm like '%${bumonnm}%'`;
  } else if (bumoncd) {
    WHERE = `where bumoncd like '${bumoncd}'`;
  } else if (bumonnm) {
    WHERE = `where bumonnm like '%${bumonnm}%'`;
  } else {
    WHERE = "";
  }
  pool.query(
    `select * from cmn.bumon ${WHERE} order by bumoncd`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
module.exports = {
  getDatas,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchSchedule,
  getZooms,
  searchZooms,
  getVouchers,
};
