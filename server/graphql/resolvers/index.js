const allPhotos = [
  {
    id: 123,
    name: "Space Kitty MEOW",
    url:
      "https://i.pinimg.com/originals/41/a3/b1/41a3b1aaa8bb905bc2d35c3dff44d919.jpg"
  }
];

const resolvers = {
  Query: {
    getPhotos: (_, {}, { context }) => {
      return allPhotos;
    }
  },
  Mutation: {
    addPhoto: (_, { id, url, name }, { context }) => {
      try {
        // create new photo object
        const newPhoto = {
          id,
          url,
          name
        };

        return newPhoto;
      } catch (e) {
        // stupid errors :(
        console.log("Add photo Error -> ", e);
      }
    },
    deletePhoto: (_, { id }, { context }) => {
      try {
        return true;
      } catch (e) {
        console.log("Delete Photo Error ->", e);
      }
    },
    editPhoto: (_, { id, url, name }, { context }) => {
      try {
        const updatedPhoto = {
          id,
          url,
          name
        };

        return updatedPhoto;
      } catch (e) {
        console.log("ERROR WITH EDIT PHOTO", e);
      }
    }
  }
};

module.exports = resolvers;
