"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Hero from "@/components/hero";
import dayjs from "dayjs";

export default function Page() {
  const [data, setData] = useState<{ fecha: string; valor: string }[]>([]);
  const [initialValue, setInitialValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interest, setInterest] = useState<number | null>(null);
  const [startUDIValue, setStartUDIValue] = useState<string | null>(null);
  const [endUDIValue, setEndUDIValue] = useState<string | null>(null);
  const [debtInUDIs, setDebtInUDIs] = useState<number | null>(null);

  useEffect(() => {
    fetch("/udis.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data as { fecha: string; valor: string }[]);
          },
        });
      });
  }, []);

  const calculateInterest = () => {
    if (!initialValue || !startDate || !endDate) {
      alert("Por favor, ingrese todos los valores");
      return;
    }

    const daysPast = dayjs(endDate).diff(dayjs(startDate), "day");
    if (daysPast <= 0) {
      alert("La fecha final debe ser posterior a la inicial");
      return;
    }

    const startUDI = data.find((entry) => entry.fecha === startDate.split("-").reverse().join("/"))?.valor;
    const endUDI = data.find((entry) => entry.fecha === endDate.split("-").reverse().join("/"))?.valor;

    if (!startUDI || !endUDI) {
      alert("No se encontraron valores UDI para las fechas seleccionadas");
      return;
    }

    setStartUDIValue(startUDI);
    setEndUDIValue(endUDI);

    const debtUDIs = parseFloat(initialValue) / parseFloat(startUDI);
    setDebtInUDIs(debtUDIs);

    const interestRate = 10; 
    const moratoryInterest = debtUDIs * (1.25 * (interestRate / 100)) * (daysPast / 365);

    setInterest(moratoryInterest * parseFloat(endUDI));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Hero />
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <div className="container">
          <div className="row flex-grow-1 m-auto">
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="inputValue" className="form-label">
                  Valor Inicial de la Deuda (MXN)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputValue"
                  placeholder="Ingrese un valor"
                  value={initialValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="inputDateStart" className="form-label">
                  Fecha Inicial
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDateStart"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="inputDateEnd" className="form-label">
                  Fecha Final
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputDateEnd"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={calculateInterest}>
              Calcular Interés Moratorio
            </button>
          </div>
          {startUDIValue && endUDIValue && (
            <div className="mt-3 text-center">
              <h5>Valor UDI en Fecha Inicial: {startUDIValue} MXN</h5>
              <h5>Valor UDI en Fecha Final: {endUDIValue} MXN</h5>
              <h5>Deuda en UDIs: {debtInUDIs?.toFixed(2)}</h5>
            </div>
          )}
          {interest !== null && (
            <div className="mt-3 text-center">
              <h4>Interés Moratorio: ${interest.toFixed(2)} MXN</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}