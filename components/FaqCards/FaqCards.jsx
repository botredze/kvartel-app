import {TouchableOpacity, View, Text} from "react-native";
import {styles} from './styles'
import {useState} from "react";
import {Entypo, MaterialIcons} from "@expo/vector-icons";

export default function FaqCard({item}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.card}>
            <View style={styles.questionCardInner}>
                <View style={styles.questionIcon}>
                    <MaterialIcons name="question-mark" size={24} color="#66666f"/>
                </View>
                <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.questionContainer}>
                    <View style={styles.questionContainerInner}>
                        <Text style={styles.questionText}>{item.question}</Text>
                    </View>
                    {expanded ? (
                        <View>
                            <Entypo name="chevron-up" size={24} color="#66666f" />
                        </View>
                    ) : (
                        <View>
                            <Entypo name="chevron-down" size={24} color="#66666f" />
                        </View>

                    )}
                </TouchableOpacity>
            </View>
            {expanded && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                </View>
            )}
        </View>
    );
}
