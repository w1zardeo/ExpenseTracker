import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import ModalWrapper from '../components/ModalWrapper';
import Typo from '../components/Typo';
import { use, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { colors, spacingY } from '../constants/theme';
import Button from '../components/Button';

function WalletModal() {
    const [wallet, setWallet] = useState({
        name: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onPickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            aspect: [4, 3],
            quality: 0.5
        })
    }
    
    // const onSubmit = async () => {
    //     let {name, image} = wallet;
    //     if (!name.trim()) {
    //         Alert.alert("User", "Please fill all the field")
    //         return;
    //     }
    //     setLoading(true);
    //     const res = await updateUser(user?.uid, wallet)
    //     setLoading(false)
    //     if (res.success) {
    //         updateUserData(user?.uid)
    //         navigation.goBack()
    //     } else {
    //         Alert.alert("User", res.msg)
    //     }
    // }

  return (
    <ModalWrapper>
        <View style={styles.container}>
            <Header
            title="New Wallet"
            leftIcon={<BackButton/>}
            style={{marginBottom: spacingY._10}}/>
        </View>

        <ScrollView contentContainerStyle={styles.form}>
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}>Wallet Name</Typo>
                <Input
                placeholder="Salary"
                value={wallet.name}
                onChangeText={(value) => {
                    setWallet({...wallet, name: value})
                }}/>
            </View>
        </ScrollView>

        <View style={styles.footer}>
            <Button onPress={onSubmit} loading={loading} style={{flex: 1}}/>
            <Typo color={colors.black} fontWeight='700'>Add Wallet</Typo>
        </View>

    </ModalWrapper>
  );
}

export default WalletModal;

const styles = StyleSheet.create({
  container: {}
});
