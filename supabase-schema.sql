-- Create stores table
CREATE TABLE stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subdomain TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  template_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create templates table
CREATE TABLE templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  html_content TEXT NOT NULL,
  css_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample templates
INSERT INTO templates (id, name, description, html_content, css_content) VALUES
(
  'template-1',
  'Modern Store',
  'A clean, modern store template with gradient backgrounds',
  '<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{store_title}}</h1>
        <p class="text-lg text-gray-600">Welcome to our amazing store</p>
      </header>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-3xl mb-4">🛍️</div>
          <h3 class="text-xl font-semibold mb-2">Product 1</h3>
          <p class="text-gray-600 mb-4">Amazing product description</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buy Now
          </button>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-3xl mb-4">🎁</div>
          <h3 class="text-xl font-semibold mb-2">Product 2</h3>
          <p class="text-gray-600 mb-4">Another great product</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buy Now
          </button>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-3xl mb-4">🚀</div>
          <h3 class="text-xl font-semibold mb-2">Product 3</h3>
          <p class="text-gray-600 mb-4">Premium quality product</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>',
  '.container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .bg-gradient-to-br {
    background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
  }
  
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .hover\\:bg-blue-700:hover {
    background-color: #1d4ed8;
  }'
),
(
  'template-2',
  'Minimal Store',
  'A minimal, elegant store template with clean design',
  '<div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-16">
      <header class="text-center mb-16">
        <h1 class="text-5xl font-light text-gray-900 mb-6">{{store_title}}</h1>
        <div class="w-24 h-1 bg-gray-300 mx-auto"></div>
      </header>
      
      <div class="space-y-12">
        <div class="flex items-center justify-between p-8 bg-white border border-gray-200">
          <div class="flex items-center space-x-6">
            <div class="text-4xl">📱</div>
            <div>
              <h3 class="text-2xl font-medium text-gray-900">Premium Product</h3>
              <p class="text-gray-600 mt-2">High-quality product with amazing features</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-gray-900">$99</div>
            <button class="mt-2 px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
              Add to Cart
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-between p-8 bg-white border border-gray-200">
          <div class="flex items-center space-x-6">
            <div class="text-4xl">💎</div>
            <div>
              <h3 class="text-2xl font-medium text-gray-900">Luxury Item</h3>
              <p class="text-gray-600 mt-2">Exclusive luxury product</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-gray-900">$299</div>
            <button class="mt-2 px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
              Add to Cart
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-between p-8 bg-white border border-gray-200">
          <div class="flex items-center space-x-6">
            <div class="text-4xl">🎯</div>
            <div>
              <h3 class="text-2xl font-medium text-gray-900">Special Offer</h3>
              <p class="text-gray-600 mt-2">Limited time special offer</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-gray-900">$49</div>
            <button class="mt-2 px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>',
  '.max-w-4xl {
    max-width: 56rem;
  }
  
  .space-y-12 > * + * {
    margin-top: 3rem;
  }
  
  .font-light {
    font-weight: 300;
  }
  
  .hover\\:bg-gray-50:hover {
    background-color: #f9fafb;
  }'
);

-- Create indexes for better performance
CREATE INDEX idx_stores_subdomain ON stores(subdomain);
CREATE INDEX idx_stores_template_id ON stores(template_id);
CREATE INDEX idx_templates_id ON templates(id);

-- Enable Row Level Security (RLS)
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to stores" ON stores
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to templates" ON templates
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage stores
CREATE POLICY "Allow authenticated users to insert stores" ON stores
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update stores" ON stores
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete stores" ON stores
  FOR DELETE USING (true); 