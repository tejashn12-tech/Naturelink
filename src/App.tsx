import React, { useState, useEffect } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DarkFeatureBanner } from './components/DarkFeatureBanner';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { TrustDocumentsSection } from './components/TrustDocumentsSection';
import { ProductGallerySection } from './components/ProductGallerySection';
import { QuoteBanner } from './components/QuoteBanner';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { DocumentInspectionModal } from './components/DocumentInspectionModal';
import { ServiceItem, ProductItem, TrustDocument, QuoteInquiry } from './types';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredTrustDocs,
  saveStoredTrustDocs,
  getStoredQuotes,
  saveStoredQuotes,
  getAdminAuth,
  setAdminAuth,
} from './data/storage';
import { ShieldCheck, Plus, Bell, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Products, Trust Documents & Quote Leads State (persistent with initial seed)
  const [products, setProducts] = useState<ProductItem[]>(() => getStoredProducts());
  const [trustDocs, setTrustDocs] = useState<TrustDocument[]>(() => getStoredTrustDocs());
  const [quotes, setQuotes] = useState<QuoteInquiry[]>(() => getStoredQuotes());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => getAdminAuth());

  // Real-time admin notification toast
  const [adminAlert, setAdminAlert] = useState<QuoteInquiry | null>(null);

  // Modal Visibility States
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState('Exotic Indoor Flora');
  const [selectedItem, setSelectedItem] = useState<ServiceItem | ProductItem | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<TrustDocument | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'quotes' | 'products' | 'trust-docs'>('quotes');

  // Sync state to localStorage
  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  useEffect(() => {
    saveStoredTrustDocs(trustDocs);
  }, [trustDocs]);

  useEffect(() => {
    saveStoredQuotes(quotes);
  }, [quotes]);

  const unreadQuotesCount = quotes.filter((q) => !q.isRead).length;

  // Quote Submission Handler (Admin gets immediately notified!)
  const handleQuoteSubmitted = (newQuote: QuoteInquiry) => {
    setQuotes((prev) => [newQuote, ...prev]);
    setAdminAlert(newQuote);
  };

  const handleUpdateQuoteStatus = (
    quoteId: string,
    status: QuoteInquiry['status'],
    isRead?: boolean
  ) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) {
          return {
            ...q,
            status,
            isRead: isRead !== undefined ? isRead : q.isRead,
          };
        }
        return q;
      })
    );
  };

  const handleDeleteQuote = (quoteId: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
  };

  const handleMarkAllQuotesRead = () => {
    setQuotes((prev) => prev.map((q) => ({ ...q, isRead: true })));
  };

  // Product CRUD Handlers
  const handleAddProduct = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: ProductItem) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Trust Documents CRUD Handlers
  const handleAddTrustDoc = (newDoc: TrustDocument) => {
    setTrustDocs((prev) => [newDoc, ...prev]);
  };

  const handleUpdateTrustDoc = (updatedDoc: TrustDocument) => {
    setTrustDocs((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
  };

  const handleDeleteTrustDoc = (docId: string) => {
    setTrustDocs((prev) => prev.filter((d) => d.id !== docId));
  };

  // Admin Auth Handlers
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setAdminAuth(true);
    setAdminInitialTab('quotes');
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminAuth(false);
    setIsAdminPanelOpen(false);
  };

  const handleOpenQuote = (category?: string) => {
    if (category) {
      setQuoteCategory(category);
    }
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedItem(service);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedItem(product);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAdminQuotesTab = () => {
    setAdminInitialTab('quotes');
    setIsAdminPanelOpen(true);
    if (adminAlert) setAdminAlert(null);
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col selection:bg-emerald-500 selection:text-white bg-neutral-950/20">
      {/* 3D Video Frame Canvas Scroll Background */}
      <CanvasBackground />

      {/* Admin Quick Action Banner */}
      {isAdmin && (
        <div className="bg-neutral-950/90 backdrop-blur-md text-white px-4 py-2 border-b border-neutral-800 text-xs flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2 max-w-[1240px] mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-neutral-300">Admin Mode:</span>
              <span className="font-bold text-white">admin@123</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => openAdminQuotesTab()}
                className="bg-neutral-900/80 hover:bg-neutral-800 text-white font-semibold px-3 py-1 rounded-full text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
              >
                <Bell className="w-3 h-3 text-amber-400" />
                <span>Quote Leads ({quotes.length})</span>
                {unreadQuotesCount > 0 && (
                  <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full animate-pulse shadow-xs">
                    {unreadQuotesCount} new
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setAdminInitialTab('products');
                  setIsAdminPanelOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1 rounded-full text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span className="hidden sm:inline">Manage Catalog & Docs</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-neutral-400 hover:text-white text-[11px] underline cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Header / Navigation Bar */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        isAdmin={isAdmin}
        unreadQuotesCount={unreadQuotesCount}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPanel={() => openAdminQuotesTab()}
        onLogout={handleLogout}
      />

      {/* Main Content Sections with Glassmorphism to reveal 3D scroll canvas */}
      <main className="relative z-10 flex-1 w-full space-y-12">
        {/* 2. Hero Section */}
        <HeroSection
          onOpenQuote={() => handleOpenQuote()}
          onExploreServices={handleScrollToServices}
        />

        {/* 3. Dark Feature Banner */}
        <DarkFeatureBanner
          onLearnMore={handleScrollToServices}
        />

        {/* 4. Our Services */}
        <ServicesSection
          onSelectService={handleSelectService}
          onViewAllServices={handleScrollToServices}
        />

        {/* 5. Complete Turnkey Process */}
        <ProcessSection />

        {/* 6. Public Trust & Verification Documents Section */}
        <TrustDocumentsSection
          documents={trustDocs}
          isAdmin={isAdmin}
          onInspectDocument={(doc) => setSelectedDoc(doc)}
          onOpenAdminPanel={() => {
            setAdminInitialTab('trust-docs');
            setIsAdminPanelOpen(true);
          }}
        />

        {/* 7. Product Gallery / Featured Collections */}
        <ProductGallerySection
          products={products}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => {
            setAdminInitialTab('products');
            setIsAdminPanelOpen(true);
          }}
          onSelectProduct={handleSelectProduct}
          onViewAllCategories={handleScrollToGallery}
        />

        {/* 8. Bottom Quote / Estimate Banner */}
        <QuoteBanner
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>

      {/* 9. Clean Footer */}
      <Footer />

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        defaultCategory={quoteCategory}
        onQuoteSubmitted={handleQuoteSubmitted}
      />

      <ProductDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOrderOrInquire={(title) => {
          setSelectedItem(null);
          handleOpenQuote(title);
        }}
      />

      <DocumentInspectionModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onLogout={handleLogout}
        products={products}
        trustDocs={trustDocs}
        quotes={quotes}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddTrustDoc={handleAddTrustDoc}
        onUpdateTrustDoc={handleUpdateTrustDoc}
        onDeleteTrustDoc={handleDeleteTrustDoc}
        onUpdateQuoteStatus={handleUpdateQuoteStatus}
        onDeleteQuote={handleDeleteQuote}
        onMarkAllQuotesRead={handleMarkAllQuotesRead}
        initialTab={adminInitialTab}
      />

      {/* Real-time Admin Notification Toast */}
      {adminAlert && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-neutral-950/90 backdrop-blur-xl text-white rounded-2xl p-4 shadow-2xl border border-amber-500/40 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">
                    NEW QUOTE
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">#{adminAlert.id}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  {adminAlert.customerName}
                </h4>
                <p className="text-[11px] text-neutral-300">
                  {adminAlert.plantCount} plants ({adminAlert.category}) to {adminAlert.locality}
                </p>
                <div className="text-xs font-bold text-emerald-400 mt-1">
                  Estimated Total: ₹{adminAlert.estimatedTotal.toLocaleString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => setAdminAlert(null)}
              className="text-neutral-500 hover:text-white p-1 rounded-lg"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-800">
            <button
              onClick={() => openAdminQuotesTab()}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-1.5 px-3 rounded-full flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Review in Admin Panel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAdminAlert(null)}
              className="text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
