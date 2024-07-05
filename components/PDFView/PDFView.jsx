import {View, StyleSheet} from "react-native";
import {useState} from "react";
import Pdf from "react-native-pdf";


export default function PDFView({item}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const src = {
        uri: item,
        cache: true,
    };

    const onPageChanged = (page, totalPages) => {
        setCurrentPage(page);
        setTotalPages(totalPages);
    };

    return (
        <View style={{ width: '100%', height: '93%', alignItems: 'center', alignSelf: 'center'}}>
            <Pdf
                trustAllCerts={false}
                style={styles.pdf}
                source={src}
                activityIndicatorProps={{
                    color: '#5027FF',
                    progressTintColor: '#5027FF',
                }}
                onLoadComplete={(numberOfPages, filePath) => {console.log(`Number of pages: ${numberOfPages}`)}}
                onError={(error) => { console.log(error)}}
                onPageChanged={(page, totalPages) => onPageChanged(page, totalPages)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        alignSelf: 'stretch'
    },
})
