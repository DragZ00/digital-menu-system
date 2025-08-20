
export const getBgColor = () => {
  const bgarr = [
    "#b73e3e",
    "#5b45b0",
    "#7f167f",
    "#735f32",
    "#1d2569",
    "#285430",   // <- düzeltildi
    "#f6b100",
    "#2e4a40",
  ];
  const i = Math.floor(Math.random() * bgarr.length);
  return bgarr[i];
};
export const getAvatarName = (name) => {
if (!name) return "";
 return name.split(" ").map(word => word[0]).join("").toUpperCase()
}
export const formatDate = (date) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
  };