import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;
const VIEW_ROUNDS = `${baseUrl}/api/getAllResults`;

export const handleAppDownload = () => {
  const link = document.createElement("a");
  link.href = "https://oivaskincare.com/apk/win10.apk";
  link.download = "win10.apk";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getRoundsUser = async (filters) => {
    const params = new URLSearchParams();
    console.log(`filter ${JSON.stringify(filters)}`)
    if (filters?.date) {
      // Send ISO date string (e.g., '2025-05-15')
      params.append("date", new Date(filters.date).toISOString().split("T")[0]);
    }
  
    return axios.get(`${VIEW_ROUNDS}?${params.toString()}`, {
      headers: {
        Authorization: null,
      },
    });
  };