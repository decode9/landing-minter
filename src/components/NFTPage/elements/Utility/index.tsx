import React, { FC } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const Utility: FC<Props> = ({ data }) => {
  const utility = data?.utility || []

  return (
    <div className={styles._mainContainer}>
      <h3 className={styles._textTitle}>Utility</h3>
      <ul className={styles._utilList}>
        {utility.map((util: any, index: any) => {
          return (
            <li key={index} className={styles._utilItem}>
              <img src='/img/pointer.png' className={styles._imgPointer} />
              {util}
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default Utility