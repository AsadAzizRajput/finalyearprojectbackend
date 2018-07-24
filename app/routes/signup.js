const _ = require('lodash');
const {Traveller} = require('./../models/travellersignup');
const {TravellingAgency}=require('./../models/travellingagencysignup')
const {PropertyLender} = require('./../models/propertylendersignup');


module.exports=function(app,database)
{


    app.post('/travellersignup', (req, res) => { 
      console.log("in traveller signup");
        var body = _.pick(req.body,['email', 'password','name','nic','mobilenumber']);
        var traveller = new Traveller(body);
    
        Traveller.findOne({ 'email': body.email }, function(err, data) {
          if(!data){
            traveller.save().then((rt) => {
              return traveller.generateAuthToken();
            }).then((token) => {
          res.send({'traveller':traveller,'token':token});
            
              }).catch((e) => {

              res.status(400).send(e);
            })
          }
          else{
            res.status(400).send("User Already Exist");
          }
        });


        
    });

    app.post('/travellingagencysignup', (req, res) => {
        var body = _.pick(req.body,['email','password','name','logourl','contactnumber','registrationnumber','address']);
        var travellingagency = new TravellingAgency(body);
        TravellingAgency.findOne({ 'email': body.email }, function(err, data) {
            if(!data){
              travellingagency.save().then(() => {
                return travellingagency.generateAuthToken();
              }).then((token) => {
                res.send({'travellingagency':travellingagency,'token':token});
                // res.header('x-auth', token).send(travellingagency);
              }).catch((e) => {
                  console.log()
                res.status(400).send(e);
              })
            }
            else{
              res.status(400).send("User Already Exist");
            }
        })
        
        
      
    });

    app.post('/propertylendersignup', (req, res) => {
        var body = _.pick(req.body,['name','email','password','imagesurl','nic','mobilenumber','address']);

        var propertylender = new PropertyLender(body);

        PropertyLender.findOne({ 'email': body.email }, function(err, data) {
          if(!data){
            propertylender.save().then(() => {
              return propertylender.generateAuthToken();
            }).then((token) => {
              res.send({'propertylender':propertylender,'token':token});
            }).catch((e) => {
              res.status(400).send(e);
            })
          }
          else{
            res.status(400).send("User Already Exist");
          }
        })
        
        
    });
}