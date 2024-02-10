// justins fun price comp : )
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import SearchBar from './SearchBarProducts';
import Header from './Header';
import Footer from './Footer';
import './PriceComparer.css';

const PriceComparer = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchedItemName, setSearchedItemName] = useState('');

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const handleSearchResults = (searchResults, itemName) => {
    setSearchedItemName(itemName);
    const filteredItems = searchResults.filter(item => item.price && item.price[0] !== null);
    setItems(filteredItems);
  };

  const handleItemClick = (productId) => {
    const selectedItem = items.find(item => item.productId === productId);
    selectedItem.itemName = searchedItemName || 'N/A';
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleRemoveItem = (productId) => {
    const updatedSelectedItems = selectedItems.filter(item => item.productId !== productId);
    setSelectedItems(updatedSelectedItems);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    pdf.text('Selected Items List', 20, 10);
    selectedItems.forEach((item, index) => {
      const yPosition = 20 + index * 40;
      pdf.text(`Item Name: ${item.itemName || 'N/A'}`, 20, yPosition);
      pdf.text(`Brand: ${item.brand || 'Kroger'}`, 20, yPosition + 10);
      pdf.text(`Regular Price: $${item.price[0].regular}`, 20, yPosition + 20);
      pdf.text(`Promo Price: $${item.price[0].promo !== 0 ? item.price[0].promo : 'N/A'}`, 20, yPosition + 30);
    });
    pdf.text(`Total Price: $${totalPrice}`, 20, pdf.internal.pageSize.height - 20);
    pdf.save('selected_items.pdf');
  };

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((acc, item) => {
      const regularPrice = item.price && item.price[0].regular;
      const promoPrice = item.price && item.price[0].promo !== 0 ? item.price[0].promo : 'N/A';
      const priceToAdd = regularPrice !== null && regularPrice !== undefined
        ? (promoPrice !== 'N/A' ? promoPrice : regularPrice)
        : 0;
      return acc + priceToAdd;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  return (
    <div>
      <Header />
      <div>
        <h1>Price Compararer</h1>
        <SearchBar onSearchResults={handleSearchResults} />
        <div className="search-section">
          <h2>Search Results</h2>
          <div>
            {items.map(item => (
              <div key={item.productId} onClick={() => handleItemClick(item.productId)} className="search-item">
                <h2><a href={`https://www.kroger.com/search?query=${item.productId}&searchType=default_search`} target="_blank" rel="noopener noreferrer">{item.brand || 'Kroger'}</a></h2>
                {item.price && item.price[0] !== null && (
                  <>
                    <p>Regular Price: ${item.price[0].regular}</p>
                    <p>Promo Price: ${item.price[0].promo !== 0 ? item.price[0].promo : 'N/A'}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>Selected Items</h2>
          <div>
            {selectedItems.map(item => (
              <div key={item.productId} onClick={() => handleRemoveItem(item.productId)} className="search-item">
                <h2><a href={`https://www.kroger.com/search?query=${item.productId}&searchType=default_search`} target="_blank" rel="noopener noreferrer">{item.brand || 'Kroger'}</a></h2>
                {item.price && item.price[0] !== null && (
                  <>
                    <p>Item Name: {item.itemName || 'N/A'}</p>
                    <p>Regular Price: ${item.price[0].regular}</p>
                    <p>Promo Price: ${item.price[0].promo !== 0 ? item.price[0].promo : 'N/A'}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <h2>Total Price: ${totalPrice}</h2>
          <button onClick={generatePDF}>Generate PDF</button>
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PriceComparer;