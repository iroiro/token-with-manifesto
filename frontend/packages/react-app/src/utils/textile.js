import { Client, ThreadID, Where } from "@textile/hub";

// TODO split and add as custom hooks
export const testThreadDB = async () => {
  const client = await Client.withKeyInfo({
    key: process.env.THREADDB_KEY,
    secret: process.env.THREADDB_SECRET,
  });
  // const thread = client.newDB(null, "token-with-manifesto")
  // console.debug(thread.toString())

  const threadId = ThreadID.fromString(
    "bafkrry3cmc7c3pqiddusuookcsjhqhz33eocniwtfncifef4mxgo4oy"
  );

  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Person",
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      missions: {
        type: "number",
        minimum: 0,
        // exclusiveMaximum: 100,
      },
    },
  };
  const collectionName = "Astronauts";
  // await client.newCollection(threadId, {
  //   name: collectionName,
  //   schema: schema,
  // });
  console.debug(await client.listCollections(threadId));

  // await client.create(threadId, collectionName, [
  //   { name: "astronauts", missions: 0 },
  // ]);

  const all = await client.find(threadId, collectionName, {});
  console.debug(all);

  const query = new Where("_id").eq("01exxp64jw40nb7pdnbardht51");
  const filterd = await client.find(threadId, collectionName, query);
  console.debug(filterd);

  const info = await client.getDBInfo(threadId);
  console.debug(info);

  // client.deleteDB(threadId)
};
