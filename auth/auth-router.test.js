const server = require("../api/server.js");
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("auth-router testing", () => {
  describe("POSTING to ----> /api/auth/register", () => {
    test("proper status code when successful", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "Josue 144", password: "90210" }); // unique username

      const expectedStatusCode = 201;
      const code = response.status;

      expect(code).toBe(expectedStatusCode);
    });
    test("proper message when successful", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "Josue 150", password: "90210" }); // unique username

      const expectedMessage = "Account successfully created";
      const message = response.body.successMessage;

      expect(message).toBe(expectedMessage);
    });
  });
  describe("POSTING to ----> /api/auth/login", () => {
    test("if token is being returned", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "Josue 3", password: "90210" });

      const isToken = response.body.token;

      expect(isToken).toBeTruthy();
    });
    test("if token contains expiration date, username, and id", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "Josue 3", password: "90210" });

      const token = response.body.token;
      const decoded = jwt.verify(token, "secret");

      expect(decoded.username).toBeTruthy();
      expect(decoded.id).toBeTruthy();
      expect(decoded.exp).toBeTruthy();
    });
  });
});
