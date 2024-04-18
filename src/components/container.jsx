export default function Container({ children, dataClasses }) {
  return (
    <div className={`container ${dataClasses?dataClasses: ''}`} >
        {children}
    </div>
  )
}
