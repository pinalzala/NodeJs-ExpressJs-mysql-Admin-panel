const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Sequelize, Op, and, not, col } = require('sequelize');
const { sendEmail, sendEmailAttachment } = require('_helpers/send-email');
const db = require('_helpers/db');
var request = require('request');
const fileGetContents = require('file-get-contents');
var gmdate = require('phpdate-js').gmdate;
var formidable = require('formidable');
var serialize = require('node-serialize');
var PHPUnserialize = require('php-unserialize');
var PHPserialize = require('php-serialize');
var pdf = require('html-pdf');
var request = require('request');
// const { imagepath } = require('config.json');
var moment = require('moment');
var facebook_id = '2040964845968119';
var facebook_access_token = 'EAAgM6jZASsVoBAPLZAFDgRgOTUEq8b2J34AKPo7sRZCujfZBAZCbOxcdumOVZC9HQ5H2V77GqXBezG0dhPYlkfFz3D1su0Up3ylcsMMIj156KMzQzWy7vfNbp4vjaidEhUs4o2YciBO5leSFY4YK901qf0OZBw9xeYMtqFBvKRd3m27ljmDw0ow';
var youtube_channel_id = 'UCgkVwVJFAxPMHy-AeW9nvXg';
var google_api_key = 'AIzaSyASiDFhqScNH1BRxvMonnGDcNuQmzjb3qM';
const sharp = require('sharp');
var md5 = require('md5');
const fs = require('fs');
const { imagepath, FULLBASEROOT } = require('config.json');
const mime = require('mime');
const { getMaxListeners } = require('process');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const { Console } = require('console');
var STRIPE_SECRET_KEY_TEST = "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";
const stripe = require("stripe")(STRIPE_SECRET_KEY_TEST);

module.exports = {
  //frontapi
  refreshToken,
  revokeToken,
  forgotPassword,
  validateResetToken,
  getpassword,
  usermanagement,
  updateadmindata,
  totalcount,

  resetPassword,
  addblogadmin,
  updateblogadmin,
  getadmindata,
  addlogin,
  contactsend,
  statuschangeblog,
  statuschangeblogcat,
  blogcategory,
  blogcategoryfront,
  blogcategorybyid,
  getAllcityadmin,
  blogdelete,
  getblog,
  getblogbyid,
  getcontactbyid,
  addcontact,
  addfaq,
  updatefaq,
  getfaqbyid,
  getallcms,
  addcms,
  getAllstateadmin,
  updatecms,
  getcmsbyid,
  deletecontact,
  deletefaq,
  logout,
  getalladmin,
  register,
  statuschangecms,
  updatebanner,
  faq,
  getallbanner,
  getallbanneradmin,
  getallblog,
  getuserid,
  getbannerbyid,
  cms,
  addbanner,
  importuser,
  //users
  getAllusers,
  getAllusersfront,
  adduser,
  addblogcategory,
  updateuser,
  updateblogcategory,
  updatecontact,
  getuser,
  deleteuser,
  deleteblogcategory,
  deletebanner,
  deletemultiuser,
  deletemultibanner,
  approvemultiuser,
  rejectmultiuser,
  inactivemultibanner,
  activemultibanner,
  contactdata,
  getallcontactadmin,
  changepasswordadmin,
  addpagedata,
  getAllcountry,
  getAllcountryadmin

};
/*login process*/
async function addlogin(params, origin) {
  var txt_username = params.username;
  var txt_password = params.password;;

  console.log('params', params)
  var qry = "SELECT * FROM tbl_admins WHERE (username = '" + txt_username + "' OR email = '" + txt_username + "') AND password = '" + md5(txt_password) + "' and status!=2";
  const [result_u, fields1ss] = await db.connection.execute(qry);
  console.log(result_u);
  if (result_u.length > 0) {
    return { 'status': 'success', 'datam': result_u[0] }
  }
  else {
    return { 'status': 'error', 'datam': 'login failed' }
  }

}

async function changepasswordadmin(params, origin) {
  var update_admin = "update tbl_admins set password='" + md5(params.password) + "' where adminid='" + params.adminid + "'";

  const [result_success, fields1] = await db.connection.execute(update_admin);
  if (result_success.affectedRows > 0) {
    return { 'status': 'success', 'message': 'password change Succesfullly' }
  }
  else {
    return { 'status': 'error', 'datam': 'password change Failed' }
  }
}

async function getpassword(params, origin) {

  var password = md5(params.password);
  var qry = "SELECT * FROM tbl_admins where adminid='" + params.adminid + "'";
  const [result, fields1] = await db.connection.execute(qry);
  console.log(result[0].password);
  var oldpassword = result[0].password;
  if (password == oldpassword) {
    return { 'status': 'success', 'message': 'password get Succesfullly' }
  }
  else {
    return { 'status': 'error', 'message': 'password get Failed' }
  }

}




async function getcontactbyid(id) {
  const account = await db.Contact.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }
  return account;

}
async function getfaqbyid(id) {
  const account = await db.Faq.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }
  return account;

}
async function getcmsbyid(id) {
  const account = await db.Cms.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }
  return account;

}

async function usermanagement() {
  var qry = "SELECT * FROM tbl_admins WHERE status != 2 and user_type IN (0,1) order by firstname asc LIMIT 0,20";
  const [getquestionIdinco, fields] = await db.connection.execute(qry);
  return getquestionIdinco;
}
async function updatefaq(id, params) {


  const account = await db.Faq.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }


  // copy params to account and save
  Object.assign(account, params);


  await account.save();

  return data = { status: 'success', message: 'Update Faq successful.' };

}
async function updatecms(id, params) {

  var checkexists = "SELECT * FROM tbl_cms where status != 2 and (page_name = '" + params.page_name + "' OR page_slug = '" + params.page_slug + "') and id != '" + id + "'";
  const [getquestionIdinco, fields] = await db.connection.execute(checkexists);
  if (getquestionIdinco.length > 0) {
    return data = { status: 'error', message: 'CMS already exist.Please try again.' };
  }
  const account = await db.Cms.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }


  // copy params to account and save
  Object.assign(account, params);


  await account.save();

  return data = { status: 'success', message: 'Update Cms successful.' };

}


async function updatecontact(id, params) {


  const account = await db.Contact.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }


  // copy params to account and save
  Object.assign(account, params);


  await account.save();

  return data = { status: 'success', message: 'Update Contact successful.' };

}


async function getblog() {

  const modules = await db.Blog.findAll({ where: { status: { [Op.ne]: 2 } } });

  return modules;

}
async function getblogbyid(id) {

  const modules = await db.Blog.findOne({ where: { id: id } });
  const tag = await db.Blogtag.findAll({ where: { blog_id: id } });

  return { 'blog': modules, 'tag': tag };

}


async function updateblogcategory(id, params) {


  const account = await db.Blogcat.findOne({ where: { id: id, status: 1 } });
  // validate (if email was changed)

  if (params.txt_catname && account.txt_catname !== params.txt_catname && await db.Blogcat.findOne({ where: { txt_catname: params.txt_catname, status: { [Op.ne]: 2 } } })) {
    return data = { status: 'danger', message: 'Category "' + params.txt_catname + '" is already taken' };

  }

  // copy params to account and save
  Object.assign(account, params);


  await account.save();

  return data = { status: 'success', message: 'Update Category successful.' };

}

async function updatebanner(id, params) {
  if (params.countryId) {
    var countryname = [];
    var countryId = params.countryId.split(",");
    for (const ccc of countryId) {
      const country = await db.Country.findOne({ where: { country_code: ccc } });
      if (country) {
        countryname.push(country.country1);
      }

    }
  }

  const account = await db.Banner.findOne({ where: { id: id } });
  if (countryId) {
    account.country_name = countryname.join(",");
  }
  else {
    account.country_name = "";
  }
  // copy params to account and save
  Object.assign(account, params);


  await account.save();

  return data = { status: 'success', message: 'Update Banner successful.' };

}



 
async function updateuser(id, params) {

  const account = await db.Account.findOne({ where: { id: id } });
  // validate (if email was changed)
  if (params.email && account.email !== params.email && await db.Account.findOne({ where: { email: params.email, status: { [Op.ne]: 2 } } })) {
    return data = { status: 'danger', message: 'Email "' + params.email + '" is already taken' };
  }

  // hash password if it was entered
  console.log(params.password);

  if (params.password) {
    params.password = await md5(params.password);
  }
  if (params.subscribtion == 'on') {
    params.subscribtion = '1';
  }
  else {
    params.subscribtion = '0';
  }
  if (params.isadmin == 'on') {
    params.isadmin = 'Y';
  }
  else {
    params.isadmin = 'N';
  }
  if (params.is_moderator == 'on') {
    params.is_moderator = 'Y';
  }
  else {
    params.is_moderator = 'N';
  }
  console.log(params);
  // copy params to account and save
  Object.assign(account, params);
  
  await account.save();


  return data = { status: 'success', message: 'Update User successful.' };
}



async function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}



async function cms(params, origin) {

  const cms = await db.Cms.findOne({ where: { page_slug: params.page } });
  if (cms) {
    return cms;

  }
  else {
    return { status: 'success', message: 'Data Not found.' };

  }
}
async function getallcms() {

  const cms = await db.Cms.findAll();
  return cms;

}




async function addcontact(params, origin) {


  const product = new db.Contact(params);
  await product.save();

  return data = { status: 'success', message: 'Add Contact successful.' };

}




async function addfaq(params, origin) {


  const product = new db.Faq(params);
  product.product_id = 0;
  await product.save();

  return data = { status: 'success', message: 'Add Faq successful.' };

}
async function addcms(params, origin) {

  var checkexists = "SELECT * FROM tbl_cms where status != 2 and (page_name = '" + params.page_name + "' OR page_slug = '" + params.page_slug + "')";
  const [getquestionIdinco, fields] = await db.connection.execute(checkexists);
  if (getquestionIdinco.length > 0) {
    return data = { status: 'error', message: 'CMS already exist.Please try again.' };
  }
  const product = new db.Cms(params);
  product.status = 1;
  product.cr_date = Date.now();

  await product.save();

  return data = { status: 'success', message: 'Add Cms successful.' };

}





async function updateblogadmin(id, params) {

  const blog = await db.Blog.findOne({ where: { id: id } });

  Object.assign(blog, params);

  await blog.save();
  if (params.tags) {

    var qry = "delete from tbl_blog_tags where blog_id='" + id + "'";
    const [rows, fields] = await db.connection.execute(qry);

    for (const tags of params.tags) {

      const tag = await db.Blogtag.findOne({ where: { blog_id: id, tags: tags } });

      const tagdata = { 'blog_id': blog.id, 'tags': tags };
      const tagda = new db.Blogtag(tagdata);
      await tagda.save();


    }
  }
  return data = { status: 'success', message: 'Update Blog successful.' };

}
async function addblogadmin(params, origin) {
  console.log('4545',params)
  const blog = new db.Blog(params);
  blog.status = 1;
  await blog.save();
  if (params.tags) {
    for (const tags of params.tags) {
      console.log('tags', tags)
      const tagdata = { 'blog_id': blog.id, 'tags': tags };
      const tagda = new db.Blogtag(tagdata);

      await tagda.save();
    }
  }
  return data = { status: 'success', message: 'Add Blog successful.' };

}





async function addbanner(params, origin) {
  if (params.countryId) {
    var countryId = params.countryId.split(",");
    var countryname = [];
    for (const ccc of countryId) {
      const country = await db.Country.findOne({ where: { country_code: ccc } });
      if (country) {
        countryname.push(country.country1);
      }

    }
  }



  const account = new db.Banner(params);
  if (countryId) {
    account.country_name = countryname.join(",");
  }
  account.cr_date = Date.now();
  account.status = 1;

  await account.save();
  return data = { status: 'success', message: 'Add Banner successful.' };

}

async function importuser(params, origin) {
  // validate

  for (const para of params) {

    if (await db.Account.findOne({ where: { email: para.Email } })) {
      // send already registered error in email to prevent account enumeration
      //sendAlreadyRegisteredEmail(params.email, origin);
      //return data= {status: 'danger', message:'An account with this email address already exists.'};
    }
    else {
      const country = await db.Country.findOne({ where: { country1: para.country } });


      // create account object
      const adddata = { fname: para.Firstname, password: '', lname: para.Lastname, username: para.Username, email: para.Email, country: country.id, is_moderator: 'N', isadmin: 'N', subscribtion: '0' };

      const account = new db.Account(adddata);


      // first registered account is an admin
      const isFirstAccount = (await db.Account.count()) === 0;
      //account.role = isFirstAccount ? Role.Admin : Role.User;
      account.verificationToken = randomTokenString();
      //account.status = '1';
      // hash password
      account.verify = 1;
      account.status = 1;
      //  account.password = await hash(params.password);

      // save account
      await account.save();
    }


  }
  return data = { status: 'success', message: 'Add User successful.' };

}


async function addblogcategory(params, origin) {
  // validate
  if (await db.Blogcat.findOne({ where: { txt_catname: params.txt_catname, status: { [Op.ne]: 2 } } })) {
    // send already registered error in email to prevent account enumeration
    //sendAlreadyRegisteredEmail(params.email, origin);
    return data = { status: 'danger', message: 'this category already exists.' };
  }
  const account = new db.Blogcat(params);
  account.status = 1;
  await account.save();
  return data = { status: 'success', message: 'Add Category successful.' };

}

async function register(params, origin,ipAddress) {
  console.log('asdasdasdasdads')
  // validate
  if (await db.Admin.findOne({ where: { email: params.email } })) {
      // send already registered error in email to prevent account enumeration
      //sendAlreadyRegisteredEmail(params.email, origin);
     return data= {status: 'error', message:'An account with this email address already exists.")'};
  }

  // create account object
  const account = new db.Admin(params);
    account.status = 1;

  const isFirstAccount = (await db.Admin.count()) === 0;
  //account.role = isFirstAccount ? Role.Admin : Role.User;
  //account.status = '1';
  // hash password
  account.password = await md5(params.password);

  // save account
  await account.save();

  return data={status: 'success', message: 'Registration successful.' };

}


async function addpagedata(params, origin) {
  if (await db.Topwebsite.findOne({ where: { page_name: params.page_name, page_link: params.page_link } })) {
    // send already registered error in email to prevent account enumeration
    //sendAlreadyRegisteredEmail(params.email, origin);
    let yourDate = new Date();
    var date = yourDate.toISOString().split('T')[0];
    const topdata = await db.Topwebsite.findOne({ where: { page_name: params.page_name, page_link: params.page_link } });
    topdata.counts = topdata.counts + 1
    topdata.date = date;
    await topdata.save();
    addpagedatawebsite(params)
    return data = { status: 'success', message: 'Add Count successful.' };
  }
  let yourDate = new Date();
  var date = yourDate.toISOString().split('T')[0];
  const account = new db.Topwebsite(params);
  account.counts = 1;
  account.date = date;
  await account.save();
  addpagedatawebsite(params)
  return data = { status: 'success', message: 'Add Count successful.' };
}
async function addpagedatawebsite(params) {
  let yourDate = new Date();
    var date = yourDate.toISOString().split('T')[0];
  if (await db.Websitevisit.findOne({ where: { page_name: params.page_name, date: date } })) {
    // send already registered error in email to prevent account enumeration
    //sendAlreadyRegisteredEmail(params.email, origin);
    
    const topdata = await db.Websitevisit.findOne({ where: { page_name: params.page_name, date:date } });
    topdata.counts = topdata.counts + 1
    topdata.date = date;
    await topdata.save();
    return data = { status: 'success', message: 'Add Count successful.' };
  }
  
  const account = new db.Websitevisit(params);
  account.counts = 1;
  account.date = date;
  await account.save();
  return data = { status: 'success', message: 'Add Count successful.' };
}

async function adduser(params, origin) {
  // validate
  console.log(params);
  if (await db.Account.findOne({
    where: {
      [Op.or]: [
        { email: params.email },
        { username: params.email }
      ], status: { [Op.ne]: 2 }
    }
  })) {
    // send already registered error in email to prevent account enumeration
    //sendAlreadyRegisteredEmail(params.email, origin);
    return data = { status: 'danger', message: 'An account with this email address already exists.' };
  }

  if (params.subscribtion == 'on') {
    params.subscribtion = '1';
  }
  else {
    params.subscribtion = '0';
  }
  if (params.isadmin == 'on') {
    params.isadmin = 'Y';
  }
  else {
    params.isadmin = 'N';
  }
  if (params.is_moderator == 'on') {
    params.is_moderator = 'Y';
  }
  else {
    params.is_moderator = 'N';
  }
  // create account object
  const account = new db.Account(params);


  // first registered account is an admin
  const isFirstAccount = (await db.Account.count()) === 0;
  //account.role = isFirstAccount ? Role.Admin : Role.User;
  account.verificationToken = randomTokenString();
  //account.status = '1';
  // hash password
  account.verify = 1;
  account.status = 1;
  account.password = await md5(params.password);

  // save account
  await account.save();



  return data = { status: 'success', message: 'Add User successful.' };

}


async function getuserid(id) {
  const account = await db.Account.findOne({ where: { uniqueID: id } });
  return { 'status': 'success', 'userid': account.id };
}


async function getbannerbyid(id) {
  const account = await db.Banner.findOne({ where: { id: id } });
  return account;
}

async function getalladmin() {
  const account = await db.Account.findAll({ where: { isadmin: 'Y', status: 1 } });
  return account;
}




async function deleteuser(id) {

  var qry = "UPDATE tbl_users SET status = 2 WHERE id = '" + id + "'";
  const [result1, fields1] = await db.connection.execute(qry);
 

  

}

async function deletecontact(id) {
  const account = await db.Contact.findOne({ where: { id: id } });
  await account.destroy();
}
async function deletefaq(id) {
  const account = await db.Faq.findOne({ where: { id: id } });
  await account.destroy();
}


async function deleteblogcategory(id) {
  const category = await db.Blogcat.findOne({ where: { id: id } });
  category.status = 2;
  await category.save();
}


async function deletebanner(id) {
  const banner = await db.Banner.findOne({ where: { id: id } });
  await banner.destroy();
}


async function updateadmindata(id, params) {
  var checkexists = "SELECT * FROM tbl_admins WHERE username = '" + params.username + "' and status!=2 and adminid = '" + id + "'";
  const [result_success, fields1] = await db.connection.execute(checkexists);
  console.log(result_success);
  if (result_success.length > 0) {


    var qry_update = "UPDATE  tbl_admins SET firstname = '" + params.firstname + "',lastname = '" + params.lastname + "', username = '" + params.username + "', email = '" + params.email + "' where adminid='" + id + "'";
    const [result_success1, fields11] = await db.connection.execute(qry_update);
    return { 'status': 'success', 'message': 'Update successful.' }
  }
  else {
    return { 'status': 'success', 'message': 'Update Failed.' }
  }
}

async function deletemultiuser(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    var qry = "UPDATE tbl_users SET status = 2 WHERE id = '" + id + "'";
    const [result1, fields1] = await db.connection.execute(qry);
   
   
  }


}

async function deletemultibanner(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const deletemultibanner = await db.Banner.findOne({ where: { id: id } });

    await deletemultibanner.destroy();
  }


}


async function approvemultiuser(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    var qry = "UPDATE tbl_users SET status = 1 WHERE id = '" + id + "'";
    const [result1, fields1] = await db.connection.execute(qry);
    

   
  }


}

async function inactivemultibanner(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const banner = await db.Banner.findOne({ where: { id: id } });
    banner.status = 0;
    await banner.save();
  }


}


async function activemultibanner(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const banner = await db.Banner.findOne({ where: { id: id } });
    banner.status = 1;
    await banner.save();
  }


}


async function statuschangecms(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  var status = params.status;
  //var ids=string.split(",");
  for (const id of ids) {
    const account = await db.Cms.findOne({ where: { id: id } });
    if (status == 1) {
      account.status = 1;
    }
    if (status == 2) {
      account.status = 0;
    }

    //account.status=2; 
    await account.save();
  }
}


async function statuschangeblogcat(params, origin) {
  //var ids=params.id;
  var ids = params.id.replace(/ /g, "").split(",");

  var status = params.status;
  //var ids=string.split(",");
  for (const id of ids) {
    const account = await db.Blogcat.findOne({ where: { id: id } });

    if (status == 1) {
      account.status = 1;
    }
    if (status == 2) {
      account.status = 0;
    }
    if (status == 3) {
      account.status = 2;
    }
    //account.status=2; 
    await account.save();
  }


}

async function getadmindata(id) {
  var checkexists = "SELECT * FROM tbl_admins WHERE  adminid = '" + id + "'";
  const [result_success, fields1] = await db.connection.execute(checkexists);
  return result_success;
}






async function contactsend(params, origin) {

  var name = params.txt_name;

  var email1 = params.txt_email;

  var phone = '+' + params.txt_countrycode + '' + params.txt_phone;

  var msg = params.txt_msg;
  var qry1 = "SELECT * FROM admin where status = 1";
  const [adminemail, fields1] = await db.connection.execute(qry1);

  var qry = "SELECT * FROM  tbl_social where status = 1 ORDER by order_id";
  const [socialmedialinks, fields] = await db.connection.execute(qry);
  var email = adminemail[0].email;
  //var headers  = 'MIME-Version: 1.0 Content-type: text/html; charset=iso-8859-1 Content-type: text/html; charset=iso-8859-1';

  await sendcontact(email, name, email1, phone, msg);

  //var headers2 = "From: <".$adminemail['email'].">\n";



  //var subject = "Quick Contact"; 
  //var message = '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border:solid 2px #d6d6d6; text-align:left; margin:0px auto;"><tr><th bgcolor="#314e7d" style="padding-top:10px;" scope="col"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><th scope="row" align="center" ><img src="https://pmocerty.com/upload/images/logo.png" alt=""  /></th><td colspan="2">&nbsp;</td></tr></table></th></tr><tr><th scope="row"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="20" bgcolor="#F2F2F2">&nbsp;</td><td bgcolor="#F2F2F2">&nbsp;</td><td bgcolor="#F2F2F2">&nbsp;</td></tr><tr><td bgcolor="#F2F2F2">&nbsp;</td><td bgcolor="#FFFFFF"><table width="100%" border="0" style="border:solid 1px #CCCCCC; background:#FFF;" cellspacing="0" cellpadding="0"><tr><td width="20">&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td><table border="0" cellpadding="2" style="font:normal 13px Arial, Helvetica, sans-serif; color:#333333;" cellspacing="2" width="100%"><tr><td height="20" colspan="2" align="left" valign="top" style="font-size:17px; line-height:25px;">Dear '.ucfirst($adminemail['username']).', <br /></td></tr><tr><tr><td height="30" colspan="2" style="font:normal 16px Calibri, Arial, Tahoma; line-height:20px; ">Please find details from Quick Contact <br /><br /></td>';


}



async function statuschangeblog(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  var status = params.status;
  //var ids=string.split(",");
  for (const id of ids) {
    const account = await db.Blog.findOne({ where: { id: id } });
    if (status == 1) {
      account.status = 1;
    }
    if (status == 2) {
      account.status = 0;
    }
    if (status == 7) {
      account.status = 2;
    }
    if (status == 3) {
      account.editor_pick = 1;
    }
    if (status == 4) {
      account.editor_pick = 0;
    }
    if (status == 5) {
      account.featured_post = 1;
    }
    if (status == 6) {
      account.featured_post = 0;
    }
    //account.status=2; 
    await account.save();
  }


}


async function rejectmultiuser(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    var qry = "UPDATE tbl_users SET status = 0 WHERE id = '" + id + "'";
    const [result1, fields1] = await db.connection.execute(qry);
   
    
    
  }

}
async function getAccount(id) {

  const account = await db.Account.findByPk(id);
  if (!account) throw { status: 'error', message: 'Account not found' };
  return account;
}
async function getuser(id) {

  const account = await db.Account.findByPk(id);
  if (!account) throw { status: 'error', message: 'Account not found' };
  return account;
}


async function blogdelete(id) {
  const account = await db.Blog.findOne({ where: { id: id } });
  account.status = 2;
  await account.save();

}

async function deletesubcat(id) {
  var idArray = id.split(",");
  for (const catId of idArray) {
    var qry = "DELETE FROM tbl_subcategory WHERE id = " + catId + "";
    const [rows, fields] = await db.connection.execute(qry);
  }
  return 1;
}



async function getAllusers() {
  //const accounts = await db.Creatorprofile.findAll();
  const accounts = await db.Account.findAll({ where: { status: { [Op.ne]: 2 } } });

  const userdata = [];
  for (const user of accounts) {
    const countryname = await db.Country.findByPk(user.country);
    if (!countryname) {
      user.country = user.country;
    }
    else {
      user.country = countryname.country1;

    }
  }
  return accounts;

}
async function getAllusersfront() {
  //const accounts = await db.Creatorprofile.findAll();
  const accounts = await db.Account.findAll({ where: { status: 1 }, order: [['cr_date', 'DESC']] });

  return accounts;

}

async function contactdata() {
  //const accounts = await db.Creatorprofile.findAll();
  const contactdata = await db.Contact.findAll();
  return contactdata;

}

async function getallcontactadmin() {
  //const accounts = await db.Creatorprofile.findAll();
  const contactdata = await db.Contact.findAll();
  return contactdata;

}



async function getAllcountry() {
  //const accounts = await db.Creatorprofile.findAll();
  const country = await db.Country.findAll({ where: { status: 1 } });
  return country;

}
async function getAllcountryadmin() {
  //const accounts = await db.Creatorprofile.findAll();
  const country = await db.Country.findAll({ where: { status: { [Op.ne]: 2 } } });
  return country;

}
async function getAllstateadmin() {
  //const accounts = await db.Creatorprofile.findAll();
  var qry1 = "SELECT tbl_states.*,tbl_countries.country1 as country FROM tbl_states left join tbl_countries  on tbl_countries.id = tbl_states.countryId where tbl_states.status != 2";
  const [state, fields1] = await db.connection.execute(qry1);
  return state;
}
async function getAllcityadmin() {
  //const accounts = await db.Creatorprofile.findAll();
  var qry1 = "SELECT tbl_cities.*,tbl_countries.country1 as country,tbl_states.stateName FROM tbl_cities left join tbl_countries  on tbl_countries.id = tbl_cities.countryId left join tbl_states  on tbl_states.id = tbl_cities.stateId where tbl_cities.status != 2";
  const [city, fields1] = await db.connection.execute(qry1);
  return city;
}

async function totalcount() {

  var qry = "SELECT * FROM tbl_users WHERE status=1";
  const [totalusers, fieldsa] = await db.connection.execute(qry);

  
  var qry_top_page = "SELECT SUM(counts) AS cnt,page_link FROM tbl_top_website_pages  WHERE YEAR(date) = YEAR(CURDATE()) group by  page_link order by cnt desc LIMIT 0,5";
  const [qry_top_pages, qry_top_pagesd] = await db.connection.execute(qry_top_page);
  var qry_top_pagess1 = "SELECT SUM(counts) AS cnt,page_link FROM tbl_top_website_pages  WHERE YEAR(date) = YEAR(CURDATE()) group by  page_link order by cnt desc LIMIT 5,5";
  const [qry_top_pages1, qry_top_pagesss1] = await db.connection.execute(qry_top_pagess1);

  
 
  
  return { 'totalusers': totalusers.length,  'qry_top_pages': qry_top_pages, 'qry_top_pages1': qry_top_pages1}

}


async function blogcategory() {
  var qry = "SELECT * FROM tbl_blogcategorys where status!=2 ORDER BY id DESC";
  const [rows, fields] = await db.connection.execute(qry);
  return rows;
}
async function blogcategoryfront() {
  var qry = "SELECT * FROM tbl_blogcategorys where status=1 ORDER BY id DESC";
  const [rows, fields] = await db.connection.execute(qry);
  return rows;
}




async function blogcategorybyid(id) {
  var qry = "SELECT * FROM tbl_blogcategorys where status!=2 and id=" + id + " ORDER BY id DESC";
  const [rows, fields] = await db.connection.execute(qry);
  return rows;

}


async function getallbanner() {
  //const accounts = await db.Creatorprofile.findAll();
  const banner = await db.Banner.findAll({ where: { status: 1 }, order: [['id', 'DESC']] });
  if (!banner) throw { status: 'error', message: 'Banner not found' };
  return banner;

}





async function getallbanneradmin() {
  //const accounts = await db.Creatorprofile.findAll();
  const banner = await db.Banner.findAll({ where: { status: { [Op.ne]: 2 } }, order: [['id', 'DESC']] });
  if (!banner) throw { status: 'error', message: 'Banner not found' };
  return banner;

}
async function getallblog(params, origin) {
  if (params.page) {
    var page = params.page;
  }
  else {
    var page = 1;
  }

  if (params.limit) {
    var limit = params.limit
  }
  else {
    var limit = 3;
  }
  if (params.blog_id) {
    const blog = await db.Blog.findAll({ where: { id: params.blog_id, status: 1 }, order: [['id', 'DESC']] });
    if (!blog) throw { status: 'error', message: 'Blog not found' };

    const valdata = [];
    if (params.user_id) {
      for (const bl of blog) {
        const account = await db.Account.findOne({ where: { id: bl.blog_userid } });
        const userlike = await db.Bloglikes.findOne({ where: { post_id: bl.id, user_id: params.user_id } });
        const catname = await db.Blogcat.findOne({ where: { id: bl.cat_id } });

        if (userlike) {
          var likes = "Yes";
        }
        else {
          var likes = "No";
        }
        valdata.push({
          'blog_id': bl.id, 'catname': catname.name, 'blog_userid': bl.blog_userid, 'txt_blogtitle': bl.txt_blogtitle, 'createddate': bl.createddate, 'txt_content': bl.txt_content, 'author_name': account.username, 'author_profile': account.image, 'blog_image': bl.txt_mediaurl,
          'thumbimage_name': bl.thumbimage_name, 'total_like': bl.likecount, 'total_comment': bl.commentcount, 'total_blog': blog.length, 'userlike': likes
        })
      }
    }
    else {
      for (const bl of blog) {
        const account = await db.Account.findOne({ where: { id: bl.blog_userid } });
        const catname = await db.Blogcat.findOne({ where: { id: bl.cat_id } });

        valdata.push({ 'blog_id': bl.id, 'blog_userid': bl.blog_userid, 'catname': catname.name, 'txt_blogtitle': bl.txt_blogtitle, 'createddate': bl.createddate, 'txt_content': bl.txt_content, 'author_name': account.username, 'author_profile': account.image, 'blog_image': bl.txt_mediaurl, 'thumbimage_name': bl.thumbimage_name, 'total_like': bl.likecount, 'total_comment': bl.commentcount, 'total_blog': blog.length, 'userlike': 'No' })
      }
    }
    return valdata.slice((page - 1) * limit, page * limit);

  }
  else if (params.cat_id) {
    const blog = await db.Blog.findAll({ where: { cat_id: params.cat_id, status: 1 }, order: [['id', 'DESC']] });
    if (!blog) throw { status: 'error', message: 'Blog not found' };
    const catname = await db.Blogcat.findOne({ where: { id: params.cat_id } });

    const valdata = [];
    if (params.user_id) {
      for (const bl of blog) {
        const account = await db.Account.findOne({ where: { id: bl.blog_userid } });
        const userlike = await db.Bloglikes.findOne({ where: { post_id: bl.id, user_id: params.user_id } });
        if (userlike) {
          var likes = "Yes";
        }
        else {
          var likes = "No";
        }
        valdata.push({ 'blog_id': bl.id, 'cat_name': catname.name, 'blog_userid': bl.blog_userid, 'txt_blogtitle': bl.txt_blogtitle, 'createddate': bl.createddate, 'txt_content': bl.txt_content, 'author_name': account.username, 'author_profile': account.image, 'blog_image': bl.txt_mediaurl, 'thumbimage_name': bl.thumbimage_name, 'total_like': bl.likecount, 'total_comment': bl.commentcount, 'total_blog': blog.length, 'userlike': likes })
      }
    }
    else {
      for (const bl of blog) {
        const account = await db.Account.findOne({ where: { id: bl.blog_userid } });

        valdata.push({ 'blog_id': bl.id, 'cat_name': catname.name, 'blog_userid': bl.blog_userid, 'txt_blogtitle': bl.txt_blogtitle, 'createddate': bl.createddate, 'txt_content': bl.txt_content, 'author_name': account.username, 'author_profile': account.image, 'blog_image': bl.txt_mediaurl, 'thumbimage_name': bl.thumbimage_name, 'total_like': bl.likecount, 'total_comment': bl.commentcount, 'total_blog': blog.length, 'userlike': 'No' })
      }
    }
    return valdata.slice((page - 1) * limit, page * limit);
  }
  else {
    const blog = await db.Blog.findAll({ where: { status: 1 }, order: [['id', 'DESC']] });
    if (!blog) throw { status: 'error', message: 'Blog not found' };

    const valdata = [];
    if (params.user_id) {
      for (const bl of blog) {
        const account = await db.Account.findOne({ where: { id: bl.blog_userid } });
        const userlike = await db.Bloglikes.findOne({ where: { post_id: bl.id, user_id: params.user_id } });

        const catname = await db.Blogcat.findOne({ where: { id: bl.cat_id } });

        if (userlike) {
          var likes = "Yes";
        }
        else {
          var likes = "No";
        }
        if (catname) {
          valdata.push({ 'blog_id': bl.id, 'catname': catname.name, 'blog_userid': bl.blog_userid, 'txt_blogtitle': bl.txt_blogtitle, 'createddate': bl.createddate, 'txt_content': bl.txt_content, 'author_name': account.username, 'author_profile': account.image, 'blog_image': bl.txt_mediaurl, 'thumbimage_name': bl.thumbimage_name, 'total_like': bl.likecount, 'total_comment': bl.commentcount, 'total_blog': blog.length, 'userlike': likes })

        }
      }
    }
    else {
      for (const bl of blog) {
        const account = await db.Account.findOne({ where: { id: bl.blog_userid } });
        const catname = await db.Blogcat.findOne({ where: { id: bl.cat_id } });
        if (catname) {
          valdata.push({ 'blog_id': bl.id, 'catname': catname.name, 'blog_userid': bl.blog_userid, 'txt_blogtitle': bl.txt_blogtitle, 'createddate': bl.createddate, 'txt_content': bl.txt_content, 'author_name': account.username, 'author_profile': account.image, 'blog_image': bl.txt_mediaurl, 'thumbimage_name': bl.thumbimage_name, 'total_like': bl.likecount, 'total_comment': bl.commentcount, 'total_blog': blog.length, 'userlike': 'No' })
        }
      }
    }
    return valdata.slice((page - 1) * limit, page * limit);

  }

}




async function faq() {
  const faq = await db.Faq.findAll({ where: { product_id: 0 } });
  return faq;

}


async function refreshToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);
  const id = refreshToken.dataValues.boyoUserId;
  const account = await getAccount(id);

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(account, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(account);

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: newRefreshToken.token
  };
}

async function revokeToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}




/*blockusers process*/
async function forgotPassword({ email }, origin) {
  const account = await db.Account.findOne({ where: { email } });

  // always return ok response to prevent email enumeration
  if (!account) throw { status: 'error', message: "Sorry. Email Id Doesn’t Exist..!" };;

  // create reset token that expires after 24 hours
  account.resetToken = randomTokenString();
  account.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await account.save();

  // send email
  await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }) {
  const account = await db.Account.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: Date.now() }
    }
  });

  if (!account) throw { status: 'error', message: 'Invalid token' };

  return account;
}

async function resetPassword({ token, password }) {
  const account = await validateResetToken({ token });

  // update password and remove reset token
  account.password = await md5(password);
  account.passwordReset = Date.now();
  account.resetToken = null;

  var insertpassword = "INSERT INTO tbl_userPassBack (userID,date,password) VALUES ('" + account.id + "',NOW(),'" + md5(password) + "')";
  const [passworddata, fields1] = await db.connection.execute(insertpassword);
  await account.save();
}



async function logout(params, origin) {
  var query = "UPDATE user_login SET status = '0', logout_tym =NOW() WHERE uid = '" + params.user_id + "' and status='1' ORDER BY id DESC LIMIT 1";
  const [result_checkuser, fields1] = await db.connection.execute(query);

  var query2 = "DELETE FROM tbl_user_online WHERE user_id='" + params.user_id + "'";
  const [result2, fields2] = await db.connection.execute(query2);


}


async function hash(password) {
  return await md5(password, 10);
}

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 1 day
  return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '1d' });
}

function generateRefreshToken(account, ipAddress) {
  // create a refresh token that expires in 30 days
  return new db.RefreshToken({
    boyoUserId: account.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
}

function randomTokenString() {

  return crypto.randomBytes(40).toString('hex');
}

function basicDetails(account) {
  const { id, fname, lname, username, email, mobile, updated, verify, uniqueID, image } = account;
  return { id, fname, lname, username, email, mobile, updated, verify, uniqueID, image };

}

async function sendcontact(email, value1, value2, value3, value4) {
  await sendEmail({
    to: email,
    subject: 'PMCerty - Quick Contact',
    html: `<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer" style="border:1px none #DDDDDD;background-color:#FFFFFF;">
        <tbody><tr>
          <td align="center" valign="top" style="border-collapse:collapse;">
            <!-- // Begin Template Header \\ -->
            <table border="0" cellpadding="0" cellspacing="0" width="75%" id="templateHeader" style="background-color:#FFFFFF;border-bottom:0;">
              <tbody><tr>
              <td class="headerContent centeredWithBackground" style="border-collapse:collapse;color:#303457;font-family:Cormorant;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#EDEEF5;padding-bottom:3%;padding-top:3%;">
              <!-- // Begin Module: Standard Header Image \\ -->
                  <!-- // End Module: Standard Header Image \\ -->
                  Contact Data
                </td>
              </tr>
            </tbody></table>
            <!-- // End Template Header \\ -->
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="border-collapse:collapse;">
            <!-- // Begin Template Body \\ -->
            <table border="0" cellpadding="0" cellspacing="0" width="75%" id="templateBody" style="background-color:#FBFCFF;">
              <tbody><tr>
                <td valign="top" class="bodyContent" style="border-collapse:collapse;background-color:#FFFFFF;">
                  <!-- // Begin Module: Standard Content \\ -->
                  <table border="0" cellpadding="20" cellspacing="0" width="100%" style="padding-bottom:10px;background-color:#FBFCFF;">
                    <tbody><tr>
                      <td>Name </td><td>${value1}</td>
                      </tr>
                      <tr>
                      <td>Email</td><td>${value2}</td>
                      </tr>
                      <tr>
                      <td>Phone</td><td>${value3}</td>
                      </tr>
                      <tr>
                      <td>Msg</td><td>${value4}</td>
                    </tr>
                    
                  </tbody></table>
                  <!-- // End Module: Standard Content \\ -->
                </td>
              </tr>
              <div style="text-align: center; color: #c9c9c9;">
                              <p>Questions? Get your answers here:&nbsp;
                                <a href="" style="color:#4a90e2;font-weight:normal;text-decoration:underline; font-size: 12px;">Help Center</a>.</p>
                            </div>
                            <div style="text-align:center;color:#c9c9c9;font-family:Cormorant;font-size:11px;line-height:150%;margin-bottom:5px;">
                        <p style="text-align:center;margin:0;margin-top:2px;">PMCerty | Copyright © 2021 | All rights reserved</p>
                      </div>
            </tbody></table>
            <!-- // End Template Body \\ -->
          </td>
        </tr>
        
        <tr>
        <td align="center" valign="top" >
          <!-- // Begin Support Section \\ -->
          <table border="0" cellpadding="10" cellspacing="0" width="75%" id="supportSection" style="background-color:#FBFCFF;font-family:Cormorant;font-size:12px;border-top:1px solid #e4e4e4;">
            <tr>
              <td valign="top" class="supportContent" style="border-collapse:collapse;background-color:white;font-family:Cormorant;font-size:12px;border-top:1px solid #e4e4e4;">
               
              </td>
            </tr>
          </table>
          <!-- // Begin Support Section \\ -->
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse:collapse;">
          <!-- // Begin Template Footer \\ -->
          <table border="0" cellpadding="10" cellspacing="0" width="75%"  id="templateFooter" style="background-color:#FBFCFF;border-top:0;">
           
          </table>
          <!-- // End Template Footer \\ -->
        </td>
      </tr>
      </tbody></table>
      <!-- // Begin Support Section \\ -->
    </td>
  </tr>
      </tbody></table>`
  });
}

async function sendPasswordResetEmail(account, origin) {
  let message;
  if (origin) {
    const resetUrl = `${origin}/change_password?token=${account.resetToken}`;
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/reset-password</code> api route:</p>
                   <p><code>${account.resetToken}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: 'PMCerty - Reset Password',
    html: `<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer" style="border:1px none #DDDDDD;background-color:#FFFFFF;">
        <tbody><tr>
          <td align="center" valign="top" style="border-collapse:collapse;">
            <!-- // Begin Template Header \\ -->
            <table border="0" cellpadding="0" cellspacing="0" width="75%" id="templateHeader" style="background-color:#FFFFFF;border-bottom:0;">
              <tbody><tr>
              <td class="headerContent centeredWithBackground" style="border-collapse:collapse;color:#303457;font-family:Cormorant;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#EDEEF5;padding-bottom:3%;padding-top:3%;">
              <!-- // Begin Module: Standard Header Image \\ -->
                  <!-- // End Module: Standard Header Image \\ -->
                </td>
              </tr>
            </tbody></table>
            <!-- // End Template Header \\ -->
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="border-collapse:collapse;">
            <!-- // Begin Template Body \\ -->
            <table border="0" cellpadding="0" cellspacing="0" width="75%" id="templateBody" style="background-color:#FBFCFF;">
              <tbody><tr>
                <td valign="top" class="bodyContent" style="border-collapse:collapse;background-color:#FFFFFF;">
                  <!-- // Begin Module: Standard Content \\ -->
                  <table border="0" cellpadding="20" cellspacing="0" width="100%" style="padding-bottom:10px;background-color:#FBFCFF;">
                    <tbody><tr>
                      <td valign="top" style="padding-bottom:1rem;border-collapse:collapse;" class="mainContainer">
                        <div style="text-align:center;color:#0A0A27;font-family:Cormorant;font-size:14px;line-height:150%;">
                          <h1 class="h1" style="color:#0A0A27;display:block;font-family:Cormorant;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:center;">Reset Password Email</h1>

                         
                         <p>Please click the below link to reset your password.</p>
                   
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="border-collapse:collapse;">
                        <table border="0" cellpadding="0" cellspacing="0" style="padding-bottom:10px;">
                          <tbody>
                            <tr align="center">
                              <td align="center" valign="middle" style="border-collapse:collapse;">
                                <a class="buttonText" href="${FULLBASEROOT}change_password/${account.resetToken}" target="_blank" style="background-color:#464C80;color: #FFFFFF;text-decoration: none;font-weight: normal;display: block;border: 2px solid #464C80;padding: 10px 80px;font-family: Cormorant;">Reset-password</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody></table>
                  <!-- // End Module: Standard Content \\ -->
                </td>
              </tr>
              <div style="text-align: center; color: #c9c9c9;">
                              <p>Questions? Get your answers here:&nbsp;
                                <a href="" style="color:#4a90e2;font-weight:normal;text-decoration:underline; font-size: 12px;">Help Center</a>.</p>
                            </div>
                            <div style="text-align:center;color:#c9c9c9;font-family:Cormorant;font-size:11px;line-height:150%;margin-bottom:5px;">
                        <p style="text-align:center;margin:0;margin-top:2px;">PMCerty | Copyright © 2021 | All rights reserved</p>
                      </div>
            </tbody></table>
            <!-- // End Template Body \\ -->
          </td>
        </tr>
        
        <tr>
        <td align="center" valign="top" >
          <!-- // Begin Support Section \\ -->
          <table border="0" cellpadding="10" cellspacing="0" width="75%" id="supportSection" style="background-color:#FBFCFF;font-family:Cormorant;font-size:12px;border-top:1px solid #e4e4e4;">
            <tr>
              <td valign="top" class="supportContent" style="border-collapse:collapse;background-color:white;font-family:Cormorant;font-size:12px;border-top:1px solid #e4e4e4;">
               
              </td>
            </tr>
          </table>
          <!-- // Begin Support Section \\ -->
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse:collapse;">
          <!-- // Begin Template Footer \\ -->
          <table border="0" cellpadding="10" cellspacing="0" width="75%"  id="templateFooter" style="background-color:#FBFCFF;border-top:0;">
           
          </table>
          <!-- // End Template Footer \\ -->
        </td>
      </tr>
      </tbody></table>
      <!-- // Begin Support Section \\ -->
    </td>
  </tr>
      </tbody></table>`
  });
}




function number_format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




