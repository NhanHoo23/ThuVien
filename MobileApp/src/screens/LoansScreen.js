import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import LoanItem from './flatListItems/LoanItem'
import { COLORS } from '../styles/constants'
import { addLoan, deleteLoan, updateLoan } from '../api/productApi'
import DialogComponent, { ScreenType } from '../components/DialogComponent'
import DatePicker from 'react-native-date-picker'
import AddButton from '../components/AddButton'
import DataManager from '../utils/DataManager'
import { useFocusEffect } from '@react-navigation/native'

const LoansScreen = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loans, setLoans] = useState(DataManager.shared.getLoans());
    const [books, setBooks] = useState(DataManager.shared.getBooks());
    const [loan, setLoan] = useState(null);
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useFocusEffect(
        useCallback(() => {
            setBooks(DataManager.shared.getBooks());
        
            return () => {
                // Hàm cleanup (nếu cần)
            };
        }, [])
    );

    const showDialog = (loan) => {
        setLoan(loan);        
        setDialogVisible(true);
    }

    const closeDialog = () => {
        setDialogVisible(false);
        setDate('');
    }

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        setDate(date.toLocaleDateString());        
        setOpen(false);
    };

    const addLoanToDB = async (formData, type, loan) => {
        
        if (type === 'Add') {
            try {
                const loanData = await addLoan(formData);
                console.log(loanData.message);
                console.log('loanData', loanData.loan);
                
                DataManager.shared.pushLoan(loanData.loan);
    
                setLoans(DataManager.shared.getLoans());
            } catch (error) {
                console.log(error);
            }
        } else {            
            try {
                const loanData = await updateLoan(loan._id,formData);
                console.log(loanData.message);
                DataManager.shared.updateLoan(loanData.loan);                
                setLoans(DataManager.shared.getLoans());
            } catch (error) {
                console.log(error);
            }
        }
        closeDialog();
    }

    const deleteLoanOnDB = async (loan) => {
        Alert.alert(
            "Xác nhận xóa", 
            "Bạn có chắc chắn muốn xóa danh mục này?", 
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy xóa phiếu mượn"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const res = await deleteLoan(loan._id);
                            console.log('res', res);
                            DataManager.shared.deleteLoan(loan);
                            setLoans(DataManager.shared.getLoans());
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ],
            { cancelable: false } 
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                style={{ flex: 1, width: '100%' }}
                data={loans}
                keyExtractor={(loan) => loan._id.toString()}
                renderItem={({ item }) => <LoanItem loan={item} onDelete={deleteLoanOnDB} onEdit={() => showDialog(item)} />}
            />

            <AddButton customStyle={styles.addButton} onPressed={() => showDialog()} />

            <DialogComponent
                visible={dialogVisible}
                onSubmit={addLoanToDB}
                onClose={() => closeDialog()}
                onOpenDatePicker={() => setOpen(true)}
                screenType={ScreenType.Loan}
                dateString={date}
                dateOutput={selectedDate.toISOString()}
                books={books}
                loan={loan}
            />

            <DatePicker
                modal
                open={open}
                theme='dark'
                date={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
                mode='date'
                onConfirm={(date) => {
                    handleConfirmDate(date)
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

        </View>
    )
}

export default LoansScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.mainBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 32,
        right: 32
    }
})