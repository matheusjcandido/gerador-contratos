'use client';

import { useState, useRef } from 'react';

type TipoContrato = 'servico' | 'freelancer' | 'nda';

interface DadosContrato {
  // Partes
  contratanteNome: string;
  contratanteCpfCnpj: string;
  contratanteEndereco: string;
  contratadoNome: string;
  contratadoCpfCnpj: string;
  contratadoEndereco: string;
  // Serviço
  descricaoServico: string;
  prazoEntrega: string;
  valor: string;
  formaPagamento: string;
  // NDA específico
  prazoConfidencialidade: string;
  multaDescumprimento: string;
  // Geral
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
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Home() {
  const [tipoContrato, setTipoContrato] = useState<TipoContrato>('servico');
  const [dados, setDados] = useState<DadosContrato>(initialData);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof DadosContrato, value: string) => {
    setDados((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const tiposContrato = [
    { value: 'servico', label: 'Prestação de Serviços', icon: '📋', desc: 'Contrato padrão de serviços' },
    { value: 'freelancer', label: 'Freelancer/Autônomo', icon: '💼', desc: 'Para trabalhos pontuais' },
    { value: 'nda', label: 'Confidencialidade (NDA)', icon: '🔒', desc: 'Proteção de informações' },
  ];

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #contract-preview, #contract-preview * {
            visibility: visible;
          }
          #contract-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
            font-size: 12pt;
            line-height: 1.6;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-indigo-600 text-white py-8 px-4 no-print">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              📄 Gerador de Contratos
            </h1>
            <p className="text-indigo-100 text-lg">
              Crie contratos profissionais em minutos - 100% grátis
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {!showPreview ? (
            <>
              {/* Tipo de Contrato */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 no-print">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  1. Escolha o tipo de contrato
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {tiposContrato.map((tipo) => (
                    <button
                      key={tipo.value}
                      onClick={() => setTipoContrato(tipo.value as TipoContrato)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        tipoContrato === tipo.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{tipo.icon}</div>
                      <div className="font-semibold">{tipo.label}</div>
                      <div className="text-sm text-gray-500">{tipo.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulário */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 no-print">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  2. Preencha os dados
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contratante */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-indigo-600 border-b pb-2">
                      👤 CONTRATANTE
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo / Razão Social
                      </label>
                      <input
                        type="text"
                        value={dados.contratanteNome}
                        onChange={(e) => updateField('contratanteNome', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: João da Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF / CNPJ
                      </label>
                      <input
                        type="text"
                        value={dados.contratanteCpfCnpj}
                        onChange={(e) => updateField('contratanteCpfCnpj', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 123.456.789-00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço completo
                      </label>
                      <input
                        type="text"
                        value={dados.contratanteEndereco}
                        onChange={(e) => updateField('contratanteEndereco', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Rua, número, bairro, cidade - UF"
                      />
                    </div>
                  </div>

                  {/* Contratado */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-indigo-600 border-b pb-2">
                      👤 CONTRATADO
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo / Razão Social
                      </label>
                      <input
                        type="text"
                        value={dados.contratadoNome}
                        onChange={(e) => updateField('contratadoNome', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: Maria Souza"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF / CNPJ
                      </label>
                      <input
                        type="text"
                        value={dados.contratadoCpfCnpj}
                        onChange={(e) => updateField('contratadoCpfCnpj', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 987.654.321-00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço completo
                      </label>
                      <input
                        type="text"
                        value={dados.contratadoEndereco}
                        onChange={(e) => updateField('contratadoEndereco', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Rua, número, bairro, cidade - UF"
                      />
                    </div>
                  </div>
                </div>

                {/* Serviço */}
                {tipoContrato !== 'nda' && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-indigo-600 border-b pb-2">
                      📋 OBJETO DO CONTRATO
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição do serviço
                      </label>
                      <textarea
                        value={dados.descricaoServico}
                        onChange={(e) => updateField('descricaoServico', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Descreva detalhadamente o serviço a ser prestado..."
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prazo de entrega
                        </label>
                        <input
                          type="text"
                          value={dados.prazoEntrega}
                          onChange={(e) => updateField('prazoEntrega', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 30 dias"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Valor (R$)
                        </label>
                        <input
                          type="text"
                          value={dados.valor}
                          onChange={(e) => updateField('valor', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 5.000,00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Forma de pagamento
                        </label>
                        <input
                          type="text"
                          value={dados.formaPagamento}
                          onChange={(e) => updateField('formaPagamento', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 50% entrada, 50% entrega"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* NDA específico */}
                {tipoContrato === 'nda' && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-indigo-600 border-b pb-2">
                      🔒 TERMOS DE CONFIDENCIALIDADE
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Informações confidenciais (descreva)
                      </label>
                      <textarea
                        value={dados.descricaoServico}
                        onChange={(e) => updateField('descricaoServico', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Descreva as informações que serão protegidas..."
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prazo de confidencialidade
                        </label>
                        <input
                          type="text"
                          value={dados.prazoConfidencialidade}
                          onChange={(e) => updateField('prazoConfidencialidade', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 2 anos"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Multa por descumprimento (R$)
                        </label>
                        <input
                          type="text"
                          value={dados.multaDescumprimento}
                          onChange={(e) => updateField('multaDescumprimento', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Ex: 10.000,00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Localidade */}
                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold text-indigo-600 border-b pb-2">
                    📍 LOCALIDADE
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade de assinatura
                      </label>
                      <input
                        type="text"
                        value={dados.cidade}
                        onChange={(e) => updateField('cidade', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: São Paulo - SP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Foro (cidade para resolver disputas)
                      </label>
                      <input
                        type="text"
                        value={dados.foro}
                        onChange={(e) => updateField('foro', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: Comarca de São Paulo - SP"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPreview(true)}
                  className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors"
                >
                  📄 Gerar Contrato
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Preview Actions */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex gap-4 no-print">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Voltar e Editar
                </button>
                <button
                  onClick={handlePrint}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  🖨️ Imprimir / Salvar PDF
                </button>
              </div>

              {/* Contract Preview */}
              <div
                id="contract-preview"
                ref={printRef}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                {tipoContrato === 'servico' && (
                  <ContratoServico dados={dados} />
                )}
                {tipoContrato === 'freelancer' && (
                  <ContratoFreelancer dados={dados} />
                )}
                {tipoContrato === 'nda' && (
                  <ContratoNDA dados={dados} />
                )}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center mt-8 no-print">
            <h3 className="text-2xl font-bold mb-3">
              📊 Precisa organizar suas finanças?
            </h3>
            <p className="text-purple-100 mb-6">
              Confira nossas outras ferramentas gratuitas!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://curva-abc-app.vercel.app"
                target="_blank"
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                🎯 Curva ABC
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm no-print">
            <p>Gerador de Contratos © 2025 • Documento informativo</p>
            <p className="mt-1">
              Recomendamos revisão por advogado para contratos de alto valor.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

// Contrato de Prestação de Serviços
function ContratoServico({ dados }: { dados: DadosContrato }) {
  return (
    <div className="space-y-6 text-justify leading-relaxed">
      <h1 className="text-2xl font-bold text-center mb-8">
        CONTRATO DE PRESTAÇÃO DE SERVIÇOS
      </h1>

      <p>
        Pelo presente instrumento particular, de um lado <strong>{dados.contratanteNome || '[NOME DO CONTRATANTE]'}</strong>, 
        inscrito no CPF/CNPJ sob o nº <strong>{dados.contratanteCpfCnpj || '[CPF/CNPJ]'}</strong>, 
        com endereço em <strong>{dados.contratanteEndereco || '[ENDEREÇO]'}</strong>, 
        doravante denominado <strong>CONTRATANTE</strong>, e de outro lado <strong>{dados.contratadoNome || '[NOME DO CONTRATADO]'}</strong>, 
        inscrito no CPF/CNPJ sob o nº <strong>{dados.contratadoCpfCnpj || '[CPF/CNPJ]'}</strong>, 
        com endereço em <strong>{dados.contratadoEndereco || '[ENDEREÇO]'}</strong>, 
        doravante denominado <strong>CONTRATADO</strong>, têm entre si justo e acordado o presente contrato, 
        mediante as cláusulas e condições seguintes:
      </p>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA PRIMEIRA – DO OBJETO</h2>
        <p>
          O presente contrato tem por objeto a prestação dos seguintes serviços pelo CONTRATADO ao CONTRATANTE: <strong>{dados.descricaoServico || '[DESCRIÇÃO DO SERVIÇO]'}</strong>.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA SEGUNDA – DO PRAZO</h2>
        <p>
          O prazo para execução dos serviços é de <strong>{dados.prazoEntrega || '[PRAZO]'}</strong>, contados a partir da assinatura deste contrato, podendo ser prorrogado mediante acordo entre as partes.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA TERCEIRA – DO VALOR E PAGAMENTO</h2>
        <p>
          Pela execução dos serviços, o CONTRATANTE pagará ao CONTRATADO o valor de <strong>R$ {dados.valor || '[VALOR]'}</strong> ({dados.valor ? `${dados.valor} reais` : '[VALOR POR EXTENSO]'}), da seguinte forma: <strong>{dados.formaPagamento || '[FORMA DE PAGAMENTO]'}</strong>.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA QUARTA – DAS OBRIGAÇÕES DO CONTRATADO</h2>
        <p>O CONTRATADO obriga-se a:</p>
        <p>a) Executar os serviços com zelo e dedicação;</p>
        <p>b) Cumprir os prazos estabelecidos;</p>
        <p>c) Manter sigilo sobre informações confidenciais;</p>
        <p>d) Comunicar imediatamente qualquer impedimento na execução.</p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA QUINTA – DAS OBRIGAÇÕES DO CONTRATANTE</h2>
        <p>O CONTRATANTE obriga-se a:</p>
        <p>a) Efetuar os pagamentos nas datas acordadas;</p>
        <p>b) Fornecer as informações necessárias para execução dos serviços;</p>
        <p>c) Comunicar alterações de escopo com antecedência razoável.</p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA SEXTA – DA RESCISÃO</h2>
        <p>
          O presente contrato poderá ser rescindido por qualquer das partes, mediante comunicação por escrito com antecedência mínima de 15 (quinze) dias, ficando ressalvado o pagamento pelos serviços já executados.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">CLÁUSULA SÉTIMA – DO FORO</h2>
        <p>
          Fica eleito o foro da <strong>{dados.foro || '[COMARCA]'}</strong> para dirimir quaisquer dúvidas ou controvérsias oriundas deste contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
        </p>
      </div>

      <p className="mt-8">
        E por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença de 2 (duas) testemunhas.
      </p>

      <p className="mt-8 text-center">
        {dados.cidade || '[CIDADE]'}, {formatDate(new Date())}.
      </p>

      <div className="mt-16 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>CONTRATANTE</strong></p>
            <p>{dados.contratanteNome || '[NOME]'}</p>
            <p>CPF/CNPJ: {dados.contratanteCpfCnpj || '[CPF/CNPJ]'}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>CONTRATADO</strong></p>
            <p>{dados.contratadoNome || '[NOME]'}</p>
            <p>CPF/CNPJ: {dados.contratadoCpfCnpj || '[CPF/CNPJ]'}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>TESTEMUNHA 1</strong></p>
            <p>Nome: ______________________</p>
            <p>CPF: ______________________</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>TESTEMUNHA 2</strong></p>
            <p>Nome: ______________________</p>
            <p>CPF: ______________________</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contrato Freelancer
function ContratoFreelancer({ dados }: { dados: DadosContrato }) {
  return (
    <div className="space-y-6 text-justify leading-relaxed">
      <h1 className="text-2xl font-bold text-center mb-8">
        CONTRATO DE PRESTAÇÃO DE SERVIÇOS AUTÔNOMOS
      </h1>

      <p>
        Pelo presente instrumento particular, <strong>{dados.contratanteNome || '[NOME DO CONTRATANTE]'}</strong>, 
        CPF/CNPJ <strong>{dados.contratanteCpfCnpj || '[CPF/CNPJ]'}</strong>, 
        endereço <strong>{dados.contratanteEndereco || '[ENDEREÇO]'}</strong>, 
        doravante denominado <strong>CLIENTE</strong>, e <strong>{dados.contratadoNome || '[NOME DO FREELANCER]'}</strong>, 
        CPF <strong>{dados.contratadoCpfCnpj || '[CPF]'}</strong>, 
        endereço <strong>{dados.contratadoEndereco || '[ENDEREÇO]'}</strong>, 
        doravante denominado <strong>FREELANCER</strong>, acordam:
      </p>

      <div>
        <h2 className="font-bold mt-6 mb-2">1. SERVIÇO</h2>
        <p><strong>{dados.descricaoServico || '[DESCRIÇÃO DO SERVIÇO]'}</strong></p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">2. PRAZO</h2>
        <p><strong>{dados.prazoEntrega || '[PRAZO]'}</strong> a partir da data de assinatura.</p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">3. VALOR</h2>
        <p><strong>R$ {dados.valor || '[VALOR]'}</strong></p>
        <p>Forma de pagamento: <strong>{dados.formaPagamento || '[FORMA DE PAGAMENTO]'}</strong></p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">4. RELAÇÃO DE TRABALHO</h2>
        <p>
          Fica expressamente estabelecido que não há qualquer vínculo empregatício entre as partes, 
          sendo o FREELANCER profissional autônomo, responsável pelos seus próprios tributos e obrigações fiscais.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">5. PROPRIEDADE INTELECTUAL</h2>
        <p>
          Após o pagamento integral, todos os direitos sobre o trabalho entregue serão transferidos ao CLIENTE.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">6. REVISÕES</h2>
        <p>
          Estão incluídas até 2 (duas) rodadas de revisão. Revisões adicionais serão cobradas à parte.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">7. FORO</h2>
        <p>Comarca de <strong>{dados.foro || '[COMARCA]'}</strong>.</p>
      </div>

      <p className="mt-8 text-center">
        {dados.cidade || '[CIDADE]'}, {formatDate(new Date())}.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>CLIENTE</strong></p>
            <p>{dados.contratanteNome || '[NOME]'}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>FREELANCER</strong></p>
            <p>{dados.contratadoNome || '[NOME]'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contrato NDA
function ContratoNDA({ dados }: { dados: DadosContrato }) {
  return (
    <div className="space-y-6 text-justify leading-relaxed">
      <h1 className="text-2xl font-bold text-center mb-8">
        TERMO DE CONFIDENCIALIDADE E SIGILO (NDA)
      </h1>

      <p>
        Pelo presente instrumento, <strong>{dados.contratanteNome || '[PARTE REVELADORA]'}</strong>, 
        CPF/CNPJ <strong>{dados.contratanteCpfCnpj || '[CPF/CNPJ]'}</strong>, 
        doravante denominado <strong>PARTE REVELADORA</strong>, e <strong>{dados.contratadoNome || '[PARTE RECEPTORA]'}</strong>, 
        CPF/CNPJ <strong>{dados.contratadoCpfCnpj || '[CPF/CNPJ]'}</strong>, 
        doravante denominado <strong>PARTE RECEPTORA</strong>, acordam os seguintes termos de confidencialidade:
      </p>

      <div>
        <h2 className="font-bold mt-6 mb-2">1. INFORMAÇÕES CONFIDENCIAIS</h2>
        <p>
          Consideram-se informações confidenciais todas as informações, dados, documentos, 
          know-how, segredos comerciais, estratégias, planos de negócio, códigos-fonte, 
          algoritmos, processos, técnicas, desenhos, especificações e quaisquer outras 
          informações, sejam elas orais, escritas ou em qualquer outro formato, incluindo:
        </p>
        <p className="mt-2"><strong>{dados.descricaoServico || '[DESCRIÇÃO DAS INFORMAÇÕES]'}</strong></p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">2. OBRIGAÇÕES DA PARTE RECEPTORA</h2>
        <p>A PARTE RECEPTORA compromete-se a:</p>
        <p>a) Manter sigilo absoluto sobre todas as informações confidenciais;</p>
        <p>b) Não divulgar, publicar, reproduzir ou transmitir as informações a terceiros;</p>
        <p>c) Utilizar as informações apenas para os fins expressamente autorizados;</p>
        <p>d) Devolver ou destruir todas as informações ao término deste acordo;</p>
        <p>e) Notificar imediatamente qualquer uso ou divulgação não autorizada.</p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">3. PRAZO</h2>
        <p>
          Este termo terá vigência pelo período de <strong>{dados.prazoConfidencialidade || '2 anos'}</strong>, 
          contados a partir da data de assinatura, permanecendo em vigor mesmo após o término 
          de qualquer relação comercial entre as partes.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">4. PENALIDADES</h2>
        <p>
          O descumprimento de qualquer obrigação prevista neste termo sujeitará a PARTE RECEPTORA 
          ao pagamento de multa no valor de <strong>R$ {dados.multaDescumprimento || '10.000,00'}</strong>, 
          sem prejuízo de indenização por perdas e danos.
        </p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">5. EXCEÇÕES</h2>
        <p>Não são consideradas confidenciais as informações que:</p>
        <p>a) Já eram de conhecimento público antes da divulgação;</p>
        <p>b) Tornaram-se públicas sem culpa da PARTE RECEPTORA;</p>
        <p>c) Foram obtidas legalmente de terceiros sem restrição de confidencialidade;</p>
        <p>d) Devam ser divulgadas por força de lei ou ordem judicial.</p>
      </div>

      <div>
        <h2 className="font-bold mt-6 mb-2">6. FORO</h2>
        <p>Comarca de <strong>{dados.foro || '[COMARCA]'}</strong>.</p>
      </div>

      <p className="mt-8 text-center">
        {dados.cidade || '[CIDADE]'}, {formatDate(new Date())}.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>PARTE REVELADORA</strong></p>
            <p>{dados.contratanteNome || '[NOME]'}</p>
            <p>CPF/CNPJ: {dados.contratanteCpfCnpj || '[CPF/CNPJ]'}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>PARTE RECEPTORA</strong></p>
            <p>{dados.contratadoNome || '[NOME]'}</p>
            <p>CPF/CNPJ: {dados.contratadoCpfCnpj || '[CPF/CNPJ]'}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>TESTEMUNHA 1</strong></p>
            <p>Nome: ______________________</p>
            <p>CPF: ______________________</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">
            <p><strong>TESTEMUNHA 2</strong></p>
            <p>Nome: ______________________</p>
            <p>CPF: ______________________</p>
          </div>
        </div>
      </div>
    </div>
  );
}
