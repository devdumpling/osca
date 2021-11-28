import { getSession } from "next-auth/react";
import { Firestore } from "@google-cloud/firestore";
import { credentials } from "../../../utils";

const firestore = new Firestore({
  projectId: credentials.project_id,
  credentials,
});
const entriesRef = firestore.collection("lottery-entries");
const permissionsRef = firestore.collection("user-permissions");

async function authorize(session, req) {
  const entryEmail = req.query.email
    ? req.query.email.toLowerCase().replace(/ /g, "+")
    : undefined;

  if (session && session.user) {
    const userRef = await permissionsRef.doc(session.user.email).get();

    let entriesPermission = false;
    if (userRef.exists) {
      const user = userRef.data();
      entriesPermission = user.entries; // user has been assigned permissions `entries: true` in `user-permissions` collection
    }

    return entriesPermission || session.user.email === entryEmail; // signed in user is trying to access their entry
  } else {
    return false;
  }
}

export default async function handler(req, res) {
  let session;
  try {
    // Get user session
    session = await getSession({ req });
  } catch (error) {
    return res.status(500).json({
      error: `Could not get user session: ${error}`,
    });
  }

  if (await authorize(session, req)) {
    const query = entriesRef.where("lotteryId", "==", "summer2021");

    const id = req.query.id || req.query.entryId;
    if (id) {
      const entryRef = await query.doc(id).get();
      if (!entryRef.exists) {
        return res.status(200).json({});
      } else {
        return res.status(200).json([parseDoc(entryRef)]);
      }
    }
    Object.keys(req.query).forEach((field) => {
      query = query.where(field, "==", req.query[field]);
    });
    const snapshot = await query.get();
    const entrants = snapshot.docs.map((doc) => ({
      ...doc.data(),
      entryId: doc.id,
    }));
    res.status(200).json(entrants);
  } else {
    res.status(401).json({
      error: "Not authorized",
    });
  }
}
