import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { getUserFavorites } from "../../../utilities/movies-service"

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
          </div>
        ))}
      </div>
    )
  );
};

export default Profile;


