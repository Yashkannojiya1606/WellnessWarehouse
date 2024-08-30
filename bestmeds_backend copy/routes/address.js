var express = require("express");
var router = express.Router();
var pool = require("./pool");

/* GET users listing. */

router.post("/addAddress", function (req, res) {
    pool.query(
      "insert into address(usermobile,city,state,country,zipcode,address1,address2,address_status) values(?,?,?,?,?,?,?,false)"
      ,[req.body.mobileno,req.body.city,req.body.state,req.body.country,req.body.zipcode,req.body.address1,req.body.address2],
      function (error, result) {
        if (error) {
          console.log(error)
          return res.status(500).json([]);
        } else {
          return res.status(200).json(result);
        }
      }
    );  
  });

  router.post("/fetchalladdress", function (req, res) {
    //console.log(req.body);
    pool.query(
      "select * from address where usermobile=?",
      [req.body.mobileno],
      function (error, result) {
      if(error){
        return res.status(500).json([]);
      }
      else{
        if (result.length == 0) {
          return res.status(200).json({ RESULT: false });
        } else {
          return res.status(200).json(result);
        }
      }
      }
    );
  });

  
  router.post("/deleteaddress", function (req, res) {
    console.log(req.body);
    pool.query(
        "delete from address where addressid=?",
        [req.body.addressid],
        function (error, result) {
          if (error) {
            return res.status(500).json([]);
          } else {
            return res.status(200).json(result);
          }
        }
      )
  });


  router.post("/changeaddress", function (req, res) {
    console.log(req.body);
    pool.query(
      "update address set address1=?,address2=?,state=?,city=?,zipcode=?,country=? where addressid=?",
      [req.body.address1,req.body.address2,req.body.state,req.body.city,req.body.zipcode,req.body.country,req.body.addressid],
      function (error, result) {
        if (error) {
          console.log(error)  
          return res.status(500).json([]);
        }
         else {
          return res.status(200).json({RESULT:true});
          }
        }
    );
  });


  router.post("/updateprofile", function (req, res) {
    console.log(req.body);
     pool.query(
       "update user set username=?,emailaddress=? where mobileno=?",
       [req.body.username,req.body.emailaddress,req.body.mobileno],
       function (error, result) {
         if (error) {
           console.log(error)
           return res.status(500).json([]);
         }
          else {
           pool.query(
             "update userdetails set username=?,emailaddress=? where mobileno=?",
             [req.body.username,req.body.emailaddress,req.body.mobileno],
             function (error, result) {
               if (error) {
                 console.log(error)
                 return res.status(500).json([]);
               }
                else {
                 return res.status(200).json({RESULT:true});
              }
             }
           );
           
         }
       }
     );
   });

   router.post("/setaddressstatus", function (req, res) {
    pool.query(
      "update address set address_status=false where usermobile=?",[req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error)
          return res.status(500).json([]);
        } else {
          //return res.status(200).json({ RESULT: true });
          pool.query(
            "update address set address_status=true  where addressid=?",
            [req.body.addressid],
            function (error, result) {
              if (error) {
                console.log(error)
                return res.status(500).json([]);
              } else {
                return res.status(200).json({ RESULT: true });
              }
            }
          );
        }
      }
    );
  });

  router.post("/changeaddressstatus", function (req, res) {
    console.log(req.body);
    pool.query(
      "update address set address_status=true  where addressid=?",
      [req.body.addressid],
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
