const presets = [
  ["@babel/preset-env", {
    targets: {
      browsers: ["> 3%", "IE 11"],
      node: 8
    },
    useBuiltIns: "usage"
  }]
];
  
module.exports = {
  presets
};