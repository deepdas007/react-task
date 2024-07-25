import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import SimpleBar from "simplebar-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "simplebar-react/dist/simplebar.min.css";
import "./AddProduct.css";

const DynamicTable = () => {
    //State initialization
    const [columns, setColumns] = useState(["Products", "Primary Variant"]);
    const [rows, setRows] = useState([1]);

    //Add Variants
    const addColumn = () => {
        const newColumn = `Variant ${columns.length}`;
        setColumns([...columns, newColumn]);
    };

    //Remove Variants
    const removeColumn = (columnToRemove) => {
        if (columnToRemove === "Primary Variant" || columns.length === 2) {
            return;
        }
        const updatedColumns = columns.filter((col) => col !== columnToRemove);
        setColumns(updatedColumns);
    };

    //Add Products
    const addRow = () => {
        const newRow = rows.length + 1;
        setRows([...rows, newRow]);
    };

    //Add Products
    const removeRow = (rowIndex) => {
        if (rowIndex === 0) {
            return;
        }
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        setRows(updatedRows);
    };

    //Drag and drop reorder
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(rows);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setRows(items);
    };

    return (
        <div className="productModal">
            <SimpleBar>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-rows">
                        {(provided) => (
                            <table
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
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
                                                    column !==
                                                        "Primary Variant" && (
                                                        <button
                                                            className="btn btn-remove remove-column"
                                                            onClick={() =>
                                                                removeColumn(
                                                                    column
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faX}
                                                            />
                                                        </button>
                                                    )}
                                            </th>
                                        ))}
                                        <th>
                                            <button
                                                className="btn btn-plus"
                                                onClick={addColumn}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, rowIndex) => (
                                        <Draggable
                                            key={rowIndex}
                                            draggableId={`row-${rowIndex}`}
                                            index={rowIndex}
                                        >
                                            {(provided) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <td
                                                        style={{
                                                            fontSize: "40px",
                                                            paddingRight:
                                                                "20px",
                                                        }}
                                                    >
                                                        {rowIndex + 1}
                                                    </td>
                                                    {columns.map(
                                                        (
                                                            column,
                                                            columnIndex
                                                        ) => (
                                                            <td
                                                                key={
                                                                    columnIndex
                                                                }
                                                                style={{
                                                                    paddingRight:
                                                                        "20px",
                                                                }}
                                                            >
                                                                {column ===
                                                                "Products" ? (
                                                                    <input
                                                                        type="text"
                                                                        className="produt-input"
                                                                        placeholder="Product name"
                                                                    />
                                                                ) : (
                                                                    <ImageUploader />
                                                                )}
                                                            </td>
                                                        )
                                                    )}
                                                    <td>
                                                        {rowIndex !== 0 && (
                                                            <button
                                                                className="btn btn-remove"
                                                                onClick={() =>
                                                                    removeRow(
                                                                        rowIndex
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faX}
                                                                />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            </table>
                        )}
                    </Droppable>
                </DragDropContext>
                <button className="btn btn-plus" onClick={addRow}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </SimpleBar>
        </div>
    );
};

export default DynamicTable;
