import './globals.css'

const SITE = 'https://sahithireddys.github.io'
const TITLE = 'Sahithi Reddy · Software Engineer'
const DESC = 'Backend systems, cloud pipelines and AI agents.'

export const metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  // link preview card (LinkedIn, email, WhatsApp, X ...): public/og.png, 1200x630
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Sahithi Reddy',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Sahithi Reddy, backend engineer' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og.png'] },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
