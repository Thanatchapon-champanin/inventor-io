import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '../../components/app-header';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { BORDER, CARD, MUTED, PRIMARY, PRIMARY_SOFT, RADIUS, SUCCESS } from '../../constants/inventor-theme';

import productsData from '../../products.json';

export default function AnalyticsScreen() {
  const totalProducts = productsData.length;
  const totalStock = productsData.reduce((sum, item) => sum + Number(item.stock || 0), 0);
  const lowStockItems = productsData.filter(item => Number(item.stock || 0) <= 5).length;

  const PERFORMANCE = [
    { label: 'Total Items Type', value: `${totalProducts} Types`, icon: 'cube-outline' as const },
    { label: 'Total Stock Quantity', value: `${totalStock} Units`, icon: 'layers-outline' as const },
    { label: 'Low Stock Alert', value: `${lowStockItems} Items`, icon: 'alert-circle-outline' as const },
  ];

  const MONTHLY_REVENUE = [
    { month: 'Jan', value: 0.4 },
    { month: 'Feb', value: 0.65 },
    { month: 'Mar', value: 0.85 },
    { month: 'Apr', value: 0.5 },
    { month: 'May', value: 0.75 },
    { month: 'Jun', value: 0.95 },
  ];

  return (
    <ThemedView style={styles.container}>
      <AppHeader title="Analytics & Reports" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ส่วนสรุปตัวเลขสถิติคลังสินค้า */}
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Inventory Overview</ThemedText>
        <View style={styles.statsGrid}>
          {PERFORMANCE.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={22} color={PRIMARY} />
              </View>
              <ThemedText type="small" style={{ color: MUTED, marginTop: 8 }}>{item.label}</ThemedText>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 18, marginTop: 4, color: item.label === 'Low Stock Alert' && lowStockItems > 0 ? '#E14848' : PRIMARY }}>
                {item.value}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* ส่วนแสดงกราฟแนวโน้มความเคลื่อนไหวคลังสินค้าประจำเดือน */}
        <View style={styles.sectionCard}>
          <View style={styles.titleRow}>
            <ThemedText type="defaultSemiBold">Stock Movement Trend</ThemedText>
            <Ionicons name="trending-up" size={18} color={SUCCESS} />
          </View>
          
          <View style={styles.chartContainer}>
            {MONTHLY_REVENUE.map((bar) => (
              <View key={bar.month} style={styles.chartBarWrap}>
                <View style={[styles.chartBar, { height: 100 * bar.value }]} />
                <ThemedText type="small" style={styles.chartLabel}>
                  {bar.month}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* ส่วนรายงานสรุปสถานะการกระจายสินค้า */}
        <View style={styles.sectionCard}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12 }}>Stock Distribution Report</ThemedText>
          
          <View style={styles.reportRow}>
            <ThemedText type="small" style={{ color: MUTED }}>Active Items Status</ThemedText>
            <ThemedText type="defaultSemiBold" style={{ color: SUCCESS }}>Stable</ThemedText>
          </View>
          <View style={styles.reportRow}>
            <ThemedText type="small" style={{ color: MUTED }}>Warehouse Capacity</ThemedText>
            <ThemedText type="defaultSemiBold">42% In Use</ThemedText>
          </View>
          <View style={[styles.reportRow, { borderBottomWidth: 0 }]}>
            <ThemedText type="small" style={{ color: MUTED }}>Data Source Synchronization</ThemedText>
            <ThemedText type="small" style={{ color: PRIMARY, fontWeight: '600' }}>products.json (Local)</ThemedText>
          </View>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  sectionTitle: {
    marginBottom: -4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: RADIUS,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: PRIMARY_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCard: {
    backgroundColor: CARD,
    borderRadius: RADIUS,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  chartBarWrap: {
    alignItems: 'center',
    gap: 6,
  },
  chartBar: {
    width: 28,
    borderRadius: 6,
    backgroundColor: PRIMARY,
  },
  chartLabel: {
    color: MUTED,
    fontSize: 11,
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
});