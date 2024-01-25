import React, { FC, useState } from 'react'
import { Props } from './interface'
import styles from './styles.module.scss'

const ExpandContent: FC<Props> = ({ title, body }) => {

  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <div className={styles._expandContainer}>
        <div className={styles._expandHeader} onClick={() => setExpanded(!expanded)}>
          <h3 className={styles._expandTitleText}>{title}</h3>
          <img className={styles._pointer} src='/img/pointer.png' />
        </div>
        <div className={[styles._expandBody, (expanded) ? styles._expandedContent : styles._collapseContent].join(' ')} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  )
}

export default ExpandContent