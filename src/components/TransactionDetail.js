// components/TransactionDetail.js
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/colors/Colors';

const TransactionDetail = ({ visible, transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image style={styles.icon} source={require('../assets/icons/close.png')}/>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Transaction Details</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}><strong>Sender:</strong> {transaction.sender}</Text>
            <Text style={styles.detailText}><strong>Receiver:</strong> {transaction.receiver}</Text>
            <Text style={styles.detailText}><strong>Date:</strong> {transaction.date}</Text>
            <Text style={styles.detailText}><strong>Amount:</strong> {transaction.amount}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor:Colors.companyName
  },
  icon:{
    height:25,
    width:25
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 20,
    width: '100%',
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'left',
  },
});

export default TransactionDetail;
