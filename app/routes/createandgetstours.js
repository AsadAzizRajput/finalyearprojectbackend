const _ = require('lodash');
const {Createtour} = require('./../models/createtour');
const {PropertyLender} = require('./../models/propertylendersignup');

module.exports=function(app,database)
{
      
     app.post('/createtour',(req,res)=>{
      var body = _.pick(req.body,['travellingagencyid','name','price','numberofdays','numberofnights','tourdetails','departurelocation','returnlocation','departuretime','email']);
      var tours = new Createtour(body);
      console.log(body.travellingagencyid);
   //   if(tours.travellingagencyid){
      tours.save().then((tour) => {
          console.log("tour");
          console.log(tour);
         res.send(tour);
      }).catch((e) => {  
        console.log(e);
        res.status(400).send("Tour is not added");
      });
    //    }
   });

   app.get('/gettourlist',(req,res)=>{
    var id = req.query.id;
  console.log(id);
    Createtour.find({}).then((tour) => {
       res.send(tour);
    }).catch((e) => {  
      console.log(e);
      res.status(400).send("Tour is Available");
    });
 });


 app.get('/gettourlistbyid/:id',(req,res)=>{
  // var id = req.query.id;
  console.log(req.params.id);
  Createtour.find({travellingagencyid: req.params.id}).then((tourlist) => {
     res.send(tourlist);
  }).catch((e) => {  
    console.log(e);
    res.status(400).send("No tour available is Available");
  });
});


 app.post('/tourquery',(req,res)=>{
  var body = _.pick(req.body,['tourid','name','numberofadults','numberofkids','phonenumber','travelleremail','travellerid','message']);


  Createtour.findOne({'_id':body.tourid}).then((tour) => {
  var tourquery = {"travellerid":body.travellerid,"name":body.name,"travelleremail":body.travelleremail,"phonenumber":body.phonenumber,"numberofadults":body.numberofadults,"numberofkids":body.numberofkids,"message":body.message}
    if(tour)
    {
      Createtour.update({'_id':tour._id},
      { $push:
         {bookingquery:tourquery}},
         { safe: true, upsert: true},).then((updatedUser) => {
        console.log('updatedUser');
        console.log(updatedUser);
       res.send(updatedUser);
    }).catch((e) => {  
      res.status(400).send(e);
    });

    }
 }).catch((e) => {  
   console.log(e);
   res.status(400).send(e);
 });
});

app.delete('/deletetour/:id',(req,res)=>{
var tourid = req.params.id;
//Tank.remove({ size: 'large' }
Createtour.remove({_id: req.params.id}).then((deletedtour) => {
  res.send(deletedtour);

}).catch((e) => {  
   console.log(e);
   res.status(400).send(e);
 });


})
  
app.get('/gettravellingagency',(req,res)=>{
  // var id = req.query.id;
  //console.log(req.params.id);
  PropertyLender.find({}).then((propertylenderlist) => {
     res.send(propertylenderlist);
  }).catch((e) => {  
    console.log(e);
    res.status(400).send("No Propertlender Exist");
  });
});

}