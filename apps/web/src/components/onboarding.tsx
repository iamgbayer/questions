'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useOnboarding } from '@/hooks/use-onboarding'
import { useGetProfile } from '@/hooks/use-get-profile'

const locations = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
]

export default function Onboarding() {
  const [location, setLocation] = useState('')
  const [language, setLanguage] = useState('')
  const [username, setUsername] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [open, setOpen] = useState(false)
  const { data: profile } = useGetProfile()
  const { mutateAsync: onboarding } = useOnboarding()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (location && language && username) {
      console.log({ location, language, username })
      await onboarding({ username, language, location })
      setIsOpen(false)
    } else {
      // Show an error message or highlight the missing fields
      alert('Please fill in all fields')
    }
  }

  if (profile?.user?.onboarded) {
    return null
  }

  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()} closeable={false}>
        <DialogHeader>
          <DialogTitle>Application Onboarding</DialogTitle>
          <DialogDescription>
            Please provide some information to get started. You must complete this process to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt-br">Portuguese (Brazil)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                  >
                    {location
                      ? locations.find((loc) => loc.value === location)?.label
                      : "Select location..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {locations.map((loc) => (
                          <CommandItem
                            key={loc.value}
                            value={loc.value}
                            onSelect={(currentValue) => {
                              setLocation(currentValue === location ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                location === loc.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {loc.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Complete Onboarding</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
