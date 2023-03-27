import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import {
  mockedDoctorRequest,
  mockedDoctorRequestCrmv,
  mockedDoctorRequestWithoutCrmv,
} from "../mocks/doctor.mocks";

describe("Testing doctors routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/doctors";

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

  test("Should be able to create a doctor", async () => {
    const response = await request(app).post(baseUrl).send(mockedDoctorRequest);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("crmv");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual(mockedDoctorRequest.name);
    expect(response.body.email).toEqual(mockedDoctorRequest.email);
    expect(response.status).toBe(201);
  });

  test("Should not be able to create a doctor with same email", async () => {
    const response = await request(app).post(baseUrl).send(mockedDoctorRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.status).toBe(409);
  });

  test("Should not be able to create a doctor with same crmv", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedDoctorRequestCrmv);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.status).toBe(409);
  });

  test("Should not be able to create a doctor without crmv", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedDoctorRequestWithoutCrmv);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("id");
    expect(response.status).toBe(400);
  });
});
