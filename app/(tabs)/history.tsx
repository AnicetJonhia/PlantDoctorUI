import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react-native';

interface AnalysisRecord {
  id: string;
  date: string;
  time: string;
  plantType: string;
  disease: string;
  severity: 'Faible' | 'Modérée' | 'Élevée';
  status: 'Traité' | 'En cours' | 'Non traité';
  imageUrl: string;
  confidence: number;
}

const mockHistory: AnalysisRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '14:32',
    plantType: 'Tomate',
    disease: 'Mildiou',
    severity: 'Modérée',
    status: 'Traité',
    imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    confidence: 94
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '09:15',
    plantType: 'Pomme de terre',
    disease: 'Doryphore',
    severity: 'Élevée',
    status: 'En cours',
    imageUrl: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg',
    confidence: 89
  },
  {
    id: '3',
    date: '2024-01-13',
    time: '16:45',
    plantType: 'Laitue',
    disease: 'Pucerons',
    severity: 'Faible',
    status: 'Traité',
    imageUrl: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
    confidence: 92
  },
  {
    id: '4',
    date: '2024-01-12',
    time: '11:20',
    plantType: 'Rosier',
    disease: 'Oïdium',
    severity: 'Modérée',
    status: 'Non traité',
    imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
    confidence: 87
  }
];


export default function HistoryScreen() {
  const getSeverityColorClass = (severity: string) => {
    switch (severity) {
      case 'Faible': return 'bg-emerald-500'; // #10B981
      case 'Modérée': return 'bg-amber-500';  // #F59E0B
      case 'Élevée': return 'bg-red-500';     // #EF4444
      default: return 'bg-gray-500';         // #6B7280
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Traité': return <CheckCircle size={16} color="#10B981" />;
      case 'En cours': return <Clock size={16} color="#F59E0B" />;
      case 'Non traité': return <AlertTriangle size={16} color="#EF4444" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pt-5 pb-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Historique des analyses</Text>
        <Text className="text-base font-normal text-gray-600">Consultez vos précédentes détections</Text>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {mockHistory.map((record) => (
          <TouchableOpacity key={record.id} className="bg-white rounded-2xl p-4 mb-4 flex-row items-center shadow-md" activeOpacity={0.7}>
            <Image source={{ uri: record.imageUrl }} className="w-[60px] h-[60px] rounded-xl mr-4" />

            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-base font-semibold text-gray-900">{record.plantType}</Text>
                <View className="flex-row items-center gap-1">
                  <Calendar size={14} color="#6B7280" />
                  <Text className="text-xs font-normal text-gray-600">{formatDate(record.date)}</Text>
                </View>
              </View>

              <Text className="text-sm font-medium text-red-500 mb-2">{record.disease}</Text>

              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <View
                    className={`w-2 h-2 rounded-full mr-1.5 ${getSeverityColorClass(record.severity)}`}
                  />
                  <Text className="text-xs font-normal text-gray-600">
                    Sévérité: {record.severity}
                  </Text>
                </View>

                <View className="flex-row items-center gap-1">
                  {getStatusIcon(record.status)}
                  <Text className="text-xs font-medium text-gray-600">{record.status}</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-xs font-medium text-emerald-500">
                  Confiance: {record.confidence}%
                </Text>
                <Text className="text-xs font-normal text-gray-400">{record.time}</Text>
              </View>
            </View>

            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        ))}

        {mockHistory.length === 0 && (
          <View className="items-center justify-center py-20">
            <Calendar size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-700 mt-4 mb-2">Aucune analyse</Text>
            <Text className="text-base font-normal text-gray-600 text-center leading-6 px-8">
              Vos analyses apparaîtront ici une fois que vous aurez scanné des plantes
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

