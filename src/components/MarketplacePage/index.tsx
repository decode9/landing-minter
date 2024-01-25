import React, { FC } from 'react'
import { MainSection, SlideNFT } from './elements'
import styles from './styles.module.scss'
import Head from 'next/head'

const MarketPlacePage: FC = () => {

  return (
    <>
      <Head>
        <title>The Empire Marketplace NFT | Flow</title>
      </Head>
      <div className={styles._mainContainer}>
        <MainSection />
        <SlideNFT />
      </div>
    </>
  )
}

export default MarketPlacePage