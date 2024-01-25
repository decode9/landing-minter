
import React, { FC } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'
import { flowOGData } from '@utils'
import Slider from "react-slick";
import { NFTItem } from './elements';

const SlideNFT: FC<Props> = ({ data, page }) => {

  const nfts = [
    flowOGData
  ]

  const settings = {
    dots: true,
    infinite: true,/* 
    autoplay: true, */
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const Slide: any = Slider
  return (
    <div className={styles._mainContainer}>
      <h3 className={styles._textTitle}>Introducing The Empire Collection</h3>
      <Slide {...settings} >
        {nfts?.map((nft: any, index: any) => <NFTItem key={index} data={nft} />)}
      </Slide>
    </div>
  )
}

export default SlideNFT