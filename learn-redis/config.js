const redis = require('ioredis');
const redisClient = new redis('redis://localhost:6379')

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

module.exports = redisClient;