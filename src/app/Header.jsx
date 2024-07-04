import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <h1>
          <Link href="/">飲み会さん</Link>
        </h1>
      </div>
      <div>
        <button>ログイン／会員登録</button>
      </div>
    </header>
  )
}

export default Header
