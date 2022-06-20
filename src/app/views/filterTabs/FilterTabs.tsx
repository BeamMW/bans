import React from "react";
import { TransactionLink } from "../TransactionsLink/TransactionsLink";
import { Container } from './FilterTabs.style';

interface Tabs {
  id: string,
  name: string,
}
interface FliterTabsProps {
  tabs: Tabs[],
  active: string,
  setActive: (tabId: string) => void,
  children?: React.ReactNode
}

export const FilterTabs: React.FC<FliterTabsProps> = ({tabs, children, active, setActive}) => {
  return (
    <>
    <TransactionLink />
    <Container>
      {
        tabs.map((tab) => {
          return (
            <React.Fragment key={tab.id}>
              <div className={`tab-item ${active === tab.id ? 'tab-active' : ''}`} onClick={() => setActive(tab.id)}>
                <div className="title">{ tab.name }</div>
                <div
                 className={ active === tab.id ? 'bottom-line' : ''}
                 >

                 </div>
              </div>
              {
                children && (
                  <div className="slot">
                    { children }
                  </div>
                )
              }

            </React.Fragment>
          )}
        )}
    </Container>
  </>
  )
}