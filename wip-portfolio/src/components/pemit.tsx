"use client"
export function  Permit(){
    const category = "whitespace-nowrap sans-bold capitalize lg:text-[1.6rem] lg:pb-0 pb-1"
    const gridParent = "flex lg:flex-row flex-col lg:text-[1.2rem] lg:items-end uppercase lg:pb-0 pb-4"
    // const info = "mono-ital lg:mb-[.1rem]"

    return(
        <>
        <header className="duration-500 z-50 bg-white text-[3rem] flex justify-between items-center lg:leading-[4rem] leading-[1rem] lg:mx-5 mx-2 sans-bold">
            <h1 className="cursor-pointer" onClick={()=>{
                const main = document.querySelector("main")
                const mainHeader = document.querySelector("main header")
                const arrow = document.querySelector("#arrow")

                if(main?.classList.contains("top-0")){
                    main?.classList.replace("top-0", "top-[93%]")
                    // main?.classList.remove("rotate-[1deg]", "min-[1300px]:rotate-[-1deg]", "min-[1000px]:rotate-[1deg]", "min-[800px]:rotate-[-1deg]")
                    arrow?.classList.remove("rotate-180")
                    mainHeader?.classList.add("transition-[font-size]")
                    mainHeader?.classList.remove("lg:text-[4rem]")
                }else if(main?.classList.contains("top-[93%]")){
                    main?.classList.replace("top-[93%]", "top-0")
                    // main?.classList.add("rotate-[1deg]", "min-[1300px]:rotate-[-1deg]", "min-[1000px]:rotate-[1deg]", "min-[800px]:rotate-[-1deg]")
                    arrow?.classList.add("rotate-180")
                    mainHeader?.classList.add("lg:text-[4rem]")
                }
                
            }}>Chris Panicker</h1>
            <button className="flex justify-center items-center pt-5" onClick={()=>{
                const main = document.querySelector("main")
                const mainHeader = document.querySelector("main header")
                const arrow = document.querySelector("#arrow")

                if(main?.classList.contains("top-0")){
                    main?.classList.replace("top-0", "top-[93%]")
                    // main?.classList.remove("rotate-[1deg]", "min-[1300px]:rotate-[-1deg]", "min-[1000px]:rotate-[1deg]", "min-[800px]:rotate-[-1deg]")
                    arrow?.classList.remove("rotate-180")
                    mainHeader?.classList.add("transition-[font-size]")
                    mainHeader?.classList.remove("lg:text-[4rem]")
                }else if(main?.classList.contains("top-[93%]")){
                    main?.classList.replace("top-[93%]", "top-0")
                    // main?.classList.add("rotate-[1deg]", "min-[1300px]:rotate-[-1deg]", "min-[1000px]:rotate-[1deg]", "min-[800px]:rotate-[-1deg]")
                    arrow?.classList.add("rotate-180")
                    mainHeader?.classList.add("lg:text-[4rem]")
                }
                
            }}>
                <svg id="arrow" className="mb-5 mr-2 w-auto transition-[transform]" stroke="black" fill="none" strokeWidth={20} viewBox="0 -20 100 100" width={30} height={30}>
                    <polyline points="50 0 50 100"></polyline>
                    <polyline points="100 50 50 0 0 50"></polyline>
                </svg>
            </button>
        </header>

        <div className="py-2 bg-black text-white sans lg:text-[2.6rem] text-[2rem] flex lg:flex-row flex-col lg:items-center lg:px-5 px-2 leading-[2.3rem]">
            <h2 className="inline sans-bold lg:pr-4">Work Permit</h2>
            <h2 className="inline">Department of Portfolios</h2>
        </div>
        
        <section className="lg:grid lg:grid-cols-2 lg:p-5 p-2 lg:text-[1.5rem] lg:leading-[2.8rem] leading-[1rem]">
            <div className="">
                <span className={`${gridParent}`}><p className={`${category}`}>Permit Number:&nbsp;</p><p className={`line-through decoration-[.8rem] rotate-[-1deg]`}>4815162342-08-CP</p></span>
                <span className={`lg:flex hidden ${gridParent}`}><p className={`${category}`}>Address:&nbsp;</p><p className={`line-through decoration-[.8rem] rotate-[1deg]`}>23 URMAS PL, NEW YORK, NY 10017 </p></span>
            </div>
            <div className="">
                <span className={`lg:flex hidden ${gridParent}`}><p className={`${category}`}>Issued on:&nbsp;</p><p className={`line-through decoration-[.8rem] rotate-[1deg]`}>10/10/2024</p></span>
                <span className={`lg:flex hidden ${gridParent}`}><p className={`${category}`}>Expires on:&nbsp;</p><p className={` rotate-[-1deg] line-through decoration-[.8rem] `}>09/18/20XX</p></span>
            </div>
            <div className="col-span-2">
                <span className={`${gridParent}`}>
                <p className={`${category}`}>Description of Work:&nbsp;</p><p className={`sans capitalize rotate-[-.3deg]`}>Editorial, Motion, Animation, Typography, Creative Code, Branding, etc. </p>
                </span>
                {/* <p className={gridParent}>ALTERATION TYpe 27 - Converting site into a good time</p> */}
            </div>

        </section>
        <footer className={`lg:h-[30%] lg:p-5 p-2 pb-24 border-t-4 border-black text-[1.5rem] mono-ital flex justify-between flex-col`}>
            <div className="sans lg:absolute lg:bottom-0 not-italic lg:text-[2.6rem] pb-24 lg:leading-[2.8rem] leading-[1.8rem]">
            <p className="pb-3">Chris is currently the designer for Pitchfork. His work is featured on Pitchfork and GQ, and by <a className="hover:underline" href="https://www.instagram.com/p/C92zCcASIs0/?img_index=1">Charli XCX*</a></p>
            <p className="">He is open for work and/or a coffee. Just hit him at <a className="underline" href="mailto:chris@panicker.design">chris@panicker.design</a></p>
            </div>
            <p className="sans text-[1rem] lg:text-[1.5rem] leading-[1.4rem] lg:absolute bottom-10">*Just an IG post, lol </p>
        </footer>
      </>
    )
}