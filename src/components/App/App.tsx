import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { useState } from "react";
import { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleSearch = async (query: string) => {
    try {
      setPhotos([]);
      setIsLoading(true);
      setIsError(false);
      const data = await getPhotos(query);
      console.log(data);
      if (data.length === 0) {
        toast.error("No movies found for your request.", {
          duration: 4000,
          position: "top-center",
          removeDelay: 1000,
        });
      }

      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
    openModal();
  };
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text>ERROR!!!</Text>}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handlePhotoSelect} />
          )}
          {isModalOpen && selectedPhoto !== null && (
            <Modal onClose={closeModal} photo={selectedPhoto} />
          )}
        </Container>
      </Section>
    </>
  );
}
