import Sidabar from "./Sidebar/Sidabar"

const Layout = ({ children }) => {
  return (
    <div>
      Base Layout
      <Sidabar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
