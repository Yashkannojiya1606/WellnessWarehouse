var express = require("express");
var router = express.Router();
var pool = require("./pool");
var mysql = require("mysql");
var multer = require("./multer");
const axios = require("axios");
/* GET users listing. */
router.post('/checkmobile', function (req, res, next) {
  console.log(req.body.mobileno)
  pool.query("select * from users where mobileno=?", [req.body.mobileno], function (error, result) {
    if (error) {
      res.status(500).json({ result: false })
    }
    else {
      if (result.length == 1) {
        res.status(200).json({ result: true, data: result })
      }
      else {
        res.status(200).json({ result: false })
      }

    }
  })
});


router.post('/adduser', function (req, res, next) {

  pool.query("insert into  users values(?,?,?,?)", [req.body.mobileno, req.body.emailid, req.body.firstname, req.body.lastname], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ result: false })
    }
    else {
      res.status(200).json({ result: true })
    }


  })
});

router.post('/addaddress', function (req, res, next) {
  console.log(req.body)
  pool.query("insert into useraddress(mobileno,emailid,pincode,state,city,firstname,lastname,address,landmark,dmobileno)values(?,?,?,?,?,?,?,?,?,?)", [req.body.mobileno, req.body.emailid, req.body.pincode, req.body.state, req.body.city, req.body.firstname, req.body.lastname, req.body.address, req.body.landmark, req.body.dmobileno], function (error, result) {

    if (error) {
      console.log(error)
      res.status(500).json({ result: false })
    }
    else {
      res.status(200).json({ result: true })
    }


  })
});

router.post('/getAddress', function (req, res, next) {
  console.log(req.body)
  pool.query("select * from useraddress where mobileno=?", [req.body.mobileno], function (error, result) {
    if (error) {
      res.status(500).json({ result: false, data: [] })
    }
    else {
      res.status(200).json({ result: true, data: result })
    }
  })
});




router.post("/readuser", function (req, res) {
  console.log(req.body.mobileno);
  pool.query(
    "select * from user where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (result.length == 0) {
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/updatepassword", function (req, res) {
  pool.query(
    "update user set password=? where (mobileno=? or emailaddress=?)",
    [req.body.password, req.body.mobileno, req.body.mobileno],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: false });
      } else {
        if (result.length == 0) {
          return res.status(200).json({ RESULT: false });
        } else {
          console.log(result[0]);
          return res.status(200).json({ RESULT: true });
        }
      }
    }
  );
});

router.post("/checkUser", function (req, res) {
  pool.query(
    "select * from user where (mobileno=? or emailaddress=?)",
    [req.body.mobileno, req.body.mobileno],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: false });
      } else {
        if (result.length == 0) {
          return res.status(200).json({ RESULT: false });
        } else {
          console.log(result[0]);
          return res.status(200).json({ RESULT: true, data: result[0] });
        }
      }
    }
  );
});

router.post("/checkLogin", function (req, res) {
  pool.query(
    "select * from user where (mobileno=? or emailaddress=?)and password=? ",
    [req.body.mobileno, req.body.mobileno, req.body.password],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: false });
      } else {
        if (result.length == 0) {
          return res.status(200).json({ RESULT: false });
        } else {
          console.log(result[0]);
          return res.status(200).json({ RESULT: true, data: result[0] });
        }
      }
    }
  );
});

router.post("/userdetails", function (req, res) {
  pool.query(
    "select * from user where mobileno=? and password=? ",
    [req.body.mobileno, req.body.password],
    function (error, result) {
      if (result.length == 0) {
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true, data: result });
      }
    }
  );
});

router.post("/getPercentageLoyaltyById", function (req, res, next) {
  pool.query(
    "select * from table_loyalty where min>=? and max<=?"[
      (req.body.amt, req.body.amt)
    ], 
    function (err, result) {
      if (err) {
        console.log(err);
        res.render("loyaltypoints/editLoyaltyPercentage", {
          data: [],
          msg: "",
        });
      } else {
        console.log(result.length);
        res.render("loyaltypoints/editLoyaltyPercentage", {
          data: result,
          msg: "",
        });
      }
    }
  );
});

router.get("/getPercentageLoyaltyByIdJson", function (req, res, next) {
  pool.query(
    "select * from table_loyalty where transactionid=1",
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json([]);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    }
  );
});

router.post("/editPercentageLoyaltyById", function (req, res, next) {
  pool.query(
    "update table_loyalty set percentage=? where transactionid=1",
    [req.body.percentage],
    function (err, result) {
      if (err) {
        res.render("loyaltypoints/editLoyaltyPercentage", {
          data: [{ percentage: req.body.percentage }],
          msg: "Fail to Update",
        });
      } else {
        console.log(result.length);
        res.render("loyaltypoints/editLoyaltyPercentage", {
          data: [{ percentage: req.body.percentage }],
          msg: "Percentage Updated..",
        });
      }
    }
  );
});

router.get("/getAllLoyaltyPointsNew", function (req, res) {
  pool.query("select * from newloyalty", function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json({ RESULT: false });
    } else {
      if (result.length == 0) {
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: result });
      }
    }
  });
});

router.get("/getAllLoyaltyPoints", function (req, res) {
  pool.query(
    "select T.mobileno,T.emailid,(select U.username from user U where U.mobileno=T.mobileno)as username,T.totalpoints  from totalloyaltypoints T ",
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        if (result.length == 0) {
          return res.status(500).json({ RESULT: false });
        } else {
          //     return res.status(200).json({RESULT:true,data:result});
          res.render("loyaltypoints/totalLoyaltyPoints", { data: result });
        }
      }
    }
  );
});

router.get("/totalLoyaltyPointsById", function (req, res, next) {
  pool.query(
    "select T.mobileno,T.emailid,(select U.username from user U where U.mobileno=T.mobileno)as username,T.totalpoints  from totalloyaltypoints T where T.mobileno=? or T.emailid =?",
    [req.query["mobileno"], req.query["mobileno"]],
    function (err, result) {
      if (err) {
        res.render("loyaltypoints/updateLoyaltyPoints", {
          data: "There is an error in fetching data from server",
        });
      } else {
        console.log(result.length);
        res.render("loyaltypoints/updateLoyaltyPoints", { data: result });
      }
    }
  );
});

router.post("/totalLoyaltyPointsByMobileNo", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select T.mobileno,T.emailid,(select U.username from user U where U.mobileno=T.mobileno)as username,T.totalpoints  from totalloyaltypoints T where T.mobileno=?",
    [req.body["mobileno"]],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/editLoyaltyPoints", function (req, res) {
  console.log(req.body);
  if (req.body["btn"] == "Update") {
    pool.query(
      "update totalloyaltypoints set totalpoints=? where mobileno=?",
      [req.body.totalpoints, req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/users/getAllLoyaltyPoints");
        } else {
          res.redirect("/users/getAllLoyaltyPoints");
        }
      }
    );
  } else {
    pool.query(
      "delete from totalLoyaltyPoints where mobileno=?",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("loyaltypoints/totalLoyaltuPoints");
        } else {
          res.redirect("/food1/fooditemdisplay");
        }
      }
    );
  }
});

router.post("/editLoyaltyPointsMobile", function (req, res) {
  console.log(req.body);
  if (req.body["btn"] == "Update") {
    pool.query(
      "update totalloyaltypoints set totalpoints=totalpoints-? where mobileno=?",
      [req.body.totalpoints, req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          return res.status(200).json({ RESULT: false });
        } else {
          return res.status(200).json({ RESULT: true });
        }
      }
    );
  } else {
    pool.query(
      "delete from totalLoyaltyPoints where mobileno=?",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/loyaltypoints/totalLoyaltuPoints");
        } else {
          res.redirect("/food1/fooditemdisplay");
        }
      }
    );
  }
});

router.post("/redeemLoyaltyPointsMobile", function (req, res, next) {
  pool.query(
    "update totalloyaltypoints set totalpoints=totalpoints-? where mobileno=?",
    [req.body.totalpoints, req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(200).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/addloyaltypoints", function (req, res) {
  console.log(req.body);

  pool.query(
    "insert into loyaltypoints(orderid,mobileno,emailid,orderamount,loyaltypointsissued) values(?,?,?,?,?)",
    [
      req.body.orderid,
      req.body.mobileno,
      req.body.emailid,
      req.body.amount,
      req.body.loyaltypoints,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        pool.query(
          "select * from totalloyaltypoints where mobileno=?",
          [req.body.mobileno],
          function (error, result) {
            if (error) {
              return res.status(500).json({ RESULT: false });
            } else {
              if (result.length == 0) {
                pool.query(
                  "insert into totalloyaltypoints (mobileno,emailid,totalpoints)values(?,?,?)",
                  [req.body.mobileno, req.body.emailid, req.body.loyaltypoints],
                  function (error, result) {
                    console.log(error);
                  }
                );
              } else {
                pool.query(
                  "update totalloyaltypoints set totalpoints=totalpoints+" +
                    req.body.loyaltypoints +
                    " where mobileno='" +
                    req.body.mobileno +
                    "'",
                  function (error, result) {
                    console.log(error);
                  }
                );
              }
            }
          }
        );

        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/getloyaltypoints", function (req, res) {
  console.log(req.body);
  pool.query(
    "select * from totalloyaltypoints where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/addnewrecord", function (req, res) {
  console.log(req.body);

  pool.query(
    "insert into user(mobileno,emailaddress,username,password,loginstatus,blockstatus) values(?,?,?,?,?,?)",
    [
      req.body.mobile,
      req.body.email,
      req.body.name,
      req.body.password,
      req.body.loginstatus,
      false,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        if (error.code == "ER_DUP_ENTRY") {
          if (
            error.sqlMessage ==
            `Duplicate entry '${req.body.mobile}' for key 'PRIMARY'`
          ) {
            return res
              .status(500)
              .json({ RESULT: false, msg: "Mobile No. Already Exist" });
          } else if (
            error.sqlMessage ==
            `Duplicate entry '${req.body.email}' for key 'emailaddress'`
          )
            return res
              .status(500)
              .json({ RESULT: false, msg: "Email ID Already Exist" });
        } else {
          return res.status(500).json({ RESULT: false, msg: "Server Error" });
        }
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});
router.get("/generateorderno", (req, res) => {
  query = `select max(transactionid) as orderno from purchasedetails`;
  console.log(query);
  pool.query(query, (e, r) => {
    if (e) {
      console.log(e);
      res.status(500).json([]);
    } else {
      console.log(r);
      res.status(200).json(r);
    }
  });
});

router.post("/purchase", function (req, res) {
  //console.log(req.body.orderno);
  //console.log(req.body);
  let q = `insert into purchasedetails(orderno,orderdate,productid,price,quantity,amount,discount,usermailid,mobileno,ordertime,status,deliverstatus,orderstatus,notesforitem,outletid,paymenttransactionid,amountpaid,deliverycharges,deliveryaddress) values ?`;

  pool.query(
    q,
    [
      req.body.map((item) => [
        item.orderno,
        item.orderdate,
        item.productid,
        item.price,
        item.quantity,
        item.amount,
        item.discount,
        item.emailaddress,
        item.mobileno,
        item.ordertime,
        item.status,
        item.deliverstatus,
        item.orderstatus,
        item.notes,
        item.outletid,
        item.tid,
        item.amountpaid,
        item.deliverycharges,
        item.deliveryaddress,
      
      ]),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/orderAddress", function (req, res) {
  console.log(req.body.orderno);
  console.log(req.body);
  let q = `insert into deliveryaddress(orderno,address) values(?,?)`;

  pool.query(q, [req.body.orderno, req.body.address], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ RESULT: false });
    } else {
      return res.status(200).json({ RESULT: true });
    }
  });
});

router.post("/userdata", function (req, res) {
  //console.log("rrrrrrrrbody", req.body);
  pool.query(
    "insert into userdetails(mobileno,username,emailaddress,addressid) values(?,?,?,?)",
    [
      req.body.mobileno,
      req.body.username,
      req.body.emailaddress,
      req.body.addressid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/states", function (req, res) {
  pool.query(
    "select * from states where stateid=?",
    [req.body.stateid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true, data: result });
      }
    }
  );
});

router.post("/cities", function (req, res) {
  pool.query(
    "select * from cities where stateid=?",
    [req.body.stateid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true, data: result });
      }
    }
  );
});

router.post("/userdisplaybyid", function (req, res, next) {
  pool.query(
    "select U.*,(select UD.address1  from userdetails UD where UD.mobileno=U.mobileno) as address1,(select UD.address2  from userdetails UD where UD.mobileno=U.mobileno) as address2 from user U where U.mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      console.log();
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});
router.post("/userdatadisplaybyid", function (req, res) {
  console.log(req.body.mobileno);
  pool.query(
    "select * from userdetails where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: false, data: [] });
      } else {
        if (result.length >= 1)
          return res.status(200).json({ RESULT: true, data: result });
        else return res.status(200).json({ RESULT: false, data: [] });
      }
    }
  );
});
router.post("/tempuser", function (req, res) {
  pool.query(
    "insert into tempuserdetails(mobileno,username,emailaddress,address1,address2,city,state,zipcode,country) values(?,?,?,?,?,?,?,?,?)",
    [
      req.body.mobileno,
      req.body.username,
      req.body.emailaddress,
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.country,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});
router.post("/generateslip", (req, res) => {
  console.log("ccccc");
  var d = new Date(req.body.orderdate);
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "/" +
    (mp + (d.getMonth() + 1)) +
    "/" +
    (dp + d.getDate());
  console.log(req.body.ordertime);
  console.log(req.body);
  pool.query(
    'select P.*,(select packagename from package t where t.packageid=P.packageid) as packagename ,sum(P.amount) as total,Count(P.orderno) from purchasedetails P where P.orderdate=? and P.orderstatus="order" group by P.orderno ORDER BY ordertime DESC ',
    [td],
    function (err, result) {
      console.log(req.body);
      if (err) {
        console.log(err);
        res.status(500).json([]);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    }
  );
});
router.post("/assignwork", function (req, res) {
  console.log("body", req.body);

  pool.query(
    "insert into assignwork(employeeid,currenttime,currentdate,location,orderno) values(?,?,?,?,?) ",
    [
      req.body.employeeid,
      req.body.currenttime,
      req.body.currentdate,
      req.body.location,
      req.body.orderno,
    ],
    function (error, result) {
      if (error) {
        console.log("rrr", error);
        return res.status(500).json({ result: false });
      } else {
        return res.status(200).json({ result: true });
      }
    }
  );
});
router.post("/displaywork", function (req, res) {
  console.log("body", req.body);

  pool.query(
    "select  A.*,(select E.employeename from employee E where E.employeeid=A.employeeid) as employeename from assignwork A where A.employeeid=? and A.currentdate=? ",
    [req.body.employeeid, req.body.orderdate],
    function (error, result) {
      if (error) {
        console.log("error", error);
        return res.status(500).json({ result: false });
      } else {
        console.log("orderdate", req.body.orderdate);
        console.log("result", result);
        return res.status(200).json({ result });
      }
    }
  );
});

router.post("/deliverdetails", function (req, res) {
  console.log("orderno", req.body.orderno);
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log("date", td);
  pool.query(
    "insert into deliverdetails(employeeid,currentdate,currenttime,orderno,status,reason) values (?,?,?,?,?,?)",
    [
      req.body.employeeid,
      td,
      req.body.currenttime,
      req.body.orderno,
      req.body.status,
      req.body.reasondata,
    ],
    function (error, result) {
      if (error) {
        console.log("jjjjjjjjjjd");

        return res.status(500).json({ RESULT: false });
      } else {
        console.log("dddddddddddd");
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/quantity", function (req, res) {
  console.log("orderid", req.body.orderno);
  pool.query(
    "select count(*) as delivered from deliverdetails where orderno=?",
    [req.body.orderno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});
router.post("/generatebill", function (req, res) {
  console.log("orderno", req.body);
  pool.query(
    "select P.*,(select packagename from package r where r.packageid=P.packageid) as packagename,(select username from userdetails u where u.mobileno=P.mobileno) as username  from purchasedetails P where P.orderno=?",
    [req.body.orderno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/updatestatus", function (req, res) {
  console.log("orderno", req.body);
  pool.query(
    'update purchasedetails set orderstatus="cancel" where orderno=?',
    [req.body.orderno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/updatebillstatus", function (req, res) {
  console.log("orderno", req.body);
  pool.query(
    'update purchasedetails set status="Bill Generated" where orderno=?',
    [req.body.orderno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.get("/updateOrderStatus", function (req, res) {
  console.log("orderno", req.query);
  pool.query(
    'update purchasedetails set status="Delivered" where orderno=?',
    [req.query.orderno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        console.log(result);
        if (result.affectedRows > 0) {
          let bbody = {
            orderid: req.query.orderno,
            mobileno: req.query.mobileno,
            emailid: req.query.emailid,
            amount: req.query.amount,
            loyaltypoints: req.query.loyaltypoints,
          };
          axios
            .post(`${process.env.BaseUrl}/users/addloyaltypoints`, bbody)
            .then(function (response) {
              //   console.log(response);
            })
            .catch(function (error) {
              // console.log(error);
            });

          //   let lp={orderid:rows.orderno,mobileno:rows.mobileno,emailid:rows.emailaddress,amount:total,loyaltypoints:getLP}
          //   const resultlp = await postData("users/addloyaltypoints", lp);

          return res.status(200).json({ result: true });
          // res.render('order/orderdisplaybillgenerated', { data:[]})
        } else {
          return res.status(200).json({ result: false });
        }
      }
    }
  );
});

router.post("/displayallorder", function (req, res) {
  var d = new Date();
  console.log("date", req.body.orderdate);
  var d = new Date(req.body.orderdate);
  if (d.getMonth() >= 9) mp = "";
  else mp = "";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log("dddddd", td);
  pool.query(
    'select pd.*,(select address1 from userdetails u where u.mobileno=pd.mobileno ) as address,(select address2 from userdetails u where u.mobileno=pd.mobileno ) as location, (select p.packagename from package p where p.packageid=pd.packageid) as packagename,sum(pd.amount) as total  from purchasedetails pd  where orderstatus="order" and orderdate=? and pd.orderno not in(select orderno from assignwork aw)  group by pd.orderno ',
    [td],
    function (err, result) {
      if (err) {
        console.log("eeee", err);

        return res.status(500).json({ RESULT: "" });
      } else {
        return res.status(200).json({ data: result });
      }
    }
  );
});

router.post("/searchbylocation", function (req, res) {
  console.log("location", req.body);
  q =
    "select pd.* , ud.*,(select address1 from userdetails u where u.mobileno=pd.mobileno ) as address,(select ud.address2 ) as location, (select p.packagename from package p where p.packageid=pd.packageid) as packagename,sum(pd.amount) as total  from purchasedetails pd,userdetails ud   where orderstatus='order' and ud.address2 like '%" +
    req.body.location +
    "%' group by pd.orderno";
  console.log("qq", q);
  pool.query(q, function (error, result) {
    if (error) {
      console.log("vvvv", error);

      return res.status(500).json({ result: false });
    } else {
      console.log("query", result);

      return res.status(200).json({ data: result });
    }
  });
});

router.post("/search", function (req, res) {
  pool.query(
    "select * from purchasedetails where orderdate between ? and ? ",
    [req.body.selectedDate1, req.body.selectedDate2],
    function (error, result) {
      if (error) {
        return res.status(500).json({ RESULT: "" });
      } else {
        console.log("result", result.length);
        return res.status(200).json({ data: result });
      }
    }
  );
});

router.post("/deliverorder", function (req, res) {
  console.log("orderno", req.body.orderno);
  pool.query(
    "select p.*,(select u.username from userdetails u where u.emailaddress=p.usermailid) as username ,(select f.packagename from package f where f.packageid=p.packageid) as packagename ,(select u.address1 from userdetails u where u.emailaddress= p.usermailid) as address  from purchasedetails p where orderno=?",
    [req.body.orderno],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});
router.get("/orders", function (req, res) {
  console.log("orderno", req.body.orderno);
  pool.query("select orderno from purchasedetails  ", function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json([]);
    } else {
      console.log(result);
      return res.status(200).json(result);
    }
  });
});

router.post("/listOrdersByMobile", function (req, res) {
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log(td);
  pool.query(
    "select O.orderno,O.orderdate,O.ordertime,O.deliverstatus, O.orderstatus,O.status,O.mobileno,O.usermailid,sum(O.amount) as amount, (select A.address from deliveryaddress A where A.orderno=O.orderno) as address from purchasedetails O  where O.orderdate='" +
      td +
      "'  and  O.mobileno like '%" +
      req.body.mobileno +
      "%'  group by O.orderno,O.orderdate,O.mobileno,O.usermailid,O.deliverstatus,O.orderstatus order by O.orderno desc ",
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/listHistoryOrdersByMobile", function (req, res) {
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log(td);
  pool.query(
    "select O.orderno,O.orderdate,O.ordertime,O.deliverstatus, O.orderstatus,O.status,O.mobileno,O.usermailid,sum(O.amount) as amount, (select A.address from deliveryaddress A where A.orderno=O.orderno) as address from purchasedetails O  where  O.mobileno like '%" +
      req.body.mobileno +
      "%'  group by O.orderno,O.orderdate,O.mobileno,O.usermailid,O.deliverstatus,O.orderstatus order by O.orderno desc ",
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.get("/listOrders", function (req, res) {
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log(td);
  pool.query(
    "select O.orderno,O.orderdate,O.ordertime,O.deliverstatus,O.orderstatus,O.status,O.mobileno,O.usermailid,sum(O.amount) as amount, (select A.address from deliveryaddress A where A.orderno=O.orderno) as address from purchasedetails O  where O.orderdate=?  group by O.orderno,O.orderdate,O.mobileno,O.usermailid,O.deliverstatus,O.orderstatus  order by O.transactionid desc",
    [td],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/listOrdersOutlet", function (req, res) {
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log(td);
  pool.query(
    "select O.orderno,O.orderdate,O.ordertime,O.deliverstatus,O.orderstatus,O.status,O.mobileno,O.usermailid,sum(O.amount) as amount, (select A.address from deliveryaddress A where A.orderno=O.orderno) as address from purchasedetails O  where O.orderdate=? and O.outletid=? group by O.orderno,O.orderdate,O.mobileno,O.usermailid,O.deliverstatus,O.orderstatus  order by O.transactionid desc",
    [td, req.body.outletid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/listHistoryOrders", function (req, res) {
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log(td);
  pool.query(
    "select O.orderno,O.orderdate,O.ordertime,O.deliverstatus,O.orderstatus,O.status,O.mobileno,O.usermailid,sum(O.amount) as amount, (select A.address from deliveryaddress A where A.orderno=O.orderno) as daddress from purchasedetails O  where O.outletid=?  group by O.orderdate,O.orderno,O.mobileno,O.usermailid,O.deliverstatus,O.orderstatus  order by O.transactionid desc",
    [req.body.outletid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.get("/orderById", function (req, res) {
  var d = new Date();
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "-" +
    (mp + (d.getMonth() + 1)) +
    "-" +
    (dp + d.getDate());
  console.log(td);
  pool.query(
    "select orderno,orderdate,ordertime,mobileno,usermailid,sum(amount) as amount from purchasedetails  where orderdate=? group by orderno,orderdate,mobileno,usermailid",
    [td],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/listOrderById", function (req, res) {
  pool.query(
    "select O.*,(select F.foodname from fooditems F where F.foodid=O.foodid) as foodname,(select F.picture from fooditems F where F.foodid=O.foodid) as picture,(select F.description from fooditems F where  F.foodid=O.foodid) as description,(select U.username from user U where U.mobileno=O.mobileno) as username from purchasedetails O where orderno=?",
    [req.body.orderid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/editrecord", function (req, res, next) {
  console.log(req.body);
  // console.log(req.file)
  let q = "";
  if (req.body.address1state) {
    q = "update userdetails set " + req.body.fieldx + "=?  where mobileno=?";
  } else if (req.body.address2state) {
    q = "update userdetails set " + req.body.fieldx + "=?  where mobileno=?";
  } else {
    q = "update user set " + req.body.fieldx + "=?  where mobileno=?";
  }
  pool.query(q, [req.body.value, req.body.mobileno], function (error, result) {
    if (error) {
      return res.status(500).json({ RESULT: false });
    } else {
      return res.status(200).json({ RESULT: true });
    }
  });
});
router.post("/orderhistory", function (req, res) {
  pool.query(
    "select f. *,(select p.packagename from package p where f.packageid=p.packageid)as packagename,(select p.picture from package p where f.packageid=p.packageid)as picture from purchasedetails f where mobileno=?",
    [req.body.mobileno, req.body.packageid],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});
router.post("/searchorderbydate", function (req, res) {
  var d = new Date(req.body.selectedDate1);
  if (d.getMonth() >= 9) mp = "";
  else mp = "0";
  if (d.getDate() >= 9) dp = "";
  else dp = "0";
  var td =
    d.getFullYear() +
    "/" +
    (mp + (d.getMonth() + 1)) +
    "/" +
    (dp + d.getDate());

  var w = new Date(req.body.selectedDate2);
  if (w.getMonth() >= 9) mp = "";
  else mp = "0";
  if (w.getDate() >= 9) dp = "";
  else dp = "0";
  var wd =
    w.getFullYear() +
    "/" +
    (mp + (w.getMonth() + 1)) +
    "/" +
    (dp + w.getDate());
  console.log(req.body, wd, td);
  pool.query(
    "select f. * ,(select p.packagename from package p where f.packageid=p.packageid)as packagename,(select p.picture from package p where f.packageid=p.packageid)as picture from purchasedetails f where orderdate BETWEEN ? AND ? and mobileno=? AND status=?",
    [td, wd, req.body.mobileno, req.body.status, req.body.packageid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/addrecord", function (req, res) {
  pool.query(
    "insert into userd (firstname,lastname,dob,emailid) values(?,?,?,?)  ",
    [req.body.firstname, req.body.lastname, req.body.dob, req.body.emailid],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ RESULT: false });
      } else {
        res.status(200).json({ RESULT: true });
      }
    }
  );
});
router.post("/changepassword", function (req, res) {
  console.log(req.body.mobileno);
  pool.query(
    "update user set password=?  where mobileno=?",
    [req.body.password, req.body.mobileno],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.get("/usersblock", function (req, res) {
  console.log(req.body);

  pool.query("select * from user", function (error, result) {
    if (error) {
      console.log(error);
      // res.render('user/userblock', { data:[],msg:'Error'})
    } else {
      console.log(result);
      res.render("user/userblock", { data: result, msg: "" });
    }
  });
});

router.get("/blockuserbyid", function (req, res) {
  console.log(typeof req.query.blockstatus);
  console.log(typeof JSON.parse(req.query.blockstatus));

  pool.query(
    "update user set blockstatus=? where mobileno=?",
    [JSON.parse(req.query.blockstatus), req.query.mobileno],
    function (error, result) {
      if (error) {
        console.log(error);

        res.status(500).json(0);
      } else {
        console.log(result);
        res.status(200).json(1);

        //res.redirect('/users/usersblock')

        // res.render('user/userblock', { data:result,msg:''})
      }
    }
  );
});

router.post("/changeaddress", function (req, res) {
  console.log(req.body);
  pool.query(
    "update userdetails set addressid=?  where mobileno=?",
    [req.body.addressid,req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log(error)
        return res.status(500).json([]);
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});




module.exports = router;

