import { Dashboard, HomePage } from "./pages"
import Login from "./components/ui/common/Login"
import SignUp from "./components/ui/common/Signup"

interface User {
  loggedIn : boolean
}

let user : User = { //this is a dummy user for now until we implement state management for logged in user
    loggedIn: true,
}

function App() {
  return (
      <div>
        {!user.loggedIn ?  
        <HomePage/>
        : 
        <Dashboard />
        } 
    
      </div>
  )
}

export default App