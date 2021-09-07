// !!! RESOLVER HERE
const resolvers = {
  Mutation: {
    addPhoto: (_, { id, url, name }, { cache }) => {
      try {
        // get our photo data
        const data = cache.readQuery({ query: PhotosQuery });
        // create new photo object
        const newPhoto = {
          id,
          url,
          name,
          __typename: "Photo"
        };
        // push new photo object to cache
        data.Photos.push(newPhoto);
        // write to the cash with the new data
        cache.writeQuery({ query: addPhotox, data: data });
        // success!
        return true;
      } catch (e) {
        // stupid errors :(
        console.log("BIG ERROR", e);
      }
    },
    // * Delete Photo
    deletePhoto: (_, { id }, { cache }) => {
      try {
        // get our Photo data
        const data = cache.readQuery({ query: PhotosQuery });
        // Find the correct photo Index to delete
        const currentPhotoIndex = data.Photos.findIndex(
          (photo) => photo.id === id
        );
        // remove dat bad boi
        data.Photos.splice(currentPhotoIndex, 1);
        // update cache
        cache.writeQuery({ query: PhotosQuery, data });
      } catch (e) {
        console.log("Delete Photo Error ->", e);
      }
    },
    //* Edit Photo
    editPhoto: (_, { id, url, name }, { cache }) => {
      try {
        const data = cache.readQuery({ query: PhotosQuery });
        // Find the correct photo Index to delete
        const currentPhotoIndex = data.Photos.findIndex(
          (photo) => photo.id === id
        );

        const updatedPhoto = {
          id,
          url,
          name,
          __typename: "Photo"
        };

        data.Photos.splice(currentPhotoIndex, 1, updatedPhoto);

        // update our cache
        cache.writeQuery({ query: editPhoto, data: data });
      } catch (e) {
        console.log("ERROR WITH EDIT PHOTO", e);
      }
    }
  }
};