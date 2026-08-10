import { describe, test, vi } from "vitest";
import { CreateCarUseCase } from "./CreateCar.usecase.js";
import type { ICarExecuteRepository } from "../../../../infra/repositories/CarRepository.interface.js";

describe("test suite for create car use case", () => {
  test("should create a car and return its id", async (t) => {
    // Mock the car repository and index
    const mockCarRepo = {
      save: vi.fn().mockResolvedValue("car-id-123"),
      remove: vi.fn(),
    };
    const mockCarIndex = {
      save: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn(),
    };

    const usecase = new CreateCarUseCase(mockCarRepo, mockCarIndex);
    const input = {
      model: "Corolla",
      brand: "Toyota",
      year: 2022,
      price: 25000,
    };

    const id = await usecase.execute(input);
    t.expect(id).toBeDefined();
    t.expect(mockCarRepo.save).toHaveBeenCalled();
    t.expect(mockCarIndex.save).toHaveBeenCalled();
  });

  test("failed to save car entity into database", async (t) => {
    const errorThrown = new Error("some database error");

    const mockCarRepo = {
      save: vi.fn().mockRejectedValue(errorThrown),
      remove: vi.fn(),
    };

    const mockCarIndex: ICarExecuteRepository =
      {} as ICarExecuteRepository;

    const usecase = new CreateCarUseCase(mockCarRepo, mockCarIndex);

    const input = {
      model: "Corolla",
      brand: "Toyota",
      year: 2022,
      price: 25000,
    };

    await t.expect(usecase.execute(input)).rejects.toThrow(errorThrown);
    t.expect(mockCarRepo.save).toHaveBeenCalled();
  });
});
