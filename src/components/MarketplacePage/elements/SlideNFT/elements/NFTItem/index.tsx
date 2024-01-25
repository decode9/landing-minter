import { getContractData } from '@utils'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const NFTItem: FC<Props> = ({ data }) => {

  const [nftData, setData] = useState<any>()

  const getData = async () => {

    const contractData = await getContractData(data?.contract_address, data?.contract_abi, data?.multiple, data?.network || 'sepolia')

    let newData = {}

    if (contractData) newData = { ...newData, ...contractData }

    const result = await fetch(`${data?.ipfs}/${data?.multiple ? `${contractData?.selections[0][0]}-` : ''}1`)
    if (result.ok) {
      newData = { ...newData, ...await result.json() }
    }
    setData(newData)
  }

  const changeData = (selection: any) => {
    const select = nftData.selections.find((sec: any) => sec[0] === selection)
    const actualSupply = select[2].toNumber()
    const maxSupply = select[1].toNumber()
    setData({ ...nftData, actualSupply, maxSupply, select: select[0] })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles._mainContainer}>
      <div className={styles._textContainer}>
        <p className={styles._infoText}>{!!nftData?.ethCost ? `${nftData?.ethCost} ETH |` : ''} {nftData?.actualSupply} of {nftData?.maxSupply} minted</p>
        <h3 className={styles._textTitle}>{data?.name}</h3>
        <p className={styles._text}>{nftData?.short_description}</p>
        <p className={styles._text}>{nftData?.description}</p>
        {!!nftData?.selections && (
          <div className={styles._selectBox}>
            <p className={styles._text}>Select Region: </p>
            <select className={styles._select} onChange={(event) => changeData(event.target.value)}>
              {
                nftData?.selections?.map((selection: any, key: any) => <option key={key} value={selection[0]}>{selection[0]}</option>)
              }
            </select>
          </div>
        )}
        <div className={styles._imageResponsiveContainer}>
          <img className={styles._imageResponsive} src={data?.ipfs_image} />
        </div>
        <Link href={data?.url}><button className={styles._mintButton}>Learn More</button></Link>
      </div>
      <div className={styles._imageContainer}>
        <img className={styles._image} src={data?.ipfs_image} />
      </div>
    </div>
  )
}

export default NFTItem