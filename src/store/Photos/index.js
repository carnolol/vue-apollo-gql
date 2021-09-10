import Vue from "vue";
import { apolloProvider } from "../../boot/apollo/index";
// Our queries
import GET_PHOTOS from "../../graphql/queries/getPhotos.gql";
// Mutations
import ADD_PHOTO from "../../graphql/mutations/addPhoto.gql";
import DELETE_PHOTO from "../../graphql/mutations/deletePhoto.gql";
import EDIT_PHOTO from "../../graphql/mutations/editPhoto.gql";

const apollo = apolloProvider.defaultClient;

const Photos = new Vue({
  data() {
    return {
      PhotosData: []
    };
  },
  computed: {
    getPhotos() {
      return () => {
        if (!this.PhotosData.length) {
          apollo
            .query({
              query: GET_PHOTOS
            })
            .then((response) => {
              // Update our PHOTOS
              this.PhotosData = response.data.getPhotos;
            })
            .catch((e) => {
              console.log(e);
              alert(e);
            });
        }

        // Return whatever we have right now
        return this.PhotosData;
      };
    }
  },
  methods: {
    async deletePhoto(id) {
      try {
        // Call the mutation
        const deletedPhoto = await apollo.mutate({
          mutation: DELETE_PHOTO,
          variables: { id }
        });
        // did we get a response from our resolver?
        if (deletedPhoto.data.deletePhoto) {
          // find the index of the photo we want to delete
          const index = this.PhotosData.findIndex((photo) => photo.id === id);
          // now get rid of it
          return this.PhotosData.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addPhoto(id, url, name) {
      try {
        // pass in our variables to our resolver
        const response = await apollo.mutate({
          mutation: ADD_PHOTO,
          variables: {
            id,
            url,
            name
          }
        });
        const newlyAddedPhoto = response.data.addPhoto;
        // add that new photo to our array of photos
        this.PhotosData.push(newlyAddedPhoto);
        // send it back up to the Vue file!
        return this.PhotosData;
      } catch (e) {
        console.log(e);
      }
    },
    async editPhoto(id, url, name) {
      try {
        // pass our variable to our resolver
        const response = await apollo.mutate({
          mutation: EDIT_PHOTO,
          variables: {
            id,
            url,
            name
          }
        });
        // clarity
        const updatedPhoto = response.data.editPhoto;
        // did we get anything back?
        if (updatedPhoto) {
          // find the index of the photo we want to edit
          const index = this.PhotosData.findIndex((photo) => photo.id === id);
          // now now swap it out for whats already there!
          return this.PhotosData.splice(index, 1, updatedPhoto);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
});

export default Photos;
