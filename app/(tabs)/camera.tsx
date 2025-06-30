import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Camera, RotateCcw, ArrowLeft, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement de la caméra...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Camera size={64} color="#10B981" />
          <Text style={styles.permissionTitle}>Accès à la caméra requis</Text>
          <Text style={styles.permissionText}>
            Nous avons besoin d'accéder à votre caméra pour analyser vos plantes
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Autoriser l'accès</Text>
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
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={goBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scanner une plante</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Centrez la partie malade de la plante dans le cadre
          </Text>
        </View>

        {/* Camera Frame */}
        <View style={styles.frameContainer}>
          <View style={styles.frame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={toggleCameraFacing}
            activeOpacity={0.7}
          >
            <RotateCcw size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.captureButton, isCapturing && styles.capturingButton]}
            onPress={takePicture}
            disabled={isCapturing}
            activeOpacity={0.8}
          >
            {isCapturing ? (
              <View style={styles.capturingIndicator}>
                <Zap size={32} color="#FFFFFF" />
              </View>
            ) : (
              <View style={styles.captureInner} />
            )}
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>

        {isCapturing && (
          <View style={styles.analysisOverlay}>
            <Text style={styles.analysisText}>Analyse en cours...</Text>
          </View>
        )}
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 44,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 40,
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  frameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#10B981',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingTop: 20,
  },
  flipButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#10B981',
  },
  capturingButton: {
    backgroundColor: '#10B981',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
  },
  capturingIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 16,
  },
});