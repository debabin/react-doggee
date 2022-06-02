interface Breed {
  bred_for: string;
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  image: {
    height: number;
    id: string;
    url: string;
    width: number;
  };
  life_span: string;
  name: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
  weight: {
    imperial: string;
    metric: string;
  };
}

interface Pet {
  id: number;
  dogName: string;
  dogWeight: string;
  breed: $TSFixMe;
  dogBirthday: number;
}

interface User {
  username: string;
  password: string;
  name: string;
  birthday: number;
  registrationAddress: string;
  id: string;
  pets: Pet[];
}

interface Service {
  isLogined: boolean;
}
