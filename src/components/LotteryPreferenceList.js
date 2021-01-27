import DraggableList from './DraggableList'

export default function LotteryPreferenceList({ choices }) {
  return (
    <DraggableList items={choices} />
  )
}