import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

//Icons
import { FaCheck, FaTrash } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";

const Home = () => {
  const [editingIndex, setEditingIndex] = useState<any>();
  const [newName, setNewName] = useState("");
  const [medicines, setMedicines] = useState<any>([
    { name: "Medicine 1", maxCount: 5, usageHistory: [] },
    { name: "Medicine 2", maxCount: 5, usageHistory: [] },
  ]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const localStorageKeyMedicines = localStorage.getItem("medicines");

      if (localStorageKeyMedicines) {
        setMedicines(JSON.parse(localStorageKeyMedicines));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const resetLocalStorage = () => {
      const lastResetDate = localStorage.getItem("lastResetDate");
      const currentDate = new Date();
      const currentDateString = currentDate.toDateString();

      if (!lastResetDate || lastResetDate !== currentDateString) {
        localStorage.clear();
        localStorage.setItem("lastResetDate", currentDateString);
        toast.success("LocalStorage sıfırlandı.");
      }
    };

    resetLocalStorage();

    const interval = setInterval(() => {
      resetLocalStorage();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleMedicineUsage = (index: number) => {
    const updatedMedicines = [...medicines];
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const newUsage = {
      count: updatedMedicines[index].usageHistory.length + 1,
      time: currentTime,
    };

    updatedMedicines[index].usageHistory.push(newUsage);

    setMedicines(updatedMedicines);
    toast.success(`${updatedMedicines[index].name} kullanımı arttırıldı.`);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
  };

  const removeTime = (index: number, timeIndex: number) => {
    const updatedMedicines = [...medicines];

    updatedMedicines[index].usageHistory.splice(timeIndex, 1);

    setMedicines(updatedMedicines);
    toast.success(`Zaman silindi.`);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
  };

  const editName = (index: number) => {
    setEditingIndex(index);
    setNewName(medicines[index].name);
  };

  const saveName = (index: number) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], name: newName };
    setMedicines(updatedMedicines);
    setEditingIndex(null);
    toast.success(`İlaç adı güncellendi.`);
    localStorage.setItem("medicines", JSON.stringify(updatedMedicines));
  };

  return (
    <div className="app">
      <Head>
        <title>Medicine Tracking App</title>
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-500">
          Medicine Tracking App
        </h1>
        <div className="mt-8">
          <table className="table-auto border-collapse w-full">
            <thead className="text-left">
              <tr>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2 ">Medicine Name</th>
                <th className="border px-4 py-2">Number of Uses</th>
                <th className="border px-4 py-2">Expiry Hours</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="align-baseline	">
              {medicines.map((medicine, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <input
                      className={`cursor-auto ${
                        editingIndex === index
                          ? "border-b border-gray-300 rounded-b-md focus:outline-none focus:border-blue-500 cursor-text"
                          : ""
                      }`}
                      type="text"
                      onClick={() => setEditingIndex(index)}
                      defaultValue={medicines[index].name}
                      {...register(`medicines.${index}.name`)}
                    />
                    {editingIndex === index ? (
                      <button onClick={handleSubmit(() => saveName(index))}>
                        <FaCheck className="text-green-500" />
                      </button>
                    ) : (
                      <button onClick={() => editName(index)}>
                        <RiEdit2Line className="text-yellow-500" />
                      </button>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {medicine.usageHistory.length} / 5
                  </td>
                  <td className="border px-4 py-2 ">
                    {medicine.usageHistory.map((usage, usageIndex) => (
                      <div
                        key={usageIndex}
                        className="grid grid-cols-3 md:w-2/5 w-full"
                      >
                        <span className="col-span-1">{usage.count}.</span>

                        <li className="col-span-2 flex justify-between items-center ">
                          {usage.time}
                          {medicine.usageHistory.length === usage.count && (
                            <button
                              onClick={() => removeTime(index, usageIndex)}
                            >
                              <FaTrash className="text-red-500" />
                            </button>
                          )}
                        </li>
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleMedicineUsage(index)}
                      disabled={
                        medicine.usageHistory.length >= medicine.maxCount
                      }
                    >
                      Kullan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
