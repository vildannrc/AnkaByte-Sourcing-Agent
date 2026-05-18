'use client';

import { useState, useEffect } from 'react';

interface Supplier {
  id: number;
  name: string;
  category: string;
  location: string;
  price_score: number;
  quality_score: number;
  price_tl: number;
  contact: string;
  risk_level?: string;
  risk_reason?: string;
  recommendation?: string;
}

export default function Home() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const categories = ['electronics', 'computers', 'mobile'];

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getRiskIcon = (level?: string) => {
    switch (level) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '✅';
      default: return '❓';
    }
  };

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const url = category ? `/api/suppliers?category=${category}` : '/api/suppliers';
      const response = await fetch(url);
      const data = await response.json();
      setSuppliers(data);
      setAnalyzed(false);
    } catch (error) {
      console.error('Tedarikçi yükleme hatası:', error);
    }
    setLoading(false);
  };

  const analyzePrices = async () => {
    if (!product.trim()) {
      alert('Lütfen analiz edilecek ürünü belirtin');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, product })
      });

      const data = await response.json();
      if (data.error) {
        alert('Analiz hatası: ' + data.error);
        return;
      }

      setSuppliers(data.analyzed_suppliers);
      setAnalyzed(true);
    } catch (error) {
      console.error('Analiz hatası:', error);
      alert('Analiz sırasında hata oluştu');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSuppliers();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🚀 Sourcing Agent - Fahiş Fiyat Tespiti
        </h1>

        {/* Kontroller */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Seçin
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ürün Adı
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Örn: Laptop, Telefon, Elektronik parça..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={loadSuppliers}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Yükleniyor...' : 'Tedarikçileri Getir'}
              </button>
              <button
                onClick={analyzePrices}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                disabled={loading || !product.trim()}
              >
                {loading ? 'Analiz Ediliyor...' : 'AI Analizi Yap'}
              </button>
            </div>
          </div>

          {analyzed && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-800 text-sm">
                ✅ AI analizi tamamlandı! Risk seviyeleri hesaplandı.
              </p>
            </div>
          )}
        </div>

        {/* Tedarikçi Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all hover:shadow-lg ${
                analyzed ? getRiskColor(supplier.risk_level) : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {supplier.name}
                  </h3>
                  <p className="text-sm text-gray-600">{supplier.location}</p>
                </div>
                {analyzed && (
                  <span className="text-2xl" title={supplier.risk_level}>
                    {getRiskIcon(supplier.risk_level)}
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Kategori:</span>
                  <span className="text-sm font-medium">{supplier.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fiyat:</span>
                  <span className="text-sm font-medium">{supplier.price_tl} TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fiyat Skoru:</span>
                  <span className="text-sm font-medium">{supplier.price_score}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Kalite Skoru:</span>
                  <span className="text-sm font-medium">{supplier.quality_score}/10</span>
                </div>
              </div>

              {analyzed && supplier.risk_reason && (
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Risk:</strong> {supplier.risk_reason}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Tavsiye:</strong> {supplier.recommendation}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-3 border-t">
                <a
                  href={`mailto:${supplier.contact}`}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {supplier.contact}
                </a>
              </div>
            </div>
          ))}
        </div>

        {suppliers.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {category ? `${category} kategorisinde tedarikçi bulunamadı` : 'Tedarikçi bulunamadı'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
