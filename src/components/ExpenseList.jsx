import React, { useContext, useMemo } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import ExpenseCard from './ExpenseCard'
import { FixedSizeList as List } from 'react-window'

export default function ExpenseList(){
  const { expenses } = useContext(ExpenseContext)

  const items = useMemo(() => expenses, [expenses])

  // If dataset is small, render normally to avoid overhead
  if (items.length < 30) {
    return (
      <div className="grid gap-3">
        {items.map(e => <ExpenseCard key={e._id || e.id} expense={e} />)}
      </div>
    )
  }

  // Virtualized list for large datasets
  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={80}
      width="100%"
      className="rounded-lg"
    >
      {({ index, style }) => (
        <div style={style} className="p-2">
          <ExpenseCard expense={items[index]} />
        </div>
      )}
    </List>
  )
}
