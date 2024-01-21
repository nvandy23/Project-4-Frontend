// Profile.jsx

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";  
import { getUserFavorites, deleteFavorite, updateFavorite } from "../../../utilities/movies-service";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userFavorites, setUserFavorites] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    genre: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserFavoritesData = async () => {
      try {
        if (isAuthenticated && user) {
          const favorites = await getUserFavorites(user.sub);
          setUserFavorites(favorites);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserFavoritesData();
  }, [isAuthenticated, user]);

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      console.log('Favorite deleted successfully');
      await deleteFavorite(favoriteId);
      setUserFavorites((prevFavorites) => prevFavorites.filter((fav) => fav._id !== favoriteId));
    } catch (error) {
      console.error('error deleting favorite', error);
    }
  };

  const handleEditName = (favoriteId) => {
    setEditMode(favoriteId);
  };

  const handleSaveEdit = async (favoriteId) => {
    try {
      await updateFavorite(favoriteId, updatedData);
      setEditMode(null);
      setUpdatedData({
        name: "",
        genre: "",
        rating: "",
        description: "",
      });
      fetchUserFavoritesData(); 
    } catch (error) {
      console.error('Error editing favorite name', error);
    }
  };

  const handleChangeName = (e) => {
    setUpdatedData({ ...updatedData, name: e.target.value });
  };

  const handleChangeGenre = (e) => {
    setUpdatedData({ ...updatedData, genre: e.target.value });
  };

  const handleChangeRating = (e) => {
    setUpdatedData({ ...updatedData, rating: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setUpdatedData({ ...updatedData, description: e.target.value });
  };

  const fetchUserFavoritesData = async () => {
    try {
      if (isAuthenticated && user) {
        const favorites = await getUserFavorites(user.sub);
        setUserFavorites(favorites);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user && (
      <div>
        <img src={user.picture} alt="" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <h2>Your Favorites</h2>
        {userFavorites.map((favorite) => (
          <div key={favorite._id}>
            <h3>Favorite Details:</h3>
            {editMode === favorite._id ? (
              <div>
                <input type="text" value={updatedData.name} placeholder="Enter updated name" onChange={handleChangeName} />
                <input type="text" value={updatedData.genre} placeholder="Enter updated genre" onChange={handleChangeGenre} />
                <input type="text" value={updatedData.rating} placeholder ="Enter updated rating" onChange={handleChangeRating} />
                <input type="text" value={updatedData.description} placeholder="Enter updated description" onChange={handleChangeDescription} />
                <button onClick={() => handleSaveEdit(favorite._id)}>Save</button>
              </div>
            ) : (
              <div>
                <p>Name: {favorite.name}</p>
                <p>Genre: {favorite.media_type}</p>
                <p>Rating: {favorite.rating}</p>
                <p>Description: {favorite.description}</p>
                <button onClick={() => handleEditName(favorite._id)}>Edit Favorite</button>
                <button onClick={() => handleDeleteFavorite(favorite._id)}>Delete Favorite</button>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
};

export default Profile;





