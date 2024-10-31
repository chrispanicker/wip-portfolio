
import { Permit } from "@/components/pemit";
import { getProjects } from "@/sanity/lib/queries";
import { getFile } from '@sanity/asset-utils'
import { PortableText } from "next-sanity";

const allProjects = await getProjects()

/* eslint-disable @typescript-eslint/no-explicit-any */
//test
export default function Home() {
  return (
    <>
    <section className="pb-20 snap-y snap-mandatory overflow-y-scroll">
      {allProjects.map((project:any)=>(
          <div key={project._id} className="relative text-white sans px-5 snap-start snap-always">
            <span className="flex lg:flex-row flex-col lg:justify-between lg:items-end justify-start items-start text-2xl py-3 lg:blur-[.03rem] blur-[.02rem]">
              <div className="flex lg:flex-row flex-col">
                <h1 className="whitespace-nowrap bottom-1 pr-2 sans-bold">{project.name}</h1>
                <div className="col-span-4 sans">
                  <PortableText value={project.content}/>
                </div>
              </div>
              <p className="sans text-right lg:block hidden">{project.year}</p>
            </span>
            <span className="flex overflow-x-scroll snap-x snap-mandatory">
              {project.images?.map((e:any, index:number) => (
                  <video key={`project.slug+${index}`} width="1440" height="1080" muted loop autoPlay playsInline preload="true" className="w-screen  h-[50dvh] lg:h-[87dvh] pr-2 snap-center snap-always">
                    <source src={getFile(e, { projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`, dataset: "production" }).asset.url} type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
              ))}
            </span>
          </div>
      ))}
    </section>
    <main className="fixed transition-[top,transform] duration-500 top-[93%] w-screen min-h-[100dvh] bg-white overflow-y-scroll outline outline-black outline-2 border border-y-1 border-black lg:blur-[.03rem] blur-[.02rem]">
      <Permit />
    </main>
    {/* <GameOne /> */}
    </>
  );
}
