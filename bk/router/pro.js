const express = require("express");

const pool = require("./../pool.js");

const router = express.Router();
//查询头部导航
router.get("/tab", (req, res) => {
  pool.query(
    "select class_id,cname,cpic from ja_class where islocal = 1",
    (err, reult) => {
      if (err) throw err;
      res.send(reult);
      //console.log(reult);
    }
  );
});
//查询商品分类信息
router.get("/product", (req, res) => {
  let mysql = "select * from  ja_class order by class_id ;";
  pool.query(mysql, (err, reult) => {
    if (err) throw err;
    res.send(reult);
  });
});
//查询商品分类详细信息

router.get("/productItme", (req, res) => {
  let class_id = req.query.class_id;
  let title = req.query.title;
  let value = req.query.value;
  if (class_id == -3) {
    if (title) {
      let mysql = `select * from ja_product where specification like "%${title}%"`;
      if (value == "desc") {
        mysql += `order by price desc`;
        console.log("desc");
      } else if (value == "asc") {
        mysql += `order by price asc`;
      } else if (value == "Hits") {
        mysql += `order by pageView asc`;
      } else if (value == "priority") {
        mysql += `order by pageView asc`;
      }
      pool.query(mysql, (err, reult) => {
        if (err) throw err;
        res.send(reult);
        //console.log(reult.length,"有");
      });
    } else {
      let mysql = `select * from ja_product `;
      if (value == "desc") {
        mysql += `order by price desc`;
      } else if (value == "asc") {
        mysql += `order by price asc`;
      } else if (value == "Hits") {
        mysql += `order by pageView asc`;
      } else if (value == "priority") {
        mysql += `order by pageView asc`;
      }
      pool.query(mysql, (err, reult) => {
        if (err) throw err;
        res.send(reult);
        //console.log(reult.length,"无");
      });
    }
  } else if (class_id == -2) {
    let mysql = "select * from ja_product order by pageView ";
    if (value == "desc") {
      mysql = `select * from ja_product order by price desc`;
    } else if (value == "asc") {
      mysql = `select * from ja_product order by price asc`;
    } else if (value == "Hits") {
      mysql = `select * from ja_product order by pageView asc`;
    } else if (value == "priority") {
      mysql = `select * from ja_product order by pageView asc`;
    }

    pool.query(mysql, (err, reult) => {
      if (err) throw err;
      res.send(reult);
    });
  } else if (class_id == -1) {
    let mysql = "select * from ja_product order by pageView ";
    if (value == "desc") {
      mysql = `select * from ja_product order by price desc`;
    } else if (value == "asc") {
      mysql = `select * from ja_product order by price asc`;
    } else if (value == "Hits") {
      mysql = `select * from ja_product order by pageView asc`;
    } else if (value == "priority") {
      mysql = `select * from ja_product order by pageView asc`;
    }

    pool.query(mysql, (err, reult) => {
      if (err) throw err;
      res.send(reult);
    });
  } else {
    let mysql = `select ja_class.cname,ja_product.title,ja_product.price,ja_product.pic,ja_product.product_id  from ja_product join ja_class on ja_product.class_id = ja_class.class_id where ja_product.class_id = ? `;

    if (value == "desc") {
      mysql += `order by price desc`;
    } else if (value == "asc") {
      mysql += `order by price asc`;
    } else if (value == "Hits") {
      mysql += `order by pageView asc`;
    } else if (value == "priority") {
      mysql += `order by pageView asc`;
    }

    pool.query(mysql, [class_id], (err, reult) => {
      if (err) throw err;
      res.send(reult);
    });
  }
});

router.get("/product_dateail", (req, res) => {
  let product_id = req.query.product_id;
  let mysql = "select * from ja_product where product_id = ?";
  pool.query(mysql, [product_id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});
//<!----------------之前的------------------------>

//更新商品数量
router.post("/update", (req, res) => {
  let user_id = req.body.user_id;
  let product_id = req.body.product_id;
  let count = req.body.count;
  pool.query(
    "update shopping set count = ? where product_id = ? and user_id = ? ",
    [count, product_id, user_id],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ code: "200" });
    }
  );
});

//添加商品
router.post("/insert", (req, res) => {
  let obj = req.body;
  let user_id = req.body.user_id;
  let product_id = req.body.product_id;
  pool.query(
    "select product_id from ja_shopping where product_id = ? and user_id = ?",
    [product_id, user_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      //console.log(result);
      if (result.length > 0) {
        pool.query(
          "update ja_shopping set count =count+1 where product_id = ? and user_id = ?",
          [product_id, user_id],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.send({ code: "200" });
          }
        );
      } else if (result.length == 0) {
        pool.query("insert into ja_shopping set ?", [obj], (err, result) => {
          if (err) {
            throw err;
          }
          res.send({ code: "200" });
        });
      }
    }
  );
});
//删除购物车商品
router.post("/delete", (req, res) => {
  let user_id = req.body.user_id;
  let product_id = req.body.product_id;
  pool.query(
    "delete from ja_shopping where  product_id = ? and user_id =? ",
    [product_id, user_id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows != 0) {
        res.send({ code: "200" });
      }
    }
  );
});
//查询用户id返回购物车详情
router.post("/shopping", (req, res) => {
  let user_id = req.body.user_id;
  let mysql = `select ja_shopping.user_id,ja_shopping.count,ja_product.product_id,ja_product.title,ja_product.price,ja_product.pic from  ja_product join ja_shopping on  ja_shopping.product_id = ja_product.product_id where ja_shopping.user_id = ?`;
  pool.query(mysql, [user_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ code: "404" });
    }
  });
});

//查询product_id的商品
router.post("/search_product_id", (req, res) => {
  let $product_id = req.body.product_id;
  let mysql = `select * from ja_product where product_id =${$product_id}`;
  pool.query(mysql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length >= 1) {
      res.send(result);
    } else {
      res.send("0");
    }
  });
});

module.exports = router;
