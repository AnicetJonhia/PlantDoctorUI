import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera, Leaf, TrendingUp, Shield, Users, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const handleScanPress = () => {
    router.push('/camera');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>PlantHealth AI</Text>
          <Text style={styles.subtitle}>Détection intelligente des maladies des plantes</Text>
        </View>

        {/* Main Action Card */}
        <TouchableOpacity onPress={handleScanPress} activeOpacity={0.9}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.mainActionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Camera size={32} color="#FFFFFF" />
            <Text style={styles.mainActionTitle}>Scanner une plante</Text>
            <Text style={styles.mainActionSubtitle}>
              Prenez une photo pour détecter instantanément les maladies
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Impact en temps réel</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Leaf size={20} color="#10B981" />
              </View>
              <Text style={styles.statNumber}>12,483</Text>
              <Text style={styles.statLabel}>Plantes analysées</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Shield size={20} color="#3B82F6" />
              </View>
              <Text style={styles.statNumber}>94%</Text>
              <Text style={styles.statLabel}>Précision</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Users size={20} color="#F59E0B" />
              </View>
              <Text style={styles.statNumber}>8,291</Text>
              <Text style={styles.statLabel}>Agriculteurs aidés</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <TrendingUp size={24} color="#10B981" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Diagnostic rapide</Text>
                <Text style={styles.featureDescription}>
                  Identification des maladies en moins de 3 secondes
                </Text>
              </View>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Award size={24} color="#3B82F6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Recommandations expertes</Text>
                <Text style={styles.featureDescription}>
                  Solutions de traitement personnalisées et éco-responsables
                </Text>
              </View>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Leaf size={24} color="#059669" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Agriculture durable</Text>
                <Text style={styles.featureDescription}>
                  Contribuez aux objectifs de développement durable (ODD 2, 13, 15)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ODD Section */}
        <View style={styles.oddSection}>
          <Text style={styles.sectionTitle}>Objectifs de Développement Durable</Text>
          <View style={styles.oddContainer}>
            <View style={styles.oddCard}>
              <Text style={styles.oddNumber}>2</Text>
              <Text style={styles.oddTitle}>Faim zéro</Text>
            </View>
            <View style={styles.oddCard}>
              <Text style={styles.oddNumber}>13</Text>
              <Text style={styles.oddTitle}>Action climatique</Text>
            </View>
            <View style={styles.oddCard}>
              <Text style={styles.oddNumber}>15</Text>
              <Text style={styles.oddTitle}>Vie terrestre</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  mainActionCard: {
    marginHorizontal: 20,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  mainActionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  mainActionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresList: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  oddSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  oddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oddCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  oddNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 8,
  },
  oddTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 16,
  },
});