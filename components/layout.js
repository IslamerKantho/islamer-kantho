import Meta from '../components/meta'
import NavigationHeader from './Navigation/NavigationHeader'
import BlockFooter from './Block/BlockFooter'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />

      <NavigationHeader />
      <main>
        {children}
      </main>
      <BlockFooter />
    </>
  )
}
