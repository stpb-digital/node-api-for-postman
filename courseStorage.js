
const storage = {};

class CourseData{
  id;
  coursename;
  price;
  constructor(data){
    Object.assign(this, data);
}

}

const create = (id, data) => {
  var course = new CourseData(data);
  storage[id] = course;
};

const read = (id) => {
  return storage[id];
};

const update = (id, data) => {
  if (storage[id]) {
    var course = new CourseData(data);
    storage[id] = course;
    return true;
  }
  return false;
};

const updatePrice = (id, data) => {
  if (storage[id]) {
    var data1 = storage[id]
    data1.price = data.price
    storage[id] = data1
//console.log(data1)
    //storage[id].price = data.price;
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

module.exports = { create, read, update, updatePrice, remove, getAll };
