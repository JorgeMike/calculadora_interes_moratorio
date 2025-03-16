import Papa from "papaparse";

const MESES: { [key: number]: string } = {
  1: "Ene",
  2: "Feb",
  3: "Mar",
  4: "Abr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dic",
}

interface CSVRow {
  fecha: string;
  valor: string;
}

export const fetchUdisCSV = async (): Promise<CSVRow[]> => {
  const response = await fetch("/udis.csv"); // Archivo en la carpeta public
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(csvText, {
      header: true, // Convierte el CSV en un array de objetos
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error: Error) => reject(error),
    });
  });
};

export const findUdiValueByDate = async (targetDate: string): Promise<string> => {
  const data = await fetchUdisCSV();
  const result = data.find(
    (row) => row.fecha === targetDate
  );
  return result ? result.valor : "No encontrado";
};

interface CCPRow {
  fecha: string;
  ccpudis: string;
}

export const fetchCCPUdis = async (): Promise<CCPRow[]> => {
  const response = await fetch("/ccp-udis.csv"); // Archivo en la carpeta public
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<CCPRow>(csvText, {
      header: true, // Convierte el CSV en un array de objetos
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error: Error) => reject(error),
    });
  });
};

/**
 * 
 * @param targetDate Fecha en formato "dd/MM/yyyy"
 * @returns 
 */
export const findCCPUdisByDate = async (
  targetDate: string
): Promise<string> => {
  // Converti la fecha para que tenga el formato: Jun 2020
  const data = await fetchCCPUdis();
  const [, month, year] = targetDate.split("/");
  const formattedDate = `${MESES[parseInt(month)]} ${year}`;

  const result = data.find(
    (row) => row.fecha.toLowerCase() === formattedDate.toLowerCase()
  );

  return result ? result.ccpudis : "No encontrado";
};
