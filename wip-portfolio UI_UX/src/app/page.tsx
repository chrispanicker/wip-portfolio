'use client'

// import { Permit } from "@/components/pemit";
import { urlFor } from "@/sanity/lib/image";
import { getProjects } from "@/sanity/lib/queries";
import { getFile } from '@sanity/asset-utils'
import { PortableText } from "next-sanity";
import Image from "next/image";

const allProjects = await getProjects()

/* eslint-disable @typescript-eslint/no-explicit-any */
//test
export default function Home() {
  return (
    <>
    <section className="pb-20 snap-y snap-mandatory overflow-y-scroll h-screen mx-2">
      {allProjects.map((project:any)=>(
          <div key={project._id} className="py-10 relative text-black sans snap-start snap-always">
            <span className="flex overflow-x-scroll snap-x snap-mandatory rounded-3xl">      
                <div className="absolute top-[3.2rem] left-3 flex ">
                  <h1 className="px-3 py-1 rounded-3xl bg-white mr-1">{project.name}</h1>
                  <p className="px-3 py-1 rounded-3xl bg-white">{project.year}</p>
                </div>
              {project.images?.map((e:any, index:number) => (
                e._type === "mp4"?
                  <video key={`project.slug+${index}`} width="1440" height="1080" muted loop autoPlay playsInline preload="true" className="max-w-[100vw] h-[40dvh] lg:h-[87dvh] mx-1 snap-center snap-always rounded-3xl">
                    <source src={getFile(e, { projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`, dataset: "production" }).asset.url} type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
                : e._type ==="image"? 
                  <Image
                    src={urlFor(e).url()}
                    alt=""
                    width={1440}
                    height={1080}
                    className="max-w-[100vw] h-[40dvh] lg:h-[87dvh] object-cover mx-1 snap-center snap-always rounded-3xl"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={`${project.gallery[index].lqip}`}
                    unoptimized={true}
                />:""
              ))}
            </span>
          </div>
      ))}
    </section>
    {/* <main className="fixed transition-[top,transform] duration-500 top-[93lvh] w-screen min-h-[100dvh] bg-white overflow-y-scroll outline outline-black outline-2 border border-y-1 border-black lg:blur-[.03rem] blur-[.02rem]">
      <Permit />
    </main> */}
    {/* <CollaborativeDrawing /> */}
    </>
  );
}
