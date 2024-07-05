import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5 px-10 flex justify-between items-center'>
      <div>
        <h1 className='font-color:white'>
          <Link href="/" className='no-underline flex ju'>飲み会さん</Link>
        </h1>
      </div>
      <div>
        <button>ログイン／会員登録</button>
      </div>
    </header>
  )
}

export default Header
