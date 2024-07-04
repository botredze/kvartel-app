import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        paddingHorizontal: 15,
    },
    questionContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flex: 1,
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    answerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 58
    },
    answerText: {
        fontSize: 14,
        color: '#555',
    },

    questionIcon: {
        alignItems: "center",
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#efeded',
        borderRadius: 25
    },
    questionCard: {
      flexDirection: "row",
        justifyContent: "space-between"
    },

    questionCardInner: {
        flexDirection: "row",
        height: 60,
        gap: 16,
        flex: 1
    },
    questionContainerInner: {
        width: '80%',
    }

});
