import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants/colors';
import images from '../constants/images'; // Import images

interface StepIndicatorProps {
    totalSteps: number;
    currentStep: number;
}

const CIRCLE_SIZE = 24;

export const StepIndicator: React.FC<StepIndicatorProps> = ({
    totalSteps,
    currentStep,
}) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View key={index} style={styles.stepWrapper}>
                    <View
                        style={[
                            styles.circle,
                            index < currentStep
                                ? styles.circleCompleted
                                : styles.circlePending,
                        ]}
                    >
                        {index < currentStep ? (
                            <Image
                                source={images.tick} // Display tick for completed step
                                style={styles.tickImage}
                            />
                        ) : (
                            <Text style={styles.stepNumber}>{index + 1}</Text>
                        )}
                    </View>

                    {/* Don't show line after the last circle */}
                    {index < totalSteps - 1 && <View style={styles.line} />}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    stepWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleCompleted: {
        backgroundColor: colors.white,
    },
    circlePending: {
        backgroundColor: colors.lightprimary,
    },
    tickImage: {
        width: 16,  // Adjust the size of the tick image
        height: 16, // Adjust the size of the tick image
        resizeMode: 'contain',
    },
    stepNumber: {
        color: colors.white,
        fontWeight: 'bold',
    },
    line: {
        width: 120,
        height: 2,
        backgroundColor: colors.lightprimary,
        marginHorizontal: 5,
    },
});
