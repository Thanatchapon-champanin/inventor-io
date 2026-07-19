import { Feather } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const products = [
  {
    id: '1',
    name: 'SARIN SS SHIRT เสื้อเชิ้ตลายปัก SS unisex',
    stock: 24,
    category: 'Shirts & Tops',
    location: 'Aisle A1 (Main)',
    price: '฿1,700 - ฿1,790',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=60', 
  },
  {
    id: '2',
    name: '(พร้อมส่ง) Sarin Logo Long Sleeve T-Shirt เสื้อแขนยาว ผ้าบางเบา',
    stock: 89,
    category: 'T-Shirts & Sleeves',
    location: 'Aisle B2',
    price: '฿1,880',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60', 
  },
  {
    id: '3',
    name: 'SARIN A Dream knitwear นิตแวร์ เสื้อถักสำหรับฤดูร้อน ทอลายแบบพิเศษ',
    stock: 15,
    category: 'Knitwear & Polos',
    location: 'Warehouse Box 02',
    price: '฿941 - ฿1,190',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60', 
  },
];

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity><Feather name="menu" size={24} color="#555" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.avatarBucket}>
          <Feather name="user" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#888" style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Search products..." 
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <View style={styles.cardMain}>
              <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.productImage}
                resizeMode="cover"
              />
              
              <View style={styles.detailsContainer}>
                <Text style={styles.infoText}>Stock: {item.stock} in stock</Text>
                <Text style={styles.infoText}>Category: {item.category}</Text>
                <Text style={styles.infoText}>Location: {item.location}</Text>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#a855f7" />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.emojiIcon}>🏠</Text>
          <Text style={[styles.navText, { color: '#71717a' }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.emojiIcon}>➕</Text>
          <Text style={[styles.navText, { color: '#71717a' }]}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.emojiIcon}>📦</Text>
          <Text style={[styles.navText, { color: '#a855f7', fontWeight: 'bold' }]}>Products</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.emojiIcon}>📂</Text>
          <Text style={[styles.navText, { color: '#71717a' }]}>Categories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#a855f7', marginLeft: 24 },
  avatarBucket: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#a855f7', justifyContent: 'center', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  addButton: { backgroundColor: '#a855f7', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 8 },
  addButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  filterButton: { paddingVertical: 8 },
  filterButtonText: { color: '#a855f7', fontSize: 13 },
  listContainer: { flex: 1, padding: 16 },
  productCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#f3f4f6', position: 'relative' },
  cardMain: { flexDirection: 'row' },
  productImage: { width: 75, height: 75, borderRadius: 8, marginRight: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  detailsContainer: { flex: 1, paddingRight: 60 },
  infoText: { fontSize: 11, color: '#6b7280', marginBottom: 1 },
  productName: { fontSize: 14, fontWeight: '600', color: '#1f2937', marginTop: 2, lineHeight: 18 },
  productPrice: { fontSize: 13, fontWeight: 'bold', color: '#a855f7', marginTop: 4 },
  cardActions: { position: 'absolute', right: 16, bottom: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge: { backgroundColor: '#a855f7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#fff', 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#f3f4f6' 
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  emojiIcon: { fontSize: 24, marginBottom: 2 },
  navText: { fontSize: 12 },
});