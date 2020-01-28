import Redis from 'ioredis';

export default new Redis(process.env.REDIS_PORT, {
  host: process.env.REDIS_HOST
});
