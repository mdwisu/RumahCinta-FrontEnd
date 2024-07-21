import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RiwayatKonsultasi() {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/histories/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.request(config);
      setHistories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("Terjadi kesalahan saat memuat riwayat konsultasi.");
      setIsLoading(false);
    }
  };

  function formatConsultationDateTime(consultationDate, consultationTime) {
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(consultationDate));

    return `${formattedDate}, ${consultationTime}`;
  }

  const treatmentMap = {
    psikoedukasi: "Psiko edukasi",
    tespotensiakademik: "Tes Potensi Akademik",
    konsultasi: "Konsultasi",
    psikotes: "Psikotes",
    konseling: "Konseling",
    asesment: "Asesment",
    terapi: "Terapi",
    seminarparenting: "Seminar Parenting",
    observasidijagnostik: "Observasi Dijagnostik",
    pelatihanpengembangandiri: "Pelatihan Pengembangan Diri",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8 pt-36">
        <h1 className="mb-4 text-2xl font-bold">Riwayat Konsultasi</h1>
        {isLoading ? (
          <div>Memuat riwayat konsultasi...</div>
        ) : error ? (
          <div>{error}</div>
        ) : histories.length === 0 ? (
          <div className="text-center text-gray-600">Anda belum pernah melakukan konsultasi.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {histories.map((history) => (
              <div key={history._id} className="rounded-lg bg-white p-4 shadow-md">
                <h2 className="text-xl font-bold">Konsultasi dengan {history.psikologId.name}</h2>
                <p className="mb-2 text-sm text-gray-500">
                  Tanggal dan Waktu Konsultasi:{" "}
                  {formatConsultationDateTime(history.consultationDate, history.consultationTime)}
                </p>
                <p className="mb-2 text-gray-600">
                  <strong>Treatment:</strong> {treatmentMap[history.treatment] || "-"}
                </p>
                <p className="mb-2 text-gray-600">
                  <strong>Catatan:</strong> {history.notes || "-"}
                </p>
                {/* <p className="mb-2 text-gray-600">
                  <strong>Diagnosis:</strong> {history.diagnosis}
                </p> */}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
