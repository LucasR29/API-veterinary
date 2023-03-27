import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import { mockedUserRequest } from "../mocks/user.mocks";
import { mockedDoctorLogin, mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedAnimalRequest } from "../mocks/animal.mocks";
import { mockedConsult } from "../mocks/consults.mocks";
import { mockedMedicine } from "../mocks/medicine.mocks";
import { animal_type } from "../mocks/animal_type.mocks";

import { mockedAnimalSize } from "../mocks/animalSize.mocks";

describe("Testing consults routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/consults";
  let owner = null;
  let doctor = null;
  let animal = null;
  let vaccine = null;
  let type = null;
  let size = null;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    doctor = await request(app).post("/doctors").send(mockedDoctorRequest);
    owner = await request(app).post("/users").send(mockedUserRequest);
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    vaccine = await request(app)
      .post("/medicine")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(mockedMedicine);
    type = await request(app)
      .post("/animalTypes")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(animal_type);
    size = await request(app)
      .post("/animalSizes")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(mockedAnimalSize);

    animal = await request(app)
      .post("/animals")
      .send({
        ...mockedAnimalRequest,
        vaccines: [{ id: [vaccine.body.id], date: "2022-05-10" }],
        owner: owner.body.id,
        type: type.body.type,
        size: size.body.size,
      });
    await request(app).post("/animals").send(mockedAnimalRequest);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to schedule a consult", async () => {
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send({
        ...mockedConsult,
        doctor: doctor.body.id,
        animal: animal.body.id,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("animal");
    expect(response.body).toHaveProperty("doctor");

    expect(response.status).toBe(201);
  });

  test("Should not be able to register a consult without animal", async () => {
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send({
        ...mockedConsult,
        doctor_id: doctor.body.id,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Should not be able to register a consult without doctor", async () => {
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send({
        ...mockedConsult,
        animal_id: animal.body.id,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
