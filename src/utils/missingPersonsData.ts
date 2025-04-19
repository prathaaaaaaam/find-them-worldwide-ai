
// This is a subset of the Kaggle dataset structure
export interface MissingPerson {
  id: string;
  name: string;
  age: number;
  sex: string;
  lastSeen: string;
  location: string;
  description: string;
  dateReported: string;
  status: 'missing' | 'found' | 'unknown';
}

// Sample data from the dataset
export const sampleMissingPersons: MissingPerson[] = [
  {
    id: "MP001",
    name: "John Smith",
    age: 25,
    sex: "Male",
    lastSeen: "2024-03-15",
    location: "Delhi, India",
    description: "Last seen wearing blue jeans and white t-shirt",
    dateReported: "2024-03-16",
    status: "missing"
  },
  {
    id: "MP002",
    name: "Sarah Johnson",
    age: 32,
    sex: "Female",
    lastSeen: "2024-03-10",
    location: "Kochi, Kerala",
    description: "Last seen near Kochi Metro Station",
    dateReported: "2024-03-11",
    status: "missing"
  }
];
