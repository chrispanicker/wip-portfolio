"use client"
import React, { useEffect, useState } from "react";
import { database } from "../../firebase.config";
import { ref, set, onValue, remove } from "firebase/database";
import { cleanupStaleData } from "./cleanup";

type CursorData = {
  id: string;
  ratioX: number;
  ratioY: number;
  randChar: string;
  lastActive?: number;
};

const Cursors: React.FC = () => {
  const [cursors, setCursors] = useState<CursorData[]>([]);

  useEffect(() => {
    // 1) Do an immediate cleanup whenever a user connects (component mounts)
    cleanupStaleData();

    // 2) Then set an interval to keep cleaning while at least one user is active
    const intervalId = setInterval(() => {
      cleanupStaleData();
    }, 10_000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Track window size in local state
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  useEffect(() => {
    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Generate a unique user ID and random letter
    const userId = Math.random().toString(36).substring(2, 9);
    const chars = "CHRIS"
    const randChar = chars.charAt(Math.floor(Math.random() * chars.length))
    const cursorRef = ref(database, `cursors/${userId}`);

    const handleMouseMove = (event: MouseEvent) => {
      const ratioX = event.clientX / window.innerWidth;
      const ratioY = event.clientY / window.innerHeight;

      set(cursorRef, {
        id: userId,
        ratioX,
        ratioY,
        randChar,
        lastActive: Date.now(),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Remove cursor on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      remove(cursorRef);
    };
  }, []);

  useEffect(() => {
    // Listen for changes in "cursors" node
    const cursorsRef = ref(database, "cursors");
    const unsubscribe = onValue(cursorsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const cursorArray = Object.values(data) as CursorData[];
      setCursors(cursorArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {cursors.map((cursor) => {
        // Convert ratio back to pixel position
        const x = cursor.ratioX * windowSize.width;
        const y = cursor.ratioY * windowSize.height;

        return (
          <div className="cursor-none"
            key={cursor.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 10,
              height: 10,
              // backgroundColor: cursor.color,
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >{cursor.randChar}</div>
        );
      })}
    </>
  );
};

export default Cursors;
