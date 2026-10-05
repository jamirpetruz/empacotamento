"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Colaborador {
  colaboradorId: number;
  nome: string;
  createdAt: string;
  updatedAt: string | null;
}

export default function ColaboradoresPage() {
  const [nome, setNome] = useState("");
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingLista, setLoadingLista] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarColaboradores() {
    try {
      setLoadingLista(true);

      const response = await fetch("/api/colaboradores");

      if (!response.ok) {
        throw new Error("Erro ao carregar colaboradores.");
      }

      const data = await response.json();

      setColaboradores(data);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar colaboradores."
      );
    } finally {
      setLoadingLista(false);
    }
  }

  useEffect(() => {
    carregarColaboradores();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErro("");

    if (!nome.trim()) {
      setErro("Informe o nome do colaborador.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/colaboradores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao cadastrar colaborador."
        );
      }

      setNome("");

      await carregarColaboradores();

    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar colaborador."
      );
    } finally {
      setLoading(false);
    }
  }

  async function excluirColaborador(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este colaborador?"
    );

    if (!confirmar) return;

    try {
      const response = await fetch(
        `/api/colaboradores/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao excluir colaborador."
        );
      }

      await carregarColaboradores();

    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao excluir colaborador."
      );
    }
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-[1200px]">

        {/* CABEÇALHO */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">
            Colaboradores
          </h1>

          <p className="mt-1 text-sm text-[#8fa5a0]">
            Cadastre e gerencie os colaboradores do sistema.
          </p>
        </div>

        {/* FORMULÁRIO */}
        <section className="rounded-lg border border-[#283634] bg-gray-800 p-5">

          <h2 className="mb-4 text-base font-semibold text-white">
            Novo colaborador
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:flex-row md:items-end"
          >

            <div className="flex-1">
              <label
                htmlFor="nome"
                className="mb-1.5 block text-xs font-medium text-[#9eb0ad]"
              >
                Nome do colaborador
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do colaborador"
                maxLength={100}
                className="
                  h-10 w-full rounded-md
                  border border-[#293936]
                  bg-gray-900
                  px-3
                  text-sm text-white
                  placeholder:text-[#536460]
                  outline-none
                  focus:border-[#eab308]
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                h-10 rounded-md
                bg-blue-500
                px-5
                text-sm font-bold
                text-white
                transition
                hover:bg-[#facc15]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>

          </form>

          {erro && (
            <div
              className="
                mt-4 rounded-md
                border border-red-900
                bg-red-950/30
                px-4 py-3
                text-sm text-red-400
              "
            >
              {erro}
            </div>
          )}

        </section>

        {/* TABELA */}
        <section className="mt-5 overflow-hidden rounded-lg border border-[#283634] bg-gray-800">

          {/* CABEÇALHO DA TABELA */}
          <div className="flex items-center justify-between border-b border-[#283634] px-5 py-4">

            <div>
              <h2 className="font-semibold text-white">
                Colaboradores cadastrados
              </h2>

              <p className="mt-1 text-xs text-[#71837f]">
                {colaboradores.length}{" "}
                {colaboradores.length === 1
                  ? "colaborador"
                  : "colaboradores"}
              </p>
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left text-sm">

              <thead>
                <tr className="border-b border-[#283634]">

                  <th className="px-5 py-3 text-xs font-medium uppercase text-[#8fa5a0]">
                    Código
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase text-[#8fa5a0]">
                    Nome
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase text-[#8fa5a0]">
                    Data de cadastro
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-medium uppercase text-[#8fa5a0]">
                    Ações
                  </th>

                </tr>
              </thead>

              <tbody>

                {loadingLista ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm text-[#71837f]"
                    >
                      Carregando colaboradores...
                    </td>
                  </tr>
                ) : colaboradores.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm text-[#71837f]"
                    >
                      Nenhum colaborador cadastrado.
                    </td>
                  </tr>
                ) : (
                  colaboradores.map((colaborador) => (
                    <tr
                      key={colaborador.colaboradorId}
                      className="
                        border-b border-[#283634]
                        last:border-0
                        hover:bg-[#17221f]
                      "
                    >

                      <td className="px-5 py-4 text-[#8fa5a0]">
                        {colaborador.colaboradorId}
                      </td>

                      <td className="px-5 py-4 font-medium text-white">
                        {colaborador.nome}
                      </td>

                      <td className="px-5 py-4 text-[#c4cfcc]">
                        {formatarData(colaborador.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            title="Editar"
                            className="
                              flex h-8 w-8 items-center
                              justify-center rounded-md
                              border border-[#293936]
                              text-[#d1d8d6]
                              transition
                              hover:bg-[#24312e]
                            "
                          >
                            <FaEdit size={13} />
                          </button>

                          <button
                            type="button"
                            title="Excluir"
                            onClick={() =>
                              excluirColaborador(
                                colaborador.colaboradorId
                              )
                            }
                            className="
                              flex h-8 w-8 items-center
                              justify-center rounded-md
                              border border-[#293936]
                              text-red-500
                              transition
                              hover:border-red-900
                              hover:bg-red-950/30
                            "
                          >
                            <FaTrash size={13} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  );
}