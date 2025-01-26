import Cursors from "@/components/game1";
import SynchronizedScrollComponent from "@/components/syncScroll";
import { getProjects } from "@/sanity/lib/queries";
import { Suspense } from "react";
const allProjects = await getProjects()


/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Home() {
  return (<>
      <Cursors/>
      <main className="w-screen h-[100svh] absolute top-0 left-0 lg:p-10 p-5 mono ">
        <Suspense>
            <SynchronizedScrollComponent allProjects={allProjects} />
        </Suspense>
        <footer className=" w-full flex justify-between items-end h-[5%]">
          <button className="sans hover:underline">CHRIS PANICKER</button>
        </footer>
      </main>
    </>);
}
