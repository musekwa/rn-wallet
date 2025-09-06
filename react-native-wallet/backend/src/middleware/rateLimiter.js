import ratelimit from "../config/upstash.js";


const ratelimiter = async (req, res, next) => {
  try {
      const {success} = await ratelimit.limit('my-rate-limiter');
      if (!success) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
      }
      next();
    // identify users by their IP address
    //   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // if (!ip) {
    //   return res.status(400).json({ error: 'Unable to determine IP address' });
    // }

    // const { success } = await ratelimit.limit(ip);
    // if (!success) {
    //   return res.status(429).json({ error: 'Too many requests, please try again later.' });
    // }
    // next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    next(error);
  }
};

export default ratelimiter;