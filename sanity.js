import {createClient} from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
    projectId: "n56qmwrm",
    dataset: "production",
    useCdn: true,
    apiVersion: '2022-03-07'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

export default client