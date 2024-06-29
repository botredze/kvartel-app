import BottomSheet from "@gorhom/bottom-sheet";
import {useMemo} from "react";
import {View} from "react-native";
import {styles} from './styles'

export default function Details() {
    const snapPoints = useMemo(() => ['100%'], []);
    const apartomentDetails = {
        name: 'Студия №3',
        address: 'Бишкек, ул.Токтоналиева 12, 3 этаж, квартира № 74',
        photos: [
            {photoUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'},
            {photoUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'},
            {photoUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'},
        ],
        entryTime: '14-00',
        outTime: '12-00',
        arendType: 'Классическая аренда',
        guest: 2,
        bads: 1,
        apartamentType: 'Студия',
        tualets: 1,
        convenience: [
            {id:1},
            {id:2},
            {id:3},
        ],
        apartamentRules: [
            {id:1},
            {id:2},
            {id:3},
            {id:4},
        ],

        othersNearby: [
            {
                id: 1,
                name: 'Двухкомнатная квартира',
                address: 'Кудыкины горы',
                photos: [
                    {
                    photosUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    },
                    {
                        photosUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    },
                ]
            },
            {
                id: 2,
                name: 'Однакомнатная комната где то там',
                address: 'Кудыкины горы',
                photos: [
                    {
                        photosUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    },
                    {
                        photosUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    },
                ]
            },
            {
                id: 3,
                name: 'Трешка в центре, элитка',
                address: 'Кудыкины горы',
                photos: [
                    {
                        photosUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    },
                    {
                        photosUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    },
                ]
            }
        ]
    }


    return (
        <BottomSheet
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            <View>
                <Text style={styles.mainTitleText}></Text>
            </View>
        </BottomSheet>
    )
}
