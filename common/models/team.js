'use strict';

module.exports = function (Team) {
  let app;
  //TODO: this
  const defaultColumns = [
    'Not Started', 'In Progress', 'Done'
  ];

  Team.on('attached', function (a) {
    app = a;
  });

  Team.saveColumns = (teamId, columns, callback) => {
    let Column = app.models.Column;

    let newColumns = [];
    let updatedColumns = [];
    columns.forEach(column => {
      if (column.id) {
        updatedColumns.push(column);
      } else {
        column.teamId = teamId;
        newColumns.push(column);
      }
    });

    let operations = updatedColumns.map(
      column => Column.upsert(column)
    );

    if (newColumns.length > 0) {
      operations.push(Column.create(newColumns));
    }

    Promise.all(operations).then(columns => {
      let socket = app.io.sockets.connected[app.get('socketId')];
      socket && socket.broadcast.emit('columns updated', columns);
      callback(null, columns);
    });
  };

  Team.remoteMethod('saveColumns', {
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'columns', type: 'array'}
    ],
    returns: {arg: 'columns', type: 'array'},
    http: {path: '/:id/saveColumns', method: 'post'}
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
