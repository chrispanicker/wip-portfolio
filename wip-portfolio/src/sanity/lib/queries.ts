import { groq } from "next-sanity";
import { client } from "./client";

export async function getProjects() {
    return client.fetch(
            groq`*[_type=="project"]{
                _id,
                name,
                vimeo,
                year,
                client,
                type,
                preview,
                images,
                "gallery": images[]{
                    "imageUrl": asset->url,
                    "lqip": asset->metadata.lqip,
                    "blurData": asset->metadata.blurhash,
                    "alt": alt
                    },
                content,
                "slug": slug.current,
            }| order(priority asc)
             `
    )
} 