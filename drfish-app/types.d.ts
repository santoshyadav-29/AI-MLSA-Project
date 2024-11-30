type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  role: "owner" | "employee";
  profile?: string;
};

type Review = {
  color: "red" | "green" | "blue";
  message: React.ReactNode;
};
