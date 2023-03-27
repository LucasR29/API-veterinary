import { DataSource, Repository, TableForeignKey } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import { Users } from "../../entities/users/users.entity";
import {
  mockedUserRequest,
  mockedUserRequestNoEmail,
  mockedUserResponse,
} from "../mocks/user.mocks";

describe("Testing users routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/users";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual(mockedUserRequest.name);
    expect(response.body.email).toEqual(mockedUserRequest.email);
    expect(response.status).toBe(201);
  });

  test("Should not be to create a user with used email", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.status).toBe(409);
  });

  test("Should not be to create a user without email", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserRequestNoEmail);

    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.status).toBe(400);
  });
});
