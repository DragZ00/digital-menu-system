import React, { useState, useEffect } from "react";

function Greetings() {
  const [dateTime, setDateTime] = useState(new Date());

  // Her saniye tarihi güncelle
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tarihi formatla
  const formatDate = (date) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
  };

  // Saati formatla
  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="flex justify-between items-center px-8 py-6">
      {/* Sol taraf */}
      <div>
        <h1 className="text-[#f5f5f5] text-2xl font-semibold">
          İyi Günler, Yönetici
        </h1>
        <p className="text-[#ababab] text-sm">
          Müşterilerimize en iyi hizmeti sunun 😊
        </p>
      </div>

      {/* Sağ taraf */}
      <div className="text-right">
        <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide tabular-nums">
          {formatTime(dateTime)}
        </h1>
        <p className="text-[#ababab] text-sm">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
}

export default Greetings;
