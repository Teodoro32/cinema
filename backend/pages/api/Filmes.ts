import Cors from "cors";
import { PrismaClient } from "@/generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { initMiddleware } from "../../lib/init-middleware";

const prisma = new PrismaClient();

// Inicializa o middleware CORS permitindo todas origens (ou configure conforme quiser)
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS", "PUT" , "DELETE"],
    origin: "*", // Permite todas origens. Você pode restringir para um domínio específico
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Executa o middleware CORS
    await cors(req, res);

    if (req.method === "GET") {
      const filmes = await prisma.movie.findMany();
      return res.status(200).json(filmes);
    }

    if (req.method === "POST") {
      const {
        titulo,
        descricao,
        genero,
        classificacao,
        duracao,
        dataEstreia,
        imagem,
      } = req.body;

      // const novoFilme = await prisma.movie.create({
      //   data: {
      //   titulo,
      //   descricao,
      //   genero,
      //   classificacao,
      //   duracao,
      //   dataEstreia: new Date(dataEstreia),
      //   imagem,
      //   },
      // });

      return res.status(201).json(req.body);
    }

    return res.status(405).json({ message: "Método não permitido" });
  } catch (error: any) {
    console.error("[ERRO API FILMES]", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
}
