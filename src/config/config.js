const production = {
  origin: "https://roadmapprioritisation.netlify.app",
  // origin: "https://roadmap-prioritization.netlify.app", // Update before deploy to Netlify
};

const development = {
  origin: "http://localhost:3000",
};

const config = {
  production,
  development,
};

const load = () => {
  if (process.env.NODE_ENV == "development") {
    return config.development;
  }
  return config.production;
};

module.exports = { load };
