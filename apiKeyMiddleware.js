
class middleware {
  //const apiKeyMiddleware = (req, res, next) => {
  static verifyToken = function (req, res, next) {
    const apiKey = req.headers['x-api-key']; // Get the API key from the header   


    if (req.originalUrl != '/api-docs/') {
     
      console.log(apiKey);
      if (!apiKey) {
        return res.status(401).json({ message: 'API key missing' });
      }

      // Check if the apiKey is valid (you would compare it against your stored keys here)
      const validKeys = ['a3c45d73e82f09b87cd9f2e41ab1de9682ab36fd']; // Replace with your valid keys
      if (!validKeys.includes(apiKey)) {
        return res.status(403).json({ message: 'Invalid API key' });
      }

    }

    return next(); // API key is valid, proceed to the next middleware/route
  };

  static log = function (req, res, next) {

    console.log(req.originalUrl);
    return next();
  }

}
module.exports = middleware;