import React, { FC, useEffect, useState } from 'react'
import { Disclaimer, InfoShow, MintNFT, Utility, AdditionalInfo, Authenticity, FAQ } from './elements'
import styles from './styles.module.scss'
import Head from 'next/head'
import { Props } from './interface'
import { getContractData } from '@utils'
import { ethers } from 'ethers'

const NFTPage: FC<Props> = ({ page }) => {

  const [data, setData] = useState<any>()

  const getData = async () => {
    let data = {}

    const contractData = await getContractData(page?.contract_address, page?.contract_abi, page?.multiple, page?.network || 'rinkeby')

    if (contractData) data = { ...data, ...contractData }

    const result = await fetch(`${page?.ipfs}/${page?.multiple ? `${contractData?.selections[0][0]}-` : ''}1`)

    if (result.ok) data = { ...data, ...await result.json() }

    setData(data)
  }

  const changeData = (selection: any) => {
    const select = data.selections.find((sec: any) => sec[0] === selection)
    const actualSupply = select[2].toNumber()
    const maxSupply = select[1].toNumber()
    setData({ ...data, actualSupply, maxSupply, select: select[0], ethCost: `${Number(select[3].toString()) / 1000000000000000000}` })
  }

  useEffect(() => {
    getData()
  }, [page?.contract_address])

  return (
    <>
      <Head>
        <title>{page?.name} | Flow</title>
      </Head>
      <div className={styles._mainContainer}>
        <MintNFT changeData={changeData} page={page} data={data} />
        <InfoShow page={page} data={data} />
        <Utility data={data} />
        <AdditionalInfo data={data} page={page} />
        <Authenticity page={page} />
      </div>
    </>
  )
}

export default NFTPage