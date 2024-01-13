import ConfirmDeletion from "./components/ConfirmDeletion";
import Name from "./components/Name";
import Quantity from "./components/Quantity";
import QuantitySort from "./components/QuantitySort";
import TypeFilter from "./components/TypeFilter";
import TypeSelector from "./components/TypeSelector";
import AddItem from "./components/icons/AddItem";
import DeleteIcon from "./components/icons/DeleteIcon";
import { generateProductId } from "./helpers";
import './styles.css'
import { useEffect, useState } from "react";

const FoodTable = ({ list }) => {
  const [scrollToEnd, setScrollToEnd] = useState(false);
  const [data, setData] = useState(list);
  const [filterBy, setFilterBy] = useState("Sin filtrar");
  const [sortBy, setSortBy] = useState("");
  const [filteredData, setFilteredData] = useState([...data]);
  const [sortedData, setSortedData] = useState([...data]);
  const [indexToRemove, setIndexToRemove] = useState(-1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /* HELPER FUNCTIONS */

  const createItem = () => {
    if (!data.filter((item) => item.name === "").length) {
      const newData = [...data];
      newData.push({
        productId: generateProductId(),
        name: "",
        type: filterBy,
        quantity: 0,
      });

      setData(newData);
    }
    setScrollToEnd(true);
  };

  const sort = () => {
    setTimeout(() => {
      setSortedData(
        [...filteredData].sort((a, b) => {
          const aValue = a["quantity"];
          const bValue = b["quantity"];
          return sortBy === "asc" ? aValue - bValue : bValue - aValue;
        })
      );
    }, 100);
  };

  /* USE EFFECTS */

  useEffect(() => {
    if (filterBy === "Comida" || filterBy === "Bebida") {
      setFilteredData([...data].filter((item) => item.type === filterBy));
    } else {
      setFilteredData([...data]);
    }
  }, [data]);

  useEffect(() => {
    sort();
  }, [sortBy]);

  useEffect(() => {
    sort();
  }, [filteredData]);

  useEffect(() => {
    if (scrollToEnd) {
      let i = 0;
      const interval = setInterval(() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        if (i > 2) {
          clearInterval(interval);
        }
        i++;
      }, 150);
      setScrollToEnd(false);
    }
  }, [scrollToEnd]);

  useEffect(() => {
    if (indexToRemove !== -1) {
      if (data.find((item) => item.productId === indexToRemove).name) {
        setIsPopupOpen(true);
      } else {
        const newData = data.filter((item) => item.productId !== indexToRemove);
        setData(newData);
        setIndexToRemove(-1);
      }
    }
  }, [indexToRemove]);

  useEffect(() => {
    if (!isPopupOpen && indexToRemove !== -1) {
      const newData = data.filter((item) => item.productId !== indexToRemove);
      setData(newData);
      setIndexToRemove(-1);
    }
  }, [isPopupOpen]);

  /* EVENT HANDLERS */

  const handleFilterData = (e) => {
    const filter = e.target.value;
    setData(data.filter((item) => item.name));
    setFilterBy(filter);

    if (filter === "Comida" || filter === "Bebida") {
      setFilteredData(data.filter((item) => item.type == filter));
    } else {
      setFilteredData([...data]);
    }
  };

  const handleChange = (key, value, index) => {
    if (key == "quantity") {
      if (value < 0 || !/^\d+$/.test(value)) return;
      value = Math.floor(Number(value));
      console.log(value);
    }

    const newData = data.map((item) => {
      if (item.productId === index) {
        const newItem = { ...item };
        newItem[key] = value;
        return newItem;
      }

      return item;
    });

    setData(newData);
  };

  const handleSort = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  const handleDeleteClick = (index) => {
    setIndexToRemove(index);
  };

  const handleConfirmDelete = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIndexToRemove(-1);
    setIsPopupOpen(false);
  };

  return (
    <>
      <AddItem handleClick={createItem} />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>
              <TypeFilter handleChange={handleFilterData} />
            </th>
            <th>
              <QuantitySort handleSort={handleSort} />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.productId}>
              <td>
                <Name
                  name={item.name}
                  index={item.productId}
                  handleChange={handleChange}
                />
              </td>
              <td>
                <TypeSelector
                  value={item.type}
                  index={item.productId}
                  handleChange={handleChange}
                />
              </td>
              <td>
                <Quantity
                  quantity={item.quantity}
                  index={item.productId}
                  handleChange={handleChange}
                />
              </td>
              <td>
                <button
                  className="btn transparent"
                  onClick={() => handleDeleteClick(item.productId)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <ConfirmDeletion
          onClose={handleClosePopup}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default FoodTable