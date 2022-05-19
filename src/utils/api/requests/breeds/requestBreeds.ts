import { dogApi } from '@utils/api';

export const requestBreeds = ({ config }: ApiParams) => dogApi.get<Breed[]>('breeds', config);
