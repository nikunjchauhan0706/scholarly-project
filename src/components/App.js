import React from "react";
import {Helmet} from "react-helmet";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

 import { AuthProvider } from "../contexts/AuthContext"
 import Chats from "./Chats"
 import Login from "./Login"

function App() {
  return (
    <div className="App">                   
        <Helmet>
                 <meta charSet="utf-8" />
                 <title>Scholarly</title>
                 <link rel="canonical" href="http://mysite.com/example" />
                 <meta name="description" content="Better chat experience " />
             </Helmet>
 
     <div style={{ fontFamily: 'Avenir' }}>
       <Router>
         <AuthProvider>                                         
           <Switch>
             <Route path="/chats" component={Chats} />
             <Route path="/" component={Login} />
           </Switch>
         </AuthProvider>
       </Router>
     </div>
     </div>
  )
}

export default App
