// import PDFParser from "pdf2json";
// const pdfParser = new PDFParser();
// const  PDFParser =require('pdf2json');

const express = require('express');
const db = require('./config/db')
const fileupload=require('express-fileupload');
const cors = require('cors');
const  http = require('http');
const fs=require('fs');

const app = express();
const  PORT = 3002;
import ('pdf2json');
app.use(cors());
app.use(fileupload());
app.use(express.json());
 

app.post('/api/login',function(req,res){
  const username=req.params.username;
  const password=req.params.password;
 db.query('SELECT * FROM userdetails2 where userdetloginname =? and userdetpassword =? ',[username,password], function (error, results, fields){
        if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"Error"
    })
  }else{
    console.log('Results: ', results);

    res.send({
      "code":200,
      "success":Results
        });
  }
  });



});



app.get("/api/login/:username/:password", (req,res)=>{
  const username=req.params.username;
  const password=req.params.password;
   
 //  where userdetloginname = ? and userdetpassword = ?,username,password
db.query("SELECT userdetemailid FROM userdetails2 where userdetloginname =? and userdetpassword=?",[username,password],(err,result)=>{
    if(err) {
    console.log(err)
    res.send(err)
    } 
    else{
       console.log(result) 
       res.send(result)
    }

}
    );   
});

 


app.get("/api/vendordetails", (req,res)=>{
db.query("select vendetid , vendetname , vendetcontactperson , vendetemailid , vendetphonenumber , vendetaddress , vendetcreationtime , vendetvendorcode, vendetadminstate from vendordetails;", (err,result)=>{
    if(err) {
    console.log(err)
    res.send(err)
    } 
    else{
       console.log(result) 
       res.send(result)
    }

}
    );   
});

app.post("/api/vendordetails", (req,res)=>{
 
  const Name=req.body.vendetname;
  const Contact=req.body.vendetcontactperson;
  const Mail=req.body.vendetemailid;
  const Address=req.body.vendetaddress;
  const Mobile=req.body.vendetphonenumber;
  const sql=`INSERT INTO vendordetails (vendetname, vendetcontactperson, vendetemailid,vendetphonenumber, vendetaddress, vendetcreationtime, vendetadminstate) VALUES ('${Name}','${Contact}','${Mail}','${Mobile}','${Address}', Now(), '1')`;
  // console.log(req.body.vendetphonenumber);
  //  res.send("vendoe added for"+req.body.vendetname); 
   db.query( sql, (err,result)=>{
    if(err) {
    console.log(err)
    res.send(err)
    } 
    else{
       console.log(result) 
       res.send(result)
    }

}
    );
   
  });


  app.put("/api/vendordetails", (req,res)=>{
    const ID=req.body.vendetid;
    const Name=req.body.vendetname;
    const Contact=req.body.vendetcontactperson;
    const Mail=req.body.vendetemailid;
    const Address=req.body.vendetaddress;
    const Mobile=req.body.vendetphonenumber;
    const sql=`UPDATE vendordetails SET vendetname =  '${Name}', vendetcontactperson = '${Contact}', vendetemailid = '${Mail}', vendetphonenumber = '${Mobile}', vendetaddress = '${Address}' WHERE (vendetid = '${ID}')`;;
    // console.log(req.body.vendetphonenumber);
    //  res.send("vendoe added for"+req.body.vendetname); 
     db.query( sql, (err,result)=>{
      if(err) {
      console.log(err)
      res.send(err)
      } 
      else{
         console.log(result) 
         res.send(result)
      }
  
  }
      );
     
    });

    app.delete("/api/vendordetails", (req,res)=>{
      const ID=req.body.vendetid;
      
      const sql=`DELETE FROM vendordetails  WHERE (vendetid = '${ID}')`;
      console.log(req.body.vendetphonenumber);
       res.send("vendor deleted for"+req.body.vendetname); 
       db.query( sql, (err,result)=>{
        if(err) {
        console.log(err)
        res.send(err)
        } 
        else{
           console.log(result) 
           res.send(result)
        }
    
    }
        );
       
      });

      app.get("/api/vendorlist", (req,res)=>{
        db.query("SELECT vendetid as id, vendetname as name from vendordetails", (err,result)=>{
            if(err) {
            console.log(err)
            res.send(err)
            } 
            else{
               console.log(result) 
               res.send(result)
            }
        
        }
            );   
        });

      app.get("/api/purchasedetails", (req,res)=>{
        db.query("SELECT purchaseid,invoiceid, vendetname , purchaseamount, purchaseinvoice, purchasepaymentstatus,purchasecreatedon, purchaseupdatedon from purchasedetails join vendordetails on vendetid=purchasevendorid;", (err,result)=>{
            if(err) {
            console.log(err)
            res.send(err)
            } 
            else{
               console.log(result) 
               res.send(result)
            }
        
        }
            );   
        });
        
        app.post("/api/purchasedetails", (req,res)=>{
          
         console.log('post:'+req)
          const invoiceId=req.body.invoiceid;
          const vendorId=req.body.vendetname;
          const amount=req.body.purchaseamount;
          const paystatus=req.body.purchasepaymentstatus;
          const invoice=req.body.purchaseinvoice;
          const sql=`INSERT INTO purchasedetails (invoiceid, purchasevendorid, purchaseamount, purchasepaymentstatus, purchasecreatedon, purchaseupdatedon) VALUES ('${invoiceId}', '${vendorId}', '${amount}', '${paystatus}', NOW(), NOW());`;
          // console.log(req.body.vendetphonenumber);
          //  res.send("vendoe added for"+req.body.vendetname); 
           db.query( sql, (err,result)=>{
            if(err) {
            console.log(err)
            res.send(err)
            } 
            else{
               console.log(result) 
               res.send(result)
            }
        
        }
            );
           
          });
        
        
          app.put("/api/purchasedetails", (req,res)=>{
            const purchaseId=req.body.purchaseid;
            const vendorId=req.body.vendetname;
            const invoiceId=req.body.invoiceid;
            const amount=req.body.purchaseamount;
            const paystatus=req.body.purchasepaymentstatus;
            const invoice=req.body.purchaseinvoice;
           
            const sql=`UPDATE purchasedetails  SET  invoiceid  = '${invoiceId}',  purchaseamount  = '${amount}',  purchasepaymentstatus  = '${paystatus}',  purchaseinvoice  = '${invoice}',purchaseupdatedon='NOW()'  WHERE ( purchaseid  = '${purchaseId}')`;;
            
             db.query( sql, (err,result)=>{
              if(err) {
              console.log(err)
              res.send(err)
              } 
              else{
                 console.log(result) 
                 res.send(result)
              }
          
          }
              );
             
            });
        
            app.delete("/api/purchasedetails", (req,res)=>{
              const ID=req.body.vendetid;
              
              const sql=`DELETE FROM vendordetails  WHERE (vendetid = '${ID}')`;
              console.log(req.body.vendetphonenumber);
               res.send("vendor deleted for"+req.body.vendetname); 
               db.query( sql, (err,result)=>{
                if(err) {
                console.log(err)
                res.send(err)
                } 
                else{
                   console.log(result) 
                   res.send(result)
                }
            
            }
                );
               
              });



      app.get('/files/abc',function(req,res){
                // console.log(req.files['file']);
                // console.log(req.files);
              fs.open('mynewfile3.txt', 'w', function (err, f) {
                console.log(f);
                  console.log('Saved!');
              });
                
            });

           



 app.post('/api/register',function(req,res){
 const name=req.body.name;
 const mail=req.body.mail;
 const phone=req.body.phone;
 const gender=req.body.gender;
  const password=req.body.password;
 const adminstate=1;
   
 db.query("INSERT INTO `userdetails2` (`userdetloginname`, `userdetpassword`, `userdetemailid`, `userdetphonenumber`, `userdetadminstate`, `userdetgender`) VALUES(? , ?, ? , ? , ? , ?)",[name , password,mail, phone,adminstate,gender], function (error, results, fields){
        if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error",
    })
  }else{
    console.log('Results: ', results);

    res.send({
      "code":200,
      "success":results,

        });
  }
  });



});

app.post('/api/fileupload',function(req,res){
    // console.log(req.files['file']);
    // console.log(req.files);
    const obj = JSON.parse(JSON.stringify(req.files)); // req.body = [Object: null prototype] { title: 'product' }

    console.log(obj.file);   
    const file=obj.file;
    const buffer = Buffer. from(file.data.data); 
    // const file=req.body.file;
    // 'D:/'+file.name
    
    if (fs.existsSync('https://inventoryserver-three.vercel.app/upload/'+file.name)) {
    // if (fs.existsSync('./upload/'+file.name)) {
       res.send('file already exist') }
       fs.writeFile('https://inventoryserver-three.vercel.app/upload/'+file.name,buffer , function (err) {
    // fs.writeFile('./upload/'+file.name,buffer , function (err) {
      if (err) throw err;
      console.log('Saved!');
      res.send("file saved");
    }); 
    
     
    
});


 
app.get('/api/fileind',function(req,res){
  // fs.readFile('D:/mynewfile3.txt', (err, data) => {
  //   if (err) {
  //     res.writeHead(404, { 'Content-Type': 'text' });
  //     res.end('404: File not found');
  //   } else {
  //     res.writeHead(200, { 'Content-Type': 'text' });
  //     res.end(data);
  //   }
  // });
  ////////////////////////////////////////
  // pdfParser.loadPDF('http://121.242.232.175:8083/cims/WeeklyReports/abcd.pdf');
  fs.writeFile('/abc.pdf', 'This is my text', function (err) {
    if (err) throw err;               console.log('Results Received');
  });
   
         //////////////////////////

});
 
 

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});

 