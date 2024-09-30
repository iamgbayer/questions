import { useCheckExtensionInstalled } from "@/hooks/use-check-extension-installed"
import { ChromeIcon, X } from "lucide-react"
import { useState } from "react"

export function ExtensionPromotion() {
  const checkExtensionInstalled = useCheckExtensionInstalled()
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(checkExtensionInstalled)

  if (isExtensionInstalled) return null

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="bg-pink-50 py-6 flex justify-between items-center px-6">
        <X className="w-4 h-4 cursor-pointer absolute right-6 top-6" onClick={() => setIsExtensionInstalled(true)} />
        <div className="flex flex-col">
          <span className="text-gray-900 text-lg font-semibold">
            Save items to your wishlist in one click
          </span>
          <span className="text-gray-500 text-sm">
            Save items into wishlists from any online store.
          </span>
        </div>
        <button className="bg-pink-500 text-white py-2 px-4 rounded-full flex items-center">
          <span className="mr-2"><ChromeIcon className="w-4 h-4" /></span> Get Extension - It's Free
        </button>
      </div>
    </div>
  )
}
