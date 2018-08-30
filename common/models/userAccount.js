'use strict';

module.exports = function(UserAccount) {
  UserAccount.afterRemote('login', function(ctx, token, next){
    ctx.res.cookie('access_token', ctx.result.id, { signed: true, maxAge: ctx.result.ttl * 1000 });
    /*UserAccount.findById(ctx.result.userId, (err, user) => {
      delete token.userId;
      token.userAccount = user;
      next();
    });*/
    next();
  });

  UserAccount.afterRemote('logout', function(ctx, next){
    ctx.res.clearCookie('access_token');
    next();
  });
};
