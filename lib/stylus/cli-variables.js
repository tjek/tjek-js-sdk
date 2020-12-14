module.exports = (vars) => (stylus) => {
    for (var name in vars) stylus.define(name, vars[name]);
};
