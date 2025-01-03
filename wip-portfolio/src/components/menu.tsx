"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */

export function Menu({
  allProjects,
  updateScrollPositions,
}: {
  allProjects: any[]
  galRef: React.RefObject<HTMLDivElement>
  updateScrollPositions: (projectSlug: string) => void
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const menu = searchParams.get("menu")
  const projectSlug = searchParams.get("project")

  const scrollToProject = (slug: string) => {
    updateScrollPositions(slug)
    router.push(`?project=${slug}`, { scroll: false })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu === "open") {
        router.push(projectSlug ? `?project=${projectSlug}` : '?', { scroll: false })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [menu, projectSlug, router])

  return (
    <>
      <button className="mono fixed bottom-0 right-0  lg:p-10 p-5 hover:underline"
        onClick={() => {
          router.push(projectSlug ? `?project=${projectSlug}&menu=open` : `?menu=open`, { scroll: false })
        }}
      > INFO </button>

      <section
        id="info"
        className={`mono fixed left-0 z-50 ${
          menu === "open" ? "top-0" : "top-full"
        } bg-white w-screen h-[100svh] transition-[top] duration-500 flex flex-col justify-between lg:p-10 p-5`}
      >
        <span className="top-0">
          {allProjects.map((project: any) => (
            <div key={project.slug} className="lg:grid lg:grid-cols-6 hover:underline cursor-pointer "
            onClick={() => {
                scrollToProject(project.slug)
                router.push(`?project=${project.slug}`, { scroll: false })
              }}>
              <a className="col-span-3 hover:underline lg:no-underline underline z-50">{project.name}</a>
              <p className="lg:block inline lg:pl-0 pl-2">{project.client}</p>
              <p className="lg:block hidden">{project.type}</p>
              <p className="text-right lg:pb-0 pb-4 lg:block inline lg:pl-0 pl-2">{project.year}</p>
            </div>
          ))}
        </span>

        <div>
          <div className="sans lg:text-lg">
            <p>
              Chris is a new york-based designer, animator and developer. 
              <br className="hidden lg:block" />
              His work is featured by Pitchfork, GQ, and {" "}
              <a
                className="hover:underline"
                href="https://www.instagram.com/p/C92zCcASIs0/?img_index=1"
              >
                Charli XCX {" (kinda)"}...
              </a>
              <br className="hidden lg:block" />
             {`He's open for work and/or a coffee.`} <a className="hover:underline" href="https://instagram.com/chrispanicker">@chrispanicker</a> or <a className="hover:underline" href="mailto:chris@panicker.design">chris@panicker.design</a>
            </p>
          </div>
          <span className="flex w-full justify-end items-end z-50">
            <button className="hover:underline"
              onClick={() => {
                router.push(projectSlug ? `?project=${projectSlug}` : '?', { scroll: false })
              }}
            >
              CLOSE
            </button>
          </span>
        </div>
      </section>
    </>
  )
}
