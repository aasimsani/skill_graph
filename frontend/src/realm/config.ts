import * as Realm from "realm-web";

if (!process.env.NEXT_PUBLIC_ATLAS_REALM_APP_ID) {
  throw new Error("NEXT_PUBLIC_ATLAS_REALM_APP_ID is not defined");
}

const appID: string = process.env.NEXT_PUBLIC_ATLAS_REALM_APP_ID;
const app = new Realm.App({ id: appID });

export default app;