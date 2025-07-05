
<template>
  <Header />

  <div class="container">
    <Balance :total="+total"/>
    <IncomeExpenses :income="parseInt(income)" :expense="+expense" />
    <TransactionList :transactions="transactions" @deleteTransaction="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmittedData" />
  </div>

</template>


<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { useToast } from 'vue-toastification';

import { computed, ref ,onMounted } from 'vue';


// For Get All Transaction When Rendered
onMounted(()=>{
  const savedTransactions = JSON.parse(localStorage.getItem("transactions")) ; 
  if(savedTransactions){
    transactions.value = savedTransactions ; 
  }
})

// For Alrert User
const toast = useToast() ;

const transactions =ref( [
            
        ])

const total = computed(()=>{
  return transactions.value.reduce((acc , transaction)=> acc + transaction.amount , 0);
})


const income = computed(()=>{
  return transactions.value.reduce((acc , transaction)=> transaction.amount > 0 ? acc+ transaction.amount : acc , 0).toFixed(2);
})

const expense = computed(()=>{
  return transactions.value.reduce((acc , transaction)=> transaction.amount < 0 ? acc+ transaction.amount : acc , 0).toFixed(2);
})

const handleTransactionSubmittedData = (transactionData)=>{

  if(transactionData.amount <= 0  && Math.abs(transactionData.amount) <= total._value){
    transactions.value.unshift({
      id : transactions.value.length ,
      ...transactionData
    });
    toast.success("Tranaction Done")
  }else if(transactionData.amount > 0){
    transactions.value.unshift({
      id : transactions.value.length ,
      ...transactionData
    });

    toast.success("Tranaction Done")

  }else{
    toast.error("You are break limit");
  }

  // For Save Transaction In Broweser
  saveToLocalStroage()

  
}

const handleTransactionDeleted = (id)=>{
  transactions.value =  transactions.value.filter((item)=>item.id !== id);
  toast.success('Transaction Deleted') ;

  // For Save Transaction In Broweser
  saveToLocalStroage() ;

}

const saveToLocalStroage = ()=>{
  localStorage.setItem('transactions' , JSON.stringify(transactions.value));
}

</script>