'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { getFile } from '@sanity/asset-utils'
import { Menu } from './menu'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function SynchronizedScrollComponent({ allProjects }: { allProjects: any[] }) {
  //refs for elements (used for components that rely on existense of elements)
  const galRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  //useStates update based on functions (galScrollHeight is a variable, setGal... is the function to update variable, etc.)
  const [galScrollHeight, setGalScrollHeight] = useState(0)
  const [infoScrollHeight, setInfoScrollHeight] = useState(0)
  const [currentSlug, setCurrentSlug] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateScrollHeights = () => {
    const galElement = galRef.current
    const infoElement = infoRef.current

    if (galElement && infoElement) {
      //total height of each element (gallery and info)
      const galActualHeight = galElement.scrollHeight
      const infoActualHeight = infoElement.scrollHeight

      //clientHeight is the visible height of the parent element (not the total scrollable area)
      const parentHeight = galElement.parentElement?.clientHeight || 0
      //"% but this doesnt currently accomodate for mobile vs desktop"
      const galVisibleHeight = parentHeight * .92
      const infoVisibleHeight = parentHeight * 0.08

      //setting the heights (total height - visible height)
      setGalScrollHeight(galActualHeight - galVisibleHeight)
      setInfoScrollHeight(infoActualHeight - infoVisibleHeight)
    }
  }
  //useEffect runs when updateScrollHeights updates?
  useEffect(() => {
    updateScrollHeights()
    window.addEventListener('resize', updateScrollHeights)
    return () => window.removeEventListener('resize', updateScrollHeights)
  }, [updateScrollHeights])

  //function to make sure the info el scrolls with gal
  const syncInfoToGal = useCallback(() => {
    const galElement = galRef.current
    const infoElement = infoRef.current

    if (!galElement || !infoElement) return
    const galScrollPosition = galElement.scrollTop
    //ratio: current scroll position, divided by total scroll height
    const galScrollRatio = galScrollPosition / galScrollHeight
    //take gallery ratio and multiply it by the total height of info el to get a proportionate value for scroll
    const infoScrollPosition = galScrollRatio * infoScrollHeight
    infoElement.scrollTop = Math.round(infoScrollPosition)

    //height of the <section> parent element
    const parentHeight = galElement.parentElement?.clientHeight || 0

    //making an index value for where the user has scrolled divided by
    // const visibleIndex = Math.round(galScrollPosition / parentHeight)
    // ^^ this doesnt work because the parent height includes the info section, we need it to be based on the visible (clientHeight) of the gal element
    const visibleIndex =  Math.round(galScrollPosition / galElement.clientHeight)
    const visibleProject = allProjects[visibleIndex]
    //sets the slug to project.slug
    if (visibleProject?.slug && visibleProject.slug !== currentSlug) {
      setCurrentSlug(visibleProject.slug)
      router.push(`?project=${visibleProject.slug}`, { scroll: false })
    }
  }, [galScrollHeight, infoScrollHeight, allProjects, currentSlug, router])

  useEffect(() => {
    const galElement = galRef.current
    if (!galElement) return

    const handleGalScroll = () => requestAnimationFrame(syncInfoToGal)
    galElement.addEventListener('scroll', handleGalScroll, { passive: true })
    return () => galElement.removeEventListener('scroll', handleGalScroll)
  }, [syncInfoToGal])

  const updateScrollPositions = useCallback((projectSlug: string) => {
    const galElement = galRef.current
    const infoElement = infoRef.current
  
    if (!galElement || !infoElement) return
  
    const projectIndex = allProjects.findIndex(project => project.slug === projectSlug)
    if (projectIndex !== -1) {
      const parentHeight = galElement.parentElement?.clientHeight || 0
      const scrollPosition = projectIndex * parentHeight
  
      // Smoothly scroll the gallery to the specified position
      galElement.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      })
  
      // Calculate and set corresponding info scroll position
      const galScrollRatio = scrollPosition / galScrollHeight
      const infoScrollPosition = galScrollRatio * infoScrollHeight
      infoElement.scrollTo({
        top: Math.round(infoScrollPosition),
        behavior: "smooth",
      })
    }
  }, [allProjects, galScrollHeight, infoScrollHeight])

  //useEffect to run on load, only once
  useEffect(() => {
    const galElement = galRef.current
    const infoElement = infoRef.current
    if (!galElement || !infoElement || hasRun.current) return
  
    const syncScrollOnLoad = () => {
      const projectSlug = searchParams.get('project')
      if (projectSlug) {
        updateScrollPositions(projectSlug)
      }
    }
  
    updateScrollHeights()
    setTimeout(syncScrollOnLoad, 0)
    //set hasRun to ensure only one run
    hasRun.current = true
  }, [allProjects, searchParams, updateScrollHeights, updateScrollPositions])

  return (
    <>
      <Menu allProjects={allProjects} galRef={galRef} updateScrollPositions={updateScrollPositions} />
      {/* parent of gal element is given 95% of height,  */}
      <section className="w-full h-[95%] flex flex-col">
        {/* on desktop, gal is 92% height */}
        <div id="proj-gal" ref={galRef}
          className="w-full lg:h-[92%] h-[90%] overflow-y-scroll snap-y snap-mandatory lg:bg-white bg-black"
        >
          {allProjects.map((project: any) => (
            <div key={project._id} className="h-full snap-always lg:snap-start snap-center pt-1">
              <div className="flex overflow-x-scroll snap-x snap-mandatory h-full">
                {project.images?.map((e: any, index: number) => (
                  e._type === "mp4" ? (
                    <video key={`${project.slug}-${index}`} width="1440" height="1080" muted loop autoPlay playsInline preload="true" className="max-w-[100vw] lg:pr-1 lg:snap-start snap-center snap-always h-full">
                      <source src={getFile(e, { projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`, dataset: "production" }).asset.url} type="video/mp4" />
                      <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : e._type === "image" ? (
                    <div className='flex justify-center items-center max-w-[100vw] h-full'>
                      <Image
                        key={`${project.slug}-${index}`}
                        src={urlFor(e).url()}
                        alt={`Project image ${index + 1} for ${project.name}`}
                        width={1440}
                        height={1080}
                        className="object-cover lg:snap-start snap-center snap-always max-w-[100vw] lg:w-auto w-[100vw] lg:h-full h-auto lg:pr-1"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={`${project.gallery[index].lqip}`}
                        unoptimized={true}
                      />
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          id="proj-info"
          ref={infoRef}
          className="overflow-y-hidden lg:h-[8%] h-[10%]"
        >
          <div className="h-full flex flex-col">
            {allProjects.map((project: any) => (
              <div
                key={project._id}
                className="flex justify-between lg:items-center items-start py-2 h-[6rem]"
              >
                <h2 className="lg:text-4xl text-lg sans">
                  {project.name}
                </h2>
                <span className="flex flex-col text-right">
                  <p>{project.client}</p>
                  <p>{project.year}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

