var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//getting taskboard after opening
router.get('/Taskboard.html', function(req, res, next) {
  res.send("hello this is the taskboard ");
  //res.sendFile('/public/managerTaskBoard.html', {root: public });
});


router.post('/login', function(req, res, next) {
  console.log(req.session);
  var json_data = JSON.parse(req.body.json_string);

  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    var query = "SELECT user_id,username,fullName,position FROM users WHERE username = ? AND password = ?";
    connection.query(query, [json_data.username, json_data.password], async function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      if(rows.length > 0){
          var position= rows[0].position;

         res.send({ message:position });

            // res.json(rows);
        // try {
        //   if (await argon2.verify(rows[0].password, req.body.pass)) {
        //     delete rows[0].password;
        //     req.session.user = rows[0];
        //     res.end();
        //     return;
        //   }
        // } catch (err) {
        //   console.log(err);
        // }
        // res.sendStatus(200);
      }
      else{
        res.sendStatus(404);
      }

    });
  });
console.log(req.session);
});



router.post('/logout', function(req, res, next) {
  // { user: 'name', pass: 'pass'}

  console.log(req.session);

  delete req.session.user;

  res.sendStatus(200);

  console.log(req.session);

});


router.post('/register', function(req,res,next){
  console.log(req.body);
  console.log(req.body.firstname);
  var fullname = req.body.firstname +' '+ req.body.lastname;

    req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO users SET ?";
    connection.query(query, {username: req.body.email, position:req.body.radio, fullName: fullname, password: req.body.password_input}, async function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      else{
        req.session.user = rows;

        req.session.role = req.body.radio;

        res.redirect('log-in.html');
        // if(req.body.radio = '0') {
        //   res.writeHead(302, {
        //     'Location': '/employeeTaskboard.html'
        //   });
        // } else {
        //   res.writeHead(302, {
        //     'Location': '/managerTaskboard.html'
        //   });
        // }

        res.end();
        // res.sendStatus(200);
      }

    });
  });

// console.log(req.session);

});

// router.get('/taskboard', (req, res, next) => {
//     let user = req.session.user;
//     let role = req.session.role;
//     if(role = "0") {
//         res.render('/public/employeeTaskboard', {name:user.fullName});

//     } else {
//       res.render('/public/managerTaskboard', {name:user.fullName});

//     }

//     // res.redirect('/');
// });


module.exports = router;