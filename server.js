import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Rota POST para criar usuário
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rota GET para listar usuários
app.get("/users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});
