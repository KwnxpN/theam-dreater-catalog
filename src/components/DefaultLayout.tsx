import React from 'react'
import Header from './Header'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-background min-h-screen flex flex-col'>
      <Header/>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default DefaultLayout