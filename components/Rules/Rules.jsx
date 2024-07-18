import { Text, StyleSheet, View } from 'react-native';
import {colors} from "../../constants/constants";

const Rules = ({item}) => {
    return (
        <View style={styles.ruleItem}>
            <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <Text style={styles.ruleText}>{item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ruleItem: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        width: '32%',
    },
    emoji: {
        fontSize: 40,
        marginBottom: 10,
    },
    ruleText: {
        fontSize: 14,
        textAlign: 'center',
    },
    emojiContainer: {
        backgroundColor: colors.mainGrey,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 30,
    }

});

export default Rules
