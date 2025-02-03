// Transaction.js
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';
import { Background } from '../components/Components';
import TransactionItem from '../components/TransactionItem';
import { TransactionData } from '../store/TransactionData';
import TransactionDetail from '../components/TransactionDetail'; // Import the Modal

const Transaction = () => {
  const [transactions, setTransactions] = useState(TransactionData);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle edit
  const handleEdit = (id) => {
    console.log('Edit transaction with ID:', id);
  };

  // Function to handle delete
  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(item => item.id !== id);
    setTransactions(updatedTransactions);
    console.log('Deleted transaction with ID:', id);
  };

  // Open the modal with transaction details
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);  // Set the selected transaction
    setModalVisible(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedTransaction(null); // Clear the selected transaction
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text>All Transactions</Text>
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TransactionItem
                id={item.id}
                title={item.title}
                amount={item.amount}
                date={item.date}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={() => handleTransactionClick(item)} // Open modal on click
              />
            )}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </View>

      {/* Transaction Details Modal */}
      <TransactionDetail
        visible={modalVisible}
        transaction={selectedTransaction}  // Pass the selected transaction
        onClose={closeModal}  // Close the modal
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    zIndex: 20,
  },
  flatListContainer: {
    width: 350,
    paddingBottom: 5,
  },
  bodyContainer: {
    flex: 1,
    marginTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Transaction;
