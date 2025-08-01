import { type Template as SupabaseTemplate } from "./supabase";

export interface TemplateData extends Omit<SupabaseTemplate, "created_at"> {
  created_at?: string;
}

export const sampleTemplates: TemplateData[] = [
  {
    id: "template-1",
    name: "Modern Store",
    description: "A clean, modern store template with gradient backgrounds",
    html_content: `
      <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
      </div>
    `,
    css_content: `
      .container {
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
      }
    `,
  },
  {
    id: "template-2",
    name: "Minimal Store",
    description: "A minimal, elegant store template with clean design",
    html_content: `
      <div class="min-h-screen bg-gray-50">
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
      </div>
    `,
    css_content: `
      .max-w-4xl {
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
      }
    `,
  },
];

export function renderTemplate(
  template: TemplateData,
  storeTitle: string
): string {
  return template.html_content.replace("{{store_title}}", storeTitle);
}
