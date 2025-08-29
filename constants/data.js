import { Ionicons } from "@expo/vector-icons";

export const expenseCategories = {
  grocaries: {
    label: "Groceries",
    value: "grocaries",
    icon: Ionicons, 
    iconName: "cart-outline",
    bgColor: "#4B5563",
  },
  rent: {
    label: "Rent",
    value: "rent",
    icon: Ionicons,
    iconName: "home-outline",
    bgColor: "#075985",
  },
  utilities: {
    label: "Utilities",
    value: "utilities",
    icon: Ionicons,
    iconName: "flash-outline",
    bgColor: "#CA8A04",
  },
  transportation: {
    label: "Transportation",
    value: "transportation",
    icon: Ionicons,
    iconName: "car-outline",
    bgColor: "#B45309",
  },
  entertainment: {
    label: "Entertainment",
    value: "entertainment",
    icon: Ionicons,
    iconName: "film-outline",
    bgColor: "#0F766E",
  },
  dining: {
    label: "Dining",
    value: "dining",
    icon: Ionicons,
    iconName: "restaurant-outline",
    bgColor: "#BE185D",
  },
  health: {
    label: "Health",
    value: "health",
    icon: Ionicons,
    iconName: "heart-outline",
    bgColor: "#E11D48",
  },
  insurance: {
    label: "Insurance",
    value: "insurance",
    icon: Ionicons,
    iconName: "shield-outline",
    bgColor: "#404040",
  },
  savings: {
    label: "Savings",
    value: "savings",
    icon: Ionicons,
    iconName: "cash-outlinee",
    bgColor: "#065F46",
  },
  clothing: {
    label: "Clothing",
    value: "clothing",
    icon: Ionicons,
    iconName: "film-outline",
    bgColor: "#7C3AED",
  },
  personal: {
    label: "Personal",
    value: "personal",
    icon: Ionicons,
    iconName: "film-outline",
    bgColor: "#A21CAF",
  },
  others: {
    label: "Others",
    value: "others",
    icon: Ionicons,
    iconName: "film-outline",
    bgColor: "#525252",
  },
};

export const incomeCategory = {
    label: 'Income',
    value: 'income',
    icon: Ionicons,
    iconName: "dollar",
    bgColor: '#16A34A'
}

export const transactionTypes = [
    {label: 'Expense', value: 'expense'},
    {label: 'Income', value: 'income'}
]
