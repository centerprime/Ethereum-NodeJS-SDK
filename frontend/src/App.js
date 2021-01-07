import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import EtherBalance from './pages/EtherBalance';
import TokenBalance from './pages/TokenBalance';
import SendEther from './pages/SendEther';
import SendToken from './pages/SendToken';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Create Wallet</NavLink>
            <NavLink activeClassName="active" to="/import_wallet">Import Wallet</NavLink>
            <NavLink activeClassName="active" to="/ether_blanace">Ether Balance</NavLink>
            <NavLink activeClassName="active" to="/token">Token Balance</NavLink>
            <NavLink activeClassName="active" to="/send_ether">Send Ether</NavLink>
            <NavLink activeClassName="active" to="/send_token">Send Token</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={CreateWallet} />
              <Route exact path="/import_wallet" component={ImportWallet} />
              <Route exact path="/ether_blanace" component={EtherBalance} />
              <Route exact path="/token" component={TokenBalance} />
              <Route exact path="/send_ether" component={SendEther} />
              <Route exact path="/send_token" component={SendToken} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
