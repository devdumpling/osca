import { getStrapiMedia } from "../lib/strapi/media";
import Image from "next/image";
import styled from "styled-components";

interface StrapiImageProps {
  image: any;
  layout?: "intrinsic" | "fill" | "fixed" | "responsive";
  width?: number;
  height?: number;
}

const StyledImage = styled(Image)`
  border-radius: 1rem;
`;

export const StrapiImage = ({
  image,
  layout = "fill",
  width,
  height,
}: StrapiImageProps) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <StyledImage
      src={imageUrl}
      alt={image.alternativeText || image.name}
      width={width}
      height={height}
      layout={layout}
    />
  );
};
