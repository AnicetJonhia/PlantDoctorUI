import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
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
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Faible': return '#10B981';
      case 'Modérée': return '#F59E0B';
      case 'Élevée': return '#EF4444';
      default: return '#6B7280';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historique des analyses</Text>
        <Text style={styles.subtitle}>Consultez vos précédentes détections</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockHistory.map((record) => (
          <TouchableOpacity key={record.id} style={styles.recordCard} activeOpacity={0.7}>
            <Image source={{ uri: record.imageUrl }} style={styles.recordImage} />
            
            <View style={styles.recordContent}>
              <View style={styles.recordHeader}>
                <Text style={styles.plantType}>{record.plantType}</Text>
                <View style={styles.dateContainer}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.recordDate}>{formatDate(record.date)}</Text>
                </View>
              </View>
              
              <Text style={styles.disease}>{record.disease}</Text>
              
              <View style={styles.recordDetails}>
                <View style={styles.severityContainer}>
                  <View 
                    style={[
                      styles.severityDot, 
                      { backgroundColor: getSeverityColor(record.severity) }
                    ]} 
                  />
                  <Text style={styles.severityText}>
                    Sévérité: {record.severity}
                  </Text>
                </View>
                
                <View style={styles.statusContainer}>
                  {getStatusIcon(record.status)}
                  <Text style={styles.statusText}>{record.status}</Text>
                </View>
              </View>
              
              <View style={styles.recordFooter}>
                <Text style={styles.confidence}>
                  Confiance: {record.confidence}%
                </Text>
                <Text style={styles.recordTime}>{record.time}</Text>
              </View>
            </View>
            
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        ))}
        
        {mockHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>Aucune analyse</Text>
            <Text style={styles.emptyText}>
              Vos analyses apparaîtront ici une fois que vous aurez scanné des plantes
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recordImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  recordContent: {
    flex: 1,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  plantType: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recordDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  disease: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    marginBottom: 8,
  },
  recordDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidence: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  recordTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
});