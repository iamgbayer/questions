import { CheckExtensionInstalled } from "@/services/check-extension-installed"
import { useEffect, useState } from "react"

export function useCheckExtensionInstalled() {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(false)

  useEffect(() => {
    const checkExtensionInstalled = async () => {
      const isInstalled = await new CheckExtensionInstalled().execute()
      setIsExtensionInstalled(isInstalled)
    }

    checkExtensionInstalled()
  }, [])

  return isExtensionInstalled
}
