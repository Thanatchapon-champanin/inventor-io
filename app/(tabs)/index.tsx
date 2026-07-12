import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '../../components/app-header';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { BORDER, CARD, MUTED, PRIMARY, PRIMARY_SOFT, RADIUS, SUCCESS } from '../../constants/inventor-theme';

// -----------------------------------------------------------------------
// Mock data — swap for your real stock/sales source
// -----------------------------------------------------------------------
const ACTIVITY = [
  { label: 'New items', value: '741', trend: '+2%' },
  { label: 'New orders', value: '123', trend: '+3%' },
  { label: 'Refunds', value: '12', trend: '-1%' },
];

const SALES = [
  { label: 'Confirmed', value: 0.9 },
  { label: 'Packed', value: 0.55 },
  { label: 'Refunded', value: 0.15 },
  { label: 'Shipped', value: 0.75 },
];

const CATEGORIES: { icon: keyof typeof Ionicons.glyphMap }[] = [
  { icon: 'shirt-outline' },
  { icon: 'download-outline' },
  { icon: 'bag-outline' },
  { icon: 'walk-outline' },
  { icon: 'accessibility-outline' },
  { icon: 'watch-outline' },
];

const QUICK_STATS = [
  { label: 'Low stock items', value: '12' },
  { label: 'Item categories', value: '6' },
  { label: 'Refunded items', value: '1' },
];

const STORES = ['Manchester, UK', 'Yorkshire, UK', 'Hull, UK', 'Leicester, UK'];

// -----------------------------------------------------------------------
// Small building blocks
// -----------------------------------------------------------------------
function SectionCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.sectionCard}>{children}</View>;
}

function SectionTitle({ children, onSeeMore }: { children: string; onSeeMore?: () => void }) {
  return (
    <View style={styles.sectionTitleRow}>
      <ThemedText type="defaultSemiBold">{children}</ThemedText>
      {onSeeMore && (
        <Pressable onPress={onSeeMore}>
          <ThemedText type="small" style={styles.seeMore}>
            See more
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}

// -----------------------------------------------------------------------
// Screen
// -----------------------------------------------------------------------
export default function HomeDashboard() {
  return (
    <ThemedView style={styles.container}>
      <AppHeader title="Inventor. io" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Recent activity */}
        <SectionTitle>Recent activity</SectionTitle>
        <View style={styles.activityRow}>
          {ACTIVITY.map((item) => (
            <View key={item.label} style={styles.activityCard}>
              <ThemedText type="title" style={styles.activityValue}>
                {item.value}
              </ThemedText>
              <ThemedText type="small" style={styles.activityLabel}>
                {item.label}
              </ThemedText>
              <ThemedText type="small" style={styles.activityTrend}>
                {item.trend}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Sales chart */}
        <SectionCard>
          <SectionTitle onSeeMore={() => {}}>Sales</SectionTitle>
          <View style={styles.chart}>
            {SALES.map((bar) => (
              <View key={bar.label} style={styles.chartBarWrap}>
                <View style={[styles.chartBar, { height: 90 * bar.value }]} />
                <ThemedText type="small" style={styles.chartLabel}>
                  {bar.label}
                </ThemedText>
              </View>
            ))}
          </View>
        </SectionCard>

        {/* Top item categories */}
        <SectionTitle onSeeMore={() => {}}>Top item categories</SectionTitle>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat, i) => (
            <View key={i} style={styles.categoryTile}>
              <Ionicons name={cat.icon} size={20} color={PRIMARY} />
            </View>
          ))}
        </View>

        {/* Quick stats */}
        <SectionCard>
          {QUICK_STATS.map((stat, i) => (
            <View
              key={stat.label}
              style={[styles.statRow, i === QUICK_STATS.length - 1 && { borderBottomWidth: 0 }]}>
              <ThemedText type="small" style={styles.statLabel}>
                {stat.label}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={{ color: PRIMARY }}>
                {stat.value}
              </ThemedText>
            </View>
          ))}
        </SectionCard>

        {/* Stores list */}
        <SectionTitle>Stores list</SectionTitle>
        <SectionCard>
          {STORES.map((store, i) => (
            <View
              key={store}
              style={[styles.storeRow, i === STORES.length - 1 && { borderBottomWidth: 0 }]}>
              <ThemedText type="small">{store}</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={MUTED} />
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 22,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  seeMore: {
    color: PRIMARY,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: CARD,
    borderRadius: RADIUS,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },

  // Recent activity
  activityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  activityCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: RADIUS,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  activityValue: { fontSize: 20 },
  activityLabel: { color: MUTED, marginTop: 2 },
  activityTrend: { color: SUCCESS, marginTop: 6, fontWeight: '600' },

  // Chart
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
    paddingHorizontal: 4,
  },
  chartBarWrap: {
    alignItems: 'center',
    gap: 6,
  },
  chartBar: {
    width: 22,
    borderRadius: 6,
    backgroundColor: PRIMARY,
  },
  chartLabel: {
    color: MUTED,
    fontSize: 10,
  },

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryTile: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: PRIMARY_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quick stats
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  statLabel: {
    color: MUTED,
  },

  // Stores
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
});