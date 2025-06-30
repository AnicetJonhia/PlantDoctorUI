import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, HelpCircle, Shield, Bell, Globe, ChevronRight, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const handleLogout = () => {

    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive' }
      ]
    );
  };

  const MenuItem = ({ icon, title, subtitle, onPress, showChevron = true, danger = false }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showChevron?: boolean;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      className={`flex-row items-center p-4 border-b border-gray-100 last:border-b-0`} // last:border-b-0 removes border from last item
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${danger ? 'bg-red-50' : 'bg-gray-50'}`}>
        {icon}
      </View>
      <View className="flex-1">
        <Text className={`text-base font-medium mb-0.5 ${danger ? 'text-red-500' : 'text-gray-900'}`}>{title}</Text>
        {subtitle && <Text className="text-sm font-normal text-gray-600">{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRight size={20} color="#6B7280" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-5 pb-5">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Profil</Text>
          <Text className="text-base font-normal text-gray-600">Gérez votre compte et préférences</Text>
        </View>

        {/* User Info */}
        <View className="bg-white mx-5 p-5 rounded-2xl flex-row items-center mb-6 shadow-md">
          <View className="w-16 h-16 rounded-full bg-emerald-50 items-center justify-center mr-4">
            <User size={32} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">Utilisateur Demo</Text>
            <Text className="text-sm font-normal text-gray-600 mb-1">demo@planthealth.ai</Text>
            <Text className="text-xs font-normal text-gray-400">126 analyses • Membre depuis Jan 2024</Text>
          </View>
        </View>

        {/* Account Section */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-700 px-5 mb-3">Compte</Text>
          <View className="bg-white mx-5 rounded-2xl shadow-md overflow-hidden">
            <MenuItem
              icon={<Settings size={24} color="#6B7280" />}
              title="Paramètres"
              subtitle="Notifications, langue, préférences"
              onPress={() => {}}
            />
            <MenuItem
              icon={<Bell size={24} color="#6B7280" />}
              title="Notifications"
              subtitle="Gérer les alertes et rappels"
              onPress={() => {}}
            />
            <MenuItem
              icon={<Globe size={24} color="#6B7280" />}
              title="Langue"
              subtitle="Français"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Support Section */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-700 px-5 mb-3">Support</Text>
          <View className="bg-white mx-5 rounded-2xl shadow-md overflow-hidden">
            <MenuItem
              icon={<HelpCircle size={24} color="#6B7280" />}
              title="Centre d'aide"
              subtitle="FAQ et guide d'utilisation"
              onPress={() => {}}
            />
            <MenuItem
              icon={<Shield size={24} color="#6B7280" />}
              title="Confidentialité"
              subtitle="Politique de confidentialité"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Statistics */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-700 px-5 mb-3">Vos statistiques</Text>
          <View className="flex-row mx-5 gap-3">
            <View className="flex-1 bg-white p-4 rounded-xl items-center shadow-md">
              <Text className="text-xl font-bold text-emerald-500 mb-1">126</Text>
              <Text className="text-xs font-normal text-gray-600 text-center">Analyses</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl items-center shadow-md">
              <Text className="text-xl font-bold text-emerald-500 mb-1">42</Text>
              <Text className="text-xs font-normal text-gray-600 text-center">Maladies détectées</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl items-center shadow-md">
              <Text className="text-xl font-bold text-emerald-500 mb-1">93%</Text>
              <Text className="text-xs font-normal text-gray-600 text-center">Précision moyenne</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View className="mb-6">
          <View className="bg-white mx-5 rounded-2xl shadow-md overflow-hidden">
            <MenuItem
              icon={<LogOut size={24} color="#EF4444" />}
              title="Déconnexion"
              onPress={handleLogout}
              showChevron={false}
              danger={true}
            />
          </View>
        </View>

        {/* App Info */}
        <View className="items-center py-6 px-5">
          <Text className="text-xs font-normal text-gray-400 mb-1">PlantHealth AI v1.0.0</Text>
          <Text className="text-xs font-normal text-gray-400">Développé pour les ODD 2, 13, 15</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

