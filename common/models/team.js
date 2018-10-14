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
    let {Column} = app.models;

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
      socket && socket.emit('columns updated', columns);
      callback(null, columns);
    });
  };

  Team.nextStoryNumber = (teamId, callback) => {
    let {Story, Sprint} = app.models;
    Sprint.find({where: {teamId}}, (sprintFindError, sprints) => {
      Story.findOne(
        {
          where: {sprintId: {inq: sprints.map(sprint => sprint.id)}},
          order: 'number DESC'
        },
        (err, story) => {
          let number = 1;
          if (story && !isNaN(story.number)) number = story.number + 1;
          callback(null, number);
        }
      );
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

  Team.remoteMethod('nextStoryNumber', {
    accepts: [
      {arg: 'id', type: 'string', required: true},
    ],
    returns: {arg: 'number', type: 'number'},
    http: {path: '/:id/nextStoryNumber', method: 'get'}
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
