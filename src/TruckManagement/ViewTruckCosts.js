// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BackBtn from "../TruckManagement/Components/BackBtn";

// function ViewTruckCosts() {
//     const [truckCost, setTruckCost] = useState([]); // Stores fetched truck data
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error handling

//     useEffect(() => {
//         // Fetch truck data from backend
//         axios.get("http://localhost:8080/Maintenance/getAllCosts")
//             .then((response) => {
//                 setTruckCost(response.data); // Set state with fetched data
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching truck costs:", err);
//                 setError("Failed to load truck costs. Please try again.");
//                 setLoading(false);
//             });
//     }, []);

//     function DeleteCost(costID){
//         if (window.confirm(`Are you sure you want to delete Cost`)) {
//             axios.delete(`http://localhost:8080/Maintenance/deleteCost/${costID}`)
//                 .then(() => alert("Cost deleted successfully!"))
//                 .catch((error) => {
//                     console.error("Error deleting truck:", error);
//                     alert("Failed to delete Cost.");
//                 });
//         }
//     }

//     if (loading) return <p>Loading truck Costs...</p>;
//     if (error) return <p style={{ color: "red" }}>{error}</p>;

//     return (
//         <div style={{ padding: "20px" }}>
//             <div>
//                 <BackBtn />
//             </div>
//             <h2>Truck Cost Details</h2>
//             <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
//                 <thead>
//                     <tr>
//                         <th>Truck_Number</th>
//                         <th>Date</th>
//                         <th>Type</th>
//                         <th>Expenses</th>
//                         <th>Description</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {truckCost.length > 0 ? (
//                         truckCost.map((cost) => (
//                             <tr>
//                                 <td>{cost.Truck_RegNum}</td>
//                                 <td>{cost.Maintenance_Date}</td>
//                                 <td>{cost.maintenance_type}</td>
//                                 <td>{cost.Cost}</td>
//                                 <td>{cost.Description}</td>
//                                 <td>{cost.Status}</td>
//                                 <td>
//                                     <button type="submit" onClick={() => DeleteCost(cost._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="8">No costs found.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//             <button type="submit">Generate Report</button>
//         </div>
//     );
// }

// export default ViewTruckCosts;
import React, { useState, useEffect } from "react";
import axios from "axios";
import BackBtn from "../TruckManagement/Components/BackBtn";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ViewTruckCosts() {
    const [truckCost, setTruckCost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/Maintenance/getAllCosts")
            .then((response) => {
                setTruckCost(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching truck costs:", err);
                setError("Failed to load truck costs. Please try again.");
                setLoading(false);
            });
    }, []);

    function DeleteCost(costID) {
        if (window.confirm(`Are you sure you want to delete Cost?`)) {
            axios.delete(`http://localhost:8080/Maintenance/deleteCost/${costID}`)
                .then(() => {
                    alert("Cost deleted successfully!");
                    setTruckCost((prev) => prev.filter(cost => cost._id !== costID));
                })
                .catch((error) => {
                    console.error("Error deleting truck:", error);
                    alert("Failed to delete Cost.");
                });
        }
    }

    function handleGeneratePDF() {
        const doc = new jsPDF();
        doc.text("Truck Cost Report", 14, 15);

        const tableColumn = ["Truck Number", "Date", "Type", "Expenses", "Description", "Status"];
        const tableRows = [];

        truckCost.forEach(cost => {
            const rowData = [
                cost.Truck_RegNum,
                cost.Maintenance_Date,
                cost.maintenance_type,
                cost.Cost,
                cost.Description,
                cost.Status
            ];
            tableRows.push(rowData);
        });

        // Add Total row
        const totalCost = truckCost.reduce((sum, cost) => sum + parseFloat(cost.Cost || 0), 0);
        tableRows.push([
            { content: "Total", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: totalCost.toFixed(2), styles: { fontStyle: 'bold', halign: 'right' } },
            "", ""
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: {
                fontSize: 10,
                cellPadding: 3,
                halign: 'left',
                valign: 'middle',
                textColor: [40, 40, 40],
            },
            headStyles: {
                fillColor: [22, 160, 133], // Teal background
                textColor: [255, 255, 255],
                fontSize: 12,
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray for zebra rows
            },
            columnStyles: {
                0: { cellWidth: 30 }, // Truck Number
                1: { cellWidth: 25 }, // Date
                3: { halign: 'right' }, // Cost aligned right
            },
            margin: { top: 20 },
        });

        doc.save("Truck_Cost_Report.pdf");
    }
    if (loading) return <p>Loading truck Costs...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <BackBtn />
            <h2>Truck Cost Details</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Truck_Number</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Expenses</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {truckCost.length > 0 ? (
                        truckCost.map((cost) => (
                            <tr key={cost._id}>
                                <td>{cost.Truck_RegNum}</td>
                                <td>{cost.Maintenance_Date}</td>
                                <td>{cost.maintenance_type}</td>
                                <td>{cost.Cost}</td>
                                <td>{cost.Description}</td>
                                <td>{cost.Status}</td>
                                <td>
                                    <button onClick={() => DeleteCost(cost._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No costs found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            <button type="submit" onClick={handleGeneratePDF}>Generate Report</button>
        </div>
    );
}

export default ViewTruckCosts;
