import { useState } from 'react';
import { ImageUploadImgBB } from '../components/ImageUploadImgBB';

export default function UploadDemo() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Demonstração de Upload com ImgBB
            </h1>
            <p className="text-gray-600">
              Upload gratuito e ilimitado de imagens usando o serviço ImgBB
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <ImageUploadImgBB
                value={imageUrl}
                onChange={setImageUrl}
                label="Upload de Imagem"
                className="max-w-2xl"
              />
            </div>

            {imageUrl && (
              <div className="border-t pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Imagem Carregada
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>URL:</strong>
                  </p>
                  <div className="bg-white border border-gray-200 rounded p-2 break-all">
                    <code className="text-xs text-gray-700">{imageUrl}</code>
                  </div>
                  <div className="mt-4">
                    <img
                      src={imageUrl}
                      alt="Imagem carregada"
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Como Configurar
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Crie uma conta gratuita no <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="underline">ImgBB</a></li>
                  <li>Obtenha sua API key em <a href="https://api.imgbb.com/" target="_blank" rel="noopener noreferrer" className="underline">api.imgbb.com</a></li>
                  <li>Crie um arquivo `.env` na raiz do projeto</li>
                  <li>Adicione: <code className="bg-blue-100 px-1 rounded">VITE_IMGBB_API_KEY=sua_chave_aqui</code></li>
                  <li>Reinicie o servidor de desenvolvimento</li>
                </ol>
              </div>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Benefícios do ImgBB
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">✓ Gratuito</h3>
                  <p className="text-sm text-green-700">Sem custos para uploads básicos</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">✓ Ilimitado</h3>
                  <p className="text-sm text-green-700">Sem limite de número de imagens</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">✓ 64MB por imagem</h3>
                  <p className="text-sm text-green-700">Suporte para arquivos grandes</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">✓ API REST</h3>
                  <p className="text-sm text-green-700">Integração simples e confiável</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
