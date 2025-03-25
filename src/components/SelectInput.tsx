import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectInputProps {
    label: string;
    title: string;
    selectedValue: string;
    placeholder?: string;
    data: string[];
    onSelect: (value: string) => void;
    showColor: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
    label,
    title,
    selectedValue,
    placeholder = 'Select option',
    data,
    onSelect,
    showColor
}) => {
    const [visible, setVisible] = React.useState(false);

    const getColor = (item: string) => {
        const colors: { [key: string]: string } = {
            Black: '#000',
            White: '#E5E5E5',
            Red: '#FF0000',
            Blue: '#0000FF',
            Gray: '#808080',
            Green: '#008000',
            Yellow: '#FFD700',
        };
        return colors[item] || '#000';
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={selectedValue ? styles.text : styles.placeholder}>
                    {selectedValue || placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>

            <Modal visible={visible} animationType="fade" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.modalTitle}>{title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[
                                        styles.option,
                                        selectedValue === item && styles.selectedOption,
                                    ]}
                                    onPress={() => {
                                        onSelect(item);
                                        setVisible(false);
                                    }}
                                >
                                    {showColor && <View style={[styles.colorBox, { backgroundColor: getColor(item) }]} />}
                                    <Text style={styles.optionText}>{item}</Text>
                                    {selectedValue === item ? (
                                        <Ionicons name="radio-button-on" size={20} color="purple" />
                                    ) : (
                                        <Ionicons name="radio-button-off" size={20} color="#888" />
                                    )}
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    placeholder: {
        color: '#888',
    },
    text: {
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 12,
    },
    selectedOption: {
        backgroundColor: '#E8E8E8',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
});
