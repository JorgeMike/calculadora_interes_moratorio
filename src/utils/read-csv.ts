import Papa from "papaparse";

interface CSVRow {
  fecha: string;
  valor: string;
}

export const fetchCSV = async (): Promise<CSVRow[]> => {
  const response = await fetch("/udis.csv"); // Archivo en la carpeta public
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(csvText, {
      header: true, // Convierte el CSV en un array de objetos
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error: any) => reject(error),
    });
  });
};

export const findValueByDate = async (targetDate: string): Promise<string> => {
  const data = await fetchCSV();
  console.log(data);
  const result = data.find(
    (row) => row.fecha === targetDate.split("-").reverse().join("/")
  );
  console.log(result);
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
      error: (error: any) => reject(error),
    });
  });
};

export const findCCPUdisByDate = async (
  targetDate: string
): Promise<string> => {
  const data = await fetchCCPUdis();
  console.log("CCP-Udis Data:", data);

  // Convierte la fecha al formato correcto "MMM YYYY"
  const formattedDate = new Date(targetDate).toLocaleDateString("es-ES", {
    month: "short",
    year: "numeric",
  });

  const result = data.find(
    (row) => row.fecha.toLowerCase() === formattedDate.toLowerCase()
  );

  return result ? result.ccpudis : "No encontrado";
};
