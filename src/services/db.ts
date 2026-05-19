import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Product, SiteSettings } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const isOffline = errorMessage.includes('offline') || errorMessage.includes('network');

  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  
  if (isOffline) {
    console.warn(`Firestore currently offline for ${operationType} on ${path}. Graceful fallback or queueing may occur.`);
  } else {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }

  // We only throw for write operations where data loss/sync is a priority error.
  // We don't throw for offline errors as Firestore handles queueing for writes and we use fallbacks for reads.
  if (!isOffline && (operationType === OperationType.WRITE || operationType === OperationType.DELETE || operationType === OperationType.CREATE)) {
    throw new Error(JSON.stringify(errInfo));
  }
}

export const dbService = {
  // Products
  async getProducts(): Promise<Product[]> {
    const path = 'products';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async saveProduct(product: Partial<Product>): Promise<string> {
    const path = 'products';
    try {
      const id = product.id || doc(collection(db, path)).id;
      const data = {
        ...product,
        createdAt: product.createdAt || new Date().toISOString(),
      };
      await setDoc(doc(db, path, id), data);
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      return '';
    }
  },

  async deleteProduct(id: string): Promise<void> {
    const path = `products/${id}`;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Settings
  async getSettings(): Promise<SiteSettings | null> {
    const path = 'settings/general';
    try {
      const snapshot = await getDoc(doc(db, 'settings', 'general'));
      return snapshot.exists() ? snapshot.data() as SiteSettings : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    const path = 'settings/general';
    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // Real-time Subscriptions
  subscribeProducts(callback: (products: Product[]) => void) {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      callback(products);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
  },

  subscribeSettings(callback: (settings: SiteSettings) => void) {
    const docRef = doc(db, 'settings', 'general');
    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as SiteSettings);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/general');
    });
  }
};
