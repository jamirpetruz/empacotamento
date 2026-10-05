'use client';

import { createEmpacotamentoAction } from '@/actions/EmpacotamentoActions';
import React, { useState, ChangeEvent, FormEvent } from 'react';

// Tipos permitidos para as caixas (personalize conforme sua necessidade)
export type TipoCaixa = '' | 'Tipo A' | 'Tipo B' | 'Tipo C' | 'Tipo D';

export interface CaixaItem {
    quantidade: number;
    tipo: TipoCaixa;
}

// Interface principal dos dados do formulário
export interface FormData {
    data: string;
    produto: string;
    colaborador: string;
    inicio: string;
    fim: string;
    totalKg: string;
    metaKg: string;
    caixas: {
        cx1: CaixaItem;
        cx2: CaixaItem;
        cx3: CaixaItem;
        cx4: CaixaItem;
        cx5: CaixaItem;
        cx6: CaixaItem;
        cx7: CaixaItem;
        cx8: CaixaItem;
    };
    unidadesSoltas: number;
    urlImagem: string;
    observacao: string;
}

const initialFormState: FormData = {
    data: '2026-10-01',
    produto: '',
    colaborador: '',
    inicio: '07:00',
    fim: '',
    totalKg: '0,00',
    metaKg: '0,00',
    caixas: {
        cx1: { quantidade: 0, tipo: '' },
        cx2: { quantidade: 0, tipo: '' },
        cx3: { quantidade: 0, tipo: '' },
        cx4: { quantidade: 0, tipo: '' },
        cx5: { quantidade: 0, tipo: '' },
        cx6: { quantidade: 0, tipo: '' },
        cx7: { quantidade: 0, tipo: '' },
        cx8: { quantidade: 0, tipo: '' },
    },
    unidadesSoltas: 0,
    urlImagem: '',
    observacao: '',
};

export default function EmpacotamentoForm() {
    const [formData, setFormData] = useState<FormData>(initialFormState);
    const totalKg = formData.unidadesSoltas * (Object.values(formData.caixas).reduce(
        (total, caixa) => total + Number(caixa.quantidade || 0),
        0
    ));
    // Manipulador genérico de alteração nos inputs e selects
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith('caixas.')) {
            const [, cxKey, field] = name.split('.') as [
                string,
                keyof FormData['caixas'],
                keyof CaixaItem
            ];

            setFormData((prev) => ({
                ...prev,
                caixas: {
                    ...prev.caixas,
                    [cxKey]: {
                        ...prev.caixas[cxKey],
                        [field]: field === 'quantidade' ? Number(value) : value,
                    },
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleReset = () => {
        setFormData(initialFormState);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        createEmpacotamentoAction(formData);
    };

    const listaCaixas = ['cx1', 'cx2', 'cx3', 'cx4', 'cx5', 'cx6', 'cx7', 'cx8'] as const;

    return (
        <div className="min-h-screen text-gray-200 font-sans">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-6">
                {/* Linha 1: Data, Produto, Colaborador, Início, Fim */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Data</label>
                        <input
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Produto</label>
                        <select
                            name="produto"
                            value={formData.produto}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        >
                            <option value="">Selecione o produto</option>
                            <option value="produto1">Produto 1</option>
                            <option value="produto2">Produto 2</option>
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Colaborador</label>
                        <select
                            name="colaborador"
                            value={formData.colaborador}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        >
                            <option value="">Selecione</option>
                            <option value="colaborador1">Colaborador 1</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Início</label>
                        <input
                            type="time"
                            name="inicio"
                            value={formData.inicio}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Fim</label>
                        <input
                            type="time"
                            name="fim"
                            value={formData.fim}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>
                </div>

                {/* Linha 3: Caixas por tipo (CX1 a CX8 com Selects de tipo) */}
                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">
                        Caixas por tipo (CX1 a CX8)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {listaCaixas.map((cx, index) => (
                            <div key={cx} className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    name={`caixas.${cx}.quantidade`}
                                    placeholder={`CX${index + 1}`}
                                    value={formData.caixas[cx].quantidade}
                                    onChange={handleChange}
                                    className="w-1/2 bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500"
                                />
                                <select
                                    name={`caixas.${cx}.tipo`}
                                    value={formData.caixas[cx].tipo}
                                    onChange={handleChange}
                                    className="w-1/2 bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                                >
                                    <option value="">Tipo CX{index + 1}</option>
                                    <option value="Tipo A">Tipo A</option>
                                    <option value="Tipo B">Tipo B</option>
                                    <option value="Tipo C">Tipo C</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
                 {/* Linha 2: Total (kg), Meta (kg) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">
                            Unidades soltas (UNI)
                        </label>
                        <input
                            type="number"
                            name="unidadesSoltas"
                            value={formData.unidadesSoltas}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Total (kg)</label>
                        <input
                            disabled
                            type="number"
                            name="totalKg"
                            value={totalKg}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-400 mb-2">Meta (kg)</label>
                        <input
                            type="text"
                            name="metaKg"
                            value={formData.metaKg}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>
                </div>

                {/* Linha 5: Observação */}
                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">Observação</label>
                    <textarea
                        name="observacao"
                        rows={4}
                        value={formData.observacao}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-[#232f2e] rounded-md p-3 text-sm text-gray-100 focus:outline-none focus:border-amber-500 resize-y"
                    />
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
                    >
                        Salvar apontamento
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-900 hover:bg-[#232f2e] text-gray-300 font-semibold px-6 py-2.5 rounded-md border border-[#232f2e] transition-colors text-sm"
                    >
                        Limpar
                    </button>
                </div>
            </form>
        </div>
    );
}