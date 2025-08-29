import { colors, radius, spacingX, spacingY } from "../constants/theme";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { verticalScale } from "../utils/styling";
import Typo from "./Typo";
import { FlashList } from "@shopify/flash-list";
import Loading from "./Loading";
import { expenseCategories } from "../constants/data";
import { Car } from "phosphor-react-native";

function TransactionList({data, title, loading, emptyListMessage}) {
    const handleClick = () => {

    }

  return (
    <View style={styles.container}>
        {title && (
            <Typo size={20} fontWeight="500">
                {title}
            </Typo>
        )}

        <View style={styles.list}>
            <FlashList
            data={data}
            renderItem={(item, index) => <TransactionItem item={item} index={index} handleClick={handleClick}/>}
            estimatedItemSize={60}/>
        </View>

        {!loading && data.length == 0 && (
            <Typo size={15} color={colors.neutral400} style={{textAlign: 'center', marginTop: spacingY._15}}>
                {emptyListMessage}
            </Typo>
        )}

        {loading && (
            <View style={{top: verticalScale(100)}}>
                <Loading/>
            </View>
        )}
    </View>
  );
}

const TransactionItem = ({ item, index, handleClick }) => {
    let category = expenseCategories['utilities'];
    const IconComponent = category.icon;
    return (
        <View>
           <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}> 
            <View style={[styles.icon, {backgroundColor: category.bgColor}]}>
                {IconComponent && (
                    <IconComponent
                    name={category.iconName}
                    size={verticalScale(25)}
                    color={colors.white}/>
                )}
            </View>

            <View style={styles.categoryDes}>
                <Typo size={17}>{category.label}</Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines: 1}}>paid wifi bill</Typo>
            </View>

            <View style={styles.amountDate}>
                <Typo fontWeight="500" color={colors.rose}> - $23</Typo>
                <Typo size={13} color={colors.neutral400}> 12 jan</Typo>
            </View>
           </TouchableOpacity>
        </View>
    )
}

export default TransactionList;

const styles = StyleSheet.create({
    container: {
        gap: spacingY._17
    },
    list: {
        minHeight: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacingX._12,
        marginBottom: spacingY._12,
        backgroundColor: colors.neutral800,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17
    },
    icon: {
        height: verticalScale(44),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius._12,
        borderCurve: 'continuous'
    },
    categoryDes: {
        flex: 1,
        gap: 2.5
    },
    amountDate: {
        alignItems: 'flex-end',
        gap: 3
    }

});

