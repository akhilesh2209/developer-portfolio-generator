import { Navbar } from '@/components/layout'
import { Footer } from '@/components/layout/footer'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}