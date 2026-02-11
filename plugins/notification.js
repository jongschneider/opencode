export const NotificationPlugin = async ({ $, client }) => {
  const soundPath = "/System/Library/Sounds/Glass.aiff";

  const isMainSession = async (sessionID) => {
    try {
      const result = await client.session.get({ path: { id: sessionID } });
      const session = result.data ?? result;
      return !session.parentID;
    } catch {
      return true;
    }
  };

  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        const sessionID = event.properties.sessionID;
        if (await isMainSession(sessionID)) {
          await $`afplay ${soundPath}`;
        }
      }

      if (event.type === "permission.asked") {
        await $`afplay ${soundPath}`;
      }
    },
  };
};
