import './globals.css'

export const metadata = {
  title: 'Sahithi Reddy · Software Engineer',
  description: 'Backend systems, cloud pipelines and AI agents.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
