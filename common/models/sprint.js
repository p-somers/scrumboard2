'use strict';

module.exports = function(Sprint) {
  let app;

  let getNextSprintNumber = (teamId) => {
    return Sprint.find({
      where: {teamId},
      fields: {number: true, teamId: false, id: false},
      order: 'number DESC',
      limit: 1
    }).then(result => {
      if (result && result.length > 0) {
        return result[0].number + 1;
      } else {
        return 1;
      }
    });
  };

  Sprint.on('attached', function(a) {
    app = a;
  });

  Sprint.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance) {
      let teamId = ctx.instance.teamId.toString();

      getNextSprintNumber(teamId).then(number => {
        ctx.instance.number = number;
        next();
      });
    }
  });
};
