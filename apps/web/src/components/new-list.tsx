import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useCreateList } from "@/hooks/use-create-list"


const FormSchema = z.object({
  title: z.string(),
})

type Props = {
  open: boolean
  onClose: () => void
}

export const NewList = ({ open, onClose }: Props) => {
  const { mutate } = useCreateList()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
    }
  })


  const onCloseModal = () => {
    onClose && onClose()
    form.reset()
  }

  const onSave = () => {
    const { title } = form.getValues()
    mutate({ title, isPublic: false })

    onCloseModal()
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New List</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder={`Enter your title like "books" etc.`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Form>

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
