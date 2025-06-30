import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Camera, RotateCcw, ArrowLeft, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back'); // Specify type if using TypeScript: useState<CameraType>
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null); // Specify type if using TypeScript: useRef<CameraView>(null)

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center bg-gray-50">
          <Text className="text-base font-normal text-gray-600">Chargement de la caméra...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center bg-gray-50 px-8">
          <Camera size={64} color="#10B981" />
          <Text className="text-2xl font-bold text-gray-900 text-center mt-6 mb-4">Accès à la caméra requis</Text>
          <Text className="text-base font-normal text-gray-600 text-center leading-6 mb-8">
            Nous avons besoin d'accéder à votre caméra pour analyser vos plantes
          </Text>
          <TouchableOpacity
            className="bg-emerald-500 px-8 py-4 rounded-xl"
            onPress={requestPermission}
          >
            <Text className="text-base font-semibold text-white">Autoriser l'accès</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    triggerHaptic();
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      triggerHaptic();

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      // Simulate AI analysis
      setTimeout(() => {
        setIsCapturing(false);
        router.push({
          pathname: '/analysis',
          params: {
            imageUri: photo?.uri || '',
            timestamp: Date.now().toString()
          }
        });
      }, 1500);

    } catch (error) {
      setIsCapturing(false);
      Alert.alert('Erreur', 'Impossible de prendre la photo');
    }
  };

  const goBack = () => {
    triggerHaptic();
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView className="flex-1" facing={facing} ref={cameraRef}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-5 pb-5">
          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-black/50 items-center justify-center"
            onPress={goBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-white">Scanner une plante</Text>
          {/* Placeholder to balance the layout */}
          <View className="w-11" />
        </View>

        {/* Instructions */}
        <View className="items-center px-8 mb-10">
          <Text className="text-base font-normal text-white text-center bg-black/50 px-4 py-2 rounded-lg">
            Centrez la partie malade de la plante dans le cadre
          </Text>
        </View>

        {/* Camera Frame */}
        <View className="flex-1 justify-center items-center">
          <View className="w-70 h-70 relative">
            <View className="absolute top-0 left-0 w-[30px] h-[30px] border-[3px] border-emerald-500 border-r-0 border-b-0" />
            <View className="absolute top-0 right-0 w-[30px] h-[30px] border-[3px] border-emerald-500 border-l-0 border-b-0" />
            <View className="absolute bottom-0 left-0 w-[30px] h-[30px] border-[3px] border-emerald-500 border-r-0 border-t-0" />
            <View className="absolute bottom-0 right-0 w-[30px] h-[30px] border-[3px] border-emerald-500 border-l-0 border-t-0" />
          </View>
        </View>

        {/* Controls */}
        <View className="flex-row items-center justify-between px-10 pb-10 pt-5">
          <TouchableOpacity
            className="w-14 h-14 rounded-full bg-black/50 items-center justify-center"
            onPress={toggleCameraFacing}
            activeOpacity={0.7}
          >
            <RotateCcw size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-20 h-20 rounded-full bg-white items-center justify-center border-4 border-emerald-500 ${isCapturing ? 'bg-emerald-500' : ''}`}
            onPress={takePicture}
            disabled={isCapturing}
            activeOpacity={0.8}
          >
            {isCapturing ? (
              <View className="items-center justify-center">
                <Zap size={32} color="#FFFFFF" />
              </View>
            ) : (
              <View className="w-16 h-16 rounded-full bg-emerald-500" />
            )}
          </TouchableOpacity>

          {/* Placeholder to balance the layout */}
          <View className="w-14" />
        </View>

        {isCapturing && (
          <View className="absolute inset-0 bg-black/80 items-center justify-center">
            <Text className="text-lg font-semibold text-white mt-4">Analyse en cours...</Text>
          </View>
        )}
      </CameraView>
    </SafeAreaView>
  );
}
