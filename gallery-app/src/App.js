

import React, { useState } from "react";
import "./styles.css";

const apiKey = "38424818-d9f31cd9f733227b2fe47d5b6";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryData, setGalleryData] = useState([]);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchImages = async () => {
    try {
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&pretty=true`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setGalleryData(data.hits);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données:",
        error
      );
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          id="searchInput"
          placeholder="search ..."
          value={searchQuery}
          onChange={handleSearchInput}
        /> <br></br>
        <button onClick={searchImages}>Rechercher</button>
      </div>
      <div className="gallery">
        {galleryData.map((image) => (
          <img key={image.id} src={image.largeImageURL} alt={image.tags} />
        ))}
      </div>
    </div>
  );
}

export default App;