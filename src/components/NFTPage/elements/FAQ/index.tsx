import React, { FC } from 'react'
import styles from './styles.module.scss'
import faqs from './faqs'
import { ExpandContent } from './elements'

const FAQ: FC = () => {
  return (
    <div className={styles._faqContainer}>
      <h2 className={styles._faqTitle}>Frequently Asked Questions</h2>
      <div className={styles._faqs}>
        {faqs.map((faq, index) => <ExpandContent title={faq.title} body={faq.body} key={index} />)}
      </div>
    </div>
  )
}

export default FAQ