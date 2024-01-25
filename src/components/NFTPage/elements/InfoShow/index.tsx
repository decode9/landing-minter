import React, { FC } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const InfoShow: FC<Props> = ({ data, page }) => {

  const provider = data?.attributes?.find((attr: any) => attr.trait_type === 'Provider')
  
  return (
    <div className={styles._mainContainer}>
      <div className={styles._textContainer}>
        <div className={styles._textContent}>
          <h3 className={styles._textTitle}>NFT Description</h3>
          <p className={styles._text}>{data?.description}</p>
        </div>
        <div className={styles._textContent}>
          <h3 className={styles._textTitle}>About {provider?.value}</h3>
          <p className={styles._text}>{data?.provider_description}</p>
        </div>
      </div>
      <div className={styles._imageContainer}>
        <img className={styles._image} src='/img/image-banner.png' />
      </div>
    </div>
  )
}

export default InfoShow