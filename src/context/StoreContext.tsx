import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { Product, CartItem, Order, SiteSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  settings: SiteSettings;
  cart: CartItem[];
  isCartOpen: boolean;
  theme: 'light' | 'dark';
  isAdminAuthenticated: boolean;
  adminEmail: string | null;
  isLoading: boolean;
  toggleTheme: () => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  toast: { message: string; type: 'success' | 'info' | 'error'; visible: boolean } | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alvera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('alvera_theme');
      return (saved as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('alvera_admin_logged') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('alvera_admin_email') || null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error'; visible: boolean } | null>(null);

  // Sync Theme to HTML document
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('alvera_theme', theme);
    } catch {}
  }, [theme]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('alvera_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdminAuthenticated(true);
        setAdminEmail(user.email);
        localStorage.setItem('alvera_admin_logged', 'true');
        localStorage.setItem('alvera_admin_email', user.email || '');
      } else {
        // If not logged via Firebase auth, keep local session if explicitly authenticated with standard demo credentials
        const localLogged = localStorage.getItem('alvera_admin_logged') === 'true';
        setIsAdminAuthenticated(localLogged);
      }
    });
    return () => unsubscribe();
  }, []);

  // Connect to Firestore Realtime Listeners & Auto-seed
  useEffect(() => {
    let unsubProducts: (() => void) | undefined;
    let unsubOrders: (() => void) | undefined;
    let unsubSettings: (() => void) | undefined;

    // Safety timeout ensures the UI is never blocked if network connection is slow
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const initFirestore = async () => {
      try {
        // 1. Check & Seed Settings if not present
        const settingsDocRef = doc(db, 'settings', 'general');
        unsubSettings = onSnapshot(settingsDocRef, async (snap) => {
          if (snap.exists()) {
            const data = snap.data() as SiteSettings;
            if (data.announcement && (data.announcement.toLowerCase().includes('frete') || data.announcement.toLowerCase().includes('grátis'))) {
              const cleaned = INITIAL_SETTINGS.announcement;
              try {
                await updateDoc(settingsDocRef, { announcement: cleaned });
              } catch {}
              setSettings({ ...INITIAL_SETTINGS, ...data, announcement: cleaned });
            } else {
              setSettings({ ...INITIAL_SETTINGS, ...data });
            }
          } else {
            // Seed default settings
            try {
              await setDoc(settingsDocRef, INITIAL_SETTINGS);
            } catch (e) {
              handleFirestoreError(e, OperationType.WRITE, 'settings/general');
            }
          }
        }, (err) => {
          handleFirestoreError(err, OperationType.GET, 'settings');
        });

        // 2. Realtime Products
        const productsCol = collection(db, 'products');
        unsubProducts = onSnapshot(productsCol, async (snapshot) => {
          if (snapshot.empty) {
            // Seed initial products
            try {
              for (const p of INITIAL_PRODUCTS) {
                await setDoc(doc(db, 'products', p.id), p);
              }
            } catch (e) {
              handleFirestoreError(e, OperationType.WRITE, 'products');
            }
          } else {
            const list: Product[] = [];
            snapshot.forEach((d) => {
              list.push({ id: d.id, ...d.data() } as Product);
            });
            // Sort by createdAt descending
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setProducts(list);
          }
          setIsLoading(false);
        }, (err) => {
          handleFirestoreError(err, OperationType.LIST, 'products');
          setIsLoading(false);
        });

        // 3. Realtime Orders
        const ordersCol = collection(db, 'orders');
        unsubOrders = onSnapshot(ordersCol, (snapshot) => {
          const list: Order[] = [];
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as Order);
          });
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(list);
        }, (err) => {
          handleFirestoreError(err, OperationType.LIST, 'orders');
        });

      } catch (error) {
        console.warn('Firestore initialization notice, using local fallbacks:', error);
        setIsLoading(false);
      }
    };

    initFirestore();

    return () => {
      clearTimeout(safetyTimer);
      if (unsubProducts) unsubProducts();
      if (unsubOrders) unsubOrders();
      if (unsubSettings) unsubSettings();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" adicionado à sacola de bem-estar.`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Admin Auth handling with demo credentials fallback
  const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
    const isMasterDemo = email.trim() === 'admin@x.com' && pass.trim() === 'admin4321';
    
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsAdminAuthenticated(true);
      setAdminEmail(email);
      localStorage.setItem('alvera_admin_logged', 'true');
      localStorage.setItem('alvera_admin_email', email);
      showToast('Bem-vindo à Área Administrativa Alvéra!', 'success');
      return true;
    } catch {
      // If Firebase Auth does not have this account registered yet, create it or accept master demo
      if (isMasterDemo) {
        try {
          await createUserWithEmailAndPassword(auth, email, pass);
        } catch {
          // Keep local session active
        }
        setIsAdminAuthenticated(true);
        setAdminEmail(email);
        localStorage.setItem('alvera_admin_logged', 'true');
        localStorage.setItem('alvera_admin_email', email);
        showToast('Login de Administrador autenticado com sucesso!', 'success');
        return true;
      }
      showToast('Credenciais inválidas. Verifique o e-mail e a senha.', 'error');
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await fbSignOut(auth);
    } catch {}
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
    localStorage.removeItem('alvera_admin_logged');
    localStorage.removeItem('alvera_admin_email');
    showToast('Sessão encerrada com sucesso.', 'info');
  };

  // Orders CRUD
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const newId = `ped_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'orders', newId), newOrder);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `orders/${newId}`);
      // Fallback local state
      setOrders((prev) => [newOrder, ...prev]);
    }

    // Decrement stock in Firestore
    for (const item of orderData.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        const newStock = Math.max(0, prod.stock - item.quantity);
        await updateProduct(prod.id, { stock: newStock });
      }
    }

    return newOrder;
  };

  const updateOrderStatus = async (
    orderId: string,
    status: Order['orderStatus'],
    paymentStatus?: Order['paymentStatus']
  ) => {
    const updates: Partial<Order> = { orderStatus: status };
    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
    }

    try {
      await updateDoc(doc(db, 'orders', orderId), updates);
      showToast(`Pedido #${orderId.slice(-6)} atualizado para ${status}.`, 'info');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `orders/${orderId}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o))
      );
    }
  };

  // Products CRUD
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newId = `prod_${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'products', newId), newProduct);
      showToast(`Produto "${newProduct.name}" cadastrado com sucesso!`, 'success');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `products/${newId}`);
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      showToast('Produto atualizado com sucesso.', 'success');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `products/${id}`);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      showToast('Produto removido da vitrine.', 'info');
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Site Settings CRUD
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = {
      ...settings,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'settings', 'general'), updated, { merge: true });
      showToast('Configurações da loja atualizadas com sucesso!', 'success');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'settings/general');
      setSettings(updated);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        settings,
        cart,
        isCartOpen,
        theme,
        isAdminAuthenticated,
        adminEmail,
        isLoading,
        toggleTheme,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        loginAdmin,
        logoutAdmin,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        showToast,
        toast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
