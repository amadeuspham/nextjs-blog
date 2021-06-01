module.exports = {
  // Target must be serverless
  target: "serverless",
  // Image loader needed to be specified for next export to run
  images: {
    loader: "imgix",
    path: "https://noop/",
},
};