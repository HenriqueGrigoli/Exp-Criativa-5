"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">
        Bem-vindo ao meu projeto Next.js 🚀
      </h1>
      <button
        onClick={() => router.push("/login.js")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Faça Login
      </button>
    </main>
  );
}
