import { Client } from "@elastic/elasticsearch";
import type {
  FindInput,
  ICarQueryRepository,
} from "../CarRepository.interface.js";
import CarEntity from "../../../domain/entities/car/Car.js";
import type { ID } from "../../../domain/entities/Types.js";

class ElasticSearchCarQueryRepository implements ICarQueryRepository {
  constructor(
    private readonly client: Client,
    private readonly index: string = "cars",
  ) {}

  public async findById(carId: ID): Promise<CarEntity> {
    const response = await this.client.get<CarEntity>({
      index: this.index,
      id: carId,
    });

    if (response.found !== true) {
      throw new Error("elastic-search error: document not found");
    }

    return response._source!;
  }

  public async find(input: FindInput): Promise<CarEntity[]> {
    const matchQueries = Object.entries(
      input as Omit<typeof input, "priceRange">,
    )
      .filter(
        ([key, val]) =>
          !(val === undefined || val === null) &&
          (key as string) !== "priceRange",
      )
      .map(([key, val]) => {
        const match: Record<string, any | string> = {};
        match[key] = val;
        return { match };
      });

    const searchQuery = {
      index: this.index,
      query: {
        bool: {
          must: [...matchQueries],
        },
      },
    };

    const result = await this.client.search(searchQuery);

    if (!result.hits.total) {
      return [];
    }

    return result.hits.hits.map((hit) => hit._source as CarEntity);
  }
}

export default ElasticSearchCarQueryRepository;
