import Image from "next/image";

export default function Home() {
  let category = "whitespace-nowrap sans capitalize"
  let gridParent = "flex lg:flex-row flex-col mono-ital uppercase lg:pb-0 pb-4"

  return (
    <main className="w-screen h-screen border border-[1rem] border-black transition-[transform] min-[1300px]:rotate-[-2deg] min-[1000px]:rotate-[2deg] min-[800px]:rotate-[-2deg] rotate-[2deg] bg-white overflow-y-scroll">
      <header className="lg:h-[10%] h-[6%] bg-white lg:text-[6rem] lg:tracking-[-.3rem] min-[500px]:text-[3rem] tracking-[-.2rem] flex justify-start items-center  font-bold lg:mx-5 mx-2"><h1>Panicker</h1></header>
      <div className="lg:h-[7%] h-[4%] bg-black text-white lg:text-[2.6rem] min-[500px]:text-[1.5rem] flex justify-start items-center lg:px-5 px-2"><h2 className="font-bold">Work Permit&nbsp;</h2><h2>Department of Portfolios</h2></div>
      
      <section className="h-[53%] lg:grid lg:grid-cols-2 lg:p-5 p-2 lg:text-[1.5rem]">
          <div className="lg:grid lg:grid-rows-2">
            <span className={gridParent}><p className={`${category}`}>Permit Number:&nbsp;</p><p>4815162342-08-CP</p></span>
            <span className={gridParent}><p className={`${category}`}>Address:&nbsp;</p><p>23 URMAS PL, NEW YORK, NY 10011 </p></span>
          </div>
          <div className="lg:grid lg:grid-rows-2">
            <span className={gridParent}><p className={`${category}`}>Issued on:&nbsp;</p><p>10/10/2024</p></span>
            <span className={gridParent}><p className={`${category}`}>Expires on:&nbsp;</p><p>09/18/20XX</p></span>
          </div>
          <div className="col-span-2">
            <span className={`${gridParent}`}>
              <p className={`${category}`}>Description of Work:&nbsp;</p><p>Editorial, Motion, Animation, Typography, Creative Code, Branding, etc. </p>
            </span>
            {/* <p className={gridParent}>ALTERATION TYpe 27 - Converting site into a good time</p> */}
          </div>

      </section>
      <footer className={`h-[37%] lg:h-[30%] lg:p-5 p-2 border-t-[1rem] border-black lg:text-[1.5rem] mono-ital flex justify-between flex-col`}>
        <div className="">
          <p className="pb-2 uppercase">Chris is currently the designer for Pitchfork.</p>
          <p className="pb-2 uppercase">His work is featured on pitchfork and gq, on <a className="hover:underline" href="https://www.instagram.com/p/C92zCcASIs0/?img_index=1">Charli xcx's Instagram</a></p>
          <p className="pb-2 uppercase">He is open for work, and for any inquries hit him at <a className="hover:underline" href="mailto:chris@panicker.design">chris@panicker.design</a></p>
        </div>
        <p className="sans">This portfolio is slated to be completed by September 18, 20XX.* In the meantime, enjoy your time here.  </p>
      </footer>
    </main>
  );
}
