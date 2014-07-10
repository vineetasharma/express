var express=require('express'),
    mongoose=require('mongoose'),
    bodyparser=require('body-parser');
//    async=require('async');

var connection=mongoose.createConnection('mongodb://localhost/ExpressDB');
//User Schema....
var UserSchema=new mongoose.Schema(
    {
        name:String,
        role:String
    },{versionKey:false});
var UserModel=connection.model('Users',UserSchema);
// Admin Schema..
// Book Schema...
var BookSchema=new mongoose.Schema(
    {
        name:String,
        author:String
    },{versionKey:false});
var BookModel=connection.model('Books',BookSchema);
var app=express();
app.listen(8888);

// Request for User...
app.route('/users/:id?')
    .all(bodyparser(),function(req, res, next) {
        console.log('all request...');
        next();
    })
    .get(function(req, res, next) {
        if(req.params.id==undefined){
            findUser(req,res,next);
        }
        else{
            findUserById(req,res,next);
        }

    })
    .post(function(req, res, next) {
        saveUser(req,res,next);
    })
    .put(function(req, res, next) {
        if(req.params.id==undefined){
            res.send('id not found to update the record...');
        }
        else
        {
            updateUser(req,res,next);
        }
    })
    .delete(function(req, res, next) {
        if(req.params.id==undefined){
            res.send('id not found to delete the record...');
        }
        else
        {
            deleteUser(req,res,next);
        }
    });

/*// Request for Admin..
app.route('/admin')
    .all(function(req, res, next) {
        console.log('all request...in ADMIN');
        next();
    })
    .get(function(req, res, next) {
        res.send('get type..');
    })
    .post(function(req, res, next) {
        res.send('post type..');

    })
    .put(function(req, res, next) {
        res.send('put type..');

    });*/



//Request for Book..

app.route('/book/:id?')
    .all(bodyparser(),function(req, res, next) {
        console.log('all request...');
        next();
    })
    .get(function(req, res, next) {
        if(req.params.id==undefined){
            findBook(req,res,next);
        }
        else{
            findBookById(req,res,next);
        }

    })
    .post(function(req, res, next) {
        saveBook(req,res,next);
    })
    .put(function(req, res, next) {
        if(req.params.id==undefined){
            res.send('id not found to update the record...');
        }
        else
        {
            updateBook(req,res,next);
        }
    })
    .delete(function(req, res, next) {
        if(req.params.id==undefined){
            res.send('id not found to delete the record...');
        }
        else
        {
            deleteBook(req,res,next);
        }
    });

// REad data from user.....
function findUser(req,res,next){
    UserModel.find({}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            res.send('error.......');
            next();
        }
        else{
            console.log(result);
            res.send(result);
            next();
        }
    });
}
// find User by id..
function findUserById(req,res,next){
    UserModel.find({_id:req.params.id}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            res.send(req.params.id+'not found');
            next();
        }
        else{
            console.log(result);
            res.send(result);
            next();
        }
    });

}
// insert into User
function saveUser(req,res,next){
    // INSERTING DATA INTO USERS


    var data=req.body;
    //console.log('dataa...'+data);
           var user=new UserModel(data);
            user.save(function(err){
                if(err){
                    res.send('error while saving data...in User'+err);
                }
                else
                {
                   res.send('data updated...');
                }
            });
}
//  update user...
function updateUser(req,res,next){
    UserModel.update({_id:req.params.id},req.body).exec(function(err){
        if(err){
            console.log('error in update...'+err);
            res.send('error in update...'+err);
        }
        else{
            res.send('updated successfully...');
        }
    });
}
// delete user...
function deleteUser(req,res,next){
    UserModel.remove({_id:req.params.id}).exec(function(err){
        if(err){
            console.log('error in deletion....'+err);
            res.send('error in deletion..'+err);
        }
        else{
            res.send('Deleted successfully...');
        }
    });
}
// BOOK..............
// REad data from Book.....
function findBook(req,res,next){
    BookModel.find({}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            res.send('error.......');
            next();
        }
        else{
            console.log(result);
            res.send(result);
            next();
        }
    });
}
// find Book by id..
function findBookById(req,res,next){
    BookModel.find({_id:req.params.id}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            res.send(req.params.id+'not found');
            next();
        }
        else{
            console.log(result);
            res.send(result);
            next();
        }
    });

}
// insert into Book
function saveBook(req,res,next){
    // INSERTING DATA INTO USERS


    var data=req.body;
    //console.log('dataa...'+data);
    var Book=new BookModel(data);
    Book.save(function(err){
        if(err){
            res.send('error while saving data...in User'+err);
        }
        else
        {
            res.send('data updated...');
        }
    });
}
//  update Book...
function updateBook(req,res,next){
    BookModel.update({_id:req.params.id},req.body).exec(function(err){
        if(err){
            console.log('error in update...'+err);
            res.send('error in update...'+err);
        }
        else{
            res.send('updated successfully...');
        }
    });
}
// delete Book...
function deleteBook(req,res,next){
    BookModel.remove({_id:req.params.id}).exec(function(err){
        if(err){
            console.log('error in deletion....'+err);
            res.send('error in deletion..'+err);
        }
        else{
            res.send('Deleted successfully...');
        }
    });
}