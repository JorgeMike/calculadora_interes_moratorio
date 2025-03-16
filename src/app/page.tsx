"use client";
import React, { useState } from "react";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { findUdiValueByDate, findCCPUdisByDate } from "@/utils/read-csv";
import { addMonths, format, isLeapYear } from "date-fns";
import { es } from "date-fns/locale";
import DatePicker from "react-datepicker";
import Image from "next/image";
import coins from "@/assets/coins.png";
import Summary from "@/components/summary";

interface Data {
  initialValue: number;
  startDate: Date;
  endDate: Date;
}

interface UdisData {
  initialValue: number;
  startDate: number;
  endDate: number;
}

interface Result {
  mes: string;
  ccpudis: string;
  ccp125: string;
  diasAnio: string;
  factorDia: string;
  diasMes: string;
  tasa: string;
  interesMensual: string;
  interesPesos: string;
}

export default function Page() {
  const [data, setData] = useState<Data>({
    initialValue: 0,
    startDate: new Date(),
    endDate: new Date(),
  });
  const [udisData, setUdisData] = useState<UdisData>({
    initialValue: 0,
    startDate: 0,
    endDate: 0,
  });
  const [summary, setSummary] = useState<{
    interesMoratorios: number;
    indemnizacionMora: number;
    pagoTotal: number;
  }>({
    interesMoratorios: 0,
    indemnizacionMora: 0,
    pagoTotal: 0,
  });

  const [results, setResults] = useState<Result[]>([]);

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setData((prevData) => ({ ...prevData, startDate: date }));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && date >= data.startDate) {
      setData((prevData) => ({ ...prevData, endDate: date }));
    }
  };

  const calculateInterest = async () => {
    if (!data.initialValue || !data.startDate || !data.endDate) {
      alert("Por favor, ingrese todos los valores");
      return;
    }

    const udiStartDate = await findUdiValueByDate(
      format(data.startDate, "dd/MM/yyyy")
    );
    const udiEndDate = await findUdiValueByDate(
      format(data.endDate, "dd/MM/yyyy")
    );
    const startUDIValue = Number(
      (+data.initialValue / +udiStartDate).toFixed(2)
    );
    setUdisData({
      initialValue: startUDIValue,
      startDate: +udiStartDate,
      endDate: +udiEndDate,
    });

    let currentDate = new Date(data.startDate);
    const finalResults: Result[] = [];

    while (currentDate <= data.endDate) {
      const formattedDate = format(currentDate, "MM/yyyy");
      const ccpUdis = await findCCPUdisByDate(format(currentDate, "dd/MM/yyyy"));
      const ccp125 = parseFloat(ccpUdis) * 0.0125;
      const diasAnio = isLeapYear(currentDate) ? 366 : 365;
      const factorDia = ccp125 / diasAnio;

      let diasMes = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();

      if (
        currentDate.getFullYear() === data.startDate.getFullYear() &&
        currentDate.getMonth() === data.startDate.getMonth()
      ) {
        diasMes = diasMes - data.startDate.getDate() + 1;
      } else if (
        currentDate.getFullYear() === data.endDate.getFullYear() &&
        currentDate.getMonth() === data.endDate.getMonth()
      ) {
        diasMes = data.endDate.getDate();
      }

      const tasa = factorDia * diasMes;
      const interesMensual = tasa * startUDIValue;
      const interesPesos = +interesMensual / diasMes;

      finalResults.push({
        mes: formattedDate,
        ccpudis: ccpUdis,
        ccp125: ccp125.toString(),
        diasAnio: diasAnio.toString(),
        factorDia: factorDia.toString(),
        diasMes: diasMes.toString(),
        tasa: tasa.toString(),
        interesMensual: interesMensual.toString(),
        interesPesos: interesPesos.toString(),
      });

      currentDate = addMonths(currentDate, 1);
    }

    setResults(finalResults);
    // Suma los valores de interes mensual
    const totalInterest = finalResults.reduce(
      (acc, row) => acc + parseFloat(row.interesMensual),
      0
    );
    const indemnizacionMora = startUDIValue * +udiEndDate - data.initialValue;
    const pagoTotal = data.initialValue + indemnizacionMora + totalInterest;
    setSummary({
      interesMoratorios: totalInterest,
      indemnizacionMora: indemnizacionMora,
      pagoTotal: pagoTotal,
    });
  };

  return (
    <div className="hero">
      <div className="diagonal-hero-bg">
        <div className="stars">
          <div className="small"></div>
          <div className="medium"></div>
          <div className="big"></div>
        </div>
      </div>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-1 text-white fw-bold">
              Calculadora de Interés Moratorio
            </h1>
            <p className="lead text-white">
              Calcula el interés moratorio de una cantidad de dinero en udis y
              pesos.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <Image
              src={coins}
              width={400}
              height={400}
              alt="Calculadora de Interés Moratorio"
              className="img-fluid floating"
            />
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-4">
              <Input
                name="initialValue"
                label="Suerte Inicial"
                onChange={(e) =>
                  setData({ ...data, initialValue: +e.target.value })
                }
                className={{
                  input: "fs-4 bg-body mb-3",
                  label: "text-muted m-0",
                }}
                type="number"
              />
            </div>
            <div className="col-md-4">
              <div className="mb-3 d-flex flex-column">
                <label className="form-label text-muted m-0">
                  Fecha de Inicio
                </label>
                <DatePicker
                  className="form-control fs-4"
                  selected={data.startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  locale={es}
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3 d-flex flex-column">
                <label className="form-label text-muted m-0">
                  Fecha de Fin
                </label>
                <DatePicker
                  className="form-control fs-4"
                  selected={data.endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  locale={es}
                  minDate={data.startDate}
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <Button
          variant="azul"
          size="lg"
          onClick={calculateInterest}
          className={{ button: "bg-gradient border-0" }}
        >
          Calcular Interés Moratorio
        </Button>
      </div>
      <div className="container">
        {udisData.initialValue && udisData.startDate && udisData.endDate && (
          <Summary
            items={[
              {
                title: "Suerte Inicial",
                value: `$ ${data.initialValue} MXN`,
                align: "start",
              },
              {
                title: "Fecha Inicial",
                value: format(data.startDate, "dd/MM/yyyy"),
              },
              {
                title: "Fecha Final",
                value: format(data.endDate, "dd/MM/yyyy"),
                align: "end",
              },
              {
                title: "Suerte Inicial en UDIS",
                value: udisData.initialValue.toFixed(2),
                align: "start",
              },
              {
                title: "Valor UDI en Fecha Inicial",
                value: udisData.startDate,
              },
              {
                title: "Valor UDI en Fecha Final",
                value: udisData.endDate,
                align: "end",
              },
              {
                title: "Intereses Moratorios",
                value: summary.interesMoratorios.toFixed(2),
                align: "start",
              },
              {
                title: "Indemnización por Mora",
                value: summary.indemnizacionMora.toFixed(2),
              },
              {
                title: "Pago Total al Asegurado",
                value: summary.pagoTotal.toFixed(2),
                align: "end",
                highlight: true,
                className: "fs-1",
              },
            ]}
          />
        )}
        <div className="overflow-auto">
          <table className="table my-3">
            <thead>
              <tr>
                <th scope="col">Mes</th>
                <th scope="col">CCP</th>
                <th scope="col">CCP * 1.25</th>
                <th scope="col">/</th>
                <th scope="col">Días del Año</th>
                <th scope="col">=</th>
                <th scope="col">Factor por Día</th>
                <th scope="col">*</th>
                <th scope="col">Días del Mes</th>
                <th scope="col">=</th>
                <th scope="col">Tasa</th>
                <th scope="col">Interés Mensual en Udis</th>
                <th scope="col">Interés Mensual en Pesos</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  <td>{row.mes}</td>
                  <td>{row.ccpudis}</td>
                  <td>{row.ccp125}</td>
                  <td>/</td>
                  <td>{row.diasAnio}</td>
                  <td>=</td>
                  <td>{row.factorDia}</td>
                  <td>*</td>
                  <td>{row.diasMes}</td>
                  <td>=</td>
                  <td>{row.tasa}</td>
                  <td>{row.interesMensual}</td>
                  <td>{row.interesPesos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
