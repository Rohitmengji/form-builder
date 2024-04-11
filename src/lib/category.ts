import {
  CarIcon,
  Laptop,
  LightbulbIcon,
  OutdentIcon,
  Plane,
  Smartphone,
  Users2,
} from "lucide-react";

interface Category {
  title: string;
  questions: Question[];
}

interface Question {
  key: string;
  icon: any;
  label: string;
  options: string[];
}

export const categories: Category[] = [
  {
    title: "Category 1",
    questions: [
      {
        key: "question1_1",
        icon: Laptop,
        label: "Question 1.1",
        options: ["1 - 4 Hours", "4 - 8 Hours", "8+ Hours", "Not applicable"],
      },
      {
        key: "question1_2",
        icon: Smartphone,
        label: "Question 1.2",
        options: ["1 - 4 Hours", "4 - 8 Hours", "8+ Hours", "Not applicable"],
      },
    ],
  },
  {
    title: "Category 2",
    questions: [
      {
        key: "question2_1",
        icon: Users2,
        label: "Question 2.1",
        options: ["1 - 4 Hours", "4 - 8 Hours", "8+ Hours", "Not applicable"],
      },
      {
        key: "question2_2",
        icon: OutdentIcon,
        label: "Question 2.2",
        options: ["1 - 2 Days", "2 - 4 Days", "Everyday", "Not applicable"],
      },
      {
        key: "question2_3",
        icon: Plane,
        label: "Question 2.3",
        options: ["Frequently", "Occasionally", "Rarely", "Not applicable"],
      },
    ],
  },
  {
    title: "Category 3",
    questions: [
      {
        key: "question3_1",
        icon: LightbulbIcon,
        label: "Question 3.1",
        options: ["Frequently", "Occasionally", "Rarely", "Not applicable"],
      },
    ],
  },
  {
    title: "Category 4",
    questions: [
      {
        key: "question3_2",
        icon: CarIcon,
        label: "Question 3.2",
        options: [
          "Car",
          "Public",
          "Motorcycle",
          "Bicycle",
          "Others",
          "Not applicable",
        ],
      },
    ],
  },
];
