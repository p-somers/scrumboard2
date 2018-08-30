'use strict';

module.exports = function(Team) {
  let app;
  const defaultColumns = [
    'Not Started', 'In Progress', 'Done'
  ];

  Team.on('attached', function(a) {
    app = a;
  });


  Team.afterRemote('create', (ctx, team, next) => {
    debugger;
    Promise.all(defaultColumns.map((name, order) => {
      return app.models.Column.insert(name, order, team.id);
    }))
      .then(result => {
        debugger;
      });
    next();
  });
};
