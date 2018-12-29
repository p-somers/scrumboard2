'use strict';

module.exports = function(Column) {
  let app;

  Column.on('attached', function(a) {
    app = a;
  });

  // ColumnHeader.observe('after save', ctx => {
  //   let socket = app.io.sockets.connected[app.get('socketId')];
  //   socket && socket.broadcast.emit('column updated', ctx.instance);
  // });
  //
  // ColumnHeader.observe('after delete', ctx => {
  //
  // });

  /**
   * Promise-ified version of create
   * @param name
   * @param order
   * @param teamId
   * @returns {Promise<any>}
   */
  Column.insert = (name, order, teamId) => {
    return new Promise((resolve, reject) => {
      app.models.Column.create({name, order, teamId}, (error, column) => {
        if (error) {
          reject(error);
        } else {
          resolve(column);
        }
      });
    });
  }
};
