/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { addMonths } from 'date-fns'
import { Item } from '@/list/gql'
import { toMoney } from '@/utils/to-money'
import dayjs from 'dayjs'
import { useUpdateItem } from '@/hooks/use-update-item'
import { cn } from '@/utils'

interface MonthData {
  id: string
  name: string
  month: Date | null
  items: Item[]
}

interface Props {
  items: Item[] | undefined
}

export function ShoppingCalendar({ items = [] }: Props) {
  const { mutate: mutateItem } = useUpdateItem()

  const [open, setOpen] = useState(false)
  const [months, setMonths] = useState<MonthData[]>([])
  const [availableItems, setAvailableItems] = useState<Item[]>([])

  useEffect(() => {
    const currentDate = new Date()
    const newMonths: MonthData[] = Array.from({ length: 6 }, (_, index) => {
      const monthDate = addMonths(currentDate, index)
      return {
        id: `month-${index}`,
        month: monthDate,
        name: dayjs(monthDate).format('MMMM YYYY'),
        items: [],
      }
    })

    // Distribute items to months or available items
    const newAvailableItems: Item[] = []
    items.forEach(item => {
      if (item.purchaseDate) {
        const itemDate = dayjs(item.purchaseDate)
        const monthIndex = newMonths.findIndex(month =>
          itemDate.isSame(dayjs(month.month), 'month')
        )
        if (monthIndex !== -1) {
          newMonths[monthIndex].items.push(item)
        } else {
          newAvailableItems.push(item)
        }
      } else if (item.bought === false) {
        newAvailableItems.push(item)
      }
    })

    setMonths(newMonths)
    setAvailableItems(newAvailableItems)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    const newMonths = [...months]
    const newAvailableItems = [...availableItems]

    const removeFromSource = (sourceId: string, index: number) => {
      if (sourceId === 'available-items') {
        return newAvailableItems.splice(index, 1)[0]
      } else {
        const sourceMonth = newMonths.find(month => month.id === sourceId)
        return sourceMonth?.items.splice(index, 1)[0]
      }
    }

    const addToDestination = (destId: string, index: number, item: Item) => {
      if (destId === 'available-items') {
        newAvailableItems.splice(index, 0, item)
      } else {
        const destMonth = newMonths.find(month => month.id === destId)
        destMonth?.items.splice(index, 0, item)
      }
    }

    const movedItem = removeFromSource(source.droppableId, source.index)
    if (movedItem) {
      addToDestination(destination.droppableId, destination.index, movedItem)

      const destMonth = newMonths.find(month => month.id === destination.droppableId)
      mutateItem({
        id: movedItem.id,
        purchaseDate: destMonth?.month ?? null,
      })
    }

    setMonths(newMonths)
    setAvailableItems(newAvailableItems)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Shopping Calendar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] overflow-x-hidden overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Shopping Calendar</DialogTitle>
        </DialogHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {months.map((month) => (
              <Droppable key={month.id} droppableId={month.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-secondary p-4 rounded-lg min-h-[200px] ${snapshot.isDraggingOver ? 'border-2 border-primary' : ''
                      }`}
                  >
                    <h3 className="font-semibold mb-2">{month.name}</h3>
                    {month.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-background p-2 mb-2 rounded flex items-center space-x-2 ${snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                          >
                            <img src={item.product?.image} alt={item.product?.title} width={50} height={50} className="rounded" />
                            <div className="flex-1 min-w-0">
                              <p className={cn("font-medium truncate", {
                                'line-through': item.bought,
                                'text-muted-foreground': item.bought
                              })}>{item.product?.title}</p>
                              <p className="text-sm text-muted-foreground">{toMoney(item.price?.value)}</p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Items to Plan</h3>
            <Droppable droppableId="available-items" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-wrap gap-2 p-2 rounded-lg ${snapshot.isDraggingOver ? 'bg-secondary' : ''
                    }`}
                >
                  {availableItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-background p-2 w-1/3 rounded flex items-center ${snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                        >
                          <img src={item.product?.image} alt={item.product?.title} width={50} height={50} className="rounded mr-3" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.product?.title}</p>
                            <p className="text-sm text-muted-foreground">{toMoney(item.price?.value)}</p>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </DialogContent>
    </Dialog>
  )
}
