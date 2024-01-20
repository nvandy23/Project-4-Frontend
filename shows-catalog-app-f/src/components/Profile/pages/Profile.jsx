import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { getUserFavorites,deleteFavorite } from "../../../utilities/movies-service"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchUserFavoritesData = async () => {
      try {
        if (isAuthenticated) {
          const favorites = await getUserFavorites(user.sub);
          setUserFavorites(favorites);
        }
      } catch (error) {
        console.error(error); 
      }
    };

    fetchUserFavoritesData();
  }, []); 

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      console.log('Favorite deleted successfully');
      await deleteFavorite(favoriteId);
      setUserFavorites((prevFavorites) => prevFavorites.filter((fav) => fav._id !== favoriteId));
    } catch (error) {
      console.error('error deleting favorite',error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={""} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <h2>Your Favorites</h2>
        {userFavorites.map((favorite) => (
          <div key={favorite._id}>
            <h3>Favorite Details:</h3>
            <p>Name: {favorite.name}</p>
            <p>Genre: {favorite.genre}</p>
            <p>Rating: {favorite.rating}</p>
            <p>Description: {favorite.description}</p>
            <button onClick={() => handleDeleteFavorite(favorite._id)}>Delete</button>
          </div>
        ))}
      </div>
    )
  );
};

export default Profile;


