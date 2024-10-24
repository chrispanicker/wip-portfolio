
export default function Home() {
  const category = "whitespace-nowrap sans-bold capitalize text-[1.6rem]"
  const gridParent = "flex lg:flex-row flex-col text-[1.2rem] lg:items-end uppercase lg:pb-0 pb-4"
  const info = "mono-ital lg:mb-[.1rem]"

  return (
    <main className="w-screen h-[100dvh] border border-[1rem] rotate-[2deg] bg-white overflow-y-scroll outline outline-black outline-2 border-black transition-[transform] min-[1300px]:rotate-[-2deg] min-[1000px]:rotate-[2deg] min-[800px]:rotate-[-2deg]">
      <header className="lg:h-[10%] bg-white lg:text-[6rem] text-[5rem] flex justify-between items-end lg:leading-auto leading-[5.2rem] lg:mx-5 mx-2 sans-bold">
        <h1 className="mb-2">Panicker</h1>
        {/* <svg className="mb-5 mr-2 h-[40%] w-auto" stroke="black" strokeWidth={20} viewBox="0 0 100 100" width={25} height={25}>
          <polyline points="
          0 0
          100 100
          "></polyline>
          <polyline points="
          100 0
          0 100
          "></polyline>
        </svg> */}
      </header>
      <div className="lg:h-[7%] lg:py-0 py-2 bg-black text-white sans lg:text-[2.6rem] text-[2rem] flex lg:flex-row flex-col lg:items-center lg:px-5 px-2 lg:leading-[1.5rem] leading-[2.3rem]">
        <h2 className="inline sans-bold lg:pr-4">Work Permit</h2>
        <h2 className="inline">Department of Portfolios</h2>
      </div>
      
      <section className="lg:grid lg:grid-cols-2 lg:p-5 p-2 lg:text-[1.5rem]">
          <div className="">
            <span className={gridParent}><p className={`${category}`}>Permit Number:&nbsp;</p><p className={`line-through decoration-8 ${info}`}>4815162342-08-CP</p></span>
            <span className={gridParent}><p className={`${category}`}>Address:&nbsp;</p><p className={`line-through decoration-8 ${info}`}>23 URMAS PL, NEW YORK, NY 10011 </p></span>
          </div>
          <div className="">
            <span className={gridParent}><p className={`${category}`}>Issued on:&nbsp;</p><p className={`line-through decoration-8 ${info}`}>10/10/2024</p></span>
            <span className={gridParent}><p className={`${category}`}>Expires on:&nbsp;</p><p className={info}>09/18/20XX</p></span>
          </div>
          <div className="col-span-2">
            <span className={`${gridParent}`}>
              <p className={`${category}`}>Description of Work:&nbsp;</p><p className={info}>Editorial, Motion, Animation, Typography, Creative Code, Branding, etc. </p>
            </span>
            {/* <p className={gridParent}>ALTERATION TYpe 27 - Converting site into a good time</p> */}
          </div>

      </section>
      <footer className={`lg:h-[30%] lg:p-5 p-2 pb-24 border-t-[1rem] border-black text-[1.5rem] mono-ital flex justify-between flex-col`}>
        <div className="sans not-italic lg:text-[2.6rem] pb-24">
          <p className="pb-3">Chris is currently the designer for Pitchfork. His work is featured on Pitchfork and GQ, and by <a className="hover:underline" href="https://www.instagram.com/p/C92zCcASIs0/?img_index=1">Charli xcx*</a></p>
          <p className="">He is open for work and/or a coffee. Just hit him at <a className="underline" href="mailto:chris@panicker.design">chris@panicker.design</a></p>
        </div>
        <p className="sans text-[1rem] lg:text-[1.5rem] leading-[1.4rem]">*Just an IG post, lol </p>
      </footer>
    </main>
  );
}
