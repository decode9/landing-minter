import React from 'react'
import type { NextPage } from 'next'
import { NFTPage } from '@components'
import { flowOGData } from '@utils'

const OgFlow: NextPage = () => {
  return <NFTPage page={flowOGData} />
}

export default OgFlow
