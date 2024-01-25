import React, { FC, useEffect, useState } from 'react'
import { Grid } from 'react-loader-spinner'
import { nftInsiders, FlowOG, checkWalletConnection, checkNetwork, connectEthereumWallet, mintContract } from '@utils'
import { Props } from './interface'
import styles from './styles.module.scss'
import { ethers } from 'ethers'

const MintButton: FC<Props> = ({ data, page }) => {

  const [currentAccount, setCurrentAccount] = useState(false)
  const [correctNetwork, setCorrectNetwork] = useState(false)
  /*   const [mintedNFT, setMintedNFT] = useState<any | null>(null) */
  const [mintingStatus, setMintingStatus] = useState<number | null>(null)
  const [loadingState, setLoadingState] = useState(0)
  const [txError, setTxError] = useState(null)
  const [maxCapacity, setMaxCapacity] = useState(false)

  const checkIsWalletConnected = async () => setCurrentAccount(await checkWalletConnection())

  const checkCorrectNetwork = async () => {
    const ChainId = page?.network === 'mainnet' ? '0x1' : '0x4'
    const connection = await checkNetwork(ChainId)
    setCorrectNetwork(connection)
  }

  useEffect(() => {
    checkIsWalletConnected()
    checkCorrectNetwork()
    if (data?.maxSupply <= data?.actualSupply) setMaxCapacity(true)
  }, [data])


  const connectWallet = async () => {
    const wallet = await connectEthereumWallet()
    console.log(wallet)
    if (wallet) {
      setCurrentAccount(!!wallet)
    }
  }



  const mintNFT = async () => {
    try {
      setTxError(null)
      const nftTx = await mintContract(page?.contract_address, page?.contract_abi, data?.ethCost, data?.maxSupply, data?.actualSupply, page?.gasLimit)
      if (!nftTx) return setMaxCapacity(true)
      console.log('Mining ...', nftTx.hash)
      setMintingStatus(0)

      const tx = await nftTx.wait()

      console.log(`Mined, see transaction: https://etherscan.io/tx/${nftTx.hash}`)
      setLoadingState(1)

      console.log('Mined!', tx)
      setMintingStatus(1)
    } catch (error: any) {
      console.log('Error minting NFT', error)
      if (error.message.includes('insufficient funds')) error.message = 'Insufficient Funds'
      setTxError(error.message)
    }
  }

/*   const changeUrl = () => {
    const { ethereum }: any = window
    if (!ethereum) return console.log("Ethereum object doesn't exist!")
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(page?.contract_address, page?.contract_abi, signer)
    nftContract.setBaseURI('https://flow.mypinata.cloud/ipfs/QmWWmGYkFv62zX7Ba68UWMjcufgkKVZJJJAqMopjziTvpV/')
  } */


  return maxCapacity ? (
    <div className={styles._mainSold}>
      <h3 className={styles._soldTitle}>Sorry this token is sold out but you can check on secondary markets like opensea or rarible.</h3>
    </div>
  ) : (
    <div style={{ width: 'fit-content' }}>
      {!currentAccount && correctNetwork ? (
        <>
          <button
            onClick={connectWallet}
            className={styles._mintButton}
          >
            Connect Wallet
          </button>

        </>
      ) : correctNetwork ? (<>
        <button
          className={styles._mintButton}
          onClick={mintNFT}
        >
          Mint NFT
        </button>
        {/* <button
          onClick={changeUrl}
          className={styles._mintButton}
        >
          Change URL
        </button> */}
      </>) : (
        <div className={styles._errorContainer}>
          <p className={styles._errorText}>Please connect to the Ethereum {page?.network} Network</p>
          <p className={styles._errorText}>and reload the page</p>
        </div >
      )}
      {loadingState === 0 ? (
        mintingStatus === 0 ? (
          <div className={styles._nftContainer}>
            <div className={styles._nftTitle}>
              Processing your transaction
            </div>
            <Grid
              ariaLabel="loading-indicator"
              height={40}
              width={40}
            />
          </div>
        ) : (
          <div></div>
        )
      ) : (maxCapacity) ?
        <div className={styles._nftContainer}>
          <div className={styles._nftTitle}>
            This NFT Reach his max Capacity.
          </div>
        </div>
        : (
          <div className={styles._nftContainer}>
            <div className={styles._nftTitle}>
              Your NFT was Minted, check your wallet
            </div>
          </div>
        )}
      {!!txError && (
        <div className={styles._transactionError}>
          <p>{txError}</p>
        </div>
      )
      }
    </div>
  )

}

export default MintButton