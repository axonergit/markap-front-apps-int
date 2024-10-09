import NavbarIcons from "./Components/Navbar"
import CardEcommerce from "./Components/Card"
function App() {
  return (
    <>
      <NavbarIcons></NavbarIcons>
      <div className="grid sm:grid-cols-2 justify-evenly gap-32 py-32 px-11 w-full h-full">
        <CardEcommerce titulo={"Hola"} precio={8.99} descripcion={"Una espada de oro"}></CardEcommerce>
        <CardEcommerce></CardEcommerce>
        <CardEcommerce></CardEcommerce>
      </div>
    </>
  )
}

export default App
