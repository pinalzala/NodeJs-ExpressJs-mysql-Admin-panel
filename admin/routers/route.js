var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var validator = require('express-validator');
var request = require('request');
var EventEmitter = require("events").EventEmitter;
const config = require('../config.json');
const urlapi = config.url;
const imagepath = config.imagepath;
const base = config.base;
const front = config.front;

const fs = require("fs");
const multer = require('multer');
const csv = require('csv-parser');
var body = new EventEmitter();
const upload = multer({ dest: 'uploads/' })
const csvtojson = require('csvtojson');
const { json } = require('body-parser');


module.exports = function (app) {

  function isUserAllowed(req, res, next) {
    sess = req.session;
    if (sess.user) {
      return next();
    }
    else { res.redirect(base + '/login'); }
  }
  
  
  app.post(base + '/importuser', upload.single('file'), function (req, res) {

    // const readStream= fs.createReadStream(upload+""+req.file.filename+".csv");
    var fileName = req.file.path;
    //console.log(fileName);
    var csvData = [];
    fs.createReadStream(fileName)
      .pipe(csv({ delimiter: ':' }))
      .on('data', function (csvrow) {

        csvData.push(csvrow);
      })
      .on('end', function () {
        //do something with csvData



        // var data= {'fname':pass.Firstname,'lname':pass.Lastname,'username':pass.Username,'email':pass.Email,'country':pass.country};
        //console.log(data);

        var options = {
          'method': 'POST',
          'url': urlapi + 'importuser',
          'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'refreshToken=f29c019c3f1654b1d5a4ae04fd610b5f41711384e56809ee2e5ef4bd0ccc497c919bef0998a8c3d4'
          },
          body: JSON.stringify(csvData)

        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          var data = JSON.parse(response.body);

          req.flash('message', data.message);
          res.redirect(base + '/users');
        });


      });
  });
  app.get(base, isUserAllowed, function (req, res) {
    var optionsuser = {
      'method': 'GET',
      'url': urlapi + 'totalcount',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    
      request(optionsuser, function (error, responsed) {
        if (error) throw new Error(error);
        var responsedatad = JSON.parse(responsed.body);
        res.locals = { title: 'Dashboard', totaldata: responsedatad, urlapi: urlapi, base: base, front:front };
        res.render('Dashboard/index');
      });
    });

  app.get(base + '/adduser', isUserAllowed, function (req, res) {
    
    
          res.locals = { title: 'Add User', urlapi: urlapi, base: base };
          res.render('Users/adduser');
       
 
});
  
  
  
  
  
  

 
  app.get(base + '/updateuser', isUserAllowed, function (req, res) {
    var id = req.query.id;
    var options = {
      'method': 'GET',
      'url': urlapi + 'getuser/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
   
   
   
   
    
    request(options, function (error, response) {
     
       
                var responsedata = JSON.parse(response.body);
                

                res.locals = { title: 'Update User', base: base,  users: responsedata, id: id, imagepath: imagepath, urlapi: urlapi };
                res.render('Users/updateuser');
              
  
  });
});

  app.get(base + '/users', isUserAllowed, function (req, res) {

      res.locals = { title: 'User List', base: base, urlapi: urlapi, imagepath: imagepath };
      res.render('Users/index');
    });


  app.get(base + '/addbanner', isUserAllowed, function (req, res) {

    
   
      res.locals = { title: 'Add Banner', base: base,  urlapi: urlapi };
      res.render('Banner/addbanner');
    
  });
    app.get(base + '/editcontact', isUserAllowed, function (req, res) {
    var id = req.query.id;
    var optionstest = {
      'method': 'GET',
      'url': urlapi + 'getcontactbyid/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };

    request(optionstest, function (error, responsetest) {
      if (error) throw new Error(error);

      var responsetest = JSON.parse(responsetest.body);
      res.locals = { title: 'Update Contact', base: base, id: id, responsetest: responsetest, urlapi: urlapi };
      res.render('Cms/editcontact');
    });

  });
  
  app.get(base + '/editcms', isUserAllowed, function (req, res) {
    var id = req.query.id;
    var optionstest = {
      'method': 'GET',
      'url': urlapi + 'getcmsbyid/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };

    request(optionstest, function (error, responsetest) {
      if (error) throw new Error(error);

      var responsetest = JSON.parse(responsetest.body);
      res.locals = { title: 'Cms', base: base, id: id, responsetest: responsetest, urlapi: urlapi };
      res.render('Cms/editcms');
    });

  });
  app.get(base + '/editfaq', isUserAllowed, function (req, res) {
    var id = req.query.id;
    var optionstest = {
      'method': 'GET',
      'url': urlapi + 'getfaqbyid/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };

    request(optionstest, function (error, responsetest) {
      if (error) throw new Error(error);

      var responsetest = JSON.parse(responsetest.body);
      res.locals = { title: 'Update Faq', base: base, id: id, responsetest: responsetest, urlapi: urlapi };
      res.render('Cms/editfaq');
    });

  });
  
  app.get(base + '/addcontact', isUserAllowed, function (req, res) {

    res.locals = { title: 'Add Contact', base: base, urlapi: urlapi };
    res.render('Cms/addcontact');

  });
  app.get(base + '/addcms', isUserAllowed, function (req, res) {

    res.locals = { title: 'Cms', base: base, urlapi: urlapi };
    res.render('Cms/addcms');

  });
  app.get(base + '/addfaq', isUserAllowed, function (req, res) {

    res.locals = { title: 'Add Faq', base: base, urlapi: urlapi };
    res.render('Cms/addfaq');

  });
 

  app.get(base + '/updatebanner', isUserAllowed, function (req, res) {
    var id = req.query.id;
    var options = {
      'method': 'GET',
      'url': urlapi + 'getbannerbyid/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
   
    request(options, function (error, response) {
      if (error) throw new Error(error);

      var responsedata = JSON.parse(response.body);

     
        
        res.locals = { title: 'Update Banner', base: base, banner: responsedata, id: id, imagepath: imagepath, urlapi: urlapi };
        res.render('Banner/editbanner');
      });
   
  });



  
  app.get(base + '/contact', isUserAllowed, function (req, res) {

    var optionscategory = {
      'method': 'GET',
      'url': urlapi + 'getallcontactadmin',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    request(optionscategory, function (error, response) {
      if (error) throw new Error(error);
      var responsedata = JSON.parse(response.body);
      res.locals = { title: 'Contact', base: base, contact: responsedata, urlapi: urlapi };
      res.render('Cms/contact');
    });

  });
  app.get(base + '/faq', isUserAllowed, function (req, res) {

    var optionscategory = {
      'method': 'GET',
      'url': urlapi + 'faq',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    request(optionscategory, function (error, response) {
      if (error) throw new Error(error);
      var responsedata = JSON.parse(response.body);
      res.locals = { title: 'Faq', base: base, faq: responsedata, urlapi: urlapi };
      res.render('Cms/faq');
    });

  });
  app.get(base + '/cms', isUserAllowed, function (req, res) {
    res.locals = { title: 'CMS List', base: base, urlapi: urlapi };
    res.render('Cms/cms');
  });
  
  
  app.get(base + '/banner', isUserAllowed, function (req, res) {

    res.locals = { title: 'Banner', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('Banner/index');

  });
  



  app.get(base + '/blog', isUserAllowed, function (req, res) {
    res.locals = { title: 'Blog', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('blog/index');
  });

  app.get(base + '/addblog', isUserAllowed, function (req, res) {
    var optionscategory = {
      'method': 'GET',
      'url': urlapi + 'blogcategory',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    var optionsuser = {
      'method': 'GET',
      'url': urlapi + 'getAllusersfront',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    request(optionscategory, function (error, responsed) {
      request(optionsuser, function (error, responsedd) {

        if (error) throw new Error(error);
        var categorydata = JSON.parse(responsed.body);
        var userdata = JSON.parse(responsedd.body);
        res.locals = { title: 'Add Blog', base: base, categorydata: categorydata, userdata: userdata, urlapi: urlapi };
        res.render('blog/addblog');
      });
    });
  });

  app.get(base + '/editblog', isUserAllowed, function (req, res) {

    var id = req.query.id;
    var optionsblog = {
      'method': 'GET',
      'url': urlapi + 'getblogbyid/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    var optionscategory = {
      'method': 'GET',
      'url': urlapi + 'blogcategory',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    var optionsuser = {
      'method': 'GET',
      'url': urlapi + 'getAllusersfront',
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };

    request(optionsblog, function (error, responsed) {
      request(optionscategory, function (error, responsedd) {
        request(optionsuser, function (error, responseuser) {

          if (error) throw new Error(error);
          var blog = JSON.parse(responsed.body);
          var categorydata = JSON.parse(responsedd.body);
          var userdata = JSON.parse(responseuser.body);
          //console.log('id',id);
          res.locals = { title: 'Edit Blog', base: base, blog: blog, id: id, categorydata: categorydata, userdata: userdata, imagepath: imagepath, urlapi: urlapi };
          res.render('blog/editblog');
        });
      });
    });
  });

  app.get(base + '/manageblogcategory', isUserAllowed, function (req, res) {
    res.locals = { title: 'Manage Blog Category', base: base, urlapi: urlapi };
    res.render('blog/manageblogcategory');
  });

  app.get(base + '/addblogcategory', isUserAllowed, function (req, res) {

    res.locals = { title: 'Add Blog Category', base: base, urlapi: urlapi };
    res.render('blog/addblogcategory');
  });

  app.get(base + '/editblogcategory', isUserAllowed, function (req, res) {

    var id = req.query.id;
    //var cat_name = req.query.categoryname;

    var options = {
      'method': 'GET',
      'url': urlapi + 'blogcategorybyid/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var catdata = JSON.parse(response.body);
      console.log(catdata[0].txt_catname);
      res.locals = { title: 'Edit Blog Category', base: base, catdata: catdata, id: id, urlapi: urlapi };
      res.render('blog/updateblogcategory');

    });
  });


  
  
  app.get(base + '/changepassword', isUserAllowed, function (req, res) {

    res.locals = { title: 'Change Password', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('admin/changepassword');
  });

  
  app.get(base + '/administrator', isUserAllowed, function (req, res) {

    res.locals = { title: 'Administrator List', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('admin/administrator');
  });

  
  app.get(base + '/editadministrator', isUserAllowed, function (req, res) {
    id = req.query.id

    var options = {
      'method': 'GET',
      'url': urlapi + 'getadmindata/' + id,
      'headers': {
        'Cookie': 'refreshToken=4d981ea4c28df051ba99fcc2ea0a6c7719f0da5c4a454cdc074eba0604dff324184673185db67ecd'
      }
    };
    request(options, function (error, response) {
      var admindata = JSON.parse(response.body);

      res.locals = { title: 'Administrator Information', base: base, imagepath: imagepath, urlapi: urlapi, admin: admindata };
      res.render('admin/editadministrator');
    });
  });


}