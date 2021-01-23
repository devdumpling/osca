const EditLink = ({ cms }) => {
  if (typeof window !== 'undefined') {
    window.cms = cms
  }
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}

export default EditLink
