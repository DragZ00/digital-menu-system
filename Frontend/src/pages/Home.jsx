import React from 'react'
import BottomNav from '../components/shared/BottomNav'

function Home() {
  return (
    <section className='bg-cyan-950 h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
        {/* sol div aşaması */}
        <div className="flex-[3] bg-amber-500"></div>
        {/* sağ div aşaması */}

      <div className="flex-[2] bg-indigo-600"></div>
      <BottomNav />
    </section>
  )
}

export default Home