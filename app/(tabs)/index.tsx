import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera, Leaf, TrendingUp, Shield, Users, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {
  const handleScanPress = () => {
    router.push('/camera');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-5 pb-8">
          <Text className="text-4xl font-bold text-gray-900 mb-2">PlantHealth AI</Text>
          <Text className="text-base text-gray-600 leading-6">Détection intelligente des maladies des plantes</Text>
        </View>

        {/* Main Action Card */}
        <TouchableOpacity onPress={handleScanPress} activeOpacity={0.9} className="mx-5 mb-8">
          <LinearGradient
            colors={['#10B981', '#059669']}
            className="p-8 rounded-3xl items-center shadow-lg shadow-emerald-500/50" // Adjusted shadow for Android elevation and iOS shadow
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Camera size={32} color="#FFFFFF" />
            <Text className="text-2xl font-bold text-white mt-4 mb-2">Scanner une plante</Text>
            <Text className="text-base text-white text-center opacity-90 leading-6">
              Prenez une photo pour détecter instantanément les maladies
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Statistics */}
        <View className="px-5 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">Impact en temps réel</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 bg-white p-5 rounded-2xl items-center mx-1 shadow-md">
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-3">
                <Leaf size={20} color="#10B981" />
              </View>
              <Text className="text-xl font-bold text-gray-900 mb-1">12,483</Text>
              <Text className="text-xs font-medium text-gray-600 text-center">Plantes analysées</Text>
            </View>
            <View className="flex-1 bg-white p-5 rounded-2xl items-center mx-1 shadow-md">
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-3">
                <Shield size={20} color="#3B82F6" />
              </View>
              <Text className="text-xl font-bold text-gray-900 mb-1">94%</Text>
              <Text className="text-xs font-medium text-gray-600 text-center">Précision</Text>
            </View>
            <View className="flex-1 bg-white p-5 rounded-2xl items-center mx-1 shadow-md">
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-3">
                <Users size={20} color="#F59E0B" />
              </View>
              <Text className="text-xl font-bold text-gray-900 mb-1">8,291</Text>
              <Text className="text-xs font-medium text-gray-600 text-center">Agriculteurs aidés</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View className="px-5 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">Fonctionnalités</Text>
          <View className="gap-y-4">
            <View className="bg-white p-5 rounded-2xl flex-row items-center shadow-md">
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
                <TrendingUp size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">Diagnostic rapide</Text>
                <Text className="text-sm text-gray-600 leading-5">
                  Identification des maladies en moins de 3 secondes
                </Text>
              </View>
            </View>

            <View className="bg-white p-5 rounded-2xl flex-row items-center shadow-md">
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Award size={24} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">Recommandations expertes</Text>
                <Text className="text-sm text-gray-600 leading-5">
                  Solutions de traitement personnalisées et éco-responsables
                </Text>
              </View>
            </View>

            <View className="bg-white p-5 rounded-2xl flex-row items-center shadow-md">
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Leaf size={24} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">Agriculture durable</Text>
                <Text className="text-sm text-gray-600 leading-5">
                  Contribuez aux objectifs de développement durable (ODD 2, 13, 15)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ODD Section */}
        <View className="px-5 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">Objectifs de Développement Durable</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 bg-white p-5 rounded-2xl items-center mx-1 border-l-4 border-emerald-500 shadow-md">
              <Text className="text-3xl font-bold text-emerald-500 mb-2">2</Text>
              <Text className="text-xs font-medium text-gray-900 text-center leading-4">Faim zéro</Text>
            </View>
            <View className="flex-1 bg-white p-5 rounded-2xl items-center mx-1 border-l-4 border-emerald-500 shadow-md">
              <Text className="text-3xl font-bold text-emerald-500 mb-2">13</Text>
              <Text className="text-xs font-medium text-gray-900 text-center leading-4">Action climatique</Text>
            </View>
            <View className="flex-1 bg-white p-5 rounded-2xl items-center mx-1 border-l-4 border-emerald-500 shadow-md">
              <Text className="text-3xl font-bold text-emerald-500 mb-2">15</Text>
              <Text className="text-xs font-medium text-gray-900 text-center leading-4">Vie terrestre</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

