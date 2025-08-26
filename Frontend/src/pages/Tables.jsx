import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("Hepsi");

  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => await getTables(),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Bir şeyler yanlış gitti!", { variant: "error" });
  }

  const allTables = resData?.data?.data ?? [];

  const filteredTables =
    status === "Hepsi"
      ? allTables
      : allTables.filter(
          (t) => (t.status || "").toLowerCase() === status.toLowerCase()
        );

  return (
    <section className="bg-cyan-900 h-[calc(100vh-5rem)] overflow-hidden">
      {/* ÜST BAR */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-2xl font-bold tracking-wide">Masalar</h1>
        </div>

        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("Hepsi")}
            className={`text-[#ababab] text-lg ${
              status === "Hepsi" && "bg-[#383838] rounded-lg px-5 py-2"
            } rounded-lg px-5 py-2 font-semibold`}
          >
            Hepsi
          </button>

          <button
            onClick={() => setStatus("Uygun")}
            className={`text-[#ababab] text-lg ${
              status === "Uygun" && "bg-[#383838] rounded-lg px-5 py-2"
            } rounded-lg px-5 py-2 font-semibold`}
          >
            Uygun
          </button>

          <button
            onClick={() => setStatus("Meşgul")}
            className={`text-[#ababab] text-lg ${
              status === "Meşgul" && "bg-[#383838] rounded-lg px-5 py-2"
            } rounded-lg px-5 py-2 font-semibold`}
          >
            Meşgul
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 p-10 py-5 overflow-y-scroll h-[700px] scrollbar-hide">
        {isLoading && (
          <p className="text-white/80 text-sm">Yükleniyor...</p>
        )}

        {!isLoading &&
          filteredTables.map((table) => (
            <TableCard
              key={table._id || table.tableNo}      //  key eklendi
              tableId={table._id}   
              name={table.tableNo}                   // Masa numarası
              status={table.status}                  // "Uygun" | "Meşgul"
              initials={table?.currentOrder?.customerDetails?.name || "Müşteri"}
              seats={table.seats}
            />
          ))}

        {!isLoading && filteredTables.length === 0 && (
          <p className="text-white/70 text-sm">Bu kriterde masa bulunamadı.</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
