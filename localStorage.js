
const storage = {};

class userData {
  id;
  username;
  age;
  email;
  constructor(data) {
    Object.assign(this, data);
  }

}

const create = (id, data) => {
  var user = new userData(data);
  storage[id] = user;
};

const read = (id) => {
  return storage[id];
};

const update = (id, data) => {
  if (storage[id]) {
    var user = new userData(data);
    storage[id] = user;
    return true;
  }
  return false;
};

const remove = (id) => {
  if (storage[id]) {
    delete storage[id];
    return true;
  }
  return false;
};

const getAll = () => {
  return Object.values(storage);
};

const checkUsername = (data) => {
  var rtn = false
  var dataAll = getAll()
  dataAll.forEach(element => {
    if (element.username == data) {
      rtn = true;
    }
  });

  return rtn;
};

const checkEmail = (data,username) => {
  var rtn = false
  var dataAll = getAll()
  dataAll.forEach(element => {
    if (element.email == data && element.username != username) {
      rtn = true;
    }
  });

  return rtn;
};

module.exports = { create, read, update, remove, getAll, checkUsername, checkEmail};
