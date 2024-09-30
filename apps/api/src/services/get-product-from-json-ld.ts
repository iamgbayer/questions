import * as cheerio from 'cheerio'
import { ProductDetails } from '@/gql/graphql'
import { fixAndParseJSON } from '@/list/fix-and-parse-json'

export class GetProductFromJsonLd {
  private getDomainFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url)
      return parsedUrl.hostname
    } catch (error) {
      console.error('Invalid URL:', error)
      return ''
    }
  }

  public async execute(url: string): Promise<ProductDetails[]> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`)
      }
      const html = await response.text()
      const $ = cheerio.load(html)
      const products: ProductDetails[] = []

      $('script[type="application/ld+json"]').each((_, element) => {
        try {
          const jsonLd = $(element).html()

          if (jsonLd) {
            const data = fixAndParseJSON(jsonLd)

            if (Array.isArray(data)) {
              data.forEach((d) => {
                if (d.productName && d.offers && d.offers.price) {
                  const image = Array.isArray(d.images) ? d.images[0] : d.images

                  products.push({
                    title: d.productName,
                    price: d.offers.price,
                    store: this.getDomainFromUrl(url),
                    image,
                    currency: d.offers.priceCurrency
                  })
                }
              })
              return
            }

            // Check if the JSON-LD script contains product information
            if (data['@type'] === 'Product') {
              const image = Array.isArray(data.image)
                ? data.image[0]
                : data.image

              const offer = Array.isArray(data.offers)
                ? data.offers[0]
                : data.offers

              products.push({
                title: data.name,
                price: offer.price,
                store: this.getDomainFromUrl(url),
                image,
                currency: offer.priceCurrency
              })
              return
            }
          }
        } catch (error) {
          console.error('Error parsing JSON-LD:', error)
        }
      })

      return products
    } catch (error) {
      console.error('Error fetching or processing the webpage:', error)
      return []
    }
  }
}
