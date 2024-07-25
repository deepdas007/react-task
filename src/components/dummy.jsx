import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import SimpleBar from "simplebar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import { Draggable } from "react-drag-reorder";
import "simplebar-react/dist/simplebar.min.css";

const DynamicTable = () => {
    const [columns, setColumns] = useState(["Products", "Primary Variant"]);
    const [rows, setRows] = useState(["1"]);

    const addColumn = () => {
        const newColumn = `Variant ${columns.length}`;
        setColumns([...columns, newColumn]);
    };

    const removeColumn = (columnToRemove) => {
        if (columnToRemove === "Primary Variant" || columns.length === 2) {
            return;
        }
        const updatedColumns = columns.filter((col) => col !== columnToRemove);
        setColumns((prevState) => (prevState = updatedColumns));
    };

    const addRow = () => {
        const newRow = rows.length + 1;
        setRows([...rows, newRow]);
    };

    const removeRow = (rowIndex) => {
        if (rowIndex === 0) {
            return;
        }
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        setRows(updatedRows);
    };

    return (
        <div className="productModal">
            <SimpleBar>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {columns.map((column, columnIndex) => (
                                <th key={columnIndex}>
                                    {column === "Products" ||
                                    column === "Primary Variant"
                                        ? column
                                        : `Variant ${columnIndex}`}
                                    {column !== "Products" &&
                                        column !== "Primary Variant" && (
                                            <button
                                                className="btn btn-remove remove-column"
                                                onClick={() =>
                                                    removeColumn(column)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                        )}
                                </th>
                            ))}
                            <th>
                                <button
                                    className="btn btn-plus"
                                    onClick={addColumn}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            // <Draggable key={row}>
                            <tr key={rowIndex}>
                                <td
                                    style={{
                                        fontSize: "40px",
                                        paddingRight: "20px",
                                    }}
                                >
                                    {rowIndex + 1}
                                </td>
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex}>
                                        {column === "Products" ? (
                                            <input
                                                type="text"
                                                placeholder="Product name"
                                            />
                                        ) : (
                                            <ImageUploader />
                                        )}
                                    </td>
                                ))}
                                <td>
                                    {rowIndex !== 0 && (
                                        <button
                                            className="btn btn-remove"
                                            onClick={() => removeRow(rowIndex)}
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                            // </Draggable>
                        ))}
                    </tbody>
                </table>

                <button className="btn btn-plus" onClick={addRow}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </SimpleBar>
        </div>
    );
};

{
    /* <div className="productModal">
    <button className="btn btn-add-column" onClick={handleAddColumn}>
        Add Column
    </button>

    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
        <AgGridReact
            columnDefs={columns.map((column, columnIndex) => {
                return column;
            })}
            rowData={columns.map((column, columnIndex) => {
                return column;
            })}
            rowDragManaged={true} 
            suppressMoveWhenRowDragging={true}
        />
    </div>

    <button className="btn btn-add-row" onClick={handleAddRow}>
        Add Row
    </button>
</div>;

export default DynamicTable; */
}

export default DynamicTable;
