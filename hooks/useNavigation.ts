import { useRouter, usePathname } from 'next/navigation'

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = (href: string) => {
    router.push(href)
  }

  const isActive = (href: string) => {
    return pathname === href
  }

  return {
    navigate,
    isActive,
    pathname,
  }
}
