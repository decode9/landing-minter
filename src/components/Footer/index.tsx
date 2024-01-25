
import React, { FC } from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

const Footer: FC = () => {

  const socialNetwork = [
    {
      img: '/img/twitter.png',
      link: 'https://twitter.com'
    },
    {
      img: '/img/instagram.png',
      link: 'https://instagram.com'
    },
    {
      img: '/img/facebook.png',
      link: 'https://facebook.com'
    },
    {
      img: '/img/linkedin.png',
      link: 'https://linkedin.com'
    },
    {
      img: '/img/email.png',
      link: 'mail:jorge.bastidas@vascarsolutions.com'
    },
  ]

  return (
    <footer className={styles._footer}>
      <div className={styles._leftContent}>
        <Link href={'/'}>
          <div className={styles._logoContainer}>
            <img className={styles._image} src='/img/logo.png' />
          </div>
        </Link>
        <p>Made with love while flowing places around the world</p>
        <p className={styles._copyright}>© 2024 The Empire.</p>
      </div>
      <div className={styles._rightContent}>
        {
          socialNetwork?.map((social, index) => (
            <a href={social?.link} key={index}>
              <div className={styles._socialContainer}>
                <img className={styles._socialImage} src={social?.img} />
              </div>
            </a>
          ))
        }
      </div>
    </footer>
  )
}

export default Footer