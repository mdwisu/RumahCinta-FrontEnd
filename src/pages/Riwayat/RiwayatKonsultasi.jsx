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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNkMjUzNThmODIyMjg1ZDI4Yzc3YTEiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJnZW5kZXIiOiJMIiwiZGF0ZV9iaXJ0aCI6IjIwMTMtMTAtMTBUMDA6MDA6MDAuMDAwWiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaXNfdmVyaWZpZWQiOnRydWUsInBzaWtvbG9nU3RhdHVzIjpudWxsLCJpYXQiOjE3MTMyNzY1OTYsImV4cCI6MTcxMzM2Mjk5Nn0.eVxqhFCukZnrG35FncZg8FE_Ds1Gcmryd5waZXIoFYg",
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
                <h2 className="mb-2 text-xl font-bold">{history.title}</h2>
                <p className="text-gray-600">{history.description}</p>
                <p className="text-sm text-gray-500">Tanggal: {new Date(history.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
