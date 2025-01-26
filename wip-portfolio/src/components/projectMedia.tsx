import { urlFor } from '@/sanity/lib/image';
import { getFile } from '@sanity/asset-utils';
import Image from 'next/image';
import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ProjectMedia({ project }:any) {
  // Create an array of states to track the loading state of each image/video
  const [loadedStates, setLoadedStates] = useState(
    new Array(project.images?.length).fill(false) // Initialize the array with "false"
  );

  // Function to handle the loaded state change for each image/video
  const handleLoad = (index: number) => {
    setLoadedStates((prev) => {
      const updatedStates = [...prev];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  return (
    project.images?.map((e: any, index: number) => (
      e._type === "image" ? (
        <div className="flex justify-center items-center max-w-[100vw] h-full" key={`${project.slug}-${index}`}>
          <Image
            src={urlFor(e).url()}
            alt={`Project image ${index + 1} for ${project.name}`}
            width={1440}
            height={1080}
            className={`object-cover lg:snap-start snap-center snap-always max-w-[100vw] lg:w-auto w-[100vw] lg:h-full h-auto lg:pr-1 transition-opacity duration-700 ${loadedStates[index] ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            placeholder="blur"
            blurDataURL={`${project.gallery[index].lqip}`}
            unoptimized={true}
            onLoad={() => handleLoad(index)} // Update the specific index
          />
        </div>
      ) : e._type === "mp4" ? (
        <video
          key={`${project.slug}-${index}`}
          width="1440"
          height="1080"
          muted
          loop
          autoPlay
          playsInline
          preload="true"
          className={`max-w-[100vw] lg:pr-1 lg:snap-start snap-center snap-always h-full transition-opacity duration-700 ${loadedStates[index] ? 'opacity-100' : 'opacity-0'}`}
          onLoadedData={() => handleLoad(index)} // Update the specific index
        >
          <source
            src={getFile(e, { projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`, dataset: "production" }).asset.url}
            type="video/mp4"
          />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      ) : null
    ))
  );
}
