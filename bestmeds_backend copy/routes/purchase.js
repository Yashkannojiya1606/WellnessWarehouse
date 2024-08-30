const router = require("express").Router();
var multer = require("./multer");
var pool = require("./pool");
const { request } = require("../app");

router.get("/orderdisplay", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    pool.query(
      "select P.*,(select U.username from user U where U.mobileno=P.mobileno) as username, (Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where status='Active' order by P.orderdate desc",
      function (err, result) {
        if (err) {
          console.log(err);
          res.render("order/orderdisplay", {
            data: "There is an error in fetching data from server",
          });
        } else {
          //console.log(result);
          res.render("order/orderdisplay", { data: result });
        }
      }
    );
  }
});

// router.post("/orderdisplaybymobileno", function (req, res, next) {
//   pool.query(
//     "select orderno,orderdate,amountpaid,deliverycharges,status,deliverstatus from purchasedetails  where mobileno=?  group by orderno,orderdate,amountpaid,deliverycharges,status,deliverstatus order by orderdate desc",
//     [req.body.mobileno],
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         return res.status(500).json([]);
//       } else {
//         return res.status(200).json(result);
//       }
//     }
//   );
// });

router.post("/orderdisplaybymobileno", function (req, res, next) {
  pool.query(
    "select orderno,orderdate,amountpaid,deliverycharges,status,deliverstatus,ordertime from purchasedetails  where mobileno=?  group by orderno,orderdate,amountpaid,deliverycharges,status,deliverstatus,ordertime order by orderdate desc",
    [req.body.mobileno],
    function (err, result) {
      if (err) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/cancelorder", function (req, res, next) {
  console.log(req.body);
  var q = "";

  q =
    "update purchasedetails set status='Cancel Order' where orderno='" +
    req.body.orderno +
    "'";

  pool.query(q, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: false });
    } else {
      console.log(result);
      return res.status(200).json({ result: true });
    }
  });
});

router.get("/cancelorderbyadmin", function (req, res, next) {
  console.log(req.query);
  var q = "";
  q ="update purchasedetails set status='Cancel Order' where orderno='" +req.query.orderno +"'";

  pool.query(q, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: false });
    } else {
      console.log(result);
      return res.status(200).json({ result: true });
    }
  });
});

router.post("/orderdetailsbyorderno", function (req, res, next) {
  pool.query(
    "select P.*,(Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where P.orderno=?",
    [req.body.orderno],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

router.get("/orderdisplaybillgenerated", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    pool.query(
      "select P.*,(select U.username from user U where U.mobileno=P.mobileno) as username,(Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where status='Bill Generated' order by P.orderdate desc",
      function (err, result) {
        if (err) {
          console.log(err);
          res.render("order/orderdisplaybillgenerated", {
            data: "There is an error in fetching data from server",
          });
        } else {
          //console.log(result);
          res.render("order/orderdisplaybillgenerated", { data: result });
        }
      }
    );
  }
});

router.get("/orderdisplayoutlet", function (req, res, next) {
  if (!req.session.outlet) {
    res.render("outletlogin/outletlogin", { result: "" });
  } else {
    pool.query(
      "select P.*,(Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where P.outletid=? order by P.orderdate desc",
      [req.session.outlet[0].outletid],
      function (err, result) {
        if (err) {
          console.log(err);
          res.render("outletlogin/outletlogin", {
            data: "There is an error in fetching data from server",
          });
        } else {
          res.render("order/orderdisplay", { data: result });
        }
      }
    );
  }
});

// Cancel
router.get("/orderdisplaybillcancel", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    pool.query(
      "select P.*,(select U.username from user U where U.mobileno=P.mobileno) as username,(Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where status='Cancel Order' order by P.orderdate desc",
      function (err, result) {
        if (err) {
          console.log(err);
          res.render("order/orderdisplaybillcancel", {
            data: "There is an error in fetching data from server",
          });
        } else {
          console.log(result);
          res.render("order/orderdisplaybillcancel", { data: result });
        }
      }
    );
  }
});

// Delivered

router.get("/orderdisplaybilldeliver", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    pool.query(
      "select P.*,(select U.username from user U where U.mobileno=P.mobileno) as username,(Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where status='Delivered' order by P.orderdate desc",
      function (err, result) {
        if (err) {
          console.log(err);
          res.render("order/orderdisplaybilldeliver", {
            data: "There is an error in fetching data from server",
          });
        } else {
          console.log(result);
          res.render("order/orderdisplaybilldeliver", { data: result });
        }
      }
    );
  }
});

router.post("/orderdisplaybilldeliverdate", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    console.log(req.body);
    pool.query(
      "select P.*,(select U.username from user U where U.mobileno=P.mobileno) as username,(Select F.productname from productitems F where P.productid=F.productid) as productname from purchasedetails P where status='Delivered'  and  P.orderdate between ? and ? order by P.orderdate desc",
      [req.body.fromdate, req.body.todate],
      function (err, result) {
        if (err) {
          console.log(err);
          res.render("order/deliverorderfilter", {
            data: "There is an error in fetching data from server",
          });
        } else {
          console.log(result);
          res.render("order/deliverorderfilter", { data: result });
        }
      }
    );
  }
});

module.exports = router;
