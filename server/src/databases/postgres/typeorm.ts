import "reflect-metadata"
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { UserResolver } from "../../resolvers/user/user.resolver";

let typeORMDB: DataSource;
export default async function typeORMConnect(): Promise<void> {

  const dataSource = new DataSource({
    type: "postgres",
    url: process.env.PGSQL_URI,
    entities: [`${__dirname}/entity/*.entity.ts`], // points to entities
    
    synchronize: true,
  });
  Container.set(DataSource, dataSource);
  typeORMDB = await dataSource.initialize();
}

// Executes TypeORM query for the provided entity model
export function useTypeORM<T extends ObjectLiteral>(
  entity: EntityTarget<T>
): Repository<T> {
  if (!typeORMDB) {
    throw new Error("TypeORM has not been initialized!");
  }

  return Container.get(DataSource).getRepository<T>(entity);
}

