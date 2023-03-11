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
    denpyono,
  } = req.body;
  let WHERE = "",
    query;
  if (
    !kaikeind &&
    !denpyono_start &&
    !denpyono_end &&
    !denpyodt_start &&
    !denpyodt_end &&
    !uketukedt_start &&
    !uketukedt_end &&
    !suitokb_1 &&
    !suitokb_2 &&
    !denpyono
  ) {
    query = `select * from cmn.es_ydenpyo order by denpyono`;
  } else {
    if (kaikeind) {
      if (WHERE == "") {
        WHERE = `where kaikeind = ${kaikeind} `;
      } else {
        WHERE += `and kaikeind = ${kaikeind} `;
      }
    }
    if (denpyono) {
      if (WHERE == "") {
        WHERE = `where denpyono = ${denpyono} `;
      } else {
        WHERE += `and denpyono = ${denpyono} `;
      }
    }
    if (denpyono_start) {
      if (WHERE == "") {
        WHERE = `where denpyono between ${denpyono_start} and ${denpyono_end} `;
      } else {
        WHERE += `and denpyono between ${denpyono_start} and ${denpyono_end} `;
      }
    }
    if (denpyodt_start) {
      if (WHERE == "") {
        WHERE = `where denpyodt between '${moment(denpyodt_start).format(
          "YYYY-MM-DD"
        )}' and '${moment(denpyodt_end).format("YYYY-MM-DD")}' `;
      } else {
        WHERE += `and denpyodt between '${moment(denpyodt_start).format(
          "YYYY-MM-DD"
        )}' and '${moment(denpyodt_end).format("YYYY-MM-DD")}' `;
      }
    }
    if (uketukedt_start) {
      if (WHERE == "") {
        WHERE = `where uketukedt between '${moment(uketukedt_start).format(
          "YYYY-MM-DD"
        )}' and '${moment(uketukedt_end).format("YYYY-MM-DD")}' `;
      } else {
        WHERE += `and uketukedt between '${moment(uketukedt_start).format(
          "YYYY-MM-DD"
        )}' and '${moment(uketukedt_end).format("YYYY-MM-DD")}' `;
      }
    }
    if (suitokb_1 && suitokb_2) {
      if (WHERE == "") {
        WHERE = `where suitokb in ('${suitokb_1.toUpperCase()}', '${suitokb_2.toUpperCase()}') `;
      } else {
        WHERE += `and suitokb in ('${suitokb_1.toUpperCase()}', '${suitokb_2.toUpperCase()}') `;
      }
    } else if (suitokb_1) {
      if (WHERE == "") {
        WHERE = `where suitokb = '${suitokb_1.toUpperCase()}' `;
      } else {
        WHERE += `and suitokb = '${suitokb_1.toUpperCase()}' `;
      }
    } else if (suitokb_2) {
      if (WHERE == "") {
        WHERE = `where suitokb = '${suitokb_2.toUpperCase()}' `;
      } else {
        WHERE += `and suitokb = '${suitokb_2.toUpperCase()}' `;
      }
    }
    query = `select * from cmn.es_ydenpyo ${WHERE} order by denpyono`;
  }
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
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
const createSchedule = (req, res) => {
  let d_ = new Date();
  let day_ = moment(d_).format("YYYY-MM-DD");
  console.log(day_);
  const { suitokb, shiharaidt, kaikeind, uketukedt, bumoncd_ykanr, biko } =
    req.body;
  console.log(
    "123",
    `INSERT INTO cmn.es_ydenpyo (denpyodt, suitokb, shiharaidt, kaikeind, uketukedt, bumoncd_ykanr, biko) 
    VALUES('${day_}', '${suitokb}', '${moment(shiharaidt).format(
      "YYYY-MM-DD"
    )}', ${kaikeind}, '${moment(uketukedt).format(
      "YYYY-MM-DD"
    )}', ${bumoncd_ykanr}, '${biko}')`
  );
  let query = `INSERT INTO cmn.es_ydenpyo (denpyodt, suitokb, shiharaidt, kaikeind, uketukedt, bumoncd_ykanr, biko) 
  VALUES('${day_}', '${suitokb}', '${moment(shiharaidt).format(
    "YYYY-MM-DD"
  )}', ${kaikeind}, '${moment(uketukedt).format(
    "YYYY-MM-DD"
  )}', ${bumoncd_ykanr}, '${biko}') RETURNING *`;
  pool.query(
    query,
    // // "INSERT INTO cmn.DENPYONO (name, email) VALUES ($1, $2)",
    // `INSERT INTO cmn.es_ydenpyo (denpyodt, suitokb, shiharaidt, kaikeind, uketukedt, bumoncd_ykanr, biko)
    // VALUES(${day_}, ${suitokb}, ${moment(shiharaidt).format(
    //   "YYYY-MM-DD"
    // )}, ${kaikeind}, ${moment(uketukedt).format(
    //   "YYYY-MM-DD"
    // )}, ${bumoncd_ykanr}, ${biko})`
    // [
    //   day_,
    //   suitokb,
    //   moment(shiharaidt).format("YYYY-MM-DD"),
    //   kaikeind,
    //   moment(uketukedt).format("YYYY-MM-DD"),
    //   bumoncd_ykanr,
    //   biko,
    // ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Datas added with ID: ${results.rows[0].denpyono}`);
    }
  );
};
const updateSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const { suitokb, shiharaidt, kaikeind, uketukedt, bumoncd_ykanr, biko } =
    req.body;
  pool.query(
    "UPDATE cmn.es_ydenpyo SET suitokb = $1, shiharaidt = $2, kaikeind = $3, uketukedt = $4, bumoncd_ykanr = $5, biko = $6 WHERE denpyono = $7",
    [
      suitokb,
      moment(shiharaidt).format("YYYY-MM-DD"),
      kaikeind,
      moment(uketukedt).format("YYYY-MM-DD"),
      bumoncd_ykanr,
      biko,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Datas modified with ID: ${id}`);
    }
  );
};
const deleteSchedule = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM cmn.es_ydenpyo WHERE denpyono = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
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
  deleteSchedule,
  searchSchedule,
  getZooms,
  searchZooms,
  getVouchers,
  updateSchedule,
  createSchedule,
};
