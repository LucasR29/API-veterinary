import { mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedUserRequest } from "../mocks/user.mocks";
import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { mockedAnimalSize } from "../mocks/animalSize.mocks";
import { mockedDoctorLogin } from "../mocks/doctor.mocks";
import { mockedUserLogin } from "../mocks/user.mocks";
import { animalsRoute } from "../../routers/animals.routes";

describe("Testing animals size", () => {
  let connection: DataSource;
  const sizeRoute: string = "/animalSizes";
  let doctor_token = "";
  let size_id = "";
  let user_token = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/doctors").send(mockedDoctorRequest);
    await request(app).post("/users").send(mockedUserRequest);

    const docLoginRes = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const userLoginRes = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    user_token = userLoginRes.body.token;
    doctor_token = docLoginRes.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Sould be able to create a animal_size", async () => {
    const response = await request(app)
      .post(sizeRoute)
      .set("Authorization", `Bearer ${doctor_token}`)
      .send(mockedAnimalSize);

    size_id = response.body.id;

    expect(response.body).toHaveProperty("size");
    expect(response.status).toBe(201);
  });

  test("Must be able to list animal_size", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const response = await request(app)
      .get(sizeRoute)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("size");
    expect(response.status).toBe(200);
  });

  test("Should be able to delete a animal_size", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const path = "/animalSizes/" + size_id;
    const response = await request(app)
      .delete(path)
      .set("Authorization", `Bearer ${doctor_token}`);

    expect(response.status).toBe(200);
  });
});
