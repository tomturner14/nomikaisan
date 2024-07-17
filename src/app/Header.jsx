import React from 'react'
import Link from 'next/link';
import "./globals.css";


const Header = () => {
  return (
    <header>
      <div className='title'>
        <h1>
          <Link href="/" className='no-underline'>test</Link>
        </h1>
      </div>
      <div className='login-link'>
        <h4>
          <Link href="/">ログイン／会員登録</Link>
        </h4>
      </div>
    </header>
  )
}

export default Header
