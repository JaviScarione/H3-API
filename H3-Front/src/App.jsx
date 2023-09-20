import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage.jsx';
import HomePage from './pages/Home/HomePage';
import AddClient from './pages/AddClient/AddClient'
import AddProduct from './pages/AddProduct/AddProduct'
import CashClosing from './pages/CashClosing/CashClosing'
import CashClosingDetail from './pages/CashClosingDetail/CashClosingDetail'
import CashClosingSearch from './pages/CashClosingSearch/CashClosingSearch'
import ClientOperations from './pages/ClientOperations/ClientOperations'
import ClientStock from './pages/ClientStock/ClientStock'
import Costs from './pages/Costs/Cost'
import CurrentAccounts from './pages/CurrentAccounts/CurrentAccounts'
import DistributionDay from './pages/DistributionsDay/DistributionsDay'
import ListClients from './pages/ListClients/ListClients'
import ListProducts from './pages/ListProducts/ListProducts'
import ModifyClient from './pages/ModifyClient/ModifyClient'
import ModifyProduct from './pages/ModifyProduct/ModifyProduct'
import MoneyFlow from './pages/MoneyFlow/MoneyFlow'
import Payment from './pages/Payment/Payment'
import Sale from './pages/Sale/Sale'
import SalesList from './pages/SalesList/SalesList'
import Stock from './pages/Stock/Stock'

import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClientProvider } from './context/ClientContext';

function App() {
  return (
    <AuthProvider>
      <ClientProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/addclient' element={<AddClient />}></Route>
              <Route path='/addproduct' element={<AddProduct />}></Route>
              <Route path='/cashclosing' element={<CashClosing />}></Route>
              <Route path='/cashclosingdetail' element={<CashClosingDetail />}></Route>
              <Route path='/cashclosingsearch' element={<CashClosingSearch />}></Route>
              <Route path='/clientsoperations' element={<ClientOperations />}></Route>
              <Route path='/clientstock' element={<ClientStock />}></Route>
              <Route path='/costs' element={<Costs />}></Route>
              <Route path='/currentaccounts' element={<CurrentAccounts />}></Route>
              <Route path='/distributionday' element={<DistributionDay />}></Route>
              <Route path='/listclients' element={<ListClients />}></Route>
              <Route path='/listproducts' element={<ListProducts />}></Route>
              <Route path='/modifyclient' element={<ModifyClient />}></Route>
              <Route path='/modifyproduct' element={<ModifyProduct />}></Route>
              <Route path='/moneyflow' element={<MoneyFlow />}></Route>
              <Route path='/payment' element={<Payment />}></Route>
              <Route path='/sale' element={<Sale />}></Route>
              <Route path='/saleslist' element={<SalesList />}></Route>
              <Route path='/stock' element={<Stock />}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  );
}

export default App;
