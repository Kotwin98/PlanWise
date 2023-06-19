import express from 'express';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import usersRoutes from './routes/users-routes.js';
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use('/users', usersRoutes);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
//# sourceMappingURL=app.js.map