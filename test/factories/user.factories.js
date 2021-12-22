const _ = require("lodash");
const User = require("../../models/user.js");

const factories = {};

factories.buildBasic = (data = {}) => {
  const substr = Math.random().toString().substr(-5);
  return User.build({
    email: data.email || `basic-${substr}@example.com`,
    username: data.username || "basic-" + substr,
    name: data.name || "Basic User " + substr,
    data: data.data || {},
    ...data,
  });
};

factories.createBasic = async (data = {}) => {
  const user = await factories.buildBasic(data).save();
  await user.generateAccessToken();
  return user;
};

factories.createBasics = async (n = 1, data) => {
  const users = [];
  for (let i = 0; i < n; i++) {
    const user = await factories.createBasic(data);
    users.push(user);
  }
  return users;
};

module.exports = factories;
