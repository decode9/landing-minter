import React, { FC } from 'react'
import styles from './styles.module.scss'

const Disclaimer: FC = () => {

  return (
    <div className={styles._titleContainer}>
      <h2 className={styles._mainTitle}>DISCLAIMER</h2>
      <p className={styles._bodyText}>Nothing contained here in should be construed as, and may not be used in connection with, an offer to sell, or a solicitation of any offer to buy or hold, an interest in any security or investment product. The information provided herein and in the corresponding website does not constitute investment advice, financial advice, trading advice, or any other sort of advice and you should not treat any of the content as such. Flow does not recommend that any cryptocurrency should be bought, sold, or held by you. Do conduct your own due diligence and consult your financial advisor before making any investment decisions. You agree that you are not purchasing a security or investment and you agree to hold Flow harmless and not liable for any losses or taxes you may incur. You should have no expectation of any form from Flow and its team.</p>
    </div>
  )
}

export default Disclaimer