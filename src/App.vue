
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

import { computed, ref } from 'vue';

// For Alrert User
const toast = useToast() ;

const transactions =ref( [
            {id : 1 , text :"Food" , amount : -20.00},
            {id : 2 , text :"Salary" , amount : 8000.00},
            {id : 3 , text :"Picnic" , amount : -300.00},
            {id : 4 , text :"Camera" , amount : -700.00},
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
    transactions.value.push({
      id : transactions.value.length ,
      ...transactionData
    });
    toast.success("Tranaction Done")
  }else if(transactionData.amount > 0){
    transactions.value.push({
      id : transactions.value.length ,
      ...transactionData
    });
    toast.success("Tranaction Done")

  }else{
    toast.error("You are break limit");
  }

  // if(total._value >= transactionData.amount ){
  //   console.log("Condition Achieved")
  //   toast.success('Transaction Done')
  //   transactions.value.push({
  //     id : transactions.value.length ,
  //     ...transactionData
  //   });
  // }else{
  //   toast.error("You are break limit")
  // }
  
}

const handleTransactionDeleted = (id)=>{
  transactions.value =  transactions.value.filter((item)=>item.id !== id);
  toast.success('Transaction Deleted') ;
}

</script>