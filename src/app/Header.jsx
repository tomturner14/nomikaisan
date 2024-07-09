import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5 px-10 border-b flex justify-between items-center'>
      <div>
        <h1>
          <Link href="/">飲み会さん</Link>
        </h1>
      </div>
      <div>
        <nav>
          <Link href="/">イベント作成</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header