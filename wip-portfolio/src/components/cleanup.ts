import { database } from "../../firebase.config";
import { ref, get, remove } from "firebase/database";

export async function cleanupStaleData() {
  const cursorsRef = ref(database, "cursors");
  const snapshot = await get(cursorsRef);

  if (!snapshot.exists()) return;

  const data = snapshot.val() as Record<
    string,
    { lastActive?: number }
  >;
  const now = Date.now();

  Object.entries(data).forEach(([userId, cursor]) => {
    // If lastActive is missing or older than 10 seconds, remove it
    if (!cursor.lastActive || now - cursor.lastActive > 10_000) {
      remove(ref(database, `cursors/${userId}`));
    }
  });
}