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

   data = {
      number: rand,
      link: json.href
   };
   if (valid.isURL(json.href, {
         require_protocol: true
      })) {
      // var link = json.href;
      id = data.number;
      res.send({
         "original_url": data.link,
         "short_url": "https://node-project-ofuochi1.c9users.io/" + data.number
      });
   }
   else {
      if(data.link=="")
         res.end(new Error("You need to add a proper url").toString());
         else res.send({"error":"Wrong url format, make sure you have a valid protocol and real site."});
   }

});
app.listen(8080);