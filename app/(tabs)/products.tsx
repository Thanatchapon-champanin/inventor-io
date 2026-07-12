import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppHeader } from '../../components/app-header';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { BORDER, CARD, MUTED, PRIMARY, PRIMARY_SOFT, RADIUS, SUCCESS, SUCCESS_SOFT } from '../../constants/inventor-theme';

// -----------------------------------------------------------------------
// Mock data — swap for your real product source
// -----------------------------------------------------------------------
type Product = {
  id: string;
  name: string;
  brand: string;
  stock: number;
  category: string;
  locations: number;
  status: 'Active' | 'Sold out';
  color: string;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Nike Air Max 90', brand: 'Nike', stock: 12, category: 'Sneakers', locations: 3, status: 'Active', color: '#FF6B6B' },
  { id: '2', name: 'Adidas Ultraboost', brand: 'Adidas', stock: 8, category: 'Sneakers', locations: 3, status: 'Active', color: '#4ECDC4' },
  { id: '3', name: 'Supreme Box Logo Hoodie', brand: 'Supreme', stock: 5, category: 'Hoodies', locations: 2, status: 'Active', color: '#FF0000' },
  { id: '4', name: 'Off-White Industrial Belt', brand: 'Off-White', stock: 0, category: 'Accessories', locations: 1, status: 'Sold out', color: '#FFE66D' },
  { id: '5', name: 'Gucci Ace Sneakers', brand: 'Gucci', stock: 15, category: 'Sneakers', locations: 4, status: 'Active', color: '#95E1D3' },
  { id: '6', name: 'Balenciaga Triple S', brand: 'Balenciaga', stock: 7, category: 'Sneakers', locations: 3, status: 'Active', color: '#F38181' },
];

// -----------------------------------------------------------------------
// Product row
// -----------------------------------------------------------------------
function ProductRow({ product }: { product: Product }) {
  const isActive = product.status === 'Active';
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}` as never)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <View style={[styles.thumb, { backgroundColor: product.color }]}>
        <Ionicons name="pricetag-outline" size={24} color="rgba(0,0,0,0.25)" />
      </View>

      <View style={styles.rowMain}>
        <ThemedText type="small" style={styles.brandText}>
          {product.brand}
        </ThemedText>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {product.name}
        </ThemedText>
        <ThemedText type="small" style={styles.rowMeta}>
          Stock: {product.stock} in stock · Category: {product.category}
        </ThemedText>
        <ThemedText type="small" style={styles.rowMeta}>
          Location: {product.locations} stores
        </ThemedText>

        <View style={[styles.statusPill, { backgroundColor: isActive ? SUCCESS_SOFT : '#FCEAEA' }]}>
          <View style={[styles.statusDot, { backgroundColor: isActive ? SUCCESS : '#E14848' }]} />
          <ThemedText type="small" style={{ color: isActive ? SUCCESS : '#E14848', fontWeight: '600' }}>
            {product.status}
          </ThemedText>
        </View>
      </View>

      <Pressable hitSlop={10}>
        <Ionicons name="ellipsis-vertical" size={16} color={MUTED} />
      </Pressable>
    </Pressable>
  );
}

// -----------------------------------------------------------------------
// Screen
// -----------------------------------------------------------------------
export default function ProductsScreen() {
  const [query, setQuery] = useState('');
  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <ThemedView style={styles.container}>
      <AppHeader title="Products" />

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={MUTED} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search products..."
            placeholderTextColor={MUTED}
            style={styles.searchInput}
          />
        </View>

        <Pressable style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.85 }]}>
          <Ionicons name="add" size={16} color="#fff" />
          <ThemedText type="small" style={styles.addButtonText}>
            Add Product
          </ThemedText>
        </Pressable>

        <Pressable style={styles.filterButton}>
          <ThemedText type="small" style={{ color: PRIMARY, fontWeight: '600' }}>
            Filter
          </ThemedText>
          <Ionicons name="options-outline" size={14} color={PRIMARY} />
        </Pressable>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductRow product={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F4F9',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 38,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: PRIMARY_SOFT,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 38,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: CARD,
    borderRadius: RADIUS,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'flex-start',
  },
  rowPressed: {
    opacity: 0.9,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowMain: {
    flex: 1,
    gap: 3,
  },
  rowMeta: {
    color: MUTED,
    fontSize: 11,
  },
  brandText: {
    color: PRIMARY,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});
