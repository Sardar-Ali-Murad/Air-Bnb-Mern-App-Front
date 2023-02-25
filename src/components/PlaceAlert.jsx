import { useSelector } from "react-redux"
const Alert = () => {
  const {alertText,alertType} = useSelector((state) => state.place)
      return <div className={`alert alert-${alertType} form-font`}>{alertText}</div>
}

export default Alert
