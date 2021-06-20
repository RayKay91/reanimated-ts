import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, ListViewComponent } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  Easing,
  interpolateNode,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Svg, Circle } from 'react-native-svg'

const AnimCircle = Animated.createAnimatedComponent(Circle)

export default function App() {
  const RADIUS = 140
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS

  const length = useSharedValue(1)

  const dashOffset = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(CIRCUMFERENCE * length.value, {
        easing: Easing.out(Easing.cubic),
        duration: 1250,
      }),
    }
  })

  useEffect(() => {
    length.value = 0.2
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Svg
          style={{ transform: [{ rotate: '-90deg' }], borderWidth: 2 }}
          height={300}
          width={300}
          origin={150}
        >
          <Circle
            cx="150"
            cy="150"
            r={RADIUS}
            stroke="rgb(0, 0, 0, 0.1)"
            strokeWidth="20"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={0}
          />
          <AnimCircle
            cx="150"
            cy="150"
            r={RADIUS}
            stroke="pink"
            strokeWidth="20"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            animatedProps={dashOffset}
          />
        </Svg>
      </View>
      <Button onPress={() => (length.value -= 0.2)} title="step" />
      <Button onPress={() => (length.value += 0.2)} title="unstep" />
      <Text>{dashOffset.strokeDashoffset}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lime',
    marginTop: 300,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'papayawhip',
  },
})
