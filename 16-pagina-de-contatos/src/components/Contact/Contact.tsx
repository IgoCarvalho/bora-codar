import { useState } from 'react';

import { ContactInfo, Container, ImageContainer } from './Contact.styles';

type ContactProps = {
  imgUrl: string;
  name: string;
  phone: string;
};

export function Contact({ imgUrl, name, phone }: ContactProps) {
  const [imgError, setImgError] = useState(false);

  function handleImageError() {
    setImgError(true);
  }

  function getNameInitials() {
    const nameInitials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return nameInitials;
  }

  return (
    <Container>
      <ImageContainer>
        {imgError ? (
          <p>{getNameInitials()}</p>
        ) : (
          <img
            src={imgUrl}
            alt="User Profile Image"
            onError={handleImageError}
          />
        )}
      </ImageContainer>

      <ContactInfo>
        <strong>{name}</strong>
        <span>{phone}</span>
      </ContactInfo>
    </Container>
  );
}
