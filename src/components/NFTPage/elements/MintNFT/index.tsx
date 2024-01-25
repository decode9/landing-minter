import React, { FC, useEffect, useState } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'
import { MintButton } from './elements'

const MintNFT: FC<Props> = ({ page, data, changeData }) => {
  const [firstRender, setFirstRender] = useState(false)
  useEffect(() => {
    if (!firstRender) setFirstRender(true)
  }, [firstRender])
  return (
    <div className={styles._mainContainer}>
      <div className={styles._titleContainer}>
        {firstRender && <p className={styles._infoText}>Initial sale date: {new Date().toUTCString()}</p>}
        <h1 className={styles._titleText}>{page?.name}</h1>
        <p className={styles._infoText}>{!!data?.ethCost ? `${data?.ethCost} ETH |` : ''} {data?.actualSupply} of {data?.maxSupply} minted</p>
        <p className={styles._text}>{data?.short_description}</p>
        {!!data?.selections && (
          <div className={styles._selectBox}>
            <p className={styles._text}>Select Region: </p>
            <select className={styles._select} onChange={(event) => changeData(event.target.value)}>
              {
                data?.selections?.map((selection: any, key: any) => <option key={key} value={selection[0]}>{selection[0]}</option>)
              }
            </select>
          </div>
        )
        }
        <MintButton data={data} page={page} />
      </div>
      <div className={styles._cardContainer}>
        <img className={styles._ipfsImage} src={page?.ipfs_image} />
      </div>
    </div>
  )


}

export default MintNFT