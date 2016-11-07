var app = require("express")();
var id = 0;
var rand = 0;
var data = null;

app.get("/*", (req, res) => {
   var params = req.params['0'].split('/');
   var db = params.shift();
   rand = Math.floor((Math.random() * 10000) + 1);
   if (db === "") {
      res.send("Created by Fortune");
      return;
   }
   if (db !== "new") {
      if (id == db && data !== null) {
         res.writeHead(301, {
            Location: data.link
         });
         data = null;
         res.end();
      }
      else res.send({
         "error": "This url is not on the database."
      });
      return;
   }
   params = params.join("/");
   var url = require("url");
   var json = url.parse(params);

   var valid = require("validator");
   if (valid.isURL(json.href, {
         require_protocol: true
      })) {
      var link = json.href;
      data = {
         number: rand,
         link: link
      };
      id = data.number;
      res.send({
         "original_url": data.link,
         "short_url": "https://node-project-ofuochi1.c9users.io/" + data.number
      });
   }
   else {
      res.end(new Error("You need to add a proper url").toString());
   }
   // res.end(JSON.stringify(json,null,1));
   //    if ((params[0] !== "https:" && params[0] !== "http:")) {
   //       res.send({
   //          "error": "Wrong url format, make sure you have a valid protocol and real site.",

   //       });
   //       return;
   //    }
   //    if (params[1] !== '') {
   //       res.send("Eror");
   //       return;
   //    }
   //    params = params[2].split(".");
   //    if (params[0] !== "www") {
   //       res.send({
   //          "error": "Wrong url format, make sure you have a valid protocol and real site.",

   //       });
   //       return;
   //    }
   //    if(params[1]==""){
   //        res.send({
   //          "error": "Wrong url format, make sure you have a valid protocol and real site.",

   //       });
   //       return;
   //    }
   //    var url = params.join('.');

   //    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
   //    var regex = new RegExp(expression);

   //    if (!url.match(regex)) {
   //       res.send({
   //          "error": "Wrong url format, make sure you have a valid protocol and real site.",

   //       });
   //       return;
   //    }

   //  res.send(params);

});
app.listen(8080);