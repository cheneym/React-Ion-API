const db = require('../../server/config/connection');
require('airbnb-js-shims');
const _ = require('lodash');

const Model = class Model {
  constructor(model) {
    this.model = model;
  }

  find(params, cb) {
    const keys = Object.keys(params);
    const vals = Object.values(params).map(a => a.toString());
    let queryString = `select * from ${this.model}`;

    if (keys.length > 0) {
      queryString += ` where ${keys.map(a => `${a}=?`).join(' and ')}`;
      db.query(queryString, vals, (err, results) => {
        if (cb) { cb(err, results); }
      });
    } else {
      db.query(queryString, (err, results) => {
        if (cb) { cb(err, results); }
      });
    }
  }

  create(props, cb) {
    const keys = Object.keys(props);
    const vals = Object.values(props);
    const propString = `(${keys.join(',')})`;
    const valString = `(${_.range(keys.length).map(() => '?').join(',')})`;
    const queryString = `insert into ${this.model}${propString}
                         value ${valString}`;
    db.query(queryString, vals, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }

  update(query, props, cb) {
    const pkeys = Object.keys(props);
    const pvals = Object.values(props);
    const qkeys = Object.keys(query);
    const qvals = Object.values(query);
    const queryString = `update ${this.model} set ${pkeys.map(a => `${a}=?`).join(', ')}
                         where ${qkeys.map(a => `${a}=?`).join(' and ')}`;
    db.query(queryString, pvals.concat(qvals), (err, results) => {
      if (cb) { cb(err, results); }
    });
  }

  remove(params, cb) {
    const keys = Object.keys(params);
    const vals = Object.values(params).map(a => a.toString());
    let queryString = `delete from ${this.model}`;

    if (keys.length > 0) {
      queryString += ` where ${keys.map(a => `${a}=?`).join(' and ')}`;
      db.query(queryString, vals, (err, results) => {
        if (cb) { cb(err, results); }
      });
    } else {
      db.query(queryString, (err, results) => {
        if (cb) { cb(err, results); }
      });
    }
  }
};

module.exports = Model;
