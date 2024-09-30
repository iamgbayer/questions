/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ListOrdered, MoreVertical, Plus, Search, Settings, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { AddItem } from "@/components/add-item"
import { useEffect, useState } from "react"
import { NewList } from "@/components/new-list"
import { useGetProfile } from "@/hooks/use-get-profile"
import dynamic from "next/dynamic";
import { toMoney } from "@/utils/to-money"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Item } from "@/gql/graphql"
import { useDeleteItem } from "@/hooks/use-delete-item"
import { ExtensionPromotion } from "@/components/extension-promotion"
import { ViewItem } from "@/components/view-item"
import Onboarding from "@/components/onboarding"
import { useRouter } from "next/router"
import { ShoppingCalendar } from "@/components/shopping-calendar"
import { cn } from "@/utils"

dayjs.extend(relativeTime)

const Options = ({ item }: { item: Item | null }) => {
  const { mutateAsync: deleteItem } = useDeleteItem()
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => deleteItem({ id: item?.id ?? '' })}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function Profile() {
  const [open, setOpen] = useState<string | null>(null)
  const { data } = useGetProfile()
  const [items, setItems] = useState<Item[]>([])
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleOpenItem = (url: string | undefined | null) => {
    window.open(url ?? '', '_blank')
  }

  // TODO: Move it to a hook
  useEffect(() => {
    setItems((data?.items?.filter((item): item is Item => item !== null) ?? []) as Item[])
  }, [data])

  // TODO: Move it to a hook
  useEffect(() => {
    const filteredItems = data?.items?.filter((item): item is Item => item !== null)
      .filter((item) => item.product?.title.toLowerCase().includes(search.toLowerCase()))
    setItems(filteredItems as Item[])
  }, [search, data?.items])

  const handleOpenItemDetails = (id: string) => {
    router.push({ query: { id } })
  }

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>GB</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{data?.user.email}</h2>
              <p className="text-muted-foreground">@{data?.user.username}</p>
              <div className="flex space-x-2 text-sm text-muted-foreground">
                <span>0 Followers</span>
                <span>·</span>
                <span>0 Following</span>
                <span>·</span>
                <span>{data?.items.length} Items</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setOpen('item')}
              >
                New Item
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpen('list')}>
                New List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AddItem open={open === 'item'} onClose={() => setOpen(null)} />
          <NewList open={open === 'list'} onClose={() => setOpen(null)} />
        </div>
      </div>

      <ShoppingCalendar items={data?.items as Item[]} />

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Items</h1>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Total: {toMoney(data?.total)}</span>
          </div>
        </div>

        <div className="flex items-center mb-4 space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="pl-8" onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline" className="flex items-center space-x-1">
            <span>Last Added</span>
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex items-center space-x-1">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item?.id} className="h-full">
              <div className="p-4 h-full">
                <div className="flex flex-col justify-between h-full">
                  <img
                    onClick={() => handleOpenItemDetails(item?.id)}
                    src={item?.product?.image ?? ''}
                    alt="Product"
                    className="h-[250px] object-contain mb-4 cursor-pointer"
                  />

                  <h2
                    className={cn('text-lg font-semibold cursor-pointer', {
                      'hover:underline': !item?.bought,
                      'line-through': item?.bought,
                      'text-muted-foreground': item?.bought
                    })}
                    onClick={() => handleOpenItemDetails(item?.id)}
                  >{item?.product?.title}</h2>
                  <p className={cn("text-2xl font-bold", {
                    'line-through': item?.bought,
                    'text-muted-foreground': item?.bought
                  })}>{toMoney(item?.price?.value)}</p>
                  <p className="text-muted-foreground text-sm">Added {dayjs(item?.createdAt).fromNow()}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.labels?.map((label) => (
                      <Badge key={label} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {label}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {item?.store && <p className="text-xs text-gray-500" onClick={() => handleOpenItem(item?.url)}>from <span className="underline font-semibold cursor-pointer">{item.store.url}</span></p>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ViewItem />
      <Onboarding />
      <ExtensionPromotion />
    </>
  );
}

export default dynamic(() => Promise.resolve(Profile), {
  ssr: false
});
