import Pusher from "pusher";

// Singleton approach based on:
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

declare global {
  var pusherClient: undefined | Pusher;
}

const pusherClientSingleton = () => {
  return new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "us2",
    useTLS: true,
  });
};

const pusher = globalThis.pusherClient ?? pusherClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.pusherClient = pusher;
}

export { pusher };
