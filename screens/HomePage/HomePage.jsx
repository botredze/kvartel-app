import {SafeAreaView, View, Text, FlatList, TouchableOpacity} from "react-native";
import {styles} from './style'
import Maps from "../../components/Maps/Maps";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {useEffect, useMemo, useRef, useState} from "react";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import {Searchbar, TextInput} from 'react-native-paper';
import Recomendation from "../../components/Recomendation/Recomendation";
import Filters from "../../components/Filters/Filters";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const [apartments, setApartments] = useState([  {
        id: '1',
        name: 'Апартаменты',
        price: '3021 ',
        address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
        images: [
            {
                imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
            },
            {
                imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
            },
            {
                imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
            }
        ]
    },
        {
            id: '2',
            name: 'Харомы',
            price: '2530 ',
            address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
            images: [
                {
                    imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                },
                {
                    imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                },
                {
                    imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                }
            ]
        },

        {
            id: '2',
            name: 'Харомы',
            price: '2530 ',
            address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
            images: [
                {
                    imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                },
                {
                    imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                },
                {
                    imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                }
            ]
        },
    ]);
    const snapPoints = useMemo(() => ['10%', '96%'], [])
    const inputRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) {
                setRecommendations([
                    'Metro Белорусская',
                    'ул. Белокаменная 24/5',
                    'проспект Мечникова, 40',
                    'Дунайский проспект, 27',
                ]);
            }
        }, 200);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearchSubmit = () => {
        setApartments([
            {
                id: '1',
                name: 'Апартаменты',
                price: '3021 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },
            {
                id: '2',
                name: 'Харомы',
                price: '2530 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },

            {
                id: '2',
                name: 'Харомы',
                price: '2530 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },

            {
                id: '2',
                name: 'Харомы',
                price: '2530 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },

            {
                id: '2',
                name: 'Харомы',
                price: '2530 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },

            {
                id: '2',
                name: 'Харомы',
                price: '2530 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },

            {
                id: '2',
                name: 'Харомы',
                price: '2530 ',
                address: 'г.Бишкек ул.Кудыкины горы и дальше что то там',
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    },
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg',
                    }
                ]
            },

        ]);
        setShowRecommendations(false);
    };

    const handleClearSearch = () => {
        console.log('Close clicked')
        setSearchQuery("");
        setShowRecommendations(false);
        handleSearchSubmit()
        inputRef.current.blur();
    };

    const handleFocusSearch = () => {
        console.log('Focus George Focus')
        setShowRecommendations(true)
        setApartments([])
    };

    return (
        <SafeAreaView style={styles.container}>
            <Maps/>
            <BottomSheet
                snapPoints={snapPoints}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={true}
            >
                <View style={styles.searchContainer}>
                    <Searchbar
                        ref={inputRef}
                        style={styles.searchInput}
                        placeholder="Поиск по адресу"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={handleFocusSearch}
                        onSubmitEditing={handleSearchSubmit}
                        icon="magnify"
                        clearIcon= 'close'
                        onClearIconPress={handleClearSearch}
                    />
                    <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
                        <Text style={styles.filterButtonText}>Фильтры</Text>
                    </TouchableOpacity>
                </View>


                {showRecommendations && (
                    <BottomSheetFlatList
                        data={recommendations}
                        renderItem={({item}) => <Recomendation item={item}/>}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.recommendationList}
                    />
                )}
                    <BottomSheetFlatList
                        data={apartments}
                        renderItem={({item}) => <ApartmentCard apartment={item}/>}
                        keyExtractor={(item) => item.id}
                        style={styles.apartmentList}
                    />
            </BottomSheet>

            {showFilters && <Filters  toggleFilters={toggleFilters}/>}
        </SafeAreaView>
    );
}
