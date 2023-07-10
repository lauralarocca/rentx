import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 120.0,
            license_plate: "DEF-1122",
            fine_amount: 95,
            brand: "marca",
            category_id: "category",
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 120.0,
            license_plate: "DEF-1152",
            fine_amount: 95,
            brand: "marcaTeste",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "marcaTeste",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description 123",
            daily_rate: 120.0,
            license_plate: "DEF-1162",
            fine_amount: 95,
            brand: "marcaTeste12",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Car description 123",
            daily_rate: 120.0,
            license_plate: "DEF-1162",
            fine_amount: 95,
            brand: "marcaTeste12",
            category_id: "category54",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category54",
        });

        expect(cars).toEqual([car]);
    });
});
