import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useContent } from '../context/ContentContext';
import { 
  Upload, Download, Plus, Trash2, Edit3, Save, X, 
  FileSpreadsheet, Package, AlertCircle, CheckCircle,
  ArrowLeft, Search, Filter
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { Product } from '../data/products';

export default function AdminCatalog() {
  const { isAdmin } = useContent();
  const navigate = useNavigate();
  
  if (!isAdmin) {
    navigate('/admin');
    return null;
  }

  const { 
    products, categories,
    addProduct, updateProduct, deleteProduct, importProducts, clearProducts
  } = useCatalog();
  
  const [activeTab, setActiveTab] = useState<'products' | 'import' | 'categories'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [importResult, setImportResult] = useState<{ success: number; errors: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter(p => 
    !searchQuery || 
    p.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

        const errors: string[] = [];
        const newProducts: Product[] = [];

        jsonData.forEach((row, index) => {
          try {
            const product: Product = {
              id: row['id'] || row['ID'] || `import-${Date.now()}-${index}`,
              partNumber: row['partNumber'] || row['Парт-номер'] || row['Артикул'] || '',
              name: row['name'] || row['Наименование'] || row['Название'] || '',
              manufacturer: row['manufacturer'] || row['Производитель'] || row['Бренд'] || '',
              category: row['category'] || row['Категория'] || 'ics',
              subcategory: row['subcategory'] || row['Подкатегория'] || '',
              description: row['description'] || row['Описание'] || '',
              note: row['note'] || row['Примечание'] || '',
              price: parseFloat(row['price'] || row['Цена'] || '0'),
              stock: parseInt(row['stock'] || row['Наличие'] || '0'),
              deliveryDays: parseInt(row['deliveryDays'] || row['Срок поставки'] || '7'),
              specs: {},
            };

            if (!product.partNumber || !product.name) {
              errors.push(`Строка ${index + 2}: отсутствуют обязательные поля (парт-номер или наименование)`);
              return;
            }

            newProducts.push(product);
          } catch (err) {
            errors.push(`Строка ${index + 2}: ошибка парсинга`);
          }
        });

        importProducts(newProducts);
        setImportResult({ success: newProducts.length, errors });
      } catch (err) {
        setImportResult({ success: 0, errors: ['Ошибка чтения файла. Проверьте формат.'] });
      }
    };
    reader.readAsArrayBuffer(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadTemplate = () => {
    const template = [
      {
        'Парт-номер': 'RC0402FR-0710KL',
        'Наименование': 'Резистор SMD 0402 10кОм 1%',
        'Производитель': 'Yageo',
        'Категория': 'resistors',
        'Подкатегория': 'smd-resistors',
        'Описание': 'SMD резистор в корпусе 0402',
        'Примечание': 'Минимальная партия 10000шт',
        'Цена': 0.003,
        'Наличие': 2500000,
        'Срок поставки': 3,
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Товары');
    XLSX.writeFile(wb, 'шаблон_импорта_товаров.xlsx');
  };

  const handleExport = () => {
    const exportData = products.map(p => ({
      'id': p.id,
      'Парт-номер': p.partNumber,
      'Наименование': p.name,
      'Производитель': p.manufacturer,
      'Категория': p.category,
      'Подкатегория': p.subcategory,
      'Описание': p.description,
      'Примечание': p.note,
      'Цена': p.price,
      'Наличие': p.stock,
      'Срок поставки': p.deliveryDays,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Товары');
    XLSX.writeFile(wb, 'каталог_товаров.xlsx');
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const saveEdit = () => {
    if (editingId && editData) {
      updateProduct(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      partNumber: '',
      name: 'Новый товар',
      manufacturer: '',
      category: 'ics',
      subcategory: '',
      description: '',
      note: '',
      price: 0,
      stock: 0,
      deliveryDays: 7,
      specs: {},
    };
    addProduct(newProduct);
    startEdit(newProduct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">Управление каталогом</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{products.length}</div>
          <div className="text-sm text-slate-500">Товаров</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-green-600">{categories.length}</div>
          <div className="text-sm text-slate-500">Категорий</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(products.map(p => p.manufacturer)).size}
          </div>
          <div className="text-sm text-slate-500">Производителей</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-2xl font-bold text-amber-600">
            {products.filter(p => p.stock > 0).length}
          </div>
          <div className="text-sm text-slate-500">В наличии</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {[
          { id: 'products', label: 'Товары', icon: Package },
          { id: 'import', label: 'Импорт / Экспорт', icon: Upload },
          { id: 'categories', label: 'Категории', icon: Filter },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-600 hover:text-blue-600'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по парт-номеру, названию, производителю..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={addNewProduct}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} /> Добавить товар
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Парт-номер</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Наименование</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Производитель</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600">Цена</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600">Наличие</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                      {editingId === product.id ? (
                        <>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={editData.partNumber || ''}
                              onChange={(e) => setEditData({ ...editData, partNumber: e.target.value })}
                              className="w-full px-2 py-1 border border-blue-300 rounded text-xs font-mono"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={editData.name || ''}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="w-full px-2 py-1 border border-blue-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={editData.manufacturer || ''}
                              onChange={(e) => setEditData({ ...editData, manufacturer: e.target.value })}
                              className="w-full px-2 py-1 border border-blue-300 rounded"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="number"
                              step="0.0001"
                              value={editData.price || 0}
                              onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                              className="w-24 px-2 py-1 border border-blue-300 rounded text-right"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="number"
                              value={editData.stock || 0}
                              onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })}
                              className="w-24 px-2 py-1 border border-blue-300 rounded text-right"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex gap-1">
                              <button onClick={saveEdit} className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600">
                                <Save size={14} />
                              </button>
                              <button onClick={cancelEdit} className="p-1.5 bg-slate-300 text-slate-700 rounded hover:bg-slate-400">
                                <X size={14} />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4 font-mono text-xs text-blue-600">{product.partNumber}</td>
                          <td className="py-3 px-4 font-medium text-slate-800">{product.name}</td>
                          <td className="py-3 px-4 text-slate-600">{product.manufacturer}</td>
                          <td className="py-3 px-4 text-right">${product.price.toFixed(4)}</td>
                          <td className="py-3 px-4 text-right">{product.stock.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              <button onClick={() => startEdit(product)} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                                <Edit3 size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  if (confirm('Удалить товар?')) deleteProduct(product.id);
                                }}
                                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {searchQuery ? 'Ничего не найдено' : 'Каталог пуст. Добавьте товары или импортируйте из Excel.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Import/Export tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FileSpreadsheet size={20} className="text-green-600" />
              Импорт из Excel / CSV
            </h2>
            <p className="text-slate-600 mb-4">
              Загрузите файл с товарами. Поддерживаются форматы XLS, XLSX, CSV. 
              Если товар с таким ID уже существует — он будет обновлён, иначе — добавлен как новый.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={handleDownloadTemplate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"
              >
                <Download size={16} /> Скачать шаблон
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
              >
                <Upload size={16} /> Загрузить файл
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleImport}
                className="hidden"
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-medium text-slate-700 mb-2">Ожидаемые столбцы:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-slate-600">
                <div><code className="bg-white px-1 rounded">Парт-номер</code> *</div>
                <div><code className="bg-white px-1 rounded">Наименование</code> *</div>
                <div><code className="bg-white px-1 rounded">Производитель</code></div>
                <div><code className="bg-white px-1 rounded">Категория</code></div>
                <div><code className="bg-white px-1 rounded">Описание</code></div>
                <div><code className="bg-white px-1 rounded">Цена</code></div>
                <div><code className="bg-white px-1 rounded">Наличие</code></div>
                <div><code className="bg-white px-1 rounded">Срок поставки</code></div>
                <div><code className="bg-white px-1 rounded">Примечание</code></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">* — обязательные поля</p>
            </div>

            {importResult && (
              <div className={`mt-4 p-4 rounded-lg ${importResult.errors.length === 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {importResult.errors.length === 0 ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : (
                    <AlertCircle size={18} className="text-amber-600" />
                  )}
                  <span className="font-medium">
                    Импортировано: {importResult.success} товаров
                  </span>
                </div>
                {importResult.errors.length > 0 && (
                  <div className="text-sm text-amber-800">
                    <div className="font-medium mb-1">Ошибки:</div>
                    <ul className="list-disc list-inside">
                      {importResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Download size={20} className="text-blue-600" />
              Экспорт каталога
            </h2>
            <p className="text-slate-600 mb-4">
              Выгрузите текущий каталог в Excel для редактирования или архивации.
            </p>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <Download size={16} /> Экспортировать в Excel
            </button>
          </div>

          <div className="bg-red-50 rounded-xl border border-red-200 p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Опасная зона</h2>
            <p className="text-red-700 mb-4 text-sm">
              Очистка каталога удалит все товары. Это действие нельзя отменить. 
              Рекомендуем сначала сделать экспорт.
            </p>
            <button
              onClick={() => {
                if (confirm('Вы уверены? Все товары будут удалены!')) {
                  if (confirm('Точно удалить ВСЕ товары?')) {
                    clearProducts();
                  }
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 size={16} /> Очистить каталог
            </button>
          </div>
        </div>
      )}

      {/* Categories tab */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Категории каталога</h2>
          <div className="space-y-4">
            {categories.map(cat => (
              <div key={cat.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                  <span className="text-sm text-slate-500">ID: {cat.id}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {cat.subcategories.map(sub => (
                    <div key={sub.id} className="text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded">
                      {sub.name} ({sub.count})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Управление категориями доступно через редактирование файла данных. 
            Для добавления новых категорий обратитесь к разработчику.
          </p>
        </div>
      )}
    </div>
  );
}
