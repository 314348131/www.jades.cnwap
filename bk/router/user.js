const express = require("express");

const pool = require("./../pool.js");

const router = express.Router();

//注册
router.post("/userReg", (req, res) => {
  let obj = req.body;
  let uname = obj.uname;
  //console.log(uname);
  //console.log(obj);
  pool.query(
    "select * from ja_users where uname = ?",
    [uname],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send({ code: 202 });
      } else {
        pool.query("insert into ja_users set ?", [req.body], (err, result) => {
          if (err) throw err;
          res.send({ code: 200 });
        });
      }
    }
  );
});

//查询id 返回用户信息
router.post("/login_uid", (req, res) => {
  let user_id = req.body.user_id;
  //console.log(user_id);
  pool.query(
    "select user_id,uname,ustatus from ja_users where user_id = ?",
    [user_id],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

//查询id 退出登录
router.post("/quit", (req, res) => {
  let user_id = req.body.user_id;

  pool.query(
    "update ja_users set ustatus = 0 where user_id= ? ",
    [user_id],
    (err, result) => {
      if (err) throw err;
      res.send({ code: 200 });
    }
  );
});

//登录
router.post("/login", (req, res) => {
  let uname = req.body.uname;
  let upwd = req.body.upwd;
  //console.log(uname,upwd);
  pool.query(
    "select uname from ja_users where uname = ?",
    [uname],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        pool.query(
          "select * from ja_users where uname=? and upwd = ?",
          [uname, upwd],
          (err, result) => {
            if (err) throw err;

            if (result.length == 0) {
              res.send({ code: 403 });
            } else {
              pool.query(
                "update ja_users set ustatus = 1 where uname=? and upwd = ? ",
                [uname, upwd],
                (err, result) => {
                  if (err) throw err;
                }
              );
              res.send({ code: 200, result });
            }
          }
        );
      } else if (result.length == 0) {
        res.send({ code: 404 });
      }
    }
  );
});

module.exports = router;
