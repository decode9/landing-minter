import React, { FC } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const Authenticity: FC<Props> = ({ data, page }) => {

  return (
    <div className={styles._mainContainer}>
      <h3 className={styles._textTitle}>Proof Of Authenticity</h3>
      <p className={styles._text}><b>Blockchain:</b> Ethereum</p>
      <a className={styles._link} target={'_blank'} rel="noreferrer" href={`https://etherscan.io/address/${page?.contract_address}`}><p className={styles._text}><b>Etherscan</b></p><img src='/img/arrow-white.png' /></a>
      <a className={styles._link} target={'_blank'} rel="noreferrer" href={`${page?.ipfs}`}><p className={styles._text}><b>IPFS</b></p><img src='/img/arrow-white.png' /></a>
      <a className={styles._link} target={'_blank'} rel="noreferrer" href={`https://opensea.io/collections/${page?.contract_address}`}><p className={styles._text}><b>OPENSEA</b></p><img src='/img/arrow-white.png' /></a>
      <a className={styles._link} target={'_blank'} rel="noreferrer" href={`https://rarible.com/collection/${page?.contract_address}`}><p className={styles._text}><b>RARIBLE</b></p><img src='/img/arrow-white.png' /></a>
      <p className={styles._text}><b>TERM OF SALE</b></p>
    </div>
  )
}

export default Authenticity