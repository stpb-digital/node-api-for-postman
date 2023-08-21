
const storage = {};

var storageType = {}
var storageOrder = {}
class productData {
    id;
    producttype;
    productname;
    price;
    constructor(data) {
        Object.assign(this, data);
    }

}

class productType {
    id;
    typename;
    constructor(data) {
        Object.assign(this, data);
    }

}

class order {
    id;
    productid;
    username;
    quantity;
    constructor(data) {
        Object.assign(this, data);
    }

}

const getAllOrder = () => {
    return Object.values(storageOrder);
};

const createOrder = (id, data) => {
    var orderdata = new order(data);
    storageOrder[id] = orderdata;
};

const readOrder = (id) => {
    return storageOrder[id];
};

const updateOrder = (id, data) => {
    if (storageOrder[id]) {
        var orderdata = new order(data);
        storageOrder[id] = orderdata;
        return true;
    }
    return false;
};

const removeOrder = (id) => {
    if (storageOrder[id]) {
        delete storageOrder[id];
        return true;
    }
    return false;
};

const getAllType = () => {
    return Object.values(storageType);
};


const createtype = (id, data) => {
    var product = new productType(data);
    storageType[id] = product;
};

const readtype = (id) => {
    return storageType[id];
};

const create = (id, data) => {
    var product = new productData(data);
    storage[id] = product;
};

const read = (id) => {
    return storage[id];
};

const update = (id, data) => {
    if (storage[id]) {
        var product = new productData(data);
        storage[id] = product;
        return true;
    }
    return false;
};

const updatePrice = (id, data) => {
    if (storage[id]) {
        var data1 = storage[id]
        data1.price = data.price
        storage[id] = data1
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



module.exports = { create, read, update, updatePrice, remove, getAll, createtype, readtype, getAllType,getAllOrder,createOrder,readOrder,updateOrder,removeOrder };
