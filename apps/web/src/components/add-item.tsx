import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { useGetProductByUrl } from "@/hooks/use-get-product-by-url"
import { Card, CardContent } from "@/components/ui/card"
import { useCreateItem } from "@/hooks/use-create-item"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { ProductDetails } from "@/list/gql"

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

const FormSchema = z.object({
  title: z.string(),
  price: z.number(),
  url: z.string(),
  currency: z.string(),
  image: z.string(),
  store: z.string(),
  priority: z.number(),
})

type Props = {
  open: boolean
  onClose: () => void
}

export const AddItem = ({ open, onClose }: Props) => {
  const { mutateAsync, isLoading, data = [] } = useGetProductByUrl()
  const { mutate } = useCreateItem()
  const [hasMultipleProducts, setHasMultipleProducts] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      price: 0,
      url: '',
      currency: '',
      image: '',
      store: '',
      priority: 0,
    }
  })

  const { title, price, url, currency, image, store, priority } = form.getValues()

  const setValues = (product: ProductDetails) => {
    product.title && form.setValue('title', product.title)
    product.price && form.setValue('price', product.price)
    product.image && form.setValue('image', product.image)
    product.store && form.setValue('store', product.store)
    product.currency && form.setValue('currency', product.currency)
  }

  useEffect(() => {
    if (isValidUrl(url)) {
      mutateAsync({ url })
        .then((data) => {
          if (data.length === 1) {
            setHasMultipleProducts(false)
            const product = data[0]
            setValues(product)

          } else if (data.length > 1) {
            setHasMultipleProducts(true)
          } else {
            console.log('No able to get product data')
          }
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const onProductSelected = (product: ProductDetails) => {
    setValues(product)
    setHasMultipleProducts(false)
  }

  const onCloseModal = () => {
    onClose && onClose()
    form.reset()
  }

  const onSave = () => {
    if (hasMultipleProducts) {
      return
    }

    mutate({
      title,
      price: parseFloat(String(price)),
      url,
      listId: null,
      image,
      currency,
      priority,
      store,
    })

    onCloseModal()
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Product</DialogTitle>
          </DialogHeader>

          {hasMultipleProducts ? (
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Multiple products found. Please select the correct one.
              </p>

              <div className="grid gap-4">
                {data.map((product) => (
                  <Card key={product.title} className="cursor-pointer" onClick={() => onProductSelected(product)}>
                    <CardContent className="pt-6">
                      <div className="grid gap-2">
                        <p className="font-bold">Title</p>
                        <p>{product.title}</p>
                      </div>
                      <div className="grid gap-2">
                        <p className="font-bold">Price</p>
                        <p>{product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) :
            (
              <Form {...form}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL (optional)</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="https://www.amazon.com.br/Apple-iPhone-13-256-GB-Meia-noite/dp/B09T57QT9Y" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-sm text-muted-foreground">
                      This field is optional, but if filled, it will be used to automatically scrape product data.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Apple iPhone 13" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Form>
            )}

          <DialogFooter>
            <Button onClick={onSave} >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
