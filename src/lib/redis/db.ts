import { createClient } from 'redis';

// Singleton approach based on:
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

declare global {
  var redisClient: undefined | ReturnType<typeof redisClientSingleton>;
}

const redisClientSingleton = () => {
  return createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });
};

const client = globalThis.redisClient ?? redisClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.redisClient = client;
}

client.on('error', (err) => console.error(err));

if (!client.isOpen) {
  client.connect();
}

export { client };
