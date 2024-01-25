import React, { FC } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const ResponsiveHeader: FC<Props> = ({ showMenu, onClose }) => {
  return (
    <div className={[styles._responsiveHeader, showMenu ? styles._showMenu : styles._hideMenu].join(' ')}>
      <div className={styles._header}>
        <div className={styles._menuExpand} onClick={() => onClose()}>
          <p className={styles._closeText}>X</p>
        </div>
        <div className={styles._logoContainer}>
          <img className={styles._image} src='/img/flowLogo.png' />
        </div>
      </div>
      <nav className={styles._navigation}>
        <ul className={styles._navigationList}>
          <li className={styles._navigationItem}>How it works</li>
          <li className={styles._navigationItem}>Buy a pass</li>
          <li className={styles._navigationItem}>Download the app</li>
        </ul>
      </nav>
    </div>
  )
}

export default ResponsiveHeader