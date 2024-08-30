var express = require('express');
var router = express.Router();
var pool = require('./pool')

/* GET users listing. */
router.post('/checkadminlogin', function(req, res, next) {
    pool.query("select * from administrator where emailid=?and password=?",[req.body.emailid,req.body.password],function(error,result){
   if(error)
   {
    res.status(500).json({result:false})
   }
   else
   {
       if(result.length==0)
       {
        res.status(200).json({result:false})
       }
       else
       {
        res.status(200).json({result:true,data:result})
       }

   }

    })

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
  let q = `insert into purchasedetails(orderno,orderdate,productid,price,quantity,amount,discount,usermailid,mobileno,ordertime,status,deliverstatus,orderstatus,notesforitem,outletid,paymenttransactionid,amountpaid,deliverycharges,deliveryaddress,itc,loyaltypoints,newloyaltypoints,color,size,picture,sizeid,colorid) values ?`;
  pool.query(
    q,
    [req.body.map((item) => [
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
        item.itc,
        item.lp,
        item.newloyaltypoints,
        item.color,
        item.size,
        item.picture,
        item.sizeid,
        item.colorid,
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
module.exports = router;