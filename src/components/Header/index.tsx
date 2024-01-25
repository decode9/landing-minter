
import React, { FC, useEffect, useState } from 'react'
import { checkWalletConnection, connectEthereumWallet } from '@utils'
import Link from 'next/link'
import { ResponsiveHeader } from './elements'
import styles from './styles.module.scss'

const Header: FC = () => {
  const [expandMenu, setExpandMenu] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(false)
  const checkIsWalletConnected = async () => setCurrentAccount(await checkWalletConnection())

  useEffect(() => {
    checkIsWalletConnected()
  }, [])

  const connectWallet = async () => {
    const wallet = await connectEthereumWallet()
    if (wallet) setCurrentAccount(!!wallet)
  }


  return (
    <>
      <header className={styles._header}>
        <div className={styles._menuExpand} onClick={() => setExpandMenu(!expandMenu)}>
          <div className={styles._largeLine}></div>
          <div className={styles._shortLine}></div>
          <div className={styles._largeLine}></div>
        </div>
        <Link href={'/'} className={styles._logoContainer}>
          <div className={styles._logoContainer}>
            <img className={styles._image} src='/img/logo.png' />
          </div>
        </Link>
        <nav className={styles._navigation}>
          <ul className={styles._navigationList}>
            {!currentAccount && <li className={styles._navigationItem}> <button className={styles._mintButton} onClick={connectWallet}>Connect Wallet</button></li>}
            {!!currentAccount && <li className={[styles._navigationItem, styles._mintButton].join(' ')}>Connected</li>}
          </ul>
        </nav>
      </header>
      <ResponsiveHeader showMenu={expandMenu} onClose={() => setExpandMenu(false)} />
    </>
  )
}

export default Header