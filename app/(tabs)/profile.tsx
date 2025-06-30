import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
      style={styles.menuItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, danger && styles.dangerIcon]}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, danger && styles.dangerText]}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRight size={20} color="#6B7280" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.subtitle}>Gérez votre compte et préférences</Text>
        </View>

        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <User size={32} color="#10B981" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Utilisateur Demo</Text>
            <Text style={styles.userEmail}>demo@planthealth.ai</Text>
            <Text style={styles.userStats}>126 analyses • Membre depuis Jan 2024</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <View style={styles.menuGroup}>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuGroup}>
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
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Vos statistiques</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>126</Text>
              <Text style={styles.statLabel}>Analyses</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Maladies détectées</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>93%</Text>
              <Text style={styles.statLabel}>Précision moyenne</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.menuGroup}>
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
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>PlantHealth AI v1.0.0</Text>
          <Text style={styles.appInfoText}>Développé pour les ODD 2, 13, 15</Text>
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
  userCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: '#FEF2F2',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 2,
  },
  dangerText: {
    color: '#EF4444',
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statsSection: {
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
});