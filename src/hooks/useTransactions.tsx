import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {api} from '../services/api'


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionProviderProps {
    children: ReactNode
}

type TransactionInput  = Omit<Transaction, 'id' | 'createdAt'>;


interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export const TransactionsProvider = ({children}: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => { 
        api.get('transactions')
        .then(({data}) => setTransactions(data.transactions))
    },[])

    const createTransaction = async (transactionInput: TransactionInput) => {

     const {data} =  await api.post('transactions', {...transactionInput, createdAt: new Date()})
     const {transaction} = data

     setTransactions([...transactions, transaction])
     
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransactions = () =>{
    const context = useContext(TransactionsContext)

    return context
}