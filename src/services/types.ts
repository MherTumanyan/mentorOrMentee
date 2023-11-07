export type ListUsersArgs = {
  email?: string;
  name?: string;
  surname?: string;
  userType?: 'mentor' | 'mentee';
  registrationDateFrom?: Date;
  registrationDateTo?: Date;
};

export type RegistrationData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  type: 'mentor' | 'mentee';
  position: string;
  field: 'Developer' | 'DevOps' | 'QA';
  shortDescription: string;
  education: string;
  experience: string;
  about: string;
};
export type UpdatedProfileData = {
  name?: string;
  surname?: string;
  type?: 'mentor' | 'mentee';
  position?: string;
  field?: 'Developer' | 'DevOps' | 'QA';
  password?: string;
  shortDescription?: string;
  email?: string;
  education?: string;
  experience?: string;
  about?: string;
};
