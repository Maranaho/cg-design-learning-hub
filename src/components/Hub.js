import React ,{ useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import TopBar from './TopBar'
import Detail from './Detail'
import TrainingList from './TrainingList'
import Admin from './Admin'
import Footer from './Footer'
import { useHubState } from '../hub-context'

const Hub = () => {
  const { state: { showSearch } } = useHubState()
  useEffect(()=>{
    if(showSearch) document.body.classList.add("noScroll")
    else document.body.classList.remove("noScroll")
  },[showSearch])
  return (
    <BrowserRouter>
      <main className="DesignHub">
        <TopBar />
        <div className="Routes">
          <Switch>
            <Route exact path="/" render={() => <TrainingList />} />
            <Route exact path="/systems" render={() => <TrainingList />} />
            <Route exact path="/motion" render={() => <TrainingList />} />
            <Route exact path="/app//" render={() => <TrainingList />} />
            <Route exact path="/admin" render={() => <Admin />} />
            <Route exact path="/detail/:videoID" render={() => <Detail />} />
            <Route exact path="/edit/:videoID" render={() => <Admin />} />

            <Route exact path="*" render={() => <p>404</p>} />
          </Switch>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default Hub
