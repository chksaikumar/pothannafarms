import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const db = getFirestore()
const auth = getAuth()

async function seed() {
  console.log('Starting seed...')

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@pothana.com'
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'admin123'

  const adminUser = await auth.createUser({
    email: adminEmail,
    password: adminPassword,
    emailVerified: true,
  })

  await auth.setCustomUserClaims(adminUser.uid, { role: 'admin' })
  await db.collection('users').doc(adminUser.uid).set({
    uid: adminUser.uid,
    email: adminEmail,
    displayName: 'Admin',
    role: 'admin',
    emailVerified: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  console.log('Created admin user:', adminEmail)

  const customerUser = await auth.createUser({
    email: 'customer@pothana.com',
    password: 'customer123',
    emailVerified: true,
  })

  await db.collection('users').doc(customerUser.uid).set({
    uid: customerUser.uid,
    email: 'customer@pothana.com',
    displayName: 'Customer',
    role: 'customer',
    emailVerified: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  console.log('Created customer user')

  const categories = [
    { name: 'Milk & Dairy', slug: 'milk', description: 'Fresh milk and dairy products', sortOrder: 1 },
    { name: 'Meats', slug: 'chicken', description: 'Country chicken and meats', sortOrder: 2 },
    { name: 'Poultry', slug: 'eggs', description: 'Free-range eggs', sortOrder: 3 },
    { name: 'Sweets', slug: 'sweets', description: 'Traditional sweets', sortOrder: 4 },
    { name: 'Produce', slug: 'vegetables', description: 'Fresh vegetables', sortOrder: 5 },
  ]

  for (const cat of categories) {
    await db.collection('categories').doc().set({
      ...cat,
      active: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }
  console.log('Created categories')

  const products = [
    { name: 'A2 Cow Milk', slug: 'a2-cow-milk', categoryName: 'Milk & Dairy', basePrice: 8500, shortDescription: 'Farm-fresh A2 milk from grass-fed Desi cows', fullDescription: 'Delivered within 24 hours of milking for maximum nutrition.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Free Range Eggs', slug: 'free-range-eggs', categoryName: 'Poultry', basePrice: 14000, shortDescription: 'Free-range eggs from pasture-raised hens', fullDescription: 'Nutrient-dense eggs from healthy hens.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Country Chicken', slug: 'country-chicken', categoryName: 'Meats', basePrice: 32000, shortDescription: 'Free-range country chicken', fullDescription: 'Tender, flavorful chicken from free-range farms.', minOrderQuantity: 1, maxOrderQuantity: 5 },
    { name: 'Farm Fresh Spinach', slug: 'farm-fresh-spinach', categoryName: 'Produce', basePrice: 4000, shortDescription: 'Crisp organic spinach', fullDescription: 'Perfect for salads or cooking.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Vine Ripe Tomatoes', slug: 'vine-ripe-tomatoes', categoryName: 'Produce', basePrice: 6000, shortDescription: 'Juicy sweet tomatoes', fullDescription: 'Grown without synthetic pesticides.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Earthy Carrots', slug: 'earthy-carrots', categoryName: 'Produce', basePrice: 5000, shortDescription: 'Sweet crunchy carrots', fullDescription: 'Straight from the rich soil.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Green Bell Peppers', slug: 'green-bell-peppers', categoryName: 'Produce', basePrice: 7000, shortDescription: 'Crisp vibrant bell peppers', fullDescription: 'Ideal for stuffing or stir-fries.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Fresh Milk', slug: 'fresh-milk', categoryName: 'Milk & Dairy', basePrice: 6000, shortDescription: 'Fresh whole milk', fullDescription: 'Pure farm-fresh milk.', minOrderQuantity: 1, maxOrderQuantity: 10 },
    { name: 'Fresh Curd', slug: 'fresh-curd', categoryName: 'Milk & Dairy', basePrice: 8000, shortDescription: 'Thick creamy curd', fullDescription: 'Made from fresh milk.', minOrderQuantity: 1, maxOrderQuantity: 5 },
    { name: 'Organic Rice', slug: 'organic-rice', categoryName: 'Grains & Pulses', basePrice: 12000, shortDescription: 'Premium organic rice', fullDescription: 'Naturally grown rice.', minOrderQuantity: 1, maxOrderQuantity: 5 },
    { name: 'Red Lentils', slug: 'red-lentils', categoryName: 'Grains & Pulses', basePrice: 14000, shortDescription: 'High-quality red lentils', fullDescription: 'Protein-rich pulses.', minOrderQuantity: 1, maxOrderQuantity: 5 },
    { name: 'Turmeric Powder', slug: 'turmeric-powder', categoryName: 'Spices', basePrice: 18000, shortDescription: 'Pure turmeric powder', fullDescription: 'Authentic Indian spices.', minOrderQuantity: 1, maxOrderQuantity: 5 },
  ]

  for (const product of products) {
    const productRef = db.collection('products').doc()
    await productRef.set({
      ...product,
      categoryId: product.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      discountPrice: undefined,
      images: [],
      sku: product.slug.toUpperCase().replace(/-/g, '_'),
      unit: product.categoryName.includes('Milk') || product.categoryName.includes('Curd') ? 'litre' : product.categoryName.includes('Egg') ? 'dozen' : product.categoryName.includes('Chicken') ? 'kg' : 'kg',
      stock: 100,
      lowStockThreshold: 10,
      tags: [product.categoryName.toLowerCase()],
      ingredients: '',
      shelfLife: '',
      storageInstructions: '',
      featured: true,
      active: true,
      subscriptionAvailable: true,
      seoTitle: product.name,
      seoDescription: product.shortDescription,
      averageRating: 0,
      reviewCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      deletedAt: null,
    })

    await db.collection('products').doc(productRef.id).collection('variants').doc().set({
      productId: productRef.id,
      name: 'Standard',
      sku: `${product.slug.toUpperCase().replace(/-/g, '_')}_STD`,
      unit: product.categoryName.includes('Milk') || product.categoryName.includes('Curd') ? 'litre' : product.categoryName.includes('Egg') ? 'dozen' : 'kg',
      weight: '1 kg',
      quantity: 1,
      price: product.basePrice,
      discountPrice: undefined,
      availableStock: 100,
      lowStockThreshold: 10,
      active: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }
  console.log('Created products with variants')

  const deliveryZones = [
    { name: 'Local', pincodes: ['500001', '500002', '500003'], deliveryCharge: 0, freeDeliveryThreshold: 50000, estimatedDays: '1-2 days', active: true },
    { name: 'Metro', pincodes: ['500001', '600001', '110001'], deliveryCharge: 3000, freeDeliveryThreshold: 100000, estimatedDays: '2-3 days', active: true },
  ]

  for (const zone of deliveryZones) {
    await db.collection('deliveryZones').doc().set({
      ...zone,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }
  console.log('Created delivery zones')

  const timeSlots = [
    { name: 'Morning (6AM - 9AM)', startTime: '06:00', endTime: '09:00', cutoffTime: '08:00', active: true },
    { name: 'Evening (4PM - 7PM)', startTime: '16:00', endTime: '19:00', cutoffTime: '18:00', active: true },
  ]

  for (const slot of timeSlots) {
    await db.collection('deliveryTimeSlots').doc().set({
      ...slot,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  }
  console.log('Created delivery time slots')

  await db.collection('settings').doc('general').set({
    key: 'general',
    value: { siteName: 'Pothana Farms', supportEmail: 'support@pothana.com' },
    updatedAt: FieldValue.serverTimestamp(),
  })

  console.log('Seed completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})