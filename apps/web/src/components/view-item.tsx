/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Trash2, Check, AlertCircle, LoaderCircle, ChevronsUpDown, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useGetItemDetailsById } from '@/hooks/use-get-item-details-by-id'
import { useRouter } from 'next/router'
import { toMoney } from '@/utils/to-money'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '@/utils'
import { useUpdateItem } from '@/hooks/use-update-item'

const ChooseLabels = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const [labels, setLabels] = useState<string[]>([])
  const { mutate } = useUpdateItem()

  const options = [
    'Gift',
    'Home',
    'Priority 1',
    'Priority 2',
    'Priority 3',
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          Choose labels...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search labels..." />
          <CommandList>
            <CommandEmpty>No labels found.</CommandEmpty>
            <CommandGroup>
              {options.map((label) => (
                <CommandItem
                  key={label}
                  value={label}
                  onSelect={(currentValue) => {
                    setLabels((prev) => {
                      if (prev.includes(currentValue)) {
                        return prev.filter((l) => l !== currentValue);
                      } else {
                        return [...prev, currentValue];
                      }
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      labels.includes(label) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function ViewItem() {
  const router = useRouter()
  const id = router.query.id as string
  const [notes, setNotes] = useState("")
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useGetItemDetailsById({ id }, { enabled: open })
  const { mutateAsync: updateItem, isLoading: isUpdatingItem } = useUpdateItem()

  useEffect(() => {
    id && setOpen(true)
  }, [id])

  const priceHistory = [
    { date: '2023-01', price: 180 },
    { date: '2023-02', price: 185 },
    { date: '2023-03', price: 195 },
    { date: '2023-04', price: 199.90 },
  ]

  const similarProducts = [
    { name: "Running Shorts 1", price: 189.90, store: "sportswear.com", image: "/placeholder.svg" },
    { name: "Running Shorts 2", price: 209.90, store: "runnersgear.com", image: "/placeholder.svg" },
    { name: "Running Shorts 3", price: 179.90, store: "athleticwear.com", image: "/placeholder.svg" },
  ]

  if (isLoading) return null

  const onOpenChange = () => {
    setOpen(false)
    router.push({ query: {} })
  }

  const hasPriceHistory = false
  const hasSimilarProducts = false

  const handleOpenItem = (url: string | undefined | null) => {
    window.open(url ?? '', '_blank')
  }

  console.log('bought', data?.item?.bought)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-[780px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex justify-between items-center">
            <span className="text-xl font-semibold">Product Details</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row">
          {/* Left side - Product Info */}
          <div className="w-full md:w-1/2 p-6">
            <div className="mb-4 flex justify-center items-center">
              <img
                src={data?.item?.product?.image || ""}
                alt={data?.item?.product?.title || ""}
                className="h-[250px] object-contain mb-4 cursor-pointer"
              />
            </div>

            <h2 className="text-lg font-semibold">{data?.item?.product?.title}</h2>

            <div className="flex flex-col justify-between  mb-4">
              <span className="text-2xl font-bold">{toMoney(data?.item?.price?.value)}</span>
              <p className="text-muted-foreground text-sm">Added {dayjs(data?.item?.createdAt).fromNow()}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">from {data?.item?.store?.url}</p>
          </div>

          {/* Right side - Actions and Tabs */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            {/* Top right - Actions */}
            <div className="space-y-4 mb-6">
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? dayjs(date).format("DD/MM/YYYY") : <span>Pick a purchase date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}

              <div className="flex justify-between items-center">
                <Button className="flex-grow mr-2" onClick={() => handleOpenItem(data?.item?.url)}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Shop now
                </Button>

                <ChooseLabels id={id} />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => updateItem({
                    id,
                    bought: !data?.item?.bought
                  })}>
                    {data?.item?.bought ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom right - Tabs */}
            <div className="flex-grow">
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="w-full flex justify-between mb-4">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="price-history" disabled={!hasPriceHistory}>Price History</TabsTrigger>
                  <TabsTrigger value="similar-products" disabled={!hasSimilarProducts}>Similar Products</TabsTrigger>
                </TabsList>
                <TabsContent value="price-history">
                  {hasPriceHistory ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={priceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No price history available for this product.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>

                <TabsContent value="similar-products">
                  {hasSimilarProducts ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {similarProducts.map((product, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex">
                              <div className="relative w-20 h-20 mr-4">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-md"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-bold">R${product.price.toFixed(2)}</span>
                                  <span className="text-xs text-muted-foreground">from {product.store}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No similar products found.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>

                <TabsContent value="notes" className='flex flex-col'>
                  <Textarea
                    placeholder="Add your notes here... (e.g., gift idea for Mom's birthday, need new running shorts for marathon training)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px]"
                  />

                  <Button disabled={isUpdatingItem} className='mt-4' onClick={() => updateItem({
                    id,
                    description: notes
                  })}>
                    {isUpdatingItem ? <LoaderCircle className='w-4 h-4' /> : 'Save'}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
