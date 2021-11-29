import Footer from "./Footer"
import Nav from "./Nav"

const Layout = ({children}) => {
  return (
    <div className="main">
      <Nav />
          { children }
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
