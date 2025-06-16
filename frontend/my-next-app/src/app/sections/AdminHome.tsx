"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function AdminHome() {
  const [imigrantes, setImigrantes] = useState<any[]>([]);
  const [familias, setFamilias] = useState<any[]>([]);

  useEffect(() => {
    fetchImigrantes();
    fetchFamilias();
  }, []);

  const fetchImigrantes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/imigrantes");
      const data = await res.json();
      setImigrantes(data);
    } catch (error) {
      console.error("Erro ao carregar imigrantes", error);
    }
  };

  const fetchFamilias = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/usuarios");
      const data = await res.json();
      setFamilias(data);
    } catch (error) {
      console.error("Erro ao carregar famílias", error);
    }
  };

  // 🔹 Gráfico de Situação Migratória
  const situacoes = ["REFUGIADO", "SOLICITANTE_REFUGIO", "MIGRANTE", "APATRIDA"];
  const situacaoCounts = situacoes.map(
    (sit) => imigrantes.filter((i) => i.situacaoMigratoria === sit).length
  );

  const barData = {
    labels: ["Refugiado", "Solicitante Refúgio", "Migrante", "Apátrida"],
    datasets: [
      {
        label: "Situação Migratória",
        data: situacaoCounts,
        backgroundColor: ["#3b82f6", "#6366f1", "#06b6d4", "#f59e0b"],
      },
    ],
  };

  // 🔸 Gráfico de Gênero
  const generoMap = imigrantes.reduce((acc: Record<string, number>, item) => {
    const genero = item.genero || "NÃO INFORMADO";
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});

  const generoLabels = Object.keys(generoMap);
  const generoValues = Object.values(generoMap);

  const generoColors = [
    "#3b82f6", // Azul
    "#ec4899", // Rosa
    "#f59e0b", // Amarelo
    "#10b981", // Verde
    "#6366f1", // Roxo
    "#f43f5e", // Vermelho
    "#6b7280", // Cinza
  ];

  const pieGeneroData = {
    labels: generoLabels,
    datasets: [
      {
        label: "Distribuição por Gênero",
        data: generoValues,
        backgroundColor: generoColors.slice(0, generoLabels.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Dashboard Administrativo</h1>

      {/* 🔥 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Imigrantes Cadastrados</h2>
          <p className="text-4xl mt-2">{imigrantes.length}</p>
        </div>

        <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Famílias Cadastradas</h2>
          <p className="text-4xl mt-2">{familias.length}</p>
        </div>
      </div>

      {/* 🔥 Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Situação Migratória */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Situação Migratória dos Imigrantes
          </h2>
          <Bar data={barData} />
        </div>

        {/* Gráfico de Gênero */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Distribuição por Gênero
          </h2>
          <div className="w-64 mx-auto">
            <Pie data={pieGeneroData} />
          </div>
        </div>
      </div>
    </div>
  );
}
