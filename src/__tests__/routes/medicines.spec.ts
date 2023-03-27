import {
  DataSource,
  Repository,
  TableForeignKey,
  UsingJoinColumnOnlyOnOneSideAllowedError,
} from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import { mockedMedicine } from "../mocks/medicine.mocks";
import { mockedDoctorLogin, mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedUserLogin, mockedUserRequest } from "../mocks/user.mocks";

describe("Testing medicine routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/medicine";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/doctors").send(mockedDoctorRequest);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a medicine", async () => {
    await request(app).post("/doctors").send(mockedDoctorRequest);

    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(mockedMedicine);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("class");
    expect(response.status).toBe(201);
  });

  test("Should not be able to create a medicine without doctor permission", async () => {
    await request(app).post("/users").send(mockedUserRequest);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedMedicine);

    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.status).toBe(403);
  });

  test("DELETE /medicine/:id -  should not be able to delete medicine not being a doctor", async () => {
    await request(app).post("/users").send(mockedUserRequest);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const MedicineTobeDeleted = await request(app)
      .get("/medicine")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/medicine/${MedicineTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /medicine/:id -  Must be able to delete medicine", async () => {
    await request(app).post("/medicine").send(mockedMedicine);

    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const MedicineTobeDeleted = await request(app)
      .get("/medicine")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/medicine/${MedicineTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);
    const findMedicine = await request(app)
      .get("/medicine")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const comparision = MedicineTobeDeleted.body[0] !== findMedicine.body[0];

    expect(response.status).toBe(204);
    expect(comparision).toBe(true);
  });

  test("DELETE /medicine/:id -  should not be able to delete medicine with invalid id", async () => {
    await request(app).post("/medicine").send(mockedMedicine);

    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const response = await request(app)
      .delete(`/medicine/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);
    expect(response.status).toBe(404);
  });

  test("PATCH /medicine/:id -  should be able to update medicine", async () => {
    await request(app).post("/doctors").send(mockedDoctorRequest);

    const newValues = { name: "TesteName", class: "TesteClass" };

    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const medicine = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(mockedMedicine);

    const medicineTobeUpdate = await request(app)
      .get("/medicine")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const medicineTobeUpdateID = medicineTobeUpdate.body[0].id;

    const response = await request(app)
      .patch(`/medicine/${medicineTobeUpdateID}`)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(newValues);

    const medicineUpdated = await request(app)
      .get("/medicine")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(medicineUpdated.body[0].name).toEqual("TesteName");
    expect(medicineUpdated.body[0]).not.toHaveProperty("TesteClass");
  });
});
