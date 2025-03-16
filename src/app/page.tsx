"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { findValueByDate } from "@/utils/read-csv";
import { addMonths, format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function Page() {
  const [initialValue, setInitialValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startUDIValue, setStartUDIValue] = useState<string | null>(null);
  const [endUDIValue, setEndUDIValue] = useState<string | null>(null);
  const [months, setMonths] = useState<string[]>([]);
  const [results, setResults] = useState<{
    mes: string;
    ccpudis: string;
    ccp125: string;
    diasAnio: string;
    factorDia: string;
    diasMes: string;
    interesMoratorio: string;
    interesMensual: string;
    interesPesos: string;
  }[]>([]);

  const calculateInterest = () => {
    if (!initialValue || !startDate || !endDate) {
      alert("Por favor, ingrese todos los valores");
      return;
    }


  };

  const handleOnSelectStart = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = e.target.value;
    setStartDate(date);
    const resultado = await findValueByDate(date);
    setStartUDIValue(resultado);
  };

  const handleOnSelectEnd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setEndDate(date);
    const resultado = await findValueByDate(date);
    setEndUDIValue(resultado);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-caption">
                <h1 className="page-title">Calculadora de Interés Moratorio</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-section bg">
        <div className="container">
          <div className="card-block bg-white shadow-sm">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center mb-3">
                  <Input
                    label="Monto de la deuda original"
                    onChange={(e) => setInitialValue(e.target.value)}
                    type="number"
                    style={{ minWidth: "400px" }}
                    className={{ input: "fs-4" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-0">
                  <label htmlFor="inputDateStart" className="form-label">
                    Fecha Inicial
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDateStart"
                    value={startDate}
                    onChange={handleOnSelectStart}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-0">
                  <label htmlFor="inputDateEnd" className="form-label">
                    Fecha Final
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDateEnd"
                    value={endDate}
                    onChange={handleOnSelectEnd}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-center mt-3">
                  <Button onClick={calculateInterest}>
                    Calcular Interés Moratorio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {startUDIValue && endUDIValue && initialValue && (
          <div className="row">
            <div className="col-md-4 text-start">
              <small>Valor Inicial</small>
              <h3>{initialValue} MXN</h3>
            </div>
            <div className="col-md-4 text-center">
              <small>Valor UDI en Fecha Inicial</small>
              <h3>{startUDIValue} MXN</h3>
            </div>
            <div className="col-md-4 text-end">
              <small>Valor UDI en Fecha Final</small>
              <h3>{endUDIValue} MXN</h3>
            </div>
          </div>
        )}
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">Mes</th>
              <th scope="col">CCP-Udis</th>
              <th scope="col">CCP * 1.25</th>
              <th scope="col">/</th>
              <th scope="col">Días del Año</th>
              <th scope="col">=</th>
              <th scope="col">Factor por Día</th>
              <th scope="col">*</th>
              <th scope="col">Días del Mes</th>
              <th scope="col">=</th>
              <th scope="col">Interés Moratorio en Udis</th>
              <th scope="col">Interés Mensual en Udis</th>
              <th scope="col">Interés Mensual en Pesos</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month, index) => (
              <tr key={index}>
                <td>{month}</td>
                <td>-</td>
                <td>-</td>
                <td>/</td>
                <td>-</td>
                <td>=</td>
                <td>-</td>
                <td>*</td>
                <td>-</td>
                <td>=</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
