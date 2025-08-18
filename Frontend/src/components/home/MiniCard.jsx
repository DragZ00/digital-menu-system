import React from 'react'

const MiniCard = ({title, icon, number, footerNum}) => {
  return (
    <div className='bg-blue-950 py-5 px-5 rounded-lh-g w-[50%]'>
      <div className='flex items-center justify-between '>
          <h1 className='text-white font-bold text-lg font-semibold tracking-wide'>{title}</h1>
          <button className={`${title === "Toplam Kazanç " ? "bg-[#02ca3a]" : "bg-[#f6b100]"} p-3 rounded-lg text-[#f5f5f5] text-2xl`}> {icon}
          </button>
       </div>
        <div>
          <h1 className='text-[white] text-4xl font-bold mt-5'>{title === "Toplam Kazanç " ?`₺${ number }` : number}</h1>
          <h1 className='text-[white] text-lg font-semibold mt-2' ><span className='text-emerald-400'>{footerNum}%</span> Daha Fazla </h1>
        </div>
    </div>
  )
}

export default MiniCard