import { FormEvent, useContext, useState } from "react"
import Modal from "react-modal"
import {Container, RadioBox, TransactionTypeContainer} from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from "../../hooks/useTransactions"


interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}: ModalProps) => {
    const { createTransaction} = useTransactions()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    const cleanModal = () => {
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
    }


    const handleCreateNewTransaction = async (event : FormEvent) => {
        event.preventDefault()

        await createTransaction({
            amount,
            category,
            title,
            type
        })

        cleanModal()
        onRequestClose()
    }


    return (
    <Modal
     overlayClassName="react-modal-overlay"
     className="react-modal-content"
     isOpen={isOpen}
     onRequestClose={onRequestClose}
    >

        <button 
            type="button" 
            onClick={onRequestClose}
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar modal"/>
        </button>

     <Container onSubmit={handleCreateNewTransaction}>
         <h2>Cadastrar transação</h2>

         <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
          />
         <input 
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
          />

         <TransactionTypeContainer >
            <RadioBox
             type="button"      
             onClick={() => {setType('deposit')}}      
             isActive={type === 'deposit'}
             activeColor="green"
            >
             <img src={incomeImg} alt="Endrada"/>
             <span>Entrada</span>
            </RadioBox>

            <RadioBox
             type="button"         
             onClick={() => {setType('withdraw')}}    
             isActive={type === 'withdraw'}
             activeColor="red"
            >
             <img src={outcomeImg} alt="Saída"/>
             <span>Saída</span>
            </RadioBox>


         </TransactionTypeContainer>


         <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}          
          />
         
         <button type="submit">
             Cadastrar
         </button>
     </Container>

   </Modal> ) 
}