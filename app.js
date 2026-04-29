const STORAGE_KEY = "jegang_herb_manager_data_v1";
const USER_STORAGE_KEY = "jegang_user_profiles_v1";
const CURRENT_USER_KEY = "jegang_current_user_v1";

const locations = [
  { name: "2단냉장고", cells: ["상단 왼쪽", "상단 오른쪽", "하단 왼쪽", "하단 오른쪽"] },
  { name: "4단선반", cells: ["1층 왼쪽", "1층 오른쪽", "2층 왼쪽", "2층 오른쪽", "3층 왼쪽", "3층 오른쪽", "4층 왼쪽", "4층 오른쪽"] },
  { name: "조재대선반", cells: ["왼쪽칸", "중앙칸", "오른쪽칸"] },
  { name: "4칸냉장고하단", cells: ["1번칸", "2번칸", "3번칸", "4번칸"] },
];

const defaultUsers = [
  { key: "owner", name: "제강", role: "owner", icon: "👨‍⚕️", label: "원장", password: "0000" },
  { key: "staff1", name: "직원1", role: "staff1", icon: "👤", label: "직원 1", password: "1111" },
  { key: "staff2", name: "직원2", role: "staff2", icon: "👤", label: "직원 2", password: "2222" },
];

const sampleHerbs = [
  { id: 1, name: "당귀", stock: 1200, unit: "g", receivedDate: "2026-04-10", receivedQty: 3000, price: 45000, expiryDate: "2027-04-10", locationType: "2단냉장고", locationDetail: "상단 왼쪽", supplier: "OO약업사", barcode: "880000000001", memo: "자주 사용. 보관상태 양호" },
  { id: 2, name: "숙지황", stock: 800, unit: "g", receivedDate: "2026-03-21", receivedQty: 2000, price: 38000, expiryDate: "2026-07-15", locationType: "4단선반", locationDetail: "2층 오른쪽", supplier: "대한본초", barcode: "880000000002", memo: "유통기한 확인 필요" },
  { id: 3, name: "황기", stock: 2300, unit: "g", receivedDate: "2026-02-02", receivedQty: 5000, price: 62000, expiryDate: "2027-01-30", locationType: "조재대선반", locationDetail: "중앙칸", supplier: "제일약재", barcode: "880000000003", memo: "대용량 보관" },
  { id: 4, name: "맥문동", stock: 350, unit: "g", receivedDate: "2025-12-15", receivedQty: 1000, price: 27000, expiryDate: "2026-05-22", locationType: "4칸냉장고하단", locationDetail: "3번칸", supplier: "OO약업사", barcode: "880000000004", memo: "재고 부족 임박" },
];

let selectedUser = null;
let currentUser = null;
let herbs = loadHerbs();
let userProfiles = loadUserProfiles();
let selectedLocation = "2단냉장고";
let selectedCell = null;

function loadHerbs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleHerbs));
  return sampleHerbs;
}

function saveHerbs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(herbs));
}

function loadUserProfiles() {
  const saved = localStorage.getItem(USER_STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return defaultUsers.map(defaultUser => {
      const savedUser = parsed.find(user => user.key === defaultUser.key);
      return { ...defaultUser, ...(savedUser || {}) };
    });
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUsers));
  return JSON.parse(JSON.stringify(defaultUsers));
}

function saveUserProfiles() {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userProfiles));
}

function formatWon(value) {
  if (!value && value !== 0) return "-";
  return new Intl.NumberFormat("ko-KR").format(Number(value)) + "원";
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function daysUntil(dateString) {
  if (!dateString) return 99999;
  const today = new Date(todayString() + "T00:00:00");
  const target = new Date(dateString + "T00:00:00");
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
});
