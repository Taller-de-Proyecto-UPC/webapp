export interface Doctor {
    doctorId: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    specialty: string;
    user: {
      username: string;
      password: string;
      role: string;
    };
    cip: string;
  }
  