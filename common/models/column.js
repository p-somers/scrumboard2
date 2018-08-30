'use strict';

module.exports = function(Column) {

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
