import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_CUSTOMER,
    addCustomerAction,
    addManyCustomersAction,
    REMOVE_CUSTOMERS,
    removeCustomerAction
} from "./store/customerReducer";
import {ADD_CASH, addCashAction, GET_CASH, getCashAction} from "./store/cashReducer";
import {useEffect} from "react";
import {fetchCustomers} from "./asyncActions/customers";

function App() {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customers.customers)

    const addCash = (cash) => {
        dispatch(addCashAction(cash))
    }

    const getCash = (cash) => {
        dispatch(getCashAction(cash))
    }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now()
        }
        dispatch(addCustomerAction(customer))
    }

    function removeCustomer(customer) {
        dispatch(removeCustomerAction(customer))
    }

    const useEffect = () => {
        addManyCustomersAction();
    }

    return (
        <div className="App">
            <div>{cash}</div>
            <div style={{display: "flex"}}>
                <button onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
                <button onClick={() => getCash(Number(prompt()))}>Снять со счета</button>
                <button onClick={() => addCustomer(prompt())}>Добавить пользователя</button>
                <button onClick={() => dispatch(fetchCustomers())}>Получить пользователей</button>
            </div>
            {customers.length > 0 ?
                <div>
                    {customers.map(customer =>
                        <div onClick={() => removeCustomer(customer)}>{customer.name}</div>
                    )}
                </div>
                :
                <div>
                    <h1>Клиенты отсутствуют</h1>
                </div>
            }
        </div>
    );
}

export default App;
