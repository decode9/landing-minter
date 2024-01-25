import { getContracts } from '@utils'
import React, { FC, useEffect, useState } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const AdditionalInfo: FC<Props> = ({ data, page }) => {

  const author = data?.attributes?.find((attr: any) => attr.trait_type === 'Author')
  const provider = data?.attributes?.find((attr: any) => attr.trait_type === 'Provider')
  const subscription = data?.attributes?.find((attr: any) => attr.trait_type === 'Subscription')
  const transferability = data?.attributes?.find((attr: any) => attr.trait_type === 'Transferability')
  const [ownerships, setOwnerships] = useState<any>([])

  const getContractsNames = async () => {
    const contracts = await getContracts(data?.required_tokens, page?.contract_abi)
    setOwnerships(contracts || [])
  }
  useEffect(() => {
    if (data?.required_tokens) getContractsNames()
  }, [data])

  return (
    <div className={styles._mainContainer}>
      <h3 className={styles._textTitle}>ADDITIONAL DETAILS</h3>
      <p className={styles._text}><b>Creator:</b> {author?.value}</p>
      <p className={styles._text}><b>Provider:</b> {provider?.value}</p>
      <p className={styles._text}><b>Total Supply:</b> {data?.maxSupply}</p>
      <p className={styles._text}><b>Drop Date:</b> 14 May 2022</p>
      <p className={styles._text}><b>Resale Royalty:</b> {data?.royalty}</p>
      <p className={styles._text}><b>Subscription:</b> {subscription?.value}</p>
      <p className={styles._text}><b>Recurring Fee:</b> {data?.recurring_fee}</p>
      <p className={styles._text}><b>Activation Fee:</b> {data?.activation_fee}</p>
      <p className={styles._text}><b>Transferability:</b> {transferability?.value}</p>
      <p className={styles._text}><b>Require Ownership:</b> {ownerships?.join(',')}</p>
    </div>
  )
}

export default AdditionalInfo