import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";
import { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}
export default function PhotosGallery({
  photos,
  onSelect,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <GridItem key={photo.id}>
          <PhotosGalleryItem photo={photo} onSelect={onSelect} />
        </GridItem>
      ))}
    </Grid>
  );
}
