import React from 'react'
import Header from './Header'
import Footer from './Footer'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-background min-h-screen flex flex-col'>
      <Header/>
      <main className='grow px-4 py-6'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default DefaultLayout