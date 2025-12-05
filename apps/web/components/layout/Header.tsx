import { getNavigation } from '@/lib/sanity/navigation'
import { HeaderClient } from './HeaderClient'

export async function Header() {
  const navigation = await getNavigation()
  return <HeaderClient navigation={navigation} />
}
