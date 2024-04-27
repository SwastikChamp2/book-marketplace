import { useState } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { FaSortNumericDownAlt } from "react-icons/fa";
import { products } from "../utils/products";

const options = [
    { value: "Study Books", label: "Study Books" },
    { value: "Notes", label: "Notes" },
    { value: "Comic", label: "Comic" },
    { value: "Fiction", label: "Fiction" },
    { value: "Non Fiction", label: "Non Fiction" },
];

const languages = ["English", "Hindi", "Marathi", "Bengali", "Gujrathi", "Urdu"];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
            backgroundColor: "#0f3460",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ setFilterList }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");

    const handleChange = () => {
        let filteredProducts = products;

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (item) => item.genre === selectedCategory.value
            );
        }

        if (selectedLanguage) {
            filteredProducts = filteredProducts.filter(
                (item) => item.language === selectedLanguage
            );
        }

        setFilterList(filteredProducts);
    };

    const handleSort = () => {
        const sortedProducts = [...products].sort(
            (a, b) => a.marketPrice - b.marketPrice
        );
        setFilterList(sortedProducts);
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Select
                options={options}
                defaultValue={{ value: "", label: "Filter By Category" }}
                styles={customStyles}
                onChange={(selectedOption) => setSelectedCategory(selectedOption)}
            />
            <div style={{ marginLeft: "10px" }}></div>
            <Select
                options={languages.map((language) => ({
                    value: language,
                    label: language,
                }))}
                defaultValue={{ value: "", label: "Filter By Language" }}
                styles={customStyles}
                onChange={(selectedOption) => setSelectedLanguage(selectedOption.value)}
            />
            <div style={{ marginLeft: "10px" }}></div>

            <Button variant="secondary" size="sm" onClick={handleSort}>
                <FaSortNumericDownAlt />
                Sort by price
            </Button>
            <div style={{ marginLeft: "10px" }}></div>
            <Button
                variant="secondary"
                size="sm"
                onClick={handleChange}
                disabled={!selectedCategory && !selectedLanguage}
            >
                Apply Filters
            </Button>
        </div>
    );
};

export default FilterSelect;
