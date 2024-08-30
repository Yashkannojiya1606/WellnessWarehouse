var express = require("express");
var router = express.Router();
var multer = require("./multer");
var pool = require("./pool");
const { createPoolCluster } = require("mysql");
const { query } = require("express");
/* GET home page. */

router.post("/productfillad", function (req, res, next) {
  pool.query(
    "select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname,(Select C.id from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryid,(select B.brandid from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandid  from productitems P where P.adstatus='yes' and p.displaystatus='active'",
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result.length);

        return res.status(200).json(result);
      }
    }
  );
});

router.post("/productitemsAdvSearch", function (req, res, next) {
  pool.query(
    "select *,(select CT.categoryname from category CT where P.categoryid=CT.id)as categoryname,(select M.modelname from models M where M.modelid=P.modelid)as modelname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname from productitems P where (productname like '%" +
    req.body.pat +
    "%' or brandid in (select brandid from brand where brandname like '%" +
    req.body.pat +
    "%')) and displaystatus='active'",
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/productitemsbybrandid", function (req, res, next) {
  pool.query(
    "select * from productitems where brandid=? and displaystatus='active' order by productid desc",
    [req.body.brandid],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/productSearchByName", function (req, res, next) {
  pool.query(
    "select * from productitems where productname like '%" +
    req.body.productname +
    "%'",
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});



router.get("/productbyproductid/:productid", function (req, res, next) {
  console.log(req.params.productid)
  pool.query(
    "select C.colorid,C.color,P.productid,P.productname,P.modelid,P.description,P.price,P.picture,P.offerprice,P.delivery,P.ratings,P.status,P.categoryid,P.brandid,P.adstatus,P.displaystatus,P.subcategoryid,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select M.modelname from models M where M.modelid=P.modelid)as modelname,false as stock from color C,productitems P where C.productid=? and P.productid=?",
    [req.params.productid, req.params.productid],
    function (error, result) {
      if (error) {
        // console.log(error)
        return res.status(500).json([]);
      } else {
        //console.log(result)
        return res.status(200).json(result);
      }
    }
  );
});

router.get("/Interface", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    pool.query("select * from models", function (error, result) {
      if (error) {
        res.render("productitem/productitem", { msg: "", arrData: [] });
      } else {
        res.render("productitem/productitem", { msg: "", arrData: result });
      }
    });
  }
});

router.get("/Interface1", function (req, res, next) {
  res.render("productitem/text", { msg: "" });
});

router.get("/searchproductitem", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    res.render("productitem/searchproductitem", { msg: "" });
  }
});

router.post("/addproductitem", multer.any(), function (req, res) {
  console.log("xxxxxxxxxxxxxxxxxxxxxx", req.body);

  pool.query(
    "insert into productitems(modelid ,productname,description,price,offerprice,picture,delivery,ratings,status,categoryid,brandid,ad,adstatus,subcategoryid)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
    [
      req.body.modelid,
      req.body.productname,
      req.body.editor1,
      req.body.price,
      req.body.offerprice,
      req.files[0].originalname,
      req.body.delivery,
      req.body.ratings,
      req.body.status,
      req.body.categoryid,
      req.body.brandid,
      req.files[1].originalname,
      req.body.adstatus,
      req.body.subcategoryid
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.render("productitem/productitem", { msg: "fail to submit" });
      } else {
        pool.query("select * from models", function (error1, result1) {
          if (error1) {
            res.render("productitem/productitem", {
              msg: "record submitted",
              arrData: [],
            });
          } else {
            res.render("productitem/productitem", {
              msg: "record submitted",
              arrData: result1,
            });
          }
        });
      }
    }
  );
});


router.post("/productitemdisplay", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    // pool.query(
    //   "select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname  from productitems P where P.modelid=?",
    //   [req.body.modelid],
    pool.query("select P.*,(Select C.categoryname from category C where C.id=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname, (select M.modelname from models M where M.modelid=P.modelid) as modelname from productitems P where P.modelid=?",
      [req.body.modelid],

      function (err, result) {
        if (err) {
          console.log(err);
          res.render("productitem/productitemdisplay", {
            data: "There is an error in fetching data from server",
          });
        } else {
          console.log(result);
          res.render("productitem/productitemdisplay", { data: result });
        }
      }
    );
  }
});


router.get("/productitemdisplaybyid", function (req, res, next) {
  pool.query("select P.*,(Select C.categoryname from category C where C.id=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname, (select M.modelname from models M where M.modelid=P.modelid) as modelname from productitems P where P.productid=?",
    [req.query.fid],
    function (err, result) {
      if (err) {
        res.render("productitem/productitemdisplaybyid", {
          data: "There is an error in fetching data from server",
        });
      } else {
        console.log(result.length);
        console.log(result)
        //return res.json({ data:result,data1:result1[0].categoryname,data2:result2})
        res.render("productitem/productitemdisplaybyid", { data: result });
      }
    }
  );
});


router.post("/branddetailsbyproductid", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname,(Select C.id from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryid,(select B.brandid from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandid  from productitems P,color C where P.brandid=?  and P.displaystatus='active' and C.productid=P.productid group by P.productid",
    [req.body.brandid],
    function (err, result) {
      if (err) {
        return res.status(500).json([]);
      } else {
        console.log(result.length);

        return res.status(200).json(result);
      }
    }
  );
});

router.post("/listdetailsbyproductcolor", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname,(Select C.id from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryid,(select B.brandid from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandid  from productitems P where P.categoryid=? and P.modelid=? and  P.brandid=? and P.color=?",
    [req.body.categoryid, req.body.modelid, req.body.brandid, req.body.color],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result.length);

        return res.status(200).json(result);
      }
    }
  );
});

router.post("/productitembyid", function (req, res, next) {
  pool.query(
    "select P.*,(select CT.categoryname from category CT where P.categoryid=CT.id)as categoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select M.modelname from models M where M.modelid=P.modelid)as modelname, GROUP_CONCAT(C.color) as colors, GROUP_CONCAT(S.sizeno) as sizes from productitems P,color C, size S where P.categoryid=? and P.displaystatus='active' and C.productid=P.productid and S.productid=P.productid group by P.productid",
    req.body.categoryid,
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        //console.log(result.length)

        return res.status(200).json(result);
      }
    }
  );
});

router.get("/productitems", function (req, res, next) {
  pool.query(
    "select F.*,(Select categoryname from category C where C.id=F.categoryid )as categoryname from productitems F",
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

router.post("/productitemsbycolor", function (req, res, next) {
  pool.query(
    "select color,picture,productid from productitems where categoryid=? and modelid=? and brandid=? and subcategoryid=? group by color",
    [req.body.categoryid, req.body.modelid, req.body.brandid, req.body.subcategoryid],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        //console.log(result.length)
        return res.status(200).json(result);
      }
    }
  );
});

/////product color////
router.post("/productsbycolor", function (req, res, next) {
  pool.query(
    "select PP.*,(select C.color from color C where C.colorid=PP.colorid)as color from productpictures PP where PP.colorid in(select C.colorid from color C where C.productid=?) group by PP.colorid",
    [req.body.productid],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        //console.log(result)
        return res.status(200).json(result);
      }
    }
  );
});

///fethcSize///


router.post("/productsbysize", function (req, res, next) {
  pool.query(
    "select S.*,(select I.stock from inventory I where I.sizeid=S.sizeid)as stock where from size S where S.productid=? and S.colorid=?",
    [req.body.productid, req.body.colorid],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result)
        return res.status(200).json(result);
      }
    }
  );
});


router.get("/productitemsoffer", function (req, res, next) {
  pool.query(
    "select F.*,C.colorid,(Select categoryname from category C where C.id=F.categoryid )as categoryname,(select B.brandname from brand B where B.brandid=F.brandid)as brandname,(select M.modelname from models M where M.modelid=F.modelid)as modelname from productitems F,color C where F.offerprice>0 and F.displaystatus='active' and C.productid=F.productid group by F.productid",
    function (err, result) {
      if (err) {
        console.log(err)
        return res.status(500).json([]);
      } else {
        console.log(result)
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/editproductitem", function (req, res) {
  //console.log("PPPP",req.body);
  if (req.body["btn"] == "Update") {
    pool.query(`mysql_set_charset('utf8mb4')`);
    pool.query(
      "update productitems set modelid=?,productname=?,description=?,price=?,offerprice=?,delivery=?, ratings=?,status=?,categoryid=?,brandid=?,adstatus=? where productid=?",
      [
        req.body.modelid,
        req.body.productname,
        req.body.editor1,
        req.body.price,
        req.body.offerprice,
        req.body.delivery,
        req.body.ratings,
        req.body.status,
        req.body.categoryid,
        req.body.brandid,
        req.body.adstatus,
        req.body.productid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/product1/searchproductitem");
        } else {
          console.log(query)
          res.redirect("/product1/searchproductitem");
        }
      }
    );
  } else {
    pool.query(
      "delete from productitems where productid=?",
      [req.body.productid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/product1/searchproductitem");
        } else {
          res.redirect("/product1/searchproductitem");
        }
      }
    );
  }
});


router.post("/updatepicture", multer.single("picture"), function (req, res) {
  console.log("UPDATION...", req.body);

  var fn = req.file.originalname;

  if (req.body["btn"] == "Update Product") {
    pool.query(
      "update productitems set picture=? where productid=?",
      [fn, req.body.productid],
      function (error, result) {
        if (error) {
          console.log("xxxxxxxxxxxxxxxx" + error);
          res.redirect("/product1/searchproductitem");
        } else {
          console.log("xxxxxxxxxxxxxxxx sahi h");

          res.redirect("/product1/searchproductitem");
        }
      }
    );
  } else if (req.body["btn"] == "Update Ad") {
    pool.query(
      "update productitems set ad=? where productid=?",
      [fn, req.body.productid],
      function (error, result) {
        if (error) {
          console.log("xxxxxxxxxxxxxxxx" + error);
          res.redirect("/product1/searchproductitem");
        } else {
          console.log("xxxxxxxxxxxxxxxx sahi h");

          res.redirect("/product1/searchproductitem");
        }
      }
    );
  }
});

router.get("/chk", function (req, res) {
  let data =
    "update productitems set stock=stock-1 where productid=88; update productitems set stock=stock-1 where productid=88;";

  pool.query(data, function (error, resul, fields) {
    if (error) {
      console.log("xxxxxxxxxxxxxxxx" + error);
      return res.status(500).json({ result: false });
    } else {
      console.log("xxxxxxxxxxxxxxxx sahi h");

      return res.status(200).json({ result: true });
    }
  });
});

router.post("/updatestock", function (req, res) {
  // console.log("UPDATION...", req.body);

  var join = req.body.join(";");

  console.log("Jon", join);
  pool.query(join, function (error, result) {
    if (error) {
      console.log("xxxxxxxxxxxxxxxx" + error);
      return res.status(500).json({ result: false });
    } else {
      console.log("xxxxxxxxxxxxxxxx sahi h");

      return res.status(200).json({ result: true });
    }
  });
});

router.get("/productitemdisplaystock", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    pool.query(
      "select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname  from productitems P where P.modelid=?",
      [req.query.modelid],
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
          //res.render('productitem/productitemdisplaystock', { data:'There is an error in fetching data from server'})}
        } else {
          console.log(result);
          res.status(200).json(result);

          // res.render('productitem/productitemdisplaystock', { data:result})
        }
      }
    );
  }
});

router.get("/searchproductitemupdate", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    res.render("productitem/productitemupdate", { msg: "" });
  }
});

router.get("/updatestockinterface", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    res.render("productitem/productitemupdatestock", { data: [], msg: "" });
  }
});

router.get("/filterforproductitem", function (req, res, next) {
  pool.query(
    `select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname  from productitems P,models M where M.modelname like '%${req.query.modelname}%' and M.modelid=P.modelid;`,
    function (err, result) {
      if (err) {
        res.render("productitem/productitemupdatestock", {
          data: [],
          msg: "Server Error!",
        });
      } else {
        console.log(err, "kripali")
        res.render("productitem/productitemupdatestock", {
          data: result,
          msg: result.length == 0 ? "No result found..." : "",
        });
      }
    }
  );
});

router.get("/filterforproductitemstatus", function (req, res, next) {
  pool.query(
    `select P.*,(Select C.categoryname from category C where C.id in(select B.categoryid  from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid))) as categoryname,(select B.brandname from brand B where B.brandid in(select M.brandid from models M where M.modelid=P.modelid)) as brandname,(select M.modelname from models M where M.modelid=P.modelid) as modelname  from productitems P,models M where M.modelname like '%${req.query.modelname}%' and M.modelid=P.modelid;`,
    function (err, result) {
      if (err) {
        res.render("productitem/productdisplaystatus", {
          data: [],
          msg: "Server Error!",
        });
      } else {
        res.render("productitem/productdisplaystatus", {
          data: result,
          msg: result.length == 0 ? "No result found..." : "",
        });
      }
    }
  );
});

router.get("/updatestocks", function (req, res, next) {
  pool.query(
    "update productitems set stock=? where productid=?",
    [req.query.stock, req.query.productid],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/updatestockmultiple", function (req, res, next) {
  var qr = "";
  var keys = Object.keys(req.body);
  const values = Object.values(req.body);
  keys.map((item, index) => {
    keys[index] = item.substring(3);
    qr += `update productitems set stock=${values[index]} where productid=${keys[index]};`;
  });
  pool.query(qr, function (err, result) {
    if (err) {
      console.log(err);
      res.render("productitem/productitemupdate", { msg: "Server Error!" });
    } else {
      res.render("productitem/productitemupdate", {
        msg: "Stock Updated Successfully",
      });
    }
  });
});

router.post("/updatestockmultiple2", function (req, res, next) {
  var qr = "";
  var keys = Object.keys(req.body).slice(1);
  const values = Object.values(req.body).slice(1);
  keys.map((item, index) => {
    const val = values[index];
    keys[index] = item.substring(3);
    qr += `update productitems set price=${val[0]},offerprice=${val[1]},stock=${val[2]} where productid=${keys[index]};`;
  });
  pool.query(qr, function (err, result) {
    if (err) {
      console.log(err);
      res.render("productitem/productitemupdatestock", {
        data: [],
        msg: "Server Error!",
      });
    } else {
      res.render("productitem/productitemupdatestock", {
        data: [],
        msg: "Stock Updated Successfully",
      });
    }
  });
});

router.get("/productdisplaystatus", function (req, res, next) {
  if (!req.session.admin) {
    res.render("admin/adminlogin", { result: "" });
  } else {
    res.render("productitem/productdisplaystatus", { data: [], msg: "" });
  }
});

router.post("/saveproductdisplaystatus", function (req, res, next) {
  var qr = "";
  var keys = Object.keys(req.body).slice(1);
  const values = Object.values(req.body).slice(1);
  keys.map((item, index) => {
    const val = values[index];
    keys[index] = item.substring(3);
    if (Array.isArray(val)) {
      qr += `update productitems set displaystatus='active' where productid=${keys[index]};`;
    } else {
      qr += `update productitems set displaystatus='deactive' where productid=${keys[index]};`;
    }
  });
  pool.query(qr, function (err, result) {
    if (err) {
      console.log(err);
      res.render("productitem/productdisplaystatus", {
        data: [],
        msg: "Server Error!",
      });
    } else {
      res.render("productitem/productdisplaystatus", {
        data: [],
        msg: "Display Status Updated Successfully",
      });
    }
  });
});


router.get('/fetchproduct', function (req, res, next) {
  console.log(req.query)
  pool.query('select * from productitems where modelid=?', [req.query.mid], function (error, result) {
    if (error) { //alert('check')
      console.log(error)
      return res.status(500).json([])
    }
    else { return res.status(200).json(result) }
  })
});





router.get("/minproductadbybrand", function (req, res, next) {
  //console.log(req.body);
  pool.query(
    "select  P.offerprice as minprice,P.productid,P.productname,P.ad,P.modelid from productitems P where P.offerprice in(select min(P.offerprice) from productitems P,color C  where P.adstatus='Yes' and C.productid=P.productid group by P.brandid) and P.brandid in(select P.brandid from productitems P group by P.brandid)",
    function (err, result) {
      if (err) {
        console.log(err)
        return res.status(500).json([]);
      } else {
        //console.log(result.length);
        //console.log(result)
        return res.status(200).json(result);
      }
    }
  );
});



router.post("/productsbymodelid", function (req, res, next) {
  pool.query(
    "select P.*,(select CT.categoryname from category CT where P.categoryid=CT.id)as categoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select M.modelname from models M where M.modelid=P.modelid)as modelname, GROUP_CONCAT(C.color) as colors, GROUP_CONCAT(S.sizeno) as sizes from productitems P,color C, size S where P.modelid=? and P.displaystatus='active' and C.productid=P.productid and S.productid=P.productid group by P.productid",
    [req.body.modelid],
    function (error, result) {
      if (error) {
        console.log(error)
        return res.status(500).json([]);
      } else {

        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        const newData = result.map(item => {
          var sizes = item.sizes.split(",");
          console.log(sizes)
          sizes = sizes.filter(onlyUnique);
          const colors = item.colors.split(",")
          return { ...item, sizes, colors }
        })
        console.log(result)
        return res.status(200).json(newData);
      }
    }
  );
});


router.post("/productsbysubcategoryid", function (req, res, next) {
  pool.query(
    "select P.*,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select M.modelname from models M where M.modelid=P.modelid)as modelname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid)as subcategoryname from productitems P,color C where P.subcategoryid=? and P.displaystatus='active' and C.productid=P.productid group by P.productid",
    [req.body.subcategoryid],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

///product Color///

router.post("/productcolor", function (req, res, next) {
  pool.query(
    "select * from color where productid=?",
    [req.body.productid],
    function (error, result) {
      if (error) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
