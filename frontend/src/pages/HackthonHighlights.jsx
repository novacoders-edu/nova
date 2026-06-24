import React from 'react'
const Hero = React.lazy(() => import('../components/hackthon/Hero'))
const HackGear1 = React.lazy(() => import('../components/hackthon/HackGear1.0'))
const HackGear2 = React.lazy(() => import('../components/hackthon/HackGear2.0'))


const HackthonHighlights = () => {
  return (
    <div>
      <React.Suspense fallback={<div className="min-h-[200px]" />}>
        <Hero />
      </React.Suspense>
      <React.Suspense fallback={<div className="min-h-[200px]" />}>
        <HackGear1 />
      </React.Suspense>
      <React.Suspense fallback={<div className="min-h-[200px]" />}>
        <HackGear2 />
      </React.Suspense>
    </div>
  )
}

export default HackthonHighlights
