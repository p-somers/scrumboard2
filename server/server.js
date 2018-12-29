"use strict";

let loopback = require("loopback");
let boot = require("loopback-boot");
let cookieParser = require("socket.io-cookie");
let parser = require("cookie-parser");
let { cookieSecret } = require("./config");

let app = (module.exports = loopback());
app.use(loopback.token({ model: app.models.accessToken }));

app.use(function(req, res, next) {
  app.set("socketId", req.cookies.io);
  next();
});

app.start = function() {
  return app.listen(function() {
    app.emit("started");
    let baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      let explorerPath = app.get("loopback-component-explorer").mountPath;
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require("socket.io")(app.start());
    app.io.use(cookieParser);
    require("socketio-auth")(app.io, {
      authenticate: function(socket, value, callback) {
        let AccessToken = app.models.AccessToken;
        let tokenId = parser.signedCookie(
          socket.handshake.headers.cookie.access_token,
          cookieSecret
        );
        //get credentials sent by the client
        AccessToken.find(
          {
            where: {
              and: [{ userId: value.userId }, { id: tokenId }]
            }
          },
          function(err, tokenDetail) {
            if (err) throw err;
            if (tokenDetail.length) {
              callback(null, true);
            } else {
              callback(null, false);
            }
          }
        ); //find function..
      } //authenticate function..
    });

    // app.io.on('connection', function (socket) {
    //   console.log('a user connected', socket.id);
    //   socket.on('disconnect', function (reason) {
    //     console.log('user disconnected, reason:', reason);
    //   });
    // });
  }
});
