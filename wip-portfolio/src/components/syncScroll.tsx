'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { getFile } from '@sanity/asset-utils'
import { Menu } from './menu'


export default function SynchronizedScrollComponent({ allProjects }: { allProjects: any[] }) {
  const galRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  const [galScrollHeight, setGalScrollHeight] = useState(0)
  const [infoScrollHeight, setInfoScrollHeight] = useState(0)
  const [currentSlug, setCurrentSlug] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateScrollHeights = useCallback(() => {
    const galElement = galRef.current
    const infoElement = infoRef.current
    if (galElement && infoElement) {
      const galActualHeight = galElement.scrollHeight
      const infoActualHeight = infoElement.scrollHeight

      const parentHeight = galElement.parentElement?.clientHeight || 0
      const galVisibleHeight = parentHeight * 0.92
      const infoVisibleHeight = parentHeight * 0.08

      setGalScrollHeight(galActualHeight - galVisibleHeight)
      setInfoScrollHeight(infoActualHeight - infoVisibleHeight)
    }
  }, [])

  useEffect(() => {
    updateScrollHeights()
    window.addEventListener('resize', updateScrollHeights)
    return () => window.removeEventListener('resize', updateScrollHeights)
  }, [updateScrollHeights])

  const syncInfoToGal = useCallback(() => {
    const galElement = galRef.current
    const infoElement = infoRef.current

    if (!galElement || !infoElement) return

    const galScrollRatio = galElement.scrollTop / galScrollHeight
    const infoScrollPosition = galScrollRatio * infoScrollHeight
    infoElement.scrollTop = Math.round(infoScrollPosition)

    const galScrollPosition = galElement.scrollTop
    const parentHeight = galElement.parentElement?.clientHeight || 0
    const visibleIndex = Math.round(galScrollPosition / parentHeight)

    const visibleProject = allProjects[visibleIndex]
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
  
    hasRun.current = true
  }, [allProjects, searchParams, updateScrollHeights, updateScrollPositions])

  return (
    <>
      <Menu allProjects={allProjects} galRef={galRef} updateScrollPositions={updateScrollPositions} />
      <section className="w-full h-[95%] flex flex-col">
        <div
          id="proj-gal"
          ref={galRef}
          className="w-full h-[92%] overflow-y-scroll snap-y snap-mandatory lg:bg-white bg-black"
        >
          {allProjects.map((project: any) => (
            <div key={project._id} className="h-full snap-always snap-start pt-1">
              <div className="flex overflow-x-scroll snap-x snap-mandatory h-full">
                {project.images?.map((e: any, index: number) => (
                  e._type === "mp4" ? (
                    <video key={`${project.slug}-${index}`} width="1440" height="1080" muted loop autoPlay playsInline preload="true" className="max-w-[100vw] lg:pr-1 snap-start snap-always h-full">
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
                        className="object-cover snap-start snap-always max-w-[100vw] lg:w-auto w-[100vw] lg:h-full h-[50%] lg:pr-1"
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
          className="overflow-y-hidden h-[8%]"
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

