import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import Greetings from '../components/home/Greetings'
import{BsCashCoin} from 'react-icons/bs'
import{GrInProgress} from 'react-icons/gr'
import MiniCard from '../components/home/MiniCard'
import RecentOrders from '../components/home/RecentOrders'
import PopularDishes from '../components/home/PopularDishes'

function Home() {
  return (
    <section className="bg-cyan-950 h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* Sol alan */}
      <div className="flex-[3] flex flex-col">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard title ="Toplam Kazanç " icon={<BsCashCoin/>} number={512}  footerNum={1.6} />
          <MiniCard  title ="Üzerinde Çalışılıyor" icon={<GrInProgress />} number={16} footerNum={3.6} />

        </div>
        <RecentOrders />
        {/* Buraya diğer sol içerikler gelebilir */}
      </div>

      {/* Sağ alan */}
      <div className="flex-[2]">
        <PopularDishes />
      </div>

      {/* Alt navigasyon */}
      <BottomNav />
    </section>
  )
}

export default Home
