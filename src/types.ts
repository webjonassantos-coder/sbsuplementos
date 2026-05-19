export interface Product {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  fullDescription: string;
  imageUrl: string;
  whatsappText: string;
  isKit: boolean;
  kitUnits: number;
  createdAt: string;
}

export interface SiteSettings {
  storeName: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  heroTitle: string;
  heroSubtitle: string;
  sacEmail: string;
  sacPhone: string;
}

export interface AdminUser {
  uid: string;
  email: string;
}
