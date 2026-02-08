'use client';

import { useState, useRef } from 'react';

type TipoContrato = 'servico' | 'freelancer' | 'nda';

interface DadosContrato {
  contratanteNome: string;
  contratanteCpfCnpj: string;
  contratanteEndereco: string;
  contratadoNome: string;
  contratadoCpfCnpj: string;
  contratadoEndereco: string;
  descricaoServico: string;
  prazoEntrega: string;
  valor: string;
  formaPagamento: string;
  prazoConfidencialidade: string;
  multaDescumprimento: string;
  cidade: string;
  foro: string;
}

const initialData: DadosContrato = {
  contratanteNome: '',
  contratanteCpfCnpj: '',
  contratanteEndereco: '',
  contratadoNome: '',
  contratadoCpfCnpj: '',
  contratadoEndereco: '',
  descricaoServico: '',
  prazoEntrega: '30 dias',
  valor: '',
  formaPagamento: 'À vista, via PIX',
  prazoConfidencialidade: '2 anos',
  multaDescumprimento: '10.000,00',
  cidade: '',
  foro: '',
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Home() {
  const [tipoContrato, setTipoContrato] = useState<TipoContrato>('servico');
  const [dados, setDados] = useState<DadosContrato>(initialData);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof DadosContrato, value: string) => {
    setDados((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => window.print();

  const tiposContrato = [
    { value: 'servico', label: 'Prestação de Serviços', desc: 'Contrato formal completo', icon: '📜' },
    { value: 'freelancer', label: 'Freelancer', desc: 'Para trabalhos pontuais', icon: '✍️' },
    { value: 'nda', label: 'Confidencialidade', desc: 'Proteção de informações', icon: '🔐' },
  ];

  return (
    <>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #contract-preview, #contract-preview * { visibility: visible; }
          #contract-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 60px;
            background: white !important;
            color: black !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <main className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
        {/* Paper texture overlay */}
        <div className="fixed inset-0 opacity-50 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
        
        {/* Decorative elements */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a365d] via-[#2c5282] to-[#1a365d]" />

        {/* Header */}
        <header className="relative z-10 pt-20 pb-16 px-6 no-print">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a365d]/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#1a365d] rounded-full" />
              <span className="text-[#1a365d] text-sm font-medium tracking-wide">Gerador Gratuito</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1a365d] mb-4 tracking-tight">
              Contratos
              <span className="block text-3xl md:text-4xl font-light text-[#4a5568] mt-2">Profissionais</span>
            </h1>
            <p className="text-[#718096] text-lg max-w-xl mx-auto leading-relaxed">
              Crie documentos jurídicos elegantes em minutos. Sem cadastro, sem complicação.
            </p>
          </div>
        </header>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
          {!showPreview ? (
            <>
              {/* Contract Type Selection */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-8 mb-8 no-print">
                <h2 className="text-sm font-semibold text-[#1a365d] uppercase tracking-widest mb-6">
                  Tipo de Documento
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {tiposContrato.map((tipo) => (
                    <button
                      key={tipo.value}
                      onClick={() => setTipoContrato(tipo.value as TipoContrato)}
                      className={`group relative p-6 rounded-xl text-left transition-all duration-300 ${
                        tipoContrato === tipo.value
                          ? 'bg-[#1a365d] text-white shadow-lg shadow-[#1a365d]/20'
                          : 'bg-[#f7fafc] hover:bg-[#edf2f7] text-[#2d3748]'
                      }`}
                    >
                      <span className="text-3xl mb-3 block">{tipo.icon}</span>
                      <span className="font-semibold block mb-1">{tipo.label}</span>
                      <span className={`text-sm ${tipoContrato === tipo.value ? 'text-white/70' : 'text-[#718096]'}`}>
                        {tipo.desc}
                      </span>
                      {tipoContrato === tipo.value && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-8 mb-8 no-print">
                <h2 className="text-sm font-semibold text-[#1a365d] uppercase tracking-widest mb-8">
                  Informações do Contrato
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Contratante */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#e2e8f0]">
                      <div className="w-8 h-8 rounded-lg bg-[#ebf4ff] flex items-center justify-center text-[#3182ce]">A</div>
                      <h3 className="font-semibold text-[#2d3748]">Contratante</h3>
                    </div>
                    {[
                      { field: 'contratanteNome', label: 'Nome / Razão Social', placeholder: 'Nome completo ou empresa' },
                      { field: 'contratanteCpfCnpj', label: 'CPF / CNPJ', placeholder: '000.000.000-00' },
                      { field: 'contratanteEndereco', label: 'Endereço', placeholder: 'Rua, número, cidade - UF' },
                    ].map((input) => (
                      <div key={input.field}>
                        <label className="block text-sm text-[#4a5568] mb-2">{input.label}</label>
                        <input
                          type="text"
                          value={dados[input.field as keyof DadosContrato]}
                          onChange={(e) => updateField(input.field as keyof DadosContrato, e.target.value)}
                          placeholder={input.placeholder}
                          className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] focus:ring-2 focus:ring-[#3182ce]/20 outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Contratado */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#e2e8f0]">
                      <div className="w-8 h-8 rounded-lg bg-[#faf5ff] flex items-center justify-center text-[#805ad5]">B</div>
                      <h3 className="font-semibold text-[#2d3748]">Contratado</h3>
                    </div>
                    {[
                      { field: 'contratadoNome', label: 'Nome / Razão Social', placeholder: 'Nome completo ou empresa' },
                      { field: 'contratadoCpfCnpj', label: 'CPF / CNPJ', placeholder: '000.000.000-00' },
                      { field: 'contratadoEndereco', label: 'Endereço', placeholder: 'Rua, número, cidade - UF' },
                    ].map((input) => (
                      <div key={input.field}>
                        <label className="block text-sm text-[#4a5568] mb-2">{input.label}</label>
                        <input
                          type="text"
                          value={dados[input.field as keyof DadosContrato]}
                          onChange={(e) => updateField(input.field as keyof DadosContrato, e.target.value)}
                          placeholder={input.placeholder}
                          className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#805ad5] focus:ring-2 focus:ring-[#805ad5]/20 outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Details */}
                {tipoContrato !== 'nda' ? (
                  <div className="mt-10 pt-8 border-t border-[#e2e8f0]">
                    <h3 className="font-semibold text-[#2d3748] mb-6">Objeto do Contrato</h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm text-[#4a5568] mb-2">Descrição do serviço</label>
                        <textarea
                          value={dados.descricaoServico}
                          onChange={(e) => updateField('descricaoServico', e.target.value)}
                          rows={3}
                          placeholder="Descreva detalhadamente o serviço a ser prestado..."
                          className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] focus:ring-2 focus:ring-[#3182ce]/20 outline-none transition-all resize-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-sm text-[#4a5568] mb-2">Prazo</label>
                          <input
                            type="text"
                            value={dados.prazoEntrega}
                            onChange={(e) => updateField('prazoEntrega', e.target.value)}
                            className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#4a5568] mb-2">Valor (R$)</label>
                          <input
                            type="text"
                            value={dados.valor}
                            onChange={(e) => updateField('valor', e.target.value)}
                            placeholder="5.000,00"
                            className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#4a5568] mb-2">Pagamento</label>
                          <input
                            type="text"
                            value={dados.formaPagamento}
                            onChange={(e) => updateField('formaPagamento', e.target.value)}
                            className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-10 pt-8 border-t border-[#e2e8f0]">
                    <h3 className="font-semibold text-[#2d3748] mb-6">Termos de Confidencialidade</h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm text-[#4a5568] mb-2">Informações protegidas</label>
                        <textarea
                          value={dados.descricaoServico}
                          onChange={(e) => updateField('descricaoServico', e.target.value)}
                          rows={3}
                          placeholder="Descreva as informações que serão protegidas..."
                          className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all resize-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm text-[#4a5568] mb-2">Prazo de confidencialidade</label>
                          <input
                            type="text"
                            value={dados.prazoConfidencialidade}
                            onChange={(e) => updateField('prazoConfidencialidade', e.target.value)}
                            className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#4a5568] mb-2">Multa (R$)</label>
                          <input
                            type="text"
                            value={dados.multaDescumprimento}
                            onChange={(e) => updateField('multaDescumprimento', e.target.value)}
                            className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="mt-10 pt-8 border-t border-[#e2e8f0]">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-[#4a5568] mb-2">Cidade de assinatura</label>
                      <input
                        type="text"
                        value={dados.cidade}
                        onChange={(e) => updateField('cidade', e.target.value)}
                        placeholder="São Paulo - SP"
                        className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#4a5568] mb-2">Foro</label>
                      <input
                        type="text"
                        value={dados.foro}
                        onChange={(e) => updateField('foro', e.target.value)}
                        placeholder="Comarca de São Paulo - SP"
                        className="w-full px-4 py-3 bg-[#f7fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:border-[#3182ce] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPreview(true)}
                  className="mt-10 w-full bg-[#1a365d] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#2c5282] transition-colors shadow-lg shadow-[#1a365d]/20"
                >
                  Gerar Contrato →
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Preview Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 mb-8 flex flex-wrap gap-3 no-print">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-5 py-2.5 border border-[#e2e8f0] rounded-lg hover:bg-[#f7fafc] transition-colors font-medium text-[#4a5568]"
                >
                  ← Editar
                </button>
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2c5282] transition-colors font-medium"
                >
                  Imprimir / PDF
                </button>
              </div>

              {/* Contract Preview */}
              <div
                id="contract-preview"
                ref={printRef}
                className="bg-white rounded-2xl shadow-lg border border-[#e2e8f0] p-12 md:p-16 max-w-3xl mx-auto"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <ContractContent tipo={tipoContrato} dados={dados} />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="relative z-10 text-center py-8 border-t border-[#e2e8f0] no-print">
          <p className="text-[#a0aec0] text-sm">
            Gerador de Contratos © 2025 • Recomendamos revisão por advogado
          </p>
        </footer>
      </main>
    </>
  );
}

function ContractContent({ tipo, dados }: { tipo: TipoContrato; dados: DadosContrato }) {
  const titles = {
    servico: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS',
    freelancer: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS AUTÔNOMOS',
    nda: 'TERMO DE CONFIDENCIALIDADE E SIGILO',
  };

  return (
    <div className="space-y-6 text-justify leading-relaxed text-[#2d3748]">
      <h1 className="text-2xl font-bold text-center tracking-wide text-[#1a365d] pb-6 border-b border-[#e2e8f0]">
        {titles[tipo]}
      </h1>

      <p className="text-[15px]">
        Pelo presente instrumento particular, de um lado <strong>{dados.contratanteNome || '[CONTRATANTE]'}</strong>, 
        inscrito no CPF/CNPJ sob o nº <strong>{dados.contratanteCpfCnpj || '[DOCUMENTO]'}</strong>
        {dados.contratanteEndereco && `, com endereço em ${dados.contratanteEndereco}`}, 
        doravante denominado <strong>CONTRATANTE</strong>, e de outro lado <strong>{dados.contratadoNome || '[CONTRATADO]'}</strong>, 
        inscrito no CPF/CNPJ sob o nº <strong>{dados.contratadoCpfCnpj || '[DOCUMENTO]'}</strong>
        {dados.contratadoEndereco && `, com endereço em ${dados.contratadoEndereco}`}, 
        doravante denominado <strong>CONTRATADO</strong>, têm entre si justo e acordado o presente contrato.
      </p>

      {tipo !== 'nda' && (
        <>
          <div>
            <h2 className="font-bold text-[#1a365d] mt-8 mb-3">CLÁUSULA PRIMEIRA – DO OBJETO</h2>
            <p className="text-[15px]">
              O presente contrato tem por objeto: <strong>{dados.descricaoServico || '[DESCRIÇÃO DO SERVIÇO]'}</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-[#1a365d] mt-8 mb-3">CLÁUSULA SEGUNDA – DO PRAZO</h2>
            <p className="text-[15px]">
              O prazo para execução é de <strong>{dados.prazoEntrega || '[PRAZO]'}</strong>, contados da assinatura.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-[#1a365d] mt-8 mb-3">CLÁUSULA TERCEIRA – DO VALOR</h2>
            <p className="text-[15px]">
              Pela execução, o CONTRATANTE pagará ao CONTRATADO <strong>R$ {dados.valor || '[VALOR]'}</strong>, 
              na forma: <strong>{dados.formaPagamento || '[FORMA DE PAGAMENTO]'}</strong>.
            </p>
          </div>
        </>
      )}

      {tipo === 'nda' && (
        <>
          <div>
            <h2 className="font-bold text-[#1a365d] mt-8 mb-3">1. INFORMAÇÕES CONFIDENCIAIS</h2>
            <p className="text-[15px]">
              Consideram-se confidenciais: <strong>{dados.descricaoServico || '[DESCRIÇÃO]'}</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-[#1a365d] mt-8 mb-3">2. PRAZO</h2>
            <p className="text-[15px]">
              Vigência de <strong>{dados.prazoConfidencialidade || '2 anos'}</strong> após a assinatura.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-[#1a365d] mt-8 mb-3">3. PENALIDADE</h2>
            <p className="text-[15px]">
              Multa de <strong>R$ {dados.multaDescumprimento || '10.000,00'}</strong> por descumprimento.
            </p>
          </div>
        </>
      )}

      <div>
        <h2 className="font-bold text-[#1a365d] mt-8 mb-3">{tipo === 'nda' ? '4. FORO' : 'CLÁUSULA QUARTA – DO FORO'}</h2>
        <p className="text-[15px]">
          Fica eleito o foro da <strong>{dados.foro || '[COMARCA]'}</strong>.
        </p>
      </div>

      <p className="mt-10 text-center text-[15px]">
        {dados.cidade || '[CIDADE]'}, {formatDate(new Date())}.
      </p>

      <div className="mt-20 grid grid-cols-2 gap-16">
        <div className="text-center">
          <div className="border-t-2 border-[#1a365d] pt-3">
            <p className="font-semibold text-[#1a365d]">CONTRATANTE</p>
            <p className="text-sm text-[#4a5568]">{dados.contratanteNome || '[Nome]'}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-[#1a365d] pt-3">
            <p className="font-semibold text-[#1a365d]">CONTRATADO</p>
            <p className="text-sm text-[#4a5568]">{dados.contratadoNome || '[Nome]'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
