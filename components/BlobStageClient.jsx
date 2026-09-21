'use client'

import dynamic from 'next/dynamic'

// WebGL only exists in the browser, so the 3D stage is never rendered on the server.
const BlobStage = dynamic(() => import('./BlobStage'), { ssr: false })

export default function BlobStageClient() {
  return <BlobStage />
}
