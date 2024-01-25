import React, { FC } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const MainSection: FC<Props> = () => {

  return (
    <div className={styles._mainContainer}>
      <div className={styles._titleContainer}>
        <h1 className={styles._titleText}>This must be the place.</h1>
        <p className={styles._text}>{"Welcome to the world's first NFT-enabled membership marketplace."}</p>
      </div>
      <div className={styles._cardContainer}>
        <img className={styles._image} src='/img/soluciones-porfolio.png' />
      </div>
    </div>
  )

}

export default MainSection