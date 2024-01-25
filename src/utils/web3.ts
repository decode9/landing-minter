import { ethers } from 'ethers'

export const checkWalletConnection = async () => {
  const { ethereum }: any = window
  if (!ethereum) return false
  const accounts = await ethereum.request({ method: 'eth_accounts' })
  if (!accounts.length) return false
  console.log('Found authorized Account: ', accounts[0])
  return true
}

export const checkNFTSupply = async (nftContractAddress: any, abi: any) => {
  const { ethereum }: any = window
  if (!ethereum) return console.log('Metamask not detected')
  const provider = new ethers.BrowserProvider(ethereum)
  const signer = await provider.getSigner()
  const nftContract = new ethers.Contract(nftContractAddress, abi, signer)
  const maxSupply = await nftContract.maxSupply()
  const actualSupply = await nftContract.totalSupply()
  if (maxSupply.toNumber() <= actualSupply.toNumber()) return true
}

export const getContractData = async (nftContractAddress: any, abi: any, multiple: any, network: any) => {
  try {

    const provider = new ethers.InfuraProvider(network, 'eebaf3b716ff4d0fb7d9061827b09171')
    const nftContract = new ethers.Contract(nftContractAddress, abi, provider)
    const royalties = await nftContract.RoyaltiesPercentageBasisPoints()
    const royaltiesPercent = 0.01 * Number(royalties)
    const data: any = { royalty: `${royaltiesPercent}%` }
    const cost = await nftContract.cost()
    const maxSupply = await nftContract.maxSupply()
    const actualSupply = await nftContract.totalSupply()
    data['maxSupply'] = Number(maxSupply)
    data['actualSupply'] = Number(actualSupply)
    data['ethCost'] = ethers.formatUnits(cost, 18)

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getContracts = async (contracts: any, abi: any) => {
  try {

    const provider = new ethers.InfuraProvider('mainnet', 'eebaf3b716ff4d0fb7d9061827b09171')

    const names = []

    for (const contract of contracts) {
      const nftContract = new ethers.Contract(contract, abi, provider)
      const name = await nftContract.name()
      names.push(name)
    }

    return names
  } catch (error) {
    console.log(error)
    return null
  }
}

export const checkNetwork = async (mainnetChainId: any) => {
  const { ethereum }: any = window
  const devChainId = "aa36a7"
  const localhostChainId = `0x${devChainId}`

  if (!ethereum) return false

  const chainId = await ethereum.request({ method: 'eth_chainId' })
  console.log('Connected to chain:' + chainId)

  if (chainId !== mainnetChainId && chainId !== localhostChainId) return false
  return true
}

export const connectEthereumWallet = async () => {
  try {
    const { ethereum }: any = window
    const mainnetChainId = '0x1'
    const devChainId = "aa36a7"
    const localhostChainId = `0x${devChainId}`

    if (!ethereum) return false

    const chainId = await ethereum.request({ method: 'eth_chainId' })

    console.log('Connected to chain: ', chainId)

    if (chainId !== mainnetChainId && chainId !== localhostChainId) return false

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

    return accounts[0]
  } catch (error) {
    console.log('Error connecting to metamask', error)
    return false
  }
}

export const mintContract = async (nftContractAddress: any, abi: any, cost: any, maxSupply: any, actualSupply: any, gasLimit: any) => {
  const { ethereum }: any = window
  if (!ethereum) return console.log("Ethereum object doesn't exist!")
  const provider = new ethers.BrowserProvider(ethereum)
  const signer = await provider.getSigner()
  const nftContract = new ethers.Contract(nftContractAddress, abi, signer)
  if (maxSupply <= actualSupply) return false
  console.log(ethers.parseEther(cost))
  const nftTx = await nftContract.mint(1, { value: ethers.parseEther(cost), gasLimit: gasLimit })
  return nftTx
}

export const checkNFTOwnership = async (nftContractAddress: any, abi: any) => {
  const { ethereum }: any = window
  if (!ethereum) return console.log("Ethereum object doesn't exist!")
  const provider = new ethers.BrowserProvider(ethereum)
  const signer = await provider.getSigner()
  const nftContract = new ethers.Contract(nftContractAddress, abi, signer)
}