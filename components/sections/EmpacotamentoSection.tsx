"use client";

import { useMemo, useState } from "react";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import Modal from "../Modal";
import EmpacotamentoForm from "../forms/EmpacotamentoForm";

interface Empacotamento {
  id: number;
  data: string;
  produto: string;
  codigo: string;
  colaborador: string;
  caixas: number;
  uni: number;
  kg: number;
  meta: number;
  horario: string;
  observacao: string;
}

const dados: Empacotamento[] = [
  {
    id: 1,
    data: "01/10/2026",
    produto: "Açúcar Cristal – 2 kg",
    codigo: "PRD-003",
    colaborador: "Luciana Ferreira",
    caixas: 21,
    uni: 0,
    kg: 126,
    meta: 120,
    horario: "07:15 – 11:30",
    observacao: "Lote novo",
  },
  {
    id: 2,
    data: "01/10/2026",
    produto: "Arroz Branco Tipo 1 – 1 kg",
    codigo: "PRD-001",
    colaborador: "Ana Beatriz Souza",
    caixas: 28,
    uni: 3,
    kg: 140,
    meta: 150,
    horario: "07:00 – 11:45",
    observacao: "—",
  },
  {
    id: 3,
    data: "30/09/2026",
    produto: "Feijão Carioca – 1 kg",
    codigo: "PRD-002",
    colaborador: "Raimundo Costa",
    caixas: 36,
    uni: 0,
    kg: 180,
    meta: 170,
    horario: "07:00 – 14:30",
    observacao: "—",
  },
  {
    id: 4,
    data: "30/09/2026",
    produto: "Farinha de Mandioca – 500 g",
    codigo: "PRD-004",
    colaborador: "Marcos Oliveira",
    caixas: 28,
    uni: 10,
    kg: 76,
    meta: 90,
    horario: "08:00 – 12:00",
    observacao: "Falta de embalagem",
  },
  {
    id: 5,
    data: "29/09/2026",
    produto: "Açúcar Cristal – 2 kg",
    codigo: "PRD-003",
    colaborador: "Carlos Mendes",
    caixas: 32,
    uni: 2,
    kg: 192,
    meta: 190,
    horario: "07:00 – 14:00",
    observacao: "—",
  },
  {
    id: 6,
    data: "29/09/2026",
    produto: "Arroz Branco Tipo 1 – 1 kg",
    codigo: "PRD-001",
    colaborador: "Juliana Santos",
    caixas: 25,
    uni: 4,
    kg: 125,
    meta: 130,
    horario: "07:30 – 12:00",
    observacao: "—",
  },
];

export default function EmpacotamentoSection() {
  const [dataInicio, setDataInicio] = useState("2026-09-28");
  const [dataFim, setDataFim] = useState("2026-10-01");
  const [produto, setProduto] = useState("Todos");
  const [colaborador, setColaborador] = useState("Todos");

  const produtos = useMemo(
    () => ["Todos", ...new Set(dados.map((item) => item.produto))],
    []
  );

  const colaboradores = useMemo(
    () => ["Todos", ...new Set(dados.map((item) => item.colaborador))],
    []
  );

  const dadosFiltrados = useMemo(() => {
    return dados.filter((item) => {
      const produtoOk =
        produto === "Todos" || item.produto === produto;

      const colaboradorOk =
        colaborador === "Todos" ||
        item.colaborador === colaborador;

      return produtoOk && colaboradorOk;
    });
  }, [produto, colaborador]);

  const totalKg = dadosFiltrados.reduce(
    (total, item) => total + item.kg,
    0
  );

  const totalCaixas = dadosFiltrados.reduce(
    (total, item) => total + item.caixas,
    0
  );

  const totalMeta = dadosFiltrados.reduce(
    (total, item) => total + item.meta,
    0
  );

  const percentualMeta =
    totalMeta > 0
      ? Math.round((totalKg / totalMeta) * 100)
      : 0;

  function limparFiltros() {
    setDataInicio("2026-09-28");
    setDataFim("2026-10-01");
    setProduto("Todos");
    setColaborador("Todos");
  }

  function excluir(id: number) {
    console.log("Excluir registro:", id);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <main className="">
      <div className="mx-auto max-w-[1400px]">

        {/* FILTROS */}
        <section className="rounded-lg border border-[#283634] bg-gray-800 p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[150px_150px_215px_150px_auto]">

            {/* Data inicial */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[#9eb0ad]">
                De
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="
                    h-10 w-full rounded-md
                    border border-[#293936]
                    bg-gray-900
                    px-3 pr-9
                    text-sm font-semibold
                    text-white
                    outline-none
                    transition
                    focus:border-[#eab308]
                  "
                />
              </div>
            </div>

            {/* Data final */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[#9eb0ad]">
                Até
              </label>

              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="
                  h-10 w-full rounded-md
                  border border-[#293936]
                  bg-gray-900
                  px-3
                  text-sm font-semibold
                  text-white
                  outline-none
                  focus:border-[#eab308]
                "
              />
            </div>

            {/* Produto */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[#9eb0ad]">
                Produto
              </label>

              <select
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                className="
                  h-10 w-full rounded-md
                  border border-[#293936]
                  bg-gray-900
                  px-3
                  text-sm font-semibold
                  text-white
                  outline-none
                  focus:border-[#eab308]
                "
              >
                {produtos.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Colaborador */}
            <div>
              <label className="mb-1 block text-xs font-medium text-[#9eb0ad]">
                Colaborador
              </label>

              <select
                value={colaborador}
                onChange={(e) => setColaborador(e.target.value)}
                className="
                  h-10 w-full rounded-md
                  border border-[#293936]
                  bg-gray-900
                  px-3
                  text-sm font-semibold
                  text-white
                  outline-none
                  focus:border-[#eab308]
                "
              >
                {colaboradores.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Limpar */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={limparFiltros}
                className="
                  h-10 rounded-md
                  border border-[#293936]
                  bg-gray-900
                  px-4
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-[#1b2926]
                "
              >
                Limpar filtros
              </button>
                            <button
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="
                  h-10 rounded-md
                  border border-[#293936]
                  bg-blue-500
                  px-4
                  text-sm font-semibold
                  text-white
                  transition
                  cursor-pointer
                  ml-2
                "
              >
                Novo
              </button>
            </div>
          </div>
        </section>

        {/* CARDS */}
        <section className="mt-[18px] grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

          <Card
            value={`${totalKg.toLocaleString("pt-BR")} kg`}
            label="Total empacotado"
            destaque
          />

          <Card
            value={totalCaixas.toLocaleString("pt-BR")}
            label="Caixas"
          />

          <Card
            value={`${percentualMeta}%`}
            label="da meta atingida"
          />

          <Card
            value="8"
            label="Empactamentos"
          />

        </section>

        {/* TABELA */}
        <section className="mt-[18px] overflow-hidden rounded-lg border border-[#283634] bg-gray-800">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">

              <thead>
                <tr className="border-b border-[#2a3936]">
                  <th className="px-3 py-4 pl-7 font-medium text-[#8fa5a0]">
                    Data
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Produto
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Colaborador
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Caixas
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    UNI
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Kg
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Meta
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Horário
                  </th>

                  <th className="px-3 py-4 font-medium text-[#8fa5a0]">
                    Observação
                  </th>

                  <th className="px-3 py-4" />
                </tr>
              </thead>

              <tbody>
                {dadosFiltrados.map((item) => {
                  const bateuMeta = item.kg >= item.meta;

                  return (
                    <tr
                      key={item.id}
                      className="
                        border-b border-[#283634]
                        last:border-0
                        hover:bg-gray-900
                      "
                    >
                      {/* Data */}
                      <td className="whitespace-nowrap px-3 py-4 pl-7 font-medium text-white">
                        {item.data}
                      </td>

                      {/* Produto */}
                      <td className="px-3 py-4">
                        <div className="font-medium text-white">
                          {item.produto}
                        </div>

                        <div className="mt-1 text-xs text-[#71837f]">
                          {item.codigo}
                        </div>
                      </td>

                      {/* Colaborador */}
                      <td className="whitespace-nowrap px-3 py-4 font-medium text-white">
                        {item.colaborador}
                      </td>

                      {/* Caixas */}
                      <td className="px-3 py-4 text-white">
                        {item.caixas}
                      </td>

                      {/* UNI */}
                      <td className="px-3 py-4 font-medium text-white">
                        {item.uni}
                      </td>

                      {/* Kg */}
                      <td className="px-3 py-4">
                        <span
                          className={`
                            inline-flex min-w-[40px]
                            justify-center rounded-full
                            px-2.5 py-1
                            font-medium
                            ${
                              bateuMeta
                                ? "bg-[#123b2d] text-[#16a765]"
                                : "bg-[#3a2423] text-[#e44338]"
                            }
                          `}
                        >
                          {item.kg}
                        </span>
                      </td>

                      {/* Meta */}
                      <td className="px-3 py-4 font-medium text-white">
                        {item.meta}
                      </td>

                      {/* Horário */}
                      <td className="whitespace-nowrap px-3 py-4 text-white">
                        {item.horario}
                      </td>

                      {/* Observação */}
                      <td className="px-3 py-4 text-white">
                        {item.observacao}
                      </td>

                      {/* Excluir */}
                      <td className="px-3 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => excluir(item.id)}
                          className="
                            rounded-md
                            border border-amber-500
                            px-3 py-1.5
                            text-xs font-medium
                            text-amber-500
                            transition
                            hover:border-amber-900
                            hover:bg-amber-950/30
                          "
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {dadosFiltrados.length === 0 && (
            <div className="py-12 text-center text-sm text-[#71837f]">
              Nenhum registro encontrado.
            </div>
          )}

        </section>
      </div>
        <Modal isOpen={isModalVisible} onClose={() => {setIsModalVisible(false)}} title="Novo Empacotamento">
        <EmpacotamentoForm />
      </Modal>
    </main>
  );
}


/* =========================
   CARD
========================= */

interface CardProps {
  value: string;
  label: string;
  destaque?: boolean;
}

function Card({ value, label, destaque }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-lg
        border border-[#283634]
        bg-gray-800
        px-4 py-4
        ${destaque ? "border-l-4 border-l-blue-500" : ""}
      `}
    >
      <div className="text-[25px] font-bold leading-none text-white">
        {value}
      </div>

      <div className="mt-3 text-xs font-medium text-[#8fa5a0]">
        {label}
      </div>
    </div>
  );
}